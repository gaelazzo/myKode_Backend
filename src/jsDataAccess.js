/*global securityProvider,SqlDriver,sqlFun,Environment, sqlParameter, SqlFormatter */
/*jslint nomen: true*/
/*jslint bitwise: true */

/**
 * provides facilities to access a database without knowing exactly the database type or implementation details
 * @module DataAccess
 */
const jsDataSet = require('./../client/components/metadata/jsDataSet'),
    DataTable = jsDataSet.DataTable;

/**
 *
 * @typedef  Deferred
 */
const Deferred = require("JQDeferred");
const _ = require('lodash');
const multiSelect = require('./jsMultiSelect');
const async = require('async');
const {type} = require("JQDeferred/lib/jquery");

/**
 * @private
 * @property {jsDataQuery} $dq
 */
const $dq = require('./../client/components/metadata/jsDataQuery').jsDataQuery;

/**
 * @private
 */
const rowState = jsDataSet.dataRowState; //detached, deleted, added, unchanged, modified


/**
 * All isolation level possible, may not be present in some db. In that case, the driver for that db will default into
 *  some other similar available level depending on the DBMS capabilities.
 * @readonly
 * @enum {string}
 */
const isolationLevels = {
    readUncommitted: 'READ_UNCOMMITTED',
    readCommitted: 'READ_COMMITTED',
    repeatableRead: 'REPEATABLE_READ',
    snapshot: 'SNAPSHOT',
    serializable: 'SERIALIZABLE'
};



/**
 * A DataAccess is a rich connection to a database and provides many non-blocking query functions to manage it.
 * Normally a connection is leaved open since it is destroyed. Setting persisting to false changes this
 * default behaviour
 * @constructor
 * @param {object} options
 * @param {Connection} [options.sqlConn]
 * @param {Function} [options.errCallBack]  optional callback to be called if error occurs.
 *  errCallBack function will be called with the error as parameter
 * @param {Function} [options.doneCallBack]  optional callback to be called when connection is established
 *  the doneCallBack will be called with (this) Connection as parameter
 * @param {boolean|undefined} [options.persisting=true] if true the connection will stay open until one explicitly closes it
 * @param {SecurityProvider} [options.securityProvider] this is an alternative to options.security
 * @param {Security} [options.security] this can ben provided instead of securityProvider, to share a Security class
 *  amid different DataAccess
 */
function DataAccess(options) {

    const that = this;

    /**
     * @property tempSqlConn
     * @private
     * @type {Connection}
     */
    const tempSqlConn = options.sqlConn;


    /**
     * formatter suited for the underlying database
     * @property sqlFormatter {formatter}
     * @private
     * @type formatter
     */



    that.externalUser = null;
    that.myLastError = null;
    that.sqlConn = null;
    that.security=options.security;

    this.nesting = 0; //open / close nesting level: every open increments nesting by one, while close decrements it

    this.persisting = options.persisting === undefined ? true : options.persisting;

    /**
     * Get the last error occured with the connection. It is a destructive call, infact the underlying message
     *  is cleared after having been returned. It means that if you read lastError two times in a row will always
     *  get null the second time.
     * @public
     * @property {string} lastError
     */
    Object.defineProperty(this, "lastError", {
        get: function () {
            //noinspection JSUnresolvedVariable         Webstorm Bug
            let s = that.myLastError;
            that.lastError = null;
            return s;
        },
        set: function (value) {
            that.myLastError = value;
        },
        enumerable: false
    });

    /**
     *Gets the security object and then calls the doneCallBack or errCallBack on errors
     *@method  getSecurity
     *@param {Connection} conn
     */
    function getSecurity(conn) {
        //if security is provided, use that class for security. SecurityProvider is not invoked in this case
        if (that.security) {
            if (options.doneCallBack) {
                that.constructor = DataAccess;
                options.doneCallBack(that); //that.sqlConn.prototype should be already set
            }
            return;
        }
        //if a securityProvider has not been specified, no security will be applied
        if (!options.securityProvider) {
            if (options.doneCallBack) {
                that.constructor = DataAccess;
                options.doneCallBack(that); //that.sqlConn.prototype should be already set
            }
            return;
        }
        //noinspection JSValidateTypes
        //if a securityProvider has been specified, use that to instantiate a Security class
        options.securityProvider(that, conn.getFormatter())
        .done(function (security) {
            that.security = security;
            if (options.doneCallBack) {
                that.constructor = DataAccess;
                options.doneCallBack(that); //that.sqlConn.prototype should be already set
            }
            that.close();
        })
        .fail(function (err) {
            that.lastError = "Error getting security information:" + err.toString();
            if (options.errCallBack) {
                options.errCallBack(err);
            }
        });
    }


    if (options.persisting) {
        tempSqlConn.open()
        .done(function (conn) {
            that.sqlConn = conn;
            that.sqlFormatter = conn.getFormatter();
            that.nesting += 1;
            getSecurity(conn);
        })
        .fail(function (err) {
            that.lastError = "Error opening database:" + err.toString();
            if (options.errCallBack) {
                options.errCallBack(err);
            }
        });
    }
    else {
        that.sqlConn = tempSqlConn;
        that.sqlFormatter = tempSqlConn.getFormatter();
        getSecurity(that.sqlConn);
    }
}


