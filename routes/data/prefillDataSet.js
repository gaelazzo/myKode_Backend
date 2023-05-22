const isAnonymousAllowed = require("../data/_AnonymousAllowed");
const express = require("express");
const asyncHandler = require("express-async-handler");
const q = require("./../../client/components/metadata/jsDataQuery");
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");
const _ = require("lodash");
const multiSelect = require("../../src/jsMultiSelect");

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let tableName = req.body.tableName;
    let editType = req.body.editType;

    if (!isAnonymousAllowed(req, tableName,editType)){
        res.status(400).send("Anonymous not permitted, dataset "+tableName+" "+editType);
        return;
    }

    let /*DataSet*/ ds = await ctx.getDataInvoke.createEmptyDataSet( tableName,editType);
    let selList = [];

    //array of key/value pairs. key:tableName, value:filter jsDataQuery serialized in json
    let pairTableFilter = getDataUtils.getJsObjectFromJson(req.body.pairTableFilter);
    _.forOwn(pairTableFilter, (value,tableName) =>{
        let t = ds.tables[tableName];
        selList.push( new multiSelect.Select(t.columnList()).
                        from(tableName).
                        where(q.fromObject( getDataUtils.getJsObjectFromJson(value))));

            /*
            {
                table:ds.tables[tableName],
                top:null, //s.top,
                isOptimized:true,
                tableName:tableName,
                filter:q.fromObject( getDataUtils.getJsObjectFromJson(value))  //p.filter
            }
            */

    });

    ctx.dataAccess.mergeMultiSelect(selList, ds, ctx.environment) //ctx.app.locals.environment
        .then(()=>{
            _.forOwn(ds.tables, t=> {if (t.rows.length===0){ ds.removeTable(t);}});
            //dovrebbe essere equivalente a  res.send(JSON.stringify(ds.serialize()));
            res.json(getDataUtils.getJsonFromJsDataSet(ds,false));
        })
        .fail(err=>{
            res.status(410).send("multiRunSelect: Error selecting tables "+err);
        });
}


let router = express.Router();
router.post('/prefillDataSet', asyncHandler(middleware));


module.exports= router;

