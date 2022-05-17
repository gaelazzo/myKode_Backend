const express = require('express');
const q = require('jsDataQuery');
const asyncHandler = require("express-async-handler");
//const {unlink,readDir,readFile,stat} = require("fs/promises");


async function selectCount(req,res,next){
    let ctx = req.app.locals.context;
    let getDataInvoke = ctx.getDataInvoke;
    let jsonFilter= JSON.parse(req.body.filter);
    let filter = q.fromObject(jsonFilter);
    let tableName = req.body.tableName;
    try {
        let count = await getDataInvoke.selectCount(tableName, filter);
        res.json(count);
    } catch (err) {
        res.status(410).send("Error counting rows from table: " + tableName);
    }
}

let router = express.Router();
router.post('/selectCount', asyncHandler(selectCount));

module.exports= router;
