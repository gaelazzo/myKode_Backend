const express = require('express');
const  isAnonymousAllowed = require("../data/_AnonymousAllowed");
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
let DataSetPath = "./../../datasets";
const asyncHandler = require('express-async-handler'); //https://zellwk.com/blog/async-await-express/
const metaModel = require("../../client/components/metadata/MetaModel.js");
const {readFile} = require("fs/promises");
const getDataUtils = require("../../client/components/metadata/GetDataUtils");


const path = require('path');

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let dsObj = req.body.ds;
    if (dsObj === undefined) {
        res.status(400).send("Specificare un json di un dataset");
    }
    let ds = getDataUtils.getJsDataSetFromJson(dsObj);
    let outDs = getDataUtils.getJsonFromJsDataSet(ds,true);

    res.status(200).send(outDs);

}


let router = express.Router();
router.post('/fromJsDataSetToDataset', asyncHandler(middleware));


module.exports= router;


