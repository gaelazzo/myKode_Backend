const express = require('express');
const asyncHandler = require('express-async-handler'); //https://zellwk.com/blog/async-await-express/
const q = require("./../../client/components/metadata/jsDataQuery");

/**
 *
 * @param {Context} ctx
 * @param {string} tableName
 * @param {string} listType
 * @return {Promise<{newTableName:string,  newListType:string}>}
 */
async function getMappingWebListRedir(ctx, tableName, listType){
    let filter= q.and(q.eq("tablename",tableName), q.eq("listtype",listType));
    //data is an array of rows with a name
    let /* [] */ data = await ctx.pooledConn.conn.select({tableName:"web_listredir",filter: filter, columns:"*"});
    if (data.length === 0){
        return  {newTableName:tableName, newListType: listType};
    }
    let r = data[0];
    return  {newTableName:r["newtablename"], newListType: r["newlisttype"]};
}

async function getPagedTable(req,res,next){
    let ctx = req.app.locals.context;

    let tableName = req.body.tableName;
    let nPage = req.body.nPage;
    let nRowPerPage = req.body.nRowPerPage;
    let listType = req.body.listType;
    let sort = req.body.sortby;

    let filter = null;
    if (req.body.filter){
        let jsonFilter= JSON.parse(req.body.filter);
        filter = q.fromObject(jsonFilter);
    }

    let /*{newTableName:string,  newListType:string}*/ map = await getMappingWebListRedir(ctx, tableName, listType);

    let columnList = req.body.columnList;
    let top = req.body.top;
    let meta = ctx.getMeta(map.newTableName,req);
    let sortMeta = meta.getSorting(listType);

    let dtOriginal = await ctx.dbDescriptor.createTable(map.newTableName);
    let colList = Object.keys(dtOriginal.columns);
    if (!colList.length){
        res.send(401,"La tabella/vista "+map.newTableName+" non esiste sul server (getPagedTable)");
        return;
    }
    let sortBy = sort;
    if (!sortBy){
        sortBy = sortMeta;
    }
    if (!sortBy){
        if (dtOriginal.columns["title"]) sortBy="title";
    }
    if (!sortBy){
        sortBy = colList[0]; //any column
    }
    let overallFilter = q.constant(true);
    let staticFilter = meta.getStaticFilter(map.newListType);
    if (staticFilter){
        overallFilter = staticFilter;
    }
    if (filter){
        overallFilter = q.and(overallFilter,filter);
    }
    let totRows = await ctx.dataAccess.selectCount({
        tableName: map.newTableName,
        filter: overallFilter,
        environment: ctx.environment
    });
    let totPages = Math.floor(totRows/nRowPerPage);
    if (totRows % nRowPerPage !== 0){
        totPages+=1;
    }
    let data;
    try {
        if (totPages < 2) {
            data = await ctx.dataAccess.select({
                    tableName: tableName,
                    filter: filter,
                    columns: columnList,
                    orderBy:sortBy});
        }
        else {
           data = await ctx.pooledConn.conn.pagedSelect({
                tableName: tableName,
                filter: filter,
                orderBy: sortBy,
                columns: columnList,
                nRows: top
            });
        }
    }
    catch (err){
        res.status(410).send("Error selecting rows from table: " + tableName);
    }
    //let t = new jsDataSet.DataTable(map.newTableName);
    dtOriginal.loadArray(data, true);
    dtOriginal.orderBy(sortBy);
    await meta.describeColumns(dtOriginal, map.newListType);

    const dtSer = JSON.stringify(dtOriginal.serialize(true));
    res.json({
        dt:dtSer,
        totpage:totPages,
        totrows:totRows
    });

}

let router = express.Router();
router.post('/getPagedTable', asyncHandler(getPagedTable));

module.exports= router;
