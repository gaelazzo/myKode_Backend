const express = require('express');
const q = require('./../../client/components/metadata/jsDataQuery');
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");

//const {unlink,readDir,readFile,stat} = require("fs/promises");
//const asyncHandler = require("express-async-handler");

function select(req,res,next){
    let ctx = req.app.locals.context;
    let filter = null;
    //console.log(req);
    let tableName = req.body.tableName;
    let columnList = req.body.columnList;
    let top = req.body.top;

    if (req.body.filter){
        let jsonFilter= getDataUtils.getJsObjectFromJson(req.body.filter);
        filter = q.fromObject(jsonFilter);
        let errs = [];
        q.checkForUndefined(filter,errs);
        if (errs.length>0){
            errs = errs.map(s=>"Tabella "+tableName+" "+s);
            return res.status(410).send("FilterWithUndefined$__$"+errs.join(" - "));
        }
    }

    ctx.dbDescriptor.createTable(tableName).then(
        (/*DataTable*/ t)=>{
            ctx.dataAccess.select({tableName:tableName,filter: filter,columns:columnList,top:top})
            .then(data=>{ //res is an array of rows with a name
                // to put it in an empty table run table.loadArray(data.rows, true);
                //let t = new jsDataSet.DataTable(tableName);
                if (columnList!==undefined && columnList!=="*"){
                    let cols= {};
                    columnList.split(",").forEach(c=>{
                        cols[c.trim()] = true;
                    });

                    for(let colName in t.columns){
                        if (!t.columns.hasOwnProperty(colName)){
                            continue;
                        }
                        if (!cols[colName]){
                            delete t.columns[colName];
                        }
                    }
                }
                t.loadArray(data,true);
                let tt = t.serialize(true);
                tt.name =tableName;
                res.json(tt);
            })
            .fail(err=>{
                res.status(410).send("Error selecting rows from table: " + tableName+","+err);
            });
        });
}

let router = express.Router();
router.post('/select', select);

module.exports= router;
