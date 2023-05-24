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
    let filter = getDataUtils.getJsDataQueryFromJson(req.body.dquery);

    let errs = [];
    q.checkForUndefined(filter,errs);
    if (errs.length>0){
        errs = errs.map(s=>"Tabella "+s);
        return res.status(410).send("FilterWithUndefined$__$"+errs.join(" - "));
    }

    res.status(200).send(getDataUtils.getJsonFromJsDataQuery(filter));

}


let router = express.Router();
router.post('/getJsDataQuery', asyncHandler(middleware));


module.exports= router;