DataAccess.prototype = {
    constructor: DataAccess,

    /**
     * Last error during db activity
     * @private
     * @property {string} myLastError
     */
    myLastError: null,

    /**
     * Security function provider for this connection
     * @public
     * @property {Security} security
     */
    security: null,



    /**
     * get lastError without destroying it
     * @public
     * @method secureGetLastError
     * @returns {string|null}
     */
    secureGetLastError: function () {
        return this.myLastError;
    },

    /**
     * @public
     * @property {string} externalUser
     */
    externalUser: null,

    /**
     * creates a duplicate of the connection, with same external user and connection string
     * @method clone
     * @returns {Promise<DataAccess>}  promise to DataAccess
     */
    clone: function () {
        const usr = this.externalUser;
        const res = Deferred();
        new DataAccess(this.sqlConn.clone())
        .then(function (DA) {
            DA.externalUser = usr;
            res.resolve(DA);
        });
        return res.promise();
    },

    /**
     * nesting opening level
     * @private
     * @property {int} nesting
     */
    nesting: 0, //open / close nesting level: every open increments nesting by one, while close decrements it

    /**
     * @private
     * @property  {DataAccess} that
     */
    that: null,

    /**
     * Set persisting to false if you want to manage manually the opening and closing of the connection
     * Default is true, so that the underlying connection is open at the creation of the connection and closed
     *  when the object is destroyed
     * @property {boolean} persisting
     */
    persisting: false,


    /**
     * underlying DB connection
     * @public
     * @property  {SqlDriver} sqlConn
     */
    sqlConn: null,


    /**
     * Opens the underlying connection.
     * Consecutive calls to this function results in a automatic nesting-opening level to be increased.
     *  the underlying connection is touched only when nesting-opening level goes from 0 to 1
     *  If `persisting` is true, calling to open increments nesting-opening level but has no other effect
     * @method open
     * @returns {Promise}
     */
    open: function () {
        const that = this;
        let res;
        if (this.nesting > 0) {
            this.nesting += 1;
            return Deferred().resolve().promise();
        }
        if (this.persisting && this.sqlConn.isOpen) {
            this.nesting += 1;
            return Deferred().resolve().promise();
        }
        res = this.sqlConn.open();
        res.done(function () {
            that.nesting += 1;
        });
        return res.promise();
    },

    /**
     * Closes the underlying connection.
     * Consecutive calls to this function results in a automatic nesting-opening level to be decreased.
     *  the underlying connection is touched only when nesting-opening level goes from 1 to 0
     *  If persisting is true, calling to close decrements nesting-opening level but has no other effect.
     *  In that case, the connection will be automatically closed when DataAccess is destroyed
     * @method close
     * @returns {Promise}
     */
    close: function () {
        if (this.persisting || this.nesting > 1) {
            if (this.nesting > 0) {
                this.nesting -= 1;
            }
            return Deferred().resolve().promise();
        }
        const that = this,
            res = this.sqlConn.close();
        res.done(function () {
            that.nesting = 0;
        });
        return res;
    },

    /**
     * Destroy the DataAccess and closes the underlying connection
     * @method destroy
     */
    destroy: function () {
        if (this.sqlConn) {
            return this.sqlConn.destroy();
        }
        this.sqlConn = null;
        return Deferred().resolve().promise();
    },

    toString: function () {
        return 'DataAccess';
    },


    /**
     * Read a value from database. If multiple values are returned, the first is taken
     * @method readSingleValue
     * @param options {object} options has those fields:
     * @param {string} options.tableName  table name
     * @param {sqlFun|string} options.expr  expression to get from table
     * @param {sqlFun} [options.filter]
     * @param {string} [options.orderBy]
     * @param {Environment} [options.environment]
     * @returns {Promise<object>}
     */
    readSingleValue: function (options) {
        return this.myReadValue(options);
    },

    /**
     * Read a value from database. If multiple values are returned, the last is taken
     * @method readLastValue
     * @param {string} query command to run
     * @returns {Promise<object>}
     */
    readLastValue: function (query) {
        const res = Deferred();
        this.myReadLastTable( query)
        .done(function (result) {
            res.resolve(getAProperty(getObjectOrLastRow(result)));
        })
        .fail(function (err) {
            res.reject(err);
        });
        return res.promise();
    },


    /**
     * Executes a query and gives the first row of the first table returned
     * @method myReadFirstValue
     * @private
     * @param {string} query
     * @returns {Promise<object>}
     */
    myReadFirstValue: function( query) {
        const res = Deferred();
        this.myReadFirstTable( query)
        .then(function (result) {
            res.resolve(getAProperty(getObjectOrFirstRow(result)));
        })
        .fail(function (err) {
            res.reject(err);
        });
        return res.promise();
    },

    /**
     * Get the last result set of the results obtained running a specified query
     * @method myReadLastTable
     * @private
     * @param {string} query
     * @param {boolean} [raw=false]
     * @returns  {Promise<object[] | {meta: string[], rows:object[]}>}
     */
    myReadLastTable: function (query, raw) {
        const res = Deferred();
        ensureOpen(this, function (conn) {
            return conn.sqlConn.queryBatch(query, raw)
            .done(function (result) {
                res.resolve(result);
            })
            .fail(function (err) {
                res.reject(err);
            });
        })
        .fail(err=>res.reject(err));
        return res.promise();
    },


    /**
     * Get the first result set of the results obtained running a specified query
     * @function myReadFirstTable
     * @private
     * @param {string} query
     * @param {boolean} [raw=false]
     * @returns  {Promise<object[] | {meta: string[], rows:object[]}>}
     */
    myReadFirstTable: function (query, raw) {
        const res = Deferred();
        ensureOpen(this, function (conn) {
            if (!conn.sqlConn.queryBatch){
                //Qui conn.sqlConn.queryBatch è undefined
                res.reject("conn.sqlConn.queryBatch is undefined");
                return;
            }
            return conn.sqlConn.queryBatch(query, raw)
            .progress(function (result) {
                res.resolve(result);
            })
            .done(function (result) {
                res.resolve(result);
            })
            .fail(function (err) {
                res.reject(err);
            });
        })
        .fail(err=>res.reject(err));
        return res.promise();
    },


    /**
     * Read a value from database. If multiple values are returned, the first is taken.
     * It is similar to readSingleValue but accepts a generic sql command
     * @method runCmd
     * @param cmd {string} should be a command resulting in a single value returned from db.
     *    Other output data will be ignored
     * @returns {Promise<object>}
     */
    runCmd: function (cmd) {
        return this.myReadFirstValue( cmd);
    },


    /**
     * Read a table from database. If multiple tables are returned, the first is taken.
     * It is similar to readSingleValue but accepts a generic sql command
     * @method runSql
     * @param cmd {string} should be a command resulting in a table. Only first table got will be returned
     * @param {boolean} [raw=false] if true, Data will not be objectified
     * @return {Promise<object[] | {meta: string[], rows:object[]}>}
     */
    runSql: function (cmd, raw) {
        return this.myReadFirstTable( cmd, raw);
    },


    /**
     * do a delete Command
     * @method doSingleDelete
     * @param {object} options
     * @param {string} options.tableName
     * @param {sqlFun} options.filter
     * @param {Environment} [options.environment]
     * @returns {Promise<int>}
     */
    doSingleDelete: function (options) {
        const cmd = this.sqlConn.getDeleteCommand(options),
            res = Deferred();
        this.doGenericUpdate(cmd)
        .done(function (val) {
            //noinspection JSUnresolvedVariable
            if (val === undefined || val.rowcount === undefined || val.rowcount === 0) {
                res.reject('There was no row in table ' + options.tableName + ' to delete with condition ' + options.filter);
            } else {
                res.resolve(val);
            }
        })
        .fail(function (err) {
            res.reject(err);
        });
        return res.promise();
    },


    /**
     * do an insert Command
     * @method doSingleInsert
     * @param table {string}
     * @param columns {string[]} array of column names
     * @param values {object[]} array of corresponding value
     * @returns {Promise<int>}
     */
    doSingleInsert: function (table, columns, values) {
        const cmd = this.sqlConn.getInsertCommand(table, columns, values),
            res = Deferred();
        this.doGenericUpdate( cmd)
        .done(function (val) {
            //noinspection JSUnresolvedVariable
            if (val === undefined || val.rowcount === undefined || val.rowcount === 0) {
                res.reject('Error running command ' + cmd);
            } else {
                res.resolve(val);
            }
        })
        .fail(function (err) {
            res.reject(err);
        });
        return res.promise();
    },

    /**
     * do an update Command
     * @method doSingleUpdate
     * @param {object} options
     * @param {string} options.table
     * @param {sqlFun} options.filter
     * @param {Array} options.columns
     * @param {Array} options.values
     * @param {Environment} [options.environment]
     * @returns {Promise<int>}
     */
    doSingleUpdate: function (options) {
        const cmd = this.sqlConn.getUpdateCommand(options),
            res = Deferred();
        this.doGenericUpdate( cmd)
        .done(function (val) {
            //noinspection JSUnresolvedVariable
            if (val === undefined || val.rowcount === undefined || val.rowcount === 0) {
                res.reject('Error running command ' + cmd + 'detail:', val);
            } else {
                res.resolve(val);
            }
        })
        .fail(function (err) {
            res.reject(err);
        });
        return res.promise();
    },



    /**
     * gets the sql cmd to post a row to db. On Error, the command must return errNum
     * @method getPostCommand
     * @param {DataRow} r
     * @param {OptimisticLocking} optimisticLocking
     * @param {Environment} environment
     * @return {string|null}
     */
    getPostCommand: function (r, optimisticLocking, environment) {
        const row = r.getRow();
        if (row.state === rowState.modified) {
            const modifiedFields=row.getModifiedFields();
            const postingFields = row.table.getPostingColumnsNames(modifiedFields);

            return this.sqlConn.getUpdateCommand(
                {
                    table: row.table.postingTable(),
                    filter: optimisticLocking.getOptimisticLock(r),
                    columns: postingFields,
                    values: _.map(modifiedFields, function (field) {
                        return r[field];
                    }),
                    environment: environment
                });
        }
        if (row.state === rowState.added) {
            return this.sqlConn.getInsertCommand(
                row.table.postingTable(),
                row.table.getPostingColumnsNames(_.keys(r)),
                _.values(r));
        }
        if (row.state === rowState.deleted) {
            return this.sqlConn.getDeleteCommand(
                {
                    tableName: row.table.postingTable(),
                    filter: optimisticLocking.getOptimisticLock(r),
                    environment: environment
                });
        }
        return null;
    },


    /**
     * call SP with a list of simple values as parameters. The SP returns a collection of tables.
     * @method callSP
     * @public
     * @param {string} spName Name of the stored procedure
     * @param {object[]} paramList an array of all sp parameters, in the expected order
     * @param [raw] if true data will be returned as array of simple values, without calling objectify on it
     * @param {int} [timeout]
     * @returns {Promise<Array>} (a sequence of arrays)
     * @example  DA.callSP('reset_customer',[1])
     */
    callSP: function (spName, paramList, raw, timeout) {
        return this.sqlConn.callSPWithNamedParams({
            spName: spName,
            timeout:timeout,
            paramList: _.map(paramList, function (p) {
                return {value: p};
            }),
            raw: raw
        });
    },


    /**
     * call SP with a list of parameters each of which is an object of type sqlParameter having:<br>
     *  value : the value to be passed to the parameter, if it is not an output parameter <br>
     *  {bool} [out=false]: true if it is an output parameter <br>
     *  {string} [sqltype] : a type name compatible with the underlying db, necessary if is an output parameter <br>
     *  {string} [name] necessary if it is an output parameter<br>
     *  If any output parameter is given, the corresponding outValue will be filled after the SP has run<br>
     *  After returning all tables given by the stored procedure, this method eventually returns
     *   an object with a property for each output parameter
     * @param {string} spName
     * @param {sqlParameter[]} paramList
     * @param [raw=false] when true data will be returned as array(s) of simple values, without calling objectify on it
     * @returns {Promise<Array>} (a sequence of arrays)
     * @example var arr = [{name:'idcustomer', value:1}, {name:maxValue, sqlType:int, value:null, out:true}];<br>
     *  DA.callSPWithNamedParams('getMaxOrder',arr);<br>
     *  At the end arr will be modified and a outValue added:<br>
     *      [{name:'idcustomer', value:1}, {name:maxValue, sqlType:int, value:null, out:true, outValue:12}]
     */
    callSPWithNamedParams: function (spName, paramList, raw) {
        return this.sqlConn.callSPWithNamedParams({spName: spName, paramList: paramList, raw: raw});
    },


    /**
     * Reads data from a table and returns the entire table read
     * @method
     * @name select
     * @param {object} opt
     * @param {string} [opt.tableName] physical table or view to be read
     * @param {string} [opt.alias] table name wanted for the result if different from opt.tableName
     * @param {string|*} [opt.columns] column names comma separated
     * @param {string} [opt.orderBy=null] sorting clause, ex. "name asc, surname asc"
     * @param {sqlFun} [opt.filter=null]
     * @param {string} [opt.top=null]
     * @param {boolean} [opt.applySecurity=true] if true,   security condition is appended to filter
     * @param {Environment} [opt.environment] environment for the current user
     * @param {boolean} [raw=false] if raw, data returned is not objectified
     * @return {Promise<object[]>} Array of objects with tableName set to the table name of data read
     */
    select: function (opt, raw) {
        const def = Deferred(),
            that = this,
            options = _.defaults(opt, {columns: '*', applySecurity: true, filter: null});

        if (opt.filter && opt.filter.isFalse) {
            def.resolve({tableName: options.alias || options.tableName, row: []});
            return def.promise();
        }

        options.filter = this.getFilterSecured(options.filter, options.applySecurity, options.tableName, options.environment);
        const selCmd = that.sqlConn.getSelectCommand(options);
        that.runSql(selCmd, raw)
        .done(function (dataRead) {
            dataRead.tableName = options.alias || options.tableName;
            def.resolve(dataRead);
        })
        .fail(function (err) {
            def.reject(err);
        });
        return def.promise();
    },

    /**
     * Reads data from a table and returns a range of rows
     * @method pagedSelect
     * @param {object} opt
     * @param {string} [opt.tableName] physical table or view to be read
     * @param {string|*} [opt.columns] column names comma separated
     * @param {string} [opt.orderBy=null]
     * @param {int} [opt.firstRow=1]
     * @param {int} opt.top
     * @param {sqlFun} [opt.filter=null]
     * @param {boolean} [opt.applySecurity=true] if true,   security condition is appended to filter
     * @param {Environment} [opt.environment] environment for the current user
     * @param {boolean} [raw=false] if raw, data returned is not objectified
     * @return {Promise<object[]>} Array of objects with tableName set to the table name of data read
     */
    pagedSelect: function (opt, raw) {
        const def = Deferred(),
            that = this,
            options = _.defaults(opt, {columns: '*', applySecurity: true, filter: null,firstRow:1});

        if (opt.filter && opt.filter.isFalse) {
            def.resolve({tableName: options.alias || options.tableName, row: []});
            return def.promise();
        }

        options.filter  =this.getFilterSecured(options.filter,
            options.applySecurity,
            options.tableName,
            options.environment);

        const selCmd = that.sqlConn.getPagedTableCommand(options);
        that.runSql(selCmd, raw)
        .done(function (dataRead) {
            dataRead.tableName = options.alias || options.tableName;
            def.resolve(dataRead);
        })
        .fail(function (err) {
            def.reject(err);
        });
        return def.promise();
    },



    /**
     * Reads data from a table and returns any row read one by one.
     * Data is returned in a sequence of notification. At the beginning there will be the meta, then each row.
     * So the first result will be {meta:[array of column descriptors]} then will follow other results like
     *  if raw is false : {row:{object read from db}}
     *  if raw is true : {row:[array of column values]}
     * @method selectRows
     * @param {object} opt
     * @param {string} opt.tableName
     * @param {string|*} opt.columns column names comma separated
     * @param {string} [opt.orderBy=null]
     * @param {sqlFun} [opt.filter=null]
     * @param {string} [opt.top=null]
     * @param {boolean} [opt.applySecurity=true] if true,   security condition is appended to filter
     * @param {Environment} [opt.environment] environment for the current user
     * @param {boolean} [raw=false] if raw=true, data returned is not objectified
     * @return {Promise<object[]>}
     **/
    selectRows: function (opt, raw) {
        const options = _.defaults(opt, {columns: '*', applySecurity: true, filter: null});
        return ensureOpen(this, function (conn) {
            options.filter = conn.getFilterSecured(options.filter, options.applySecurity, options.tableName, options.environment);
            const selCmd = conn.sqlConn.getSelectCommand(options);
            return conn.sqlConn.queryLines(selCmd, raw);
        });
    },


    /**
     * Get the filter on a table merging optional security condition.
     * @private
     * @method getFilterSecured
     * @param {sqlFun} filter
     * @param {boolean} applySecurity
     * @param {string} tableName
     * @param {Environment} [environment]
     * @returns sqlFun
     */
    getFilterSecured: function (filter, applySecurity, tableName, environment) {
        if (filter && filter.isFalse) {
            return filter;
        }
        if (applySecurity && this.security) {
            let securityCondition = this.security.securityCondition(tableName, 'S', environment);
            return $dq.and(filter, securityCondition);
        }
        return filter;
    },


    /**
     * Merge rows taken from DB to an existent table. If existent rows with same primary key are found, they are
     *   overwritten.
     * @method selectIntoTable
     * @param {DataTable} options.table
     * @param {string|*} [options.columns] column names comma separated
     * @param {string} [options.orderBy]
     * @param {sqlFun} [options.filter]
     * @param {string} [options.top]
     * @param {Environment} [options.environment] environment for the current user
     * @param {boolean} [options.applySecurity=true] if true,   security condition is appended to filter
     * @return {Promise}
     */
    selectIntoTable: function (options) {
        const opt = _.defaults(options),
            def = Deferred();
        opt.columns = options.columns || options.table.columnList();
        opt.tableName = options.table.tableForReading();
        opt.applySecurity = !options.table.skipSecurity();
        this.select(opt)
        .done(function (res) {
            _.forEach(res, function (r) {
                mergeRowIntoTable(options.table, r);
            });
            def.resolve(options.table);
        })
        .fail(function (err) {
            def.reject(err);
        });
        return def.promise();
    },


    /**
     * Begins a transaction
     * @param {string} isolationLevel
     *   'READ UNCOMMITTED','READ COMMITTED','REPEATABLE READ','SNAPSHOT','SERIALIZABLE'
     * @return {Promise}
     */
    beginTransaction: function (isolationLevel) {
        return this.sqlConn.beginTransaction(isolationLevel);
    },

    commit: function () {
        return this.sqlConn.commit();
    },

    rollback: function () {
        return this.sqlConn.rollBack();
    },


    /**
     * Gets a sql-formatter compatible with this Connection
     * @method getFormatter
     * @returns {SqlFormatter}
     */
    getFormatter : function () {
        return this.sqlConn.getFormatter();
    },


    /**
     * run a command to the db ensuring the connection is open in the while
     *  it is a shortcut to an ensureOpen + updateBatch
     * @method doGenericUpdate\
     * @private
     * @param {string} cmd
     * @returns {Promise}
     */
    doGenericUpdate: function(cmd) {
        const res = Deferred();
        ensureOpen(this, function (conn) {
            return conn.sqlConn.updateBatch(cmd)
            .done(function (result) {
                res.resolve(result);
            })
            .fail(function (err) {
                res.reject(err);
            });
        })
        .fail(err=>res.reject(err));
        return res.promise();
    },


    /**
     * Executes a query given by options parameter and returns the first value returned
     * @method myReadValue
     * @private
     * @param {object} options  options has those fields:
     * @param {string} options.table  table name
     * @param {sqlFun|string} options.expr  expression to get from table
     * @param {string} options.tableName
     * @param {string} options.columns
     * @param {sqlFun} [options.filter]
     * @param {string} [options.top]
     * @param {string} [options.orderBy]
     * @param {object} [options.environment]
     * @returns {Promise<object>}
     */
    myReadValue : function(options) {
        let expr = typeof options.expr==='string' ? options.expr:
            this.getFormatter().toSql(options.expr, options.environment);
        const opt = _.defaults({}, options, {columns: [expr]}),
            cmd = this.sqlConn.getSelectCommand(opt);
        return this.myReadFirstValue( cmd);
    }


};

