const express = require('express');
const  isAnonymousAllowed = require("../data/_AnonymousAllowed");
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
let DataSetPath = "./../../datasets";
const asyncHandler = require('express-async-handler'); //https://zellwk.com/blog/async-await-express/
const metaModel = require("./../../client/components/metadata/MetaModel");
const {readFile} = require("fs/promises");
const q = require("./../../client/components/metadata/jsDataQuery");
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");


async function getSpecificChild(req,res,next){
    let ctx = req.app.locals.context;

    let startfield = req.body.startfield;
    let startval = req.body.startval;

    let jsonFilter= getDataUtils.getJsDataQueryFromJson(req.body.startconditionfilter);

    let startCondition = jsonFilter;

    let t = getDataUtils.getJsDataTableFromJson(req.body.dt);

    await ctx.dataAccess.selectIntoTable({
        table:t,
        filter: startCondition,
        environment:ctx.environment,
    });

    let drOut= null;
    let strFilterOut = null;
    if (t.rows.length!==0){
        drOut = t.rows[0];
        strFilterOut = q.toObject(t.keyFilter(drOut));
    }

    res.json({dt: t.serialize(true),
        filter:strFilterOut
            });

}

let router = express.Router();
router.post('/GetSpecificChild', asyncHandler(getSpecificChild));

module.exports= router;
