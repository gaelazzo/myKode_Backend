const express = require('express');
let router = express.Router();
const asyncHandler = require("express-async-handler");
const DBList = require("./../../src/jsDbList");
let AuthUtils = require("./_autUtils");
const _ = require("lodash");
const q = require("./../../client/components/metadata/jsDataQuery");
const {PostData} = require("../../src/jsPostData");
const jsDataSet = require("./../../client/components/metadata/jsDataSet");
const {stat} = require("fs/promises");
const jsPassword = require("./../../src/jsPassword");

async function resetPassword(req,res,next) {
    let ctx = req.app.locals.context;
    if (!req.query.email) {
        res.send(400, "Email required");
        return;
    }
    let email = req.query.email;

    // 1. da virtual user ricerco per mail e recupero username
    let data =   await ctx.dataAccess.select({tableName:"virtualuser",filter: q.eq("email",email)});
    if (!data || data.length===0){
        // se non trovo mail, mando ad ogni modo messaggio. Per sicurezza non possiamo dire mail non esistente
        res.send("Invio mail completato.");
        return;
    }
    let dr = data[0];
    let userName= dr["username"];

    //2. tramite username recupero riga su registryreference, sulla quale dovrò aggiornare nuova pwd
    let registryreference =   await ctx.dataAccess.select({tableName:"registryreference",
        filter: q.eq("userweb",userName)});

    if (registryreference.length===0){
        res.send(401,"Invalid email");
        return ;
    }
    let idregistryreference = registryreference[0]["idregistryreference"];

    // 3. creo token . inserisco su tabella dei token
    let now = new Date();
    const iterations = now.getMilliseconds() * now.getSeconds() + 10;
    var password = jsPassword.generatePassword();
    var salt = jsPassword.generateSalt();
    var hash = jsPassword.generateHash(password, salt, iterations);


    let d = new jsDataSet.DataSet("d");

    let /* DataSet */ dsResetPassword = ctx.getDataSet("resetpassword","admin",ctx);
    let metaAttach= ctx.getMeta("resetpassword");
    let rRP = await metaAttach.getNewRow(null,dsResetPassword.tables["resetpassword"]);
    rRP["idregistryreference"]= idregistryreference;
    rRP["token"]= null; //TODO hash.toHexString()
    rRP["date"]= new Date();
    rRP["status"]= 0;

    let postData = ctx.createPostData();
    await postData.init(dsResetPassword);
    //returns  {canIgnore:boolean, checks:BasicMessage[], data:DataSet}
    let messages = await postData.doPost();
    if (messages.checks.length>0){
        //Bad Request
        return res.status(500).send("Data server error");
    }

    // 4. preparo link ed invio mail
    // try {
    //     String parameters = "?tokenresetpwd=" + hash.toHexString();
    //     var frontendSSO = WebConfigurationManager.AppSettings.Get("frontendSSO") + parameters;
    //     sendEmail(email, frontendSSO);
    // }
    // catch (Exception ex) {
    //     #if DEBUG
    //     Debug.WriteLine(ex.Message);
    //     Debug.WriteLine(ex.StackTrace);
    //
    //     if (ex.InnerException != null) {
    //         Debug.WriteLine(ex.InnerException.Message);
    //         Debug.WriteLine(ex.InnerException.StackTrace);
    //     }
    //     #endif
    //
    //     return Content(HttpStatusCode.InternalServerError, "Invio dell'e-mail di attivazione fallito.");
    // }
}


router.get('/resetPassword', asyncHandler(resetPassword));

module.exports = router;