/**
 * Gets rows from a db splitting them into packets. Packets are given as soon as they are available.
 * If raw is false, packet are like {set:number, rows:[array of objects]}
 *  if raw is true, packet are like {set:number, meta:[array of column descriptors], rows:[array of array of values]}
 *  the array of columns descriptors (meta) is enriched with a property tableName
 *  if raw===false  it is returned a series of {tableName: alias, set:set Number, rows: [array of plain objects]
 *  if raw===true   it is returned a series of {tableName: alias, meta:[array of column names], rows:[raw objects]
 *  set numbers starts from 0
 * @method queryPackets
 * @param {object} opt
 * @param {string} opt.tableName
 * @param {string} [opt.alias] optional, table name wanted for the result
 * @param {string|*} opt.columns column names comma separated
 * @param {string} [opt.orderBy=null]
 * @param {sqlFun} [opt.filter=null]
 * @param {string} [opt.top=null]
 * @param {boolean} [opt.applySecurity=true] if true,   security condition is appended to filter
 * @param {Environment} [opt.environment] environment for the current user
 * @param {number} packetSize
 * @param {boolean} [raw=false]
 * @return {Promise}
 */
DataAccess.prototype.queryPackets = function (opt, packetSize, raw) {
    const currTableInfo = {},
        def = Deferred(),
        options = _.defaults(opt, {columns: '*', applySecurity: true, filter: null}),
        tableName = opt.alias || opt.tableName;

    function notifyPacket(packet) {
        if (raw) {
            def.notify({tableName: currTableInfo.tableName, meta: currTableInfo.columns, rows: packet}); //meta has tableName field
        } else {
            def.notify({tableName: tableName, rows: packet});
        }
    }

    const that = this;

    process.nextTick(function() {
        ensureOpen(that, function (conn) {
            const opt = _.clone(options);
            opt.filter = conn.getFilterSecured(options.filter, options.applySecurity, options.tableName, options.environment);
            const selCmd = conn.sqlConn.getSelectCommand(opt);
            conn.sqlConn.queryPackets(selCmd, raw, packetSize)
            .progress(function (r) {
                if (r.meta) {
                    currTableInfo.columns   = r.meta;
                    currTableInfo.tableName = tableName;
                } else {
                    notifyPacket(r.rows);
                }
            })
            .done(function () {
                def.resolve();
            })
            .fail(function (err) {
                def.reject(err);
            });
        });
    });
    return def.promise();
};

