const express = require('express');
const  isAnonymousAllowed = require("../data/_AnonymousAllowed");
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
const q = require("./../../client/components/metadata/jsDataQuery");
let DataSetPath = "./../../datasets";
const asyncHandler = require('express-async-handler'); //https://zellwk.com/blog/async-await-express/
const metaModel = require("../../client/components/metadata/MetaModel.js");
const {readFile} = require("fs/promises");
const getDataUtils = require("../../client/components/metadata/GetDataUtils");


const path = require('path');

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let testClientCode = req.query.testClientCode;
    let /*DataSet*/ ds = await ctx.getDataInvoke.createEmptyDataSet("registry","anagrafica");
    ds.name = "dsmeta_registry_anagrafica";
    if (testClientCode === "test1") {
        return res.status(200).send(getDataUtils.getJsonFromJsDataSet(ds,true));
    }

    let getData = ctx.getDataInvoke;
    let filterByEmail = q.like("referencename", "Q%");
    await getData.runSelectIntoTable(ds.tables.registryreference, filterByEmail);

    // ds.tables["registryreference"].Columns["referencename"].ExtendedProperties["Selector"] = "s";
    // ds.tables["registryreference"].Columns["referencename"].ExtendedProperties["SelectorMask"] = "123";
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["IsAutoIncrement"] = "s";
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["PrefixField"] = "PrefixField";
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["MiddleConst"] = "MiddleConst";
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["MySelector"] = "cu,lt";
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["MySelectorMask"] = "456,789";
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["minimumTempValue"] = 1;
    // ds.tables["registryreference"].Columns["idreg"].ExtendedProperties["IDLength"] = 12;
    //
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["IsAutoIncrement"] = "s";
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["PrefixField"] = "PrefixField";
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["MiddleConst"] = "MiddleConst";
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["MySelector"] = "cu,lt";
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["MySelectorMask"] = "456,789";
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["minimumTempValue"] = 1;
    // ds.tables["registryreference"].Columns["email"].ExtendedProperties["IDLength"] = 12;

    // campo expression stringa
    metaModel.columnExpression(ds.tables["registryreference"].columns["txt"],"registryreference.lu");
    // campo expression MetaExpression
    let f1 = q.field("iterweb");
    let c1 = q.constant(2);
    metaModel.columnExpression(ds.tables["registryreference"].columns["faxnumber"], q.eq(f1, c1));

    let datat = ds.tables["registryreference"];
    let r = datat.rows[0];
    r["flagdefault"] = "N";
    r["referencename"] = "Luigi";
    //Ci sono 6 righe ove referencename like riccardo%. La prima riga è modified (flagdefault,referencename) , la 3a è deleted, l'ultima è added
    //AGGIUNGO UNA NUOVA RIGA ALLA TABELLA

    let row = datat.newRow();

    row["referencename"] = "Riccardo";
    row["idreg"] = 10000;
    row["idregistryreference"] = 100;
    row["cu"] = "assistenza";
    row["lt"] = new Date();
    row["lu"] = "assistenza";
    row["ct"] = new Date();
    let tRegRef  = ds.tables["registryreference"];

    tRegRef.autoIncrement("referencename", {
        selector:["s"],
        selectorMask:[123],

    });

    tRegRef.autoIncrement("idreg", {
        selector:["referencename","cu","lt"],
        selectorMask:["123","456","789"],
        linearField:false,
        minimum:1,
    });

    tRegRef.autoIncrement("email", {
        selector:["referencename", "cu","lt"],
        selectorMask:["123","456","789"],
        prefixField:"PrefixField",
        middleConst:"MiddleConst",
        linearField:false,
        minimum:1,
        idLen:12
    });

    //RIMUOVO UNA RIGA DALLA TABELLA
    datat.rows[2].getRow().del();

    return res.status(200).send(getDataUtils.getJsonFromJsDataSet(ds,true));

}


let router = express.Router();
router.get('/getDataSetTest', asyncHandler(middleware));


module.exports= router;