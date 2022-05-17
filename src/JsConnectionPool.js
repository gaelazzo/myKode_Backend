const Deferred = require("JQDeferred");
let  _         = require('lodash');
let DbList = require('./jsDbList');


//Funzione solo abbozzata, da rivedere

function  JsConnectionPool(dbCode){
    this.connList = [];
    this.dbCode = dbCode;
}
JsConnectionPool.prototype = {
    constructor: JsConnectionPool,


    /**
     *
     * @returns {Promise <JsPooledConnection>}
     */
    getDataAccess: function (){
        let that= this;
        let da = _.find(this.connList, c=> c.inUse===false);
        if (da) {
            da.inUse=true;
            return Deferred().resolve(da);
        }
        let def = Deferred();
        DbList.getDataAccess(this.dbCode)
            .then(function (da){
                let conn = new JsPooledConnection(da);
                conn.inUse=true;
                that.connList.push(conn);
                def.resolve(conn);
            });

        return def.promise();
    }

};

/**
 *
 * @param {DataAccess} conn
 * @constructor
 */
function  JsPooledConnection(conn){
    this.inUse=false;
    /* DataAccess */
    this.conn=conn;
}

JsPooledConnection.prototype = {
    constructor: JsPooledConnection,
    release:function(){
        this.inUse=false;
    },
    /**
     * getDataAccess
     * @return {DataAccess}
     */
    getDataAccess: function (){
        return this.conn;
    }

};

module.exports  = {
    JsPooledConnection: JsPooledConnection,
    JsConnectionPool:JsConnectionPool
}