/**
 * Executes a multi-select given a list of select in input
 * DataAccess.multiselect
 * @method multiSelect
 * @param {object} options
 * @param {Select[]} options.selectList
 * @param {number} [options.packetSize=0] if present, returns data splitted into packets
 * @param {boolean} [options.raw=false] if true, raw data is returned
 * @param {object} [options.applySecurity=true] //true if security must be applied
 * @param {Environment} [options.environment]
 * @return {Promise<object[]>}
 */
DataAccess.prototype.multiSelect = function (options) {
    const def = Deferred();
    if (options.selectList.length === 0) {
        def.resolve();
        return def.promise();
    }

    const selList = multiSelect.groupSelect(options.selectList),
        opt = _.defaults(options, {applySecurity: true, filter: null, packetSize: 0, raw:false}),
        that = this;

    // gets the security filter for each Select in the list
    async.map(selList, function (select, callback) {
            let filterSec = that.getFilterSecured(select.getFilter(),
                opt.applySecurity,
                select.tableName,
                opt.environment);
            callback(null,
                {
                    alias: select.alias,
                    sql: that.sqlConn.getSelectCommand({
                        tableName: select.tableName,
                        columns: select.columns,
                        filter: filterSec, //select.getFilter(),
                        top: select.getTop(),
                        environment: opt.environment
                    })
                });

        },
        function (err, resultList) {
            // resultList is an array of {alias, sql} couples
            //obtains cmd as a concatenation of all sql fields in result list
            const cmd = that.sqlConn.appendCommands(_.map(resultList, 'sql'));
            doMultiSelect(that.sqlConn, options.packetSize, cmd, _.map(resultList, 'alias'), opt.raw)
            .done(function (res) {
                def.resolve(res);
            })
            .progress(function (data) {
                def.notify(data);
            })
            .fail(function (err) {
                def.reject(err);
            });
        }
    );

    return def.promise();
};


