const express = require('express');

function middleware(req,res,next){

}

let router = express.Router();
router.get('/adminregisteruser', middleware);


module.exports= router;