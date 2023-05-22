const Path = require("path");
const DataSet = require("./../../client/components/metadata/jsDataSet").DataSet;
const fs = require('fs');
const isAnonymousAllowed = require("../data/_AnonymousAllowed");
const express = require("express");
const asyncHandler = require("express-async-handler");
const q = require("./../../client/components/metadata/jsDataQuery");
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");
const _ = require("lodash");

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let tableName = req.body.tableName;
    let editType = req.body.editType;
    let jsonFilter= getDataUtils.getJsObjectFromJson(req.body.filter);
    let filter = q.fromObject(jsonFilter);

    if (!isAnonymousAllowed(req, tableName,editType)){
        res.status(400).send("Anonymous not permitted, dataset "+tableName+" "+editType);
        return;
    }
    let /*DataSet*/ ds = await ctx.getDataInvoke.createEmptyDataSet( tableName,editType);
    await ctx.getDataInvoke.fillDataSet(ds,tableName,editType,filter);

    _.forOwn(ds.tables, t=> {if (t.rows.length===0){ ds.removeTable(t);}});

    res.json(getDataUtils.getJsonFromJsDataSet(ds,false));
}

let router = express.Router();
router.post('/fillDataSet', asyncHandler(middleware));

module.exports= router;