/**
 * Executes a multi-select given a list of select in input and merge all data into a specified DataSet
 * @method mergeMultiSelect
 * @param {Select[]} selectList
 * @param {DataSet} ds
 * @param {Environment} [environment] if provided, security is applied
 * @return {Promise}
 */
DataAccess.prototype.mergeMultiSelect = function (selectList, ds, environment) {
    const def = Deferred();
    this.multiSelect({
        selectList: selectList,
        applySecurity: (environment !== undefined),
        environment: environment
    })
    .progress(function (data) {
        //data is an object: {tableName: string, set: number, rows : object[]}
        const table = ds.tables[data.tableName];
        table.mergeArray(data.rows, true);
    })
    .done(function (data) {
        def.resolve();
    })
    .fail(function (err) {
        def.reject(err);
    });
    return def.promise();
};



/**
 * Execute a command ensuring that the underlying connection is open, then closes the connection.
 * It manages the open - do command - close cycle
 * @method ensureOpen
 * @private
 * @param {DataAccess} conn
 * @param {function} command
 * @returns {Promise}
 */
function ensureOpen(conn, command) {
    const res = Deferred();
    let savedOutput;
    conn.open()
    .then(function () {
        //const myRes =  Deferred();
        try {
            command(conn)
            .done(function (o) {
                savedOutput = o;
                res.resolve(); //returns the object returned from the callback
            })
            .progress(function (o) {
                res.notify(o);
            })
            .fail(function (err) {
                res.reject("executing "+command.name+" "+ err);
            });
        } catch (err) {
            res.reject(err);
        }
        return res.promise();
    })
    .done(function () {
        conn.close()
        .done(function () {
            res.resolve(savedOutput);
        })
        .fail(function () {
            res.resolve(savedOutput);
        });
    })
    .fail(function (err) {
        res.reject(err);
    });
    return res.promise();
}

