const express = require('express');
const q = require('jsDataQuery');
const jsDataSet = require("jsDataSet");
const multiSelect = require('./../../src/jsMultiSelect');

function multiRunSelect(req,res,next){
    let ctx = req.app.locals.context;
    let selBuilderJson = JSON.parse(req.body.selBuilderArr);
    let ds = new jsDataSet.DataSet("temp");
    let selectList = selBuilderJson.arr
        .map( s => {
            let jsonFilter= JSON.parse(s.filter);
            let t = ds.newTable(s.tableName);
            t.deSerialize(s.table);
            return new multiSelect.Select(t.columnList())
                    .from(s.tableName)
                    .where(q.fromObject(jsonFilter))
                    .top(s.top);
        });

    ctx.dataAccess.mergeMultiSelect(selectList, ds, ctx.environment)
        .then(()=> res.send(JSON.stringify(ds.serialize(true))))
        .fail(err=> res.status(410).send("multiRunSelect: Error selecting tables "+err));
}

let router = express.Router();
router.post('/multiRunSelect', multiRunSelect);

module.exports= router;
