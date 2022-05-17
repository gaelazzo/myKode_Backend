const express = require('express');

const path = require('path');
const q = require('jsDataQuery');
let uploadPath = "Uploads/";

function download(req,res,next){
    let ctx = req.app.locals.context;
    let idattach= req.query.idattach;

    ctx.dataAccess.readSingleValue({tableName:"attach",
        expr:"filename",
        filter:q.eq("idattach",idattach)})
        .done(filename=>{
            if (!filename){
                res.status(410).send("Error reading attachment from table logo");
                return;
            }
            res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-Transfer-Encoding', 'binary');
            res.setHeader('Content-Type', 'application/octet-stream');

            var options = {
                root: path.join(__dirname,  '..', '..', uploadPath)
            };
            let filepath = path.join(uploadPath, filename);
            res.sendFile(filename, options);
        })
        .fail(err=>{
            res.status(410).send("Errore interno del server nel recupero file: " + err);
        });
}

let router = express.Router();
router.get('/download', download);



module.exports= router;
