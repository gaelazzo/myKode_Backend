/**
 * DB list
 */
/*jslint node: true */
'use strict';
/* globals Connection, Environment */

const EncryptedFile = require('./jsEncryptedFile');

/**
 *
 * {Deferred}
 */
const Deferred = require("JQDeferred");
const DataColumn = require("jsDataSet").DataColumn;
const DataTable = require("jsDataSet").DataTable;
const DataAccess = require("./jsDataAccess").DataAccess;
const _ = require('lodash');


/**
 * Execution context for a request
 * @class Context
 */

/**
 * dbCode for the current context
 * @property {string} dbCode
 */

/**
 * dbDescriptor for the current context
 * @property {DbDescriptor} dbDescriptor
 */


/**
 * @property createPostData
 */

/**
 * @property getDataCreator
 */


/**
 * @property {sqlFormatter} formatter
 */

/**
 * @property {Connection} sqlConn
 */

/**
 * @property {Environment} environment
 */

/**
 * @property {DataAccess} dataAccess
 */




/**
 * Maintains a list of db connection information, each identified by a dbCode
 * @module dbList
 */

/**
 * @class Context
 */
function Context(){
    /**
     * @property dbCode
     * {string} dbCode
     */
    this.dbCode=undefined;

    /**
     * @property dbDescriptor
     * {DbDescriptor} dbDescriptor
     */
    this.dbDescriptor=undefined;

    /**
     *  @property createPostData
     * {function} createPostData
     */
    this.createPostData=undefined;

    /**
     * @property formatter
     * {sqlFormatter} formatter
     */
    this.formatter=undefined;

    /**
     * @property sqlConn
     * {Connection} sqlConn
     */
    this.sqlConn=undefined;

    /**
     * @property environment
     * {Environment} environment
     */
    this.environment=undefined;

    /**
     * property dataAccess
     * {DataAccess} dataAccess
     */
    this.dataAccess=undefined;


}

/**
 * @class DbDescriptor
 * A dbDescriptor takes track of the structure of a database. It doesn't manage different schemas.
 * The structure of a table is described with a TableDescriptor
 * module dbDescriptor
 */
let dbListFile, dbList;

/**
 * Initializes dbList
 * @method init
 * @param options
 * @param {string} [options.fileName] Name of the clean file to encrypt
 * @param {string} [options.encryptedFileName] name of the file to be created
 * @param {boolean} options.encrypt true if the file has to be encrypted
 * @param {boolean} options.decrypt true if the file has to be decrypted
 * @param {object} [options.secret] object containing key,iv,pwd to replace the config

 */
function init(options) {
    dbListFile = new EncryptedFile(options);
    dbList = dbListFile.read();
}
/**
 * Creates a DbDescriptor
 * @class DbDescriptor
 * @param {Connection} sqlConn
 * @constructor
 */
function DbDescriptor(sqlConn) {

    /**
     * @private
     * Dictionary of stored TableDescriptor
     * @property tables
     * @type {{TableDescriptor}}
     */
    this.tables = {};
    this.sqlConn = sqlConn;

    /* Security */
    this.security = null;

    /* SecurityProvider */
    this.securityProvider=null;
}

DbDescriptor.prototype = {
    constructor: DbDescriptor
};

/**
 * Get/Set the structure of a table in a JQuery fashioned style
 * @method table
 * @param {string} tableName
 * @param {TableDescriptor} [tableDescriptor]
 * @returns {Promise<TableDescriptor>} or undefined
 */
DbDescriptor.prototype.table = function (tableName, tableDescriptor) {
    const that = this;
    if (tableDescriptor === undefined) {
        const def = Deferred();
        if (this.tables[tableName]) {
            def.resolve(this.tables[tableName]);
            return def.promise();
        }
        this.sqlConn
            .tableDescriptor(tableName)
            .done(function (results) {
                that.tables[tableName] = new TableDescriptor(results.name, results.xtype,
                    results.isDbo, results.columns);
                def.resolve(that.tables[tableName]);
            })
            .fail(function (err) {
                def.reject(err);
            });
        return def.promise();
    }
    this.tables[tableName] = tableDescriptor;
};


/**
 * Creates a DataTable or view having the specified name
 * @param {string} tableName
 * @returns {Promise<DataTable>}
 */
DbDescriptor.prototype.createTable = function (tableName){
    return this.table(tableName)
        .then(descriptor => {
            let t = new DataTable(tableName);
            descriptor.describeTable(t);
            return t;
        });
};


/**
 * Clears the information stored about a table
 * @public
 * @method forgetTable
 * @param {string} tableName
 * @returns {*}
 */
DbDescriptor.prototype.forgetTable = function (tableName) {
    delete this.tables[tableName];
};


/**
 * @class TableDescriptor
 * The structure of a table is described with a TableDescriptor.
 * A TableDescriptor is an object having those properties:
 * {string} xtype:      T for  tables, V for Views
 * {string} name:       table or view name
 * {ColumnDescriptor[]} columns
 *
 */


/**
 * @private
 * creates a TableDescriptor
 * @method TableDescriptor
 * @private
 * @constructor
 * @param {string} name
 * @param {'T'|'V'} xtype  T for tables, V for views
 * @param {boolean} isDbo true if is DBO table/view
 * @param {ColumnDescriptor[]} columns
 */
function TableDescriptor(name, xtype, isDbo, columns) {

    /**
     * Table name
     * @type {string}
     */
    this.name = name;

    /**
     * T for tables, V for views
     * @type {string|string}
     */
    this.xtype = xtype;

    /**
     * isDbo true if is DBO table/view
     * @type {boolean}
     */
    this.dbo = isDbo;

    /**
     * Array of column descriptor
     * @type {ColumnDescriptor[]}
     */
    this.columns = columns;
}


