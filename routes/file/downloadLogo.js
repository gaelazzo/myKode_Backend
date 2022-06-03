const express = require('express');
const q = require("./../../client/components/metadata/jsDataQuery");
const path = require("path");
const fileUpload = require('express-fileupload');

function downloadLogo(req,res,next){
    let ctx = req.app.locals.context;
    ctx.conn.readSingleValue({tableName:"logo",
        expr:"filename",
        filter:q.eq("idlogo","UNIV")})
        .done(result=>{
            if (!result){
                result.status(410).send("Error reading attachment from table logo");
                return;
            }
            let buffer = new Buffer(result,"base64");
            res.set('Content-disposition', 'attachment; filename=logo');
            res.write(buffer,'binary');
            res.end(null, 'binary');

        })
        .fail(err=>{
            res.status(410).send("Errore interno del server nel recupero file: " + err);
            return;
        });
}

let router = express.Router();
router.get('/downloadLogo', router);


module.exports= router;