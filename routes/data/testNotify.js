const express = require('express');
const q = require('./../../client/components/metadata/jsDataQuery');
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
const getDataUtils = require("./../../client/components/metadata/GetDataUtils");

function testNotify(req,res,next){
    let ctx = req.app.locals.context;
    let value = parseInt(req.query.p1);
    let o = [];
    for (let i = 0; i < 5; i++) {
        o.push(i + value);
    }

    res.status(200).json(o);
}


let router = express.Router();
router.get('/testNotify', testNotify);

module.exports= router;
