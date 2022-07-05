const express = require('express');
/*
                return appMeta.callWebService("adminregisteruser",
								{
									login: $("#registrationuser_auth_login").val(),
									password: '',
									passwordweb: '',
									surname: $("#registrationuser_auth_surname").val(),
									forename: $("#registrationuser_auth_forename").val(),
									cf: $("#registrationuser_auth_cf").val(),
									email: $("#registrationuser_auth_email").val(),
									codeflowchart: codeflowchart,
									esercizio: (new Date()).getFullYear(),
									usertype: $("#registrationuser_auth_usertype option:selected").text(),
									matricola: $("#registrationuser_auth_matricola").val(),
									userkind : that.state.currentRow.userkind,
									idregistrationuser: that.state.currentRow.idregistrationuser
								})
								.then(function (res) {
									var err  = res.err;
									msg = res.msg;
									// è andata a buon fine
									if (err === 0) {
										that.state.currentRow.idregistrationuserstatus = 2;
										that.state.currentRow.getRow().acceptChanges();
										msg = "Registrazione eseguita con successo. Utente autorizzato. <br><br>" + msg;
										return that.freshForm(true, false)
									}
									return true;
 */


/**
 *
 * @param req
 * @param res
 * @param next
 */
function middleware(req,res,next){
    if (req.body.userkind === "3" && !req.body.passwordweb){
        res.json(
            {err:1,
             msg:"A password is requested"
        });
        return;
    }

    let codeFlowchartList = req.body.codeflowchart.split(';');
    //... to continue


}

let router = express.Router();
router.get('/adminregisteruser', middleware);


module.exports= router;