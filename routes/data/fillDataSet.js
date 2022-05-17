const Path = require("path");
const DataSet = require("jsDataSet").DataSet;
const fs = require('fs');
const isAnonymousAllowed = require("../data/_AnonymousAllowed");
const express = require("express");
const asyncHandler = require("express-async-handler");
const q = require("jsDataQuery");

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let tableName = req.query.tableName;
    let editType = req.query.editType;
    let jsonFilter= JSON.parse(req.query.filter);
    let filter = q.fromObject(jsonFilter);

    if (!isAnonymousAllowed(req, tableName,editType)){
        res.status(400).send("Anonymous not permitted, dataset "+tableName+" "+editType);
        return;
    }
    let /*DataSet*/ ds = await ctx.getDataInvoke.createEmptyDataSet( tableName,editType);
    await ctx.getDataInvoke.getDataSet(tableName,editType);

    res.json(ds.serialize());
}

let router = express.Router();
router.get('/fillDataSet', asyncHandler(middleware));

module.exports= router;