/**
 * Get an object from an object or array. If param is an array, its first element is taken
 * @method getObjectOrFirstRow
 * @private
 * @param res {object|Array}
 * @returns {object}
 */
function getObjectOrFirstRow(res) {
    if (_.isArray(res)) {
        if (res.length > 0) {
            return res[0];
        }
        return null;
    }
    return res;
}

/**
 * Get an object from an object or array. If param is an array, its last element is taken
 * @method getObjectOrLastRow
 * @private
 * @param res {object|Array}
 * @returns {object}
 */
function getObjectOrLastRow(res) {
    if (_.isArray(res)) {
        if (res.length > 0) {
            return res[res.length - 1];
        }
        return null;
    }
    return res;
}

/**
 * Get a property from an object. The premise is that the object should only have one property
 * @method getAProperty
 * @private
 * @param obj {object}
 * @returns {object}
 */
function getAProperty(obj) {
    let i;
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            return obj[i];
        }
    }
    return undefined;
}


/**
 * Merge a row into a table discarding any previous row with same primary key when present
 * @method mergeRowIntoTable
 * @param {DataTable} table
 * @param {object} r
 */
function mergeRowIntoTable(table, r) {
    const rFound = _.filter(table.rows, _.pick(r, table.key()));
    if (rFound.length > 0) {
        rFound[0].getRow().detach();
    }
    table.load(r, false);
}

