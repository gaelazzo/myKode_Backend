const Path = require("path");
const DataSet = require("./../../client/components/metadata/jsDataSet").DataSet;
const fs = require('fs');
const isAnonymousAllowed = require("./_AnonymousAllowed");
const express = require("express");
const asyncHandler = require("express-async-handler");
const q = require("./../../client/components/metadata/jsDataQuery");
const metaModel = require('./../../client/components/metadata/MetaModel');
const _ = require('lodash');
/**
 *
 * @param {DataSet} ds
 * @param {DataTable} mainTable
 * @param {Set} visited
 * @param {Set} toVisit
 */
function recursivelyMarkSubEntityAsVisited(ds, mainTable, visited, toVisit) {
    mainTable.childRelations().forEach(rel=>{
        let childTable = ds.tables[rel.childTable];
        let parentTable = ds.tables[rel.parentTable];
        if (!metaModel.isSubEntityRelation(rel,childTable,parentTable)&&
            metaModel.allowClear(childTable)&&
            visited.has(rel.childTable)) return;
        //Those tables will not be cleared
        visited.add(rel.childTable);
        toVisit.add(rel.childTable);
        recursivelyMarkSubEntityAsVisited(ds, childTable, visited, toVisit);
    });
}


/**
 *
 * @param {DataSet} ds
 * @param {Set} visited
 * @param {Set}  toVisit
 * @param {DataTable} primaryTable
 */
function getVisited(ds, visited, toVisit, primaryTable) {

    //Marks child tables as ToVisit+Visited
    recursivelyMarkSubEntityAsVisited(ds, primaryTable, visited, toVisit);

    _.forEach(ds.tables, t => {
        let childTable = t.name;
        if (!metaModel.allowClear(t)) {
            visited.add(childTable);
            toVisit.add(childTable);
        }
    });
}

///TODO: aggiungere parametro edittype
async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let primaryTableName = req.body.primaryTableName;
    let onlyPeripherals = req.body.onlyPeripherals === "true";
    let jsonFilter= JSON.parse(req.body.filter);
    let filter = q.fromObject(jsonFilter);
    let ds = new DataSet();
    ds.deSerialize(JSON.parse(req.body.ds), true);

    if (!isAnonymousAllowed(req, primaryTableName,"default")){
        res.status(400).send("Anonymous not permitted, dataset "+primaryTableName+" "+"default");
        return;
    }
    let /*DataTable*/ dt = ds.tables[primaryTableName];
    let drr = dt.select(filter);
    if (drr.length === 0){
        return res.status(400).send("No rows found");
    }
    let /*DataRow*/ dr = drr[0].getRow();
    await ctx.getDataInvoke.doGet(ds, dr, primaryTableName, onlyPeripherals);

    // la risposta non restituisce le righe delle tab principale  e subentità perchè nel caso di onlyPeripherals non serve
    // serve in input al backend per il calcolo esatto delle righe nelle tabelle periferiche , ma al ritorno evito di serializzarle
    // poichè il client già le ha.
    let visited = new Set();
    let toVisit = new Set();
    if (onlyPeripherals) {
        getVisited(ds, visited, toVisit, dt);
        visited.forEach(s=>{
            ds.tables[s].clear();
        });
    }
    res.json(ds.serialize(true));

}


let router = express.Router();
router.post('/doGet', asyncHandler(middleware));

module.exports= router;

