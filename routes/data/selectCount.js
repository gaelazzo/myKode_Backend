const express = require('express');
const q = require('./../../client/components/metadata/jsDataQuery');
const asyncHandler = require("express-async-handler");
//const {unlink,readDir,readFile,stat} = require("fs/promises");


async function selectCount(req,res,next){
    //console.log("Request received");
    //console.log(req);
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