/**
 * Counts row from a table
 * @method selectCount
 * @param {object} options
 * @param {string} options.tableName
 * @param {sqlFun} [options.filter=null]
 * @param {Environment} options.environment
 * @param {boolean} [options.applySecurity=true]
 * @returns {Promise<int>}
 */
DataAccess.prototype.selectCount = function (options) {
    const def = Deferred(),
        that = this,
        opt = _.defaults(options, {applySecurity: true, filter: null});
    let filterSec = this.getFilterSecured(opt.filter, opt.applySecurity, opt.tableName, opt.environment);
    if (filterSec.isFalse) {
        def.resolve(0);
        return def.promise();
    }
    opt.filter = filterSec;
    const selCmd = that.sqlConn.getSelectCount(opt);
    that.runCmd(selCmd)
    .done(function (count) {
        def.resolve(count);
    })
    .fail(function (err) {
        def.reject(err);
    });
    return def.promise();
};


/**
 * Executes a query and returns:
 * if raw= true : a series of {meta} , {rows}, {rows}.. {meta}
 *   {meta} is an array of column enriched with a property tableName taken from the aliasList
 * if raw= false: a series of {tableName, set, rows} packets
 * @method doMultiPacketSelect
 * @private
 * @param {Connection} conn
 * @param {number} packetSize limit to the size of {rows} array, 0 means no limit
 * @param {string} cmd
 * @param {string[]} aliasList
 * @param {boolean} raw
 * @return {Promise}
 */
