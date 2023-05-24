const express = require('express');
let router = express.Router();
const asyncHandler = require("express-async-handler");
const DBList = require("../../src/jsDbList");
let AuthUtils = require("../auth/_autUtils");
const nodemailer = require('nodemailer');
const Token = require("./../../src/jsToken").Token;


async function sendMail(req,res,next){
    let ctx = req.app.locals.context;
    if (!req.body.emailDest){
        res.status(200).send("Errore: non sono presenti indirizzi mail a cui inviare la mail");
        return;
    }
    if (!req.body.htmlBody){
        res.send(400, "No mail body");
        return;
    }
    if (!req.body.subject){
        res.send(400, "No subject");
        return;
    }
    let emailDest = req.body.emailDest;
    let htmlBody = req.body.htmlBody;
    let subject = req.body.subject;


    let smtpserver = ctx.config.smtpserver;
    let smtpport = parseInt(ctx.config.smtpport);
    let smtpuser = ctx.config.smtpuser;
    let smtppwd = ctx.config.smtppwd;
    if (smtppwd) {
        let obj=Token.prototype.decode(smtppwd);
        smtppwd = Token.prototype.decode(smtppwd).dbPassword;
    }

    let  transporter = nodemailer.createTransport({
        host: smtpserver,
        port: smtpport,
        secure: false,
        auth: {
            user: smtpuser,
            pass: smtppwd,
            authMethod: (smtpport===25)?"PLAIN": undefined
        },
    });

    // Opzioni per la mail
    const mailOptions = {
        from: smtpuser,
        to: emailDest.split(';'),
        subject: subject,
        html: htmlBody,
    };

    // Invio della mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //console.error('Errore nell\'invio della mail:', error);
            res.status(200).send(error);
        } else {
            //console.log('Mail inviata con successo:', info.response);
            res.status(200).send(info.response);
        }
    });
}


router.post('/sendMail', asyncHandler(sendMail));

module.exports = router;
