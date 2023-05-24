const express = require('express');
const  isAnonymousAllowed = require("../data/_AnonymousAllowed");
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
let DataSetPath = "./../../datasets";
const asyncHandler = require('express-async-handler'); //https://zellwk.com/blog/async-await-express/
const metaModel = require("../../client/components/metadata/MetaModel.js");
const {readFile} = require("fs/promises");
const getDataUtils = require("../../client/components/metadata/GetDataUtils");

const path = require('path');
const q = require("../../client/components/metadata/jsDataQuery");

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let filter = getDataUtils.getJsDataQueryFromJson(req.body.filter);
    let sqlFilter = filter.toSql(ctx.formatter,ctx.environment);
    res.status(200).send(sqlFilter);
}


let router = express.Router();
router.post('/fromJsDataQueryToSql', asyncHandler(middleware));


module.exports= router;