function doMultiSelect(conn, packetSize, cmd, aliasList, raw) {
    const def = Deferred(),
        currTableInfo = {},
        currSet = -1;

    function notifyPacket(packet) {
        if (raw) {
            def.notify({meta: currTableInfo.meta, tableName: currTableInfo.tableName, rows: packet.rows});
        } else {
            packet.tableName = aliasList[packet.set];
            def.notify(packet);
        }
    }
    conn.queryPackets(cmd, raw, packetSize)
    .progress(function (r) {
        if (r.meta) { //can only be received when raw is true
            currTableInfo.meta = r.meta;
            currTableInfo.tableName = aliasList[r.set];
            // se raw=true deve notificare il pacchetto altrimenti non notifica nulla??
            if (raw){
                notifyPacket(r);
            }
        } else {
            notifyPacket(r);
        }
    })
    .done(function () {
        def.resolve();
    })
    .fail(function (err) {
        def.reject(err);
    });
    return def.promise();
}

/**
 * Transforms raw data into plain objects
 * @method objectify
 * @param {Array} colNames
 * @param {Array} rows
 * @returns {Array}
 */
function objectify(colNames, rows) {
    //noinspection JSUnresolvedVariable
    if (colNames.meta) {
        //noinspection JSUnresolvedVariable
        return objectify(colNames.meta, colNames.rows);
    }
    return _.map(rows, function (el) {
        const obj = {};
        _.each(colNames, function (value, index) {
            obj[value] = el[index];
        });
        return obj;
    });
}


module.exports = {
    DataAccess: DataAccess,
    objectify: objectify,
    isolationLevels: isolationLevels
};
