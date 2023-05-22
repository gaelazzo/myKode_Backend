const express = require('express');
const asyncHandler = require('express-async-handler'); //https://zellwk.com/blog/async-await-express/
const q = require("./../../client/components/metadata/jsDataQuery");
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");


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
        let jsonFilter = getDataUtils.getJsObjectFromJson(req.body.filter);
        filter = q.fromObject(jsonFilter);
    }

    let /*{newTableName:string,  newListType:string}*/ map = await getMappingWebListRedir(ctx, tableName, listType);

    let columnList = req.body.columnList;
    if (!columnList) columnList = "*";

    let meta = ctx.getMeta(map.newTableName, req);
    let sortMeta = meta.getSorting(listType);

    let dtOriginal = null;
    try{
        dtOriginal = await ctx.dbDescriptor.createTable(map.newTableName);
    }
    catch (e){
        return res.send(401,"La tabella/vista "+map.newTableName+" non esiste sul server (getPagedTable)");
    }
    let colList = Object.keys(dtOriginal.columns);
    if (!colList.length){
        return res.send(401,"La tabella/vista "+map.newTableName+" non esiste sul server (getPagedTable)");
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
                    tableName: map.newTableName,
                    filter: filter,
                    columns: columnList,
                    orderBy:sortBy});
        }
        else {
           let firstRow = (nPage - 1) * nRowPerPage + 1;
           data = await ctx.pooledConn.conn.pagedSelect({
                tableName: map.newTableName,
                filter: filter,
                orderBy: sortBy,
                columns: columnList,
                top: nRowPerPage,
                firstRow: firstRow
            });
        }
    }
    catch (err){
        return res.status(410).send("Error selecting rows from table: " + tableName+", error:"+err);
    }
    //let t = new jsDataSet.DataTable(map.newTableName);
    dtOriginal.loadArray(data, false);
    dtOriginal.orderBy(sortBy);
    await meta.describeColumns(dtOriginal, map.newListType);

    if (dtOriginal.key().length===0){
        let k = meta.primaryKey();
        if (k.length===0){
            let metaBase = ctx.getMeta(tableName, req);
            k = metaBase.primaryKey();
            let errMess=null;
            k.forEach(f=>{
               if (!dtOriginal.columns[f]){
                   errMess="Key Field "+f+" of "+tableName+" is not a field of "+tableName+
                       ". It's necessary to define the key in metadata of "+tableName;
               }
            });
            if (k.length===0){
                errMess="It's necessary to define the key in metadata of "+tableName+
                    " or "+map.newTableName;
            }
            if (errMess) {
                return res.status(410).send(errMess);
            }
        }
        dtOriginal.key(k);
    }
    const dtSer =getDataUtils.getJsonFromDataTable(dtOriginal);
    res.json({
        dt:dtSer,
        totpage:Number(totPages.toFixed(0)),
        totrows:totRows
    });

}

let router = express.Router();
router.post('/getPagedTable', asyncHandler(getPagedTable));

module.exports= router;
