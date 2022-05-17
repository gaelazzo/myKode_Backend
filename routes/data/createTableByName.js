const isAnonymousAllowed = require("../data/_AnonymousAllowed");
const express = require("express");
const asyncHandler = require("express-async-handler");
const _ = require("lodash");

async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let tableName = req.query.tableName;
    let columnList = req.query.columnList;

    if (!isAnonymousAllowed(req, tableName,"default",)){
        res.status(400).send("Anonymous not permitted, dataset "+tableName+" default");
        return;
    }
    let /*DataTable*/ t = await ctx.dbDescriptor.createTable(tableName);
    if (columnList && columnList!=="*"){
        let columns = columnList.split(",");
        let set= new Set();
        _.forEach(columns,col=>{
            set.add( col.trim());
        });
        _.forOwn(t.columns,(col,colName)=>{
           if (! set.has(colName)){
               if (t.isKey(colName))return;
               delete t.columns[colName];
           }
        });
    }

    res.json(t.serialize(true));
}

let router = express.Router();
router.get('/createTableByName', asyncHandler(middleware));


module.exports= router;
