const isAnonymousAllowed = require("../data/_AnonymousAllowed");
const express = require("express");
const asyncHandler = require("express-async-handler");
const q = require("jsDataQuery");
const GetData = require("../../src/jsGetData");
const attachUtils = require("./../../client/components/metadata/_attachmentutils");


async function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let tableName = req.body.tableName;
    let editType = req.body.editType;

    if (!isAnonymousAllowed(req, tableName,editType)){
        res.status(400).send("Anonymous not permitted, dataset "+tableName+" "+editType);
        return;
    }

    let jsonFilter= JSON.parse(req.body.filter);
    let filter = q.fromObject(jsonFilter);

    let /*DataSet*/ ds = await ctx.getDataInvoke.createEmptyDataSet(tableName, editType);


    await ctx.getDataInvoke.readCached(ds);

    await  ctx.getDataInvoke.runSelectIntoTable(ds.tables[tableName],filter,null);

    if (!ds.tables[tableName].rows.length){
        res.send(200,"No rows found in table "+tableName+" with filter "+filter);
    }

    await GetData.doGet(ctx, ds.tables[tableName], false,null);

    await attachUtils.sanitizeDsForAttach(ds, ctx);

    res.json(ds.serialize(true));

}


let router = express.Router();
router.post('/getDsByRowKey', asyncHandler(middleware));


module.exports= router;