TableDescriptor.prototype = {
    constructor: TableDescriptor
};


/**
 * gets a column descriptor given the column name
 * @public
 * @method columnNames
 * @returns {string[]}
 */
TableDescriptor.prototype.columnNames = function () {
    return _.map(this.columns, "name");
};


/**
 * gets a column descriptor given the column name
 * @method column
 * @param {string} columnName
 * @returns {ColumnDescriptor}
 */
TableDescriptor.prototype.column = function (columnName) {
    return _.find(this.columns, {'name': columnName});
};



/**
 * Add key anc column information to a datatable
 * @param {DataTable} t
 */
TableDescriptor.prototype.describeTable = function (t){
    const k = this.getKey();


    this.columns.forEach(c=>{
        let col = t.setDataColumn(c.name,c.ctype);
        col.allowNull = (c.is_nullable===1);
        col.maxLength = c.max_length;
    });
    if (k.length>0) {
        t.key(k);
    }

};

/**
 * gets an array of all primary key column names
 * @method getKey
 * @returns {Array}
 */
TableDescriptor.prototype.getKey = function () {
    return _.map(_.filter(this.columns, {pk: 1}), 'name');
};

/**
 * @class ColumnDescriptor
 * An object describing a column of a table. It is required to have the following fields:
 *  {string} name        - field name
 *  {string} type        - db type
 *  {string} ctype       - javascript type
 *  {number} max_length  - size of field in bytes
 *  {number} precision   - n. of integer digits managed
 *  {number} scale       - n. of decimal digits
 *  {boolean} is_nullable - true if it can be null
 *  {boolean} pk          - true if it is primary key
 */


/**
 * @private
 * @property allDescriptor
 * @type: Hash of DbDescriptor
 */
const allDescriptors = {};

/**
 * @method getDescriptor
 * @param {string} dbCode
 * @returns {DbDescriptor}
 */
function getDescriptor(dbCode) {
    if (allDescriptors.hasOwnProperty(dbCode)) {
        return allDescriptors[dbCode];
    }
    allDescriptors[dbCode] = new DbDescriptor(getConnection(dbCode));
    return allDescriptors[dbCode];
}


/**
 * gets a Connection eventually taking it from a pool, at the moment it simply returns a new Connection
 * @param {string} dbCode
 * @returns {Connection}
 */
function getConnection(dbCode) {
    const options = getDbInfo(dbCode);
    if (options) {
        options.dbCode = dbCode;
        const Connection = require("./"+options.sqlModule).Connection;
        if (Connection) {
            return new Connection(options);
        }
    }
    return undefined;
}

/**
 * Gets  a promise to a DataAccess
 * @param {string} dbCode
 * @returns {Promise<DataAccess>}
 */
function getDataAccess(dbCode) {
    const q = Deferred(),
        sqlConn = getConnection(dbCode),
         descriptor = getDescriptor(dbCode);
    let securityProviderParam;
    if (!descriptor.security){
        securityProviderParam= descriptor.securityProvider;
    }
    new DataAccess({
        sqlConn: sqlConn,
        securityProvider: securityProviderParam,
        security: descriptor.security,
        errCallBack: function (err) {
            q.reject(err);
        },
        doneCallBack: function (DA) {
            descriptor.security= DA.security; //shares the security class in next calls
            q.resolve(DA);
        }
    });


    return q.promise();
}

/**
 * Get information about a database
 * @method getDbInfo
 * @param {string} dbCode
 * @returns {driver,useTrustedConnection,user,pwd,database,defaultSchema,connectionString} same data as that
 *  required for sqlConnection constructor:
 * {string} [driver='SQL Server Native Client 11.0'] Driver name
 * {string} [useTrustedConnection=true] is assumed true if no user name is provided
 * {string} [user] user name for connecting to db
 * {string} [pwd] user password for connecting to db
 * {string} [database] database name
 * {string} [defaultSchema=options.user ||'DBO'] default schema associated with user name
 * {string} [connectionString] connection string to connect (can be used instead of all previous listed)
 * {string} sqlModule module name to user for getting connection

 */
function getDbInfo(dbCode) {
    if (dbList.hasOwnProperty(dbCode)) {
        return dbList[dbCode];
    }
    return undefined;
}


/**
 * sets information about a database
 * @method setDbInfo
 * @param {string}dbCode
 * @param {object} dbData
 */
function setDbInfo(dbCode, dbData) {
    dbList[dbCode] = dbData;
    dbListFile.write(dbList);
}

/**
 * Deletes a Db from the list
 * @method delDbInfo
 * @param {string} dbCode
 * @returns {*}
 */
function delDbInfo(dbCode) {
    if (dbList.hasOwnProperty(dbCode)) {
        delete dbList[dbCode];
        dbListFile.write(dbList);
    }
}


/**
 * Check if a dbCode is present in the list
 * @method existsDbInfo
 * @param {string} dbCode
 * @returns {boolean}
 */
function existsDbInfo(dbCode) {
    return dbList.hasOwnProperty(dbCode);
}


module.exports = {
    init: init,

    getDbInfo: getDbInfo,
    setDbInfo: setDbInfo,
    delDbInfo: delDbInfo,
    existsDbInfo: existsDbInfo,

    getConnection: getConnection,
    getDataAccess: getDataAccess,

    DbDescriptor: DbDescriptor,
    TableDescriptor: TableDescriptor,
    getDescriptor: getDescriptor,

    Context:Context
};

