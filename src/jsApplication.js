const DBList = require("./jsDbList");
const DataAccess = require("./jsDataAccess");
const Deferred = require("JQDeferred");
const JsConnectionPool = require('./JsConnectionPool').JsConnectionPool;
const JsPooledConnection = require('./JsConnectionPool').JsPooledConnection;
const Context = require('./jsDbList').Context;
const Environment = require('./jsEnvironment');
const PostData = require('./jsPostData').PostData;
const Express = require('express');
const Path = require("path");
const fs = require("fs");
const checkToken = require("./jsToken").checkToken;
let Identity = require("./jsToken").Identity;
const getIdentityFromRequest= require("./jsToken").getIdentityFromRequest;
let createServicesRoutes = require('./jsExpressApplication').createServicesRoutes;
let createExpressApplication =  require('./jsExpressApplication').createExpressApplication;
const tokenConfig = require("./../config/tokenConfig");
const Token = require("./jsToken").Token;
const securityProvider= require("./jsSecurity");
const LocalResource= require("./../client/components/metadata/LocalResource");
const GetMeta= require("./../client/components/metadata/GetMeta");
const GetDataInvoke= require("./../client/components/metadata/GetDataInvoke");
const dsNameSpace = require("./../client/components/metadata/jsDataSet");
const OptimisticLocking = dsNameSpace.OptimisticLocking;
const commonGetDataSet =require("./../client/components/metadata/GetDataSet");
const jsBusinessLogic = require("../src/jsBusinessLogic");
let BusinessPostData =jsBusinessLogic.BusinessPostData;

function JsApplication() {
    this.expressApplication = createExpressApplication();
    this.expressApplication.locals.JsApplication= this; //every expressApplication is attached to a JsApplication

    this.router = Express.Router();
    this.pool=null;

    /**{{ Environment }} */
    this.environments={};

    /* Security */
    this.security=null;
}


