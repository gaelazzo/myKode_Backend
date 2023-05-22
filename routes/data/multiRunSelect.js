const express = require('express');
const q = require('./../../client/components/metadata/jsDataQuery');
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
const multiSelect = require('./../../src/jsMultiSelect');
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");
const _ = require("lodash");

function multiRunSelect(req,res,next){
    let ctx = req.app.locals.context;
    let selBuilderJson = getDataUtils.getJsObjectFromJson(req.body.selBuilderArr);
    let ds = new jsDataSet.DataSet("temp");
    let errs = [];
    let selectList = selBuilderJson.arr
        .map( s => {
            let jsonFilter= getDataUtils.getJsObjectFromJson(s.filter);
            let filter= q.fromObject(jsonFilter);
            let errs2=[];
            q.checkForUndefined(filter,errs2);
            errs2.forEach(ss=>errs.push("Tabella "+s.tableName+" "+ss));

            let t = ds.newTable(s.tableName);
            t.deSerialize(s.table);
            return new multiSelect.Select(t.columnList())
                    .from(s.tableName)
                    .where(q.fromObject(jsonFilter))
                    .top(s.top);
        });
    if (errs.length>0){
        let error  ="FilterWithUndefined$__$"+errs.join(" - ");
        return res.status(410).send(error);
    }


    ctx.dataAccess.mergeMultiSelect(selectList, ds, ctx.environment)
        .then(()=>{
            _.forOwn(ds.tables, t=> {if (t.rows.length===0){ ds.removeTable(t);}});
            return res.send(getDataUtils.getJsonFromJsDataSet(ds,false));
          })
        .fail(err=> res.status(410).send("multiRunSelect: Error selecting tables "+err));
}

let router = express.Router();
router.post('/multiRunSelect', multiRunSelect);

module.exports= router;
