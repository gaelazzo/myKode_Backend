/*globals ObjectRow,Environment,sqlFun ,SqlFormatter*/
/**
 * Manages data storing
 * @module Security
 */

/* jshint -W116 */
const dsSpace = require('jsDataSet');
const DataSet = dsSpace.DataSet;
const QParser = require('./jsDataQueryParser').JsDataQueryParser;
const Q = require('jsDataQuery');
const _ = require("lodash");

/**
 *
 * @type function Deferred
 */
const    Deferred = require("JQDeferred");


/**
 * Saves a DataSet using a given DataAccess
 * @class Security
 * @method Security
 * @constructor
 */

function Security(){
 this.groupOperations= [];
 /* {{object[]}} */
 this.tableOpConditions = {};
 /* {{jsMetaExpression}}*/
 this.filteredConditions= {};
}


Security.prototype= {
    constructor: Security,
    /**
     *
     * @param {string}tableName
     * @param {string} op
     * @param {object} condition
     */
    addTableOpCondition:function(tableName,op, condition){
        let key = tableName+'#'+op;
        let list=this.tableOpConditions[key];
        if (list===undefined){
            list = [];
            this.tableOpConditions[key]=list;
        }
        this.tableOpConditions[key].push(condition);
    },

    /**
     *
     * @param {string} tableName
     * @param {string} op
     * @param condition
     * @return {object[]}
     */
    getTableOpConditions:function(tableName,op, condition){
        let key = tableName+'#'+op;
        let list=this.tableOpConditions[key];
        if (list===undefined){
            return [];
        }
        return  list;
    },




    /**
     * Gets security conditions for an operation in the specified environment context.
     * Those are the ones specifid in customg
     * @param tableName
     * @param {string} op
     * @param  {Environment} env
     */
    getConditions: function (tableName, op,env){
        /*{object []} */
        let idgroups= env.usr.usergrouplist;
        let key = tableName+'#'+op+'#'+idgroups.join('§');
        if (this.filteredConditions[key]!==undefined){
            return this.filteredConditions[key];
        }
        let conditions= _.filter(this.getTableOpConditions(tableName,op),
                    Q.or(Q.isnull("idcustomgroup"),Q.isIn("idcustomgroup",idgroups))
                );
        this.filteredConditions[key]=conditions;
        return  conditions;
    }

};
/**
 * Require environment.sys("idcustomgroup") to have been already evaluated
 * @param {string} tableName
 * @param {string} opKind
 * @param {Environment} environment
 * @return {sqlFun}
 */
Security.prototype.securityCondition= function (tableName, opKind, environment){
    let conditions= this.getConditions(tableName,opKind,environment.sys("idcustomgroup"));
    let thereIsAnyCondition= false;
    let clauses=[];
    let defaultIsDeny ;
    conditions.forEach(r=>{
         thereIsAnyCondition = thereIsAnyCondition || (r.allow || r.deny);

        if (r.defaultIsDeny){
            //default is DENY, allow indicates the rows allowed
            defaultIsDeny=true;
            //current operation default is deny
            if (!r.allow) return;       //skip this, it is always false
            if (r.allow.isTrue){
                clauses.push(r.allow); //overall result will be true
                return;
            }
            if (!r.deny) {
                clauses.push(r.allow);
                return;
            }
            clauses.push(Q.and(r.allow,Q.not(r.deny)));
        }
        else {
            //default is ALLOW, deny indicates the rows prohibited
            defaultIsDeny=false;
            if (r.allow && r.allow.isTrue)return;//exception is always true so the overall
            if (r.deny){
                if (r.allow){
                    clauses.push(r.allow);
                    clauses.push(Q.not(r.deny)); //they will be or-ed in the result
                }
                else {
                    clauses.push(Q.not(r.deny));
                }
            }
        }
    });
    if (clauses.length===0){
        return  Q.constant(true);
    }
    return  Q.or(clauses);


};

/**
 *
 * @param {DataAccess} conn
 * @param {SqlFormatter} formatter
 * @constructor
 * @returns {Promise<Security>}
 */
function SecurityProvider(conn, formatter){
     return conn.select({
        tableName:"customgroupoperation"
    })
        .then(t=>{
            let S = new Security();
            t.forEach(r=>{
                if (r.allowcondition){
                    if (r.allowcondition.startsWith("AND(")){
                        r.allowcondition = r.allowcondition.substr(3);
                    }
                    r.allow= QParser.prototype.from(r.allowcondition);
                }
                if (r.denycondition){
                    if (r.denycondition.startsWith("AND(")){
                        r.denycondition = r.allowcondition.substr(3);
                    }
                    r.deny= QParser.prototype.from(r.denycondition);
                }
                r.defaultIsDeny = (r.defaultisdeny.toUpperCase()==="S");
                S.addTableOpCondition(r.tablename,r.operation,r);
            });
            return S;
        });

}

module.exports = SecurityProvider;
