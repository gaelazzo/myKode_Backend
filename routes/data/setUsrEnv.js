const express = require("express");

function middleware(req,res,next){
    let ctx = req.app.locals.context;
    let key = req.body.key;
    let value = req.body.value;
    ctx.environment.usr(key,value);
    res.send(200, ctx.environment.usr(key));
}

let router = express.Router();
router.post('/setUsrEnv', middleware);

module.exports= router;
