const express = require('express');
let router = express.Router();
const asyncHandler = require("express-async-handler");
const DBList = require("./../../src/jsDbList");
let AuthUtils = require("./_autUtils");
const _ = require("lodash");

const intervalCleaningMinutes = 300;
/// <summary>
/// Interval in minutes that indicates the duration of the sessionInfo
/// </summary>
const  durationSessionLastDateMinutes = 180; // 1.30h
/// <summary>
/// Interval in minutes that indicates the duration of the SSO token. it is very small interbvakl
/// </summary>
const durationSessionLoginSSO = 60;

/*{SessionInfoSSO*/
let sessionInfosSSO = {};

/**
 *
 * @param {string} userName
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} cf
 * @constructor
 */
function SessionInfosSSO(userName,name,surname,email,cf){
    this.userName=userName;
    this.name=name;
    this.surname=surname;
    this.email=email;
    this.cf=cf;
    this.createdAt=AuthUtils.today();
}
SessionInfosSSO.prototype= {
    constructor:SessionInfosSSO
};

async function loginSSO(req,res,next){
    let ctx = req.app.locals.context;
    if (!req.body.userName){
        res.send(400,"No Credential");
        return;
    }
    if (!req.body.session){
        res.send(400,"No Credential");
        return;
    }
    if (!req.body.datacontabile){
        res.send(400,"Missing AccountDate");
        return;
    }

    let sessionInfo= validSessionSSO(req.body.session,req.body.userName);
    if (!sessionInfo){
        res.send(400,"No Credential");
        return;
    }


    let dbInfo = DBList.getDbInfo(ctx.dbCode);
    let userkind =  dbInfo.userKindSSO;
    await AuthUtils._doLogin(res, req.body.userName,
                            req.body.password,
                            req.body.datacontabile,
        null, userkind, req,res);
}


/**
 * Check that a session SSO exists.
 * @remarks Should also check the IP request
 * @param session
 * @param userName
 * @return {null|*}
 */
function validSessionSSO(session, userName){
    try {
        if (sessionInfosSSO[session]) {
            // sessione ok
            let /*DateTime*/ created =sessionInfosSSO[session].createdAt;
            let /*DateTime*/ after60Min = new Date(created.getTime() + 60*60000);
            if (after60Min.getTime() > new Date().getTime() &&
                sessionInfosSSO[session].userName === userName) {
                let copy = _.cloneDeep(sessionInfosSSO[session]);
                // removes SSO session
                delete sessionInfosSSO[session];
                return copy;
            }
        }
        return null;
    }
    catch {
        return null;
    }
}

/* solo per test veloce su ambiente di test karma + jquery*/
router.get('/dummy', (req,res,next) => {
    return res.status(200).json({result: 'ok'});
});


router.post('/loginSSO', asyncHandler(loginSSO));

module.exports = router;