JsApplication.prototype = {
    constructor: JsApplication,

    /**
     * Creates the connection pool, it is supposed to be overriden in derived classes
     * @param {string} dbCode
     * @returns {JsConnectionPool}
     */
    createConnectionPool: function(dbCode){
        return new JsConnectionPool(dbCode);
    },

    getApp: function (){
        return this.expressApplication;
    },
    getRouter: function (){
        return this.router;
    },

    //this must return the list of all folders containing routers that do not need authentication
    getNoTokenFolders: function(){
        return {
            "auth":true
        };
    },

    error: function (err,req,res,next){
        res.status(401).json({
            error: err.stack
        });
    },


    /**
     * releases the pool connection after a request has been processed
     * @param req
     * @param ctx
     */
    releaseConnection: function(req, res, ctx) {
        let released=false;
        res.on('close', () => {
            if (released){
                return;
            }
            released=true;
            //let ctx = req.app.locals.context;
            ctx.pooledConn.release();
        });

        res.on('finish', () => {
            if (released){
                return;
            }
            released=true;
            //let ctx = req.app.locals.context;
            ctx.pooledConn.release();
        });
        //next();
    },

    createTestSession: function(req,res,next){
        let token = req[tokenConfig.options.requestProperty]; //default is auth
        if (token) {
            return next();
        }
        let identity= new Identity({
            name:"AZZURRO",
            title:"AZZURRO"
        });

        this.getDataAccess()
            .then(pooledConn=>{
                let conn = pooledConn.getDataAccess();
                return this.createSession(identity, conn);
            })
            .then(environment=>{
                let token = new Token(req,identity);
                token.setInRequest(req);
                next();
            });

        /// creare il token che simuli l'invio da parte di quella identity
        /// valorizzare l'header con il token
    },
    /**
     *
     * @param {string} dbCode
     * @return {Promise}
     */
    init: function (dbCode){
        this.dbCode= dbCode;
        this.pool = this.createConnectionPool(dbCode);
        let noTokenFolders = this.getNoTokenFolders();
        let dbInfo = DBList.getDbInfo(dbCode);
        if (dbInfo.test){
            this.expressApplication.use(this.createTestSession.bind(this));
        }

        //adds all routers of directory routes
        const routes = "routes";
        fs.readdirSync(routes)
            .filter(fileName => fs.lstatSync(`${routes}/${fileName}`).isDirectory()) //takes all folders
            .forEach(folderName => {
                if (noTokenFolders[folderName] === undefined){
                    //check token for any path, with the only exception for those in noTokenFolders
                    this.router.use("/"+folderName+"/", checkToken.bind(this));
                }
                //At this point the token exists if it is required. But not necessarily is bound to a valid session
                this.router.use("/"+folderName+"/", this.getOrCreateContext.bind(this));
                createServicesRoutes(this.router, Path.join("routes",folderName),folderName);
            });

        this.expressApplication.use(this.router);
        this.expressApplication.use(this.error.bind(this));

        let connPool;
        let def = Deferred();
        this.getDataAccess()
            .then(_connPool=>{
                connPool=_connPool;
                return connPool.getDataAccess();
            })
            .then(conn=>{
                this.security= conn.security;
                def.resolve();
            })
            .fail(err=>{
                def.reject(err);
            });
        return  def.promise();
    },



    /**
     * returns an open connection to db
     * @return {Deferred<JsPooledConnection>}
     */
    getDataAccess: function (){
        return  this.pool.getDataAccess().promise();
    },

    /**
     * Meant to be redefined in subclasses, creates an Environment class
     * @param {Identity} identity
     * @param {DataAccess} conn
     * @return {Environment}
     */
    createEnvironment: function (identity, conn){
        return new Environment(identity);
    },

    /**
     * Create a Session for the user represented by the token.
     * @param {Identity} identity
     * @param {DataAccess} conn
     * @return {Promise<Environment>}
     */
    createSession: function (identity, conn){
        let def = Deferred();
        let that=this;
        let env= this.createEnvironment(identity);
        env.load(conn)//evaluate environments from database
            .then(()=>{
                that.environments[identity.sessionID()]=env;
                def.resolve(env);
            })
            .fail(err=> {
                def.reject(err);
            });

        return  def.promise();
    },

    /**
     * Function that must create a PostData class, this is meant to be overridden in derived classes
     * @param {Context} ctx
     * @return {BusinessPostData}
     */
    createPostData: function (ctx){
        let p =  new BusinessPostData(ctx);
        p.setOptimisticLocking( new OptimisticLocking(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']));
        return p;
    },

    /**
     *
     * @param tableName
     * @param editType
     * @return {DataSet}
     */
    getDataSet: function(tableName,editType){
      return commonGetDataSet.getDataSet(tableName,editType);
    },


    getAnonymousEnvironment:function(identity) {
        // TODO create an anonymus envoronment
        return new Environment(identity);
    },

    /**
     * Creates a context object in req.app.local.context. If the token is not provided in the header, creates
     *  an anonymous connection
     * @param {Request} req
     * @param {Response} res
     * @param {Middleware} next
     */
    getOrCreateContext: function  (req, res, next) {
        let token = req[tokenConfig.options.requestProperty]; //default is auth
        //this will create an anonymous identity because req has no token
        let identity = getIdentityFromRequest(req);
        let sessionID = identity.sessionID();
        if (token) {
            let env;
            if (identity.isAnonymous) {
                env = this.getAnonymousEnvironment(identity);
            }
            else {
                env = this.environments[sessionID];
            }

            return this.getContext(req,res,next, env);
        }
        // return res.status(401).json({
        //     error: 'No token'
        // });

        let env = this.getAnonymousEnvironment(identity); //creates an anonymous environment
        this.environments[sessionID] = env;

        return this.getContext(req,res,next, env);
    },

    /**
     * Creates a context and attach it to req.app.local
     * @param pooledConn
     * @param env
     * @param {Request} req
     * @param {Response} res
     * @param {Middleware} next
     */
    createContext: function(pooledConn,env,req,res, next){
        let ctx = new Context();
        ctx.dbCode = this.dbCode;
        ctx.pooledConn = pooledConn;
        ctx.dataAccess = pooledConn.getDataAccess();
        ctx.security = ctx.dataAccess.security;
        ctx.sqlConn = ctx.dataAccess.sqlConn;
        ctx.environment = env;
        ctx.dataAccess.externalUser = env.usr("externalUser");
        ctx.formatter = ctx.sqlConn.formatter;
        ctx.dbDescriptor = DBList.getDescriptor(ctx.dbCode);
        ctx.securityProvider = this.getSecurityProvider;
        ctx.identity = getIdentityFromRequest(req);
        securityProvider(ctx.dataAccess,ctx.formatter)
            .then((security)=>{
                ctx.security = security;
                ctx.createPostData = this.createPostData.bind(this, ctx);  //to override
                ctx.getDataSet = this.getDataSet.bind(this); //to override
                ctx.localResource = LocalResource.prototype.getLocalResource(this.getLanguageFromRequest(req));
                ctx.getMeta= function (tableName){
                    return GetMeta.getMeta(tableName,req);
                };
                ctx.getDataInvoke = new GetDataInvoke(ctx);
                req.app.locals.context = ctx;
                this.releaseConnection(req, res, ctx);
                next();
            });
    },

    getSecurityProvider: function(){
      return require("./jsSecurity");
    },

    getLanguageFromRequest: function(req){
        return req.language || "It";
    },

    /**
     * Creates a context object in req.app.local.context.
     * @param {Request} req
     * @param {Response} res
     * @param {Middleware}  next
     */
    getContext: function  (req, res, next, env) {
        try {
            let token = req[tokenConfig.options.requestProperty]; //default is auth
            if (!token) {
                res.status(401).json({
                    error: 'No token'
                });
                return;
            }
            //If a token is not present, evaluates an anonymous identity
            let identity = getIdentityFromRequest(req);
            //let sessionID = identity.sessionID();

            //let env = this.environments[sessionID];
            if (!env) {
                res.status(401).json({
                    error: 'Session not found'
                });
                return;
            }

            //Creates a context for the request execution
            this.getDataAccess()
                .then((pooledConn) => {
                    this.createContext(pooledConn, env, req, res, next);
                })
                .fail(err=>{
                    res.status(401).json({
                        error: 'Db not connected'
                    });
                });
        }
        catch (err) {
            res.status(401).json({
                error: 'Invalid request!'
            });
        }
    },

};

module.exports = JsApplication;
