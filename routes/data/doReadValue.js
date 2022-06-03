const express = require('express');
const q = require('./../../client/components/metadata/jsDataQuery');
const asyncHandler = require("express-async-handler");

async function doReadValue(req,res,next){
    let ctx = req.app.locals.context;
    let getDataInvoke = ctx.getDataInvoke;

    let jsonFilter= JSON.parse(req.body.filter);
    let filter = q.fromObject(jsonFilter);
    let table = req.body.table;
    let expr = req.body.expr;
    let orderby = req.body.orderby;

    try {
        let val = await getDataInvoke.doReadValue(table,filter,expr,orderby);
        res.send(val);
    } catch (err) {
        res.status(410).send("Error reading value from table: " + table+" "+err);
    }
}

let router = express.Router();
router.post('/doReadValue', asyncHandler(doReadValue));

module.exports= router;
