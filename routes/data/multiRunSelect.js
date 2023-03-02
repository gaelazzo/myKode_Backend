const express = require('express');
const q = require('./../../client/components/metadata/jsDataQuery');
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
const multiSelect = require('./../../src/jsMultiSelect');
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");

function multiRunSelect(req,res,next){
    let ctx = req.app.locals.context;
    let selBuilderJson = getDataUtils.getJsObjectFromJson(req.body.selBuilderArr);
    let ds = new jsDataSet.DataSet("temp");
    let selectList = selBuilderJson.arr
        .map( s => {
            let jsonFilter= getDataUtils.getJsObjectFromJson(s.filter);
            let t = ds.newTable(s.tableName);
            t.deSerialize(s.table);
            return new multiSelect.Select(t.columnList())
                    .from(s.tableName)
                    .where(q.fromObject(jsonFilter))
                    .top(s.top);
        });

    ctx.dataAccess.mergeMultiSelect(selectList, ds, ctx.environment)
        .then(()=> res.send(getDataUtils.getJsonFromJsDataSet(ds,false)))
        .fail(err=> res.status(410).send("multiRunSelect: Error selecting tables "+err));
}

let router = express.Router();
router.post('/multiRunSelect', multiRunSelect);

module.exports= router;
