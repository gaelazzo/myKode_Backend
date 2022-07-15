<a name="module_DataAccess"></a>

## DataAccess
provides facilities to access a database without knowing exactly the database type or implementation details


* [DataAccess](#module_DataAccess)
    * _static_
        * [.isolationLevels](#module_DataAccess.isolationLevels)
    * _inner_
        * [~DataAccess](#module_DataAccess..DataAccess)
            * [new DataAccess(options)](#new_module_DataAccess..DataAccess_new)
            * [.security](#module_DataAccess..DataAccess+security)
            * [.externalUser](#module_DataAccess..DataAccess+externalUser)
            * [.persisting](#module_DataAccess..DataAccess+persisting)
            * [.sqlConn](#module_DataAccess..DataAccess+sqlConn)
            * [.callSPWithNamedParams(spName, paramList, [raw])](#module_DataAccess..DataAccess+callSPWithNamedParams) ⇒ <code>Promise.&lt;Array&gt;</code>
            * [.beginTransaction(isolationLevel)](#module_DataAccess..DataAccess+beginTransaction) ⇒ <code>Promise</code>
        * [~rowState](#module_DataAccess..rowState)
        * [~getSecurity(conn)](#module_DataAccess..getSecurity)
        * [~secureGetLastError()](#module_DataAccess..secureGetLastError) ⇒ <code>string</code> \| <code>null</code>
        * [~clone()](#module_DataAccess..clone) ⇒ <code>Promise.&lt;DataAccess&gt;</code>
        * [~open()](#module_DataAccess..open) ⇒ <code>Promise</code>
        * [~close()](#module_DataAccess..close) ⇒ <code>Promise</code>
        * [~destroy()](#module_DataAccess..destroy)
        * [~readSingleValue(options)](#module_DataAccess..readSingleValue) ⇒ <code>Promise.&lt;object&gt;</code>
        * [~readLastValue(query)](#module_DataAccess..readLastValue) ⇒ <code>Promise.&lt;object&gt;</code>
        * [~runCmd(cmd)](#module_DataAccess..runCmd) ⇒ <code>Promise.&lt;object&gt;</code>
        * [~runSql(cmd, [raw])](#module_DataAccess..runSql) ⇒ <code>Promise.&lt;(Array.&lt;object&gt;\|{meta: Array.&lt;string&gt;, Array.&lt;rows:object&gt;})&gt;</code>
        * [~doSingleDelete(options)](#module_DataAccess..doSingleDelete) ⇒ <code>Promise.&lt;int&gt;</code>
        * [~doSingleInsert(table, columns, values)](#module_DataAccess..doSingleInsert) ⇒ <code>Promise.&lt;int&gt;</code>
        * [~doSingleUpdate(options)](#module_DataAccess..doSingleUpdate) ⇒ <code>Promise.&lt;int&gt;</code>
        * [~getPostCommand(r, optimisticLocking, environment)](#module_DataAccess..getPostCommand) ⇒ <code>string</code> \| <code>null</code>
        * [~callSP(spName, paramList, [raw], [timeout])](#module_DataAccess..callSP) ⇒ <code>Promise.&lt;Array&gt;</code>
        * [~select(opt, [raw])](#module_DataAccess..select) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
        * [~pagedSelect(opt, [raw])](#module_DataAccess..pagedSelect) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
        * [~selectRows(opt, [raw])](#module_DataAccess..selectRows) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
        * [~selectIntoTable()](#module_DataAccess..selectIntoTable) ⇒ <code>Promise</code>
        * [~getFormatter()](#module_DataAccess..getFormatter) ⇒ <code>SqlFormatter</code>
        * [~queryPackets(opt, packetSize, [raw])](#module_DataAccess..queryPackets) ⇒ <code>Promise</code>
        * [~multiSelect(options)](#module_DataAccess..multiSelect) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
        * [~mergeMultiSelect(selectList, ds, [environment])](#module_DataAccess..mergeMultiSelect) ⇒ <code>Promise</code>
        * [~mergeRowIntoTable(table, r)](#module_DataAccess..mergeRowIntoTable)
        * [~selectCount(options)](#module_DataAccess..selectCount) ⇒ <code>Promise.&lt;int&gt;</code>
        * [~objectify(colNames, rows)](#module_DataAccess..objectify) ⇒ <code>Array</code>
        * [~Deferred](#module_DataAccess..Deferred)

<a name="module_DataAccess.isolationLevels"></a>

### DataAccess.isolationLevels
All isolation level possible, may not be present in some db. In that case, the driver for that db will default into
 some other similar available level depending on the DBMS capabilities.

**Kind**: static enum of [<code>DataAccess</code>](#module_DataAccess)  
**Properties**

| Name | Default |
| --- | --- |
| isolationLevels |  | 
| readUncommitted | <code>READ_UNCOMMITTED</code> | 
| readCommitted | <code>READ_COMMITTED</code> | 
| repeatableRead | <code>REPEATABLE_READ</code> | 
| snapshot | <code>SNAPSHOT</code> | 
| serializable | <code>SERIALIZABLE</code> | 

<a name="module_DataAccess..DataAccess"></a>

### DataAccess~DataAccess
**Kind**: inner class of [<code>DataAccess</code>](#module_DataAccess)  

* [~DataAccess](#module_DataAccess..DataAccess)
    * [new DataAccess(options)](#new_module_DataAccess..DataAccess_new)
    * [.security](#module_DataAccess..DataAccess+security)
    * [.externalUser](#module_DataAccess..DataAccess+externalUser)
    * [.persisting](#module_DataAccess..DataAccess+persisting)
    * [.sqlConn](#module_DataAccess..DataAccess+sqlConn)
    * [.callSPWithNamedParams(spName, paramList, [raw])](#module_DataAccess..DataAccess+callSPWithNamedParams) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.beginTransaction(isolationLevel)](#module_DataAccess..DataAccess+beginTransaction) ⇒ <code>Promise</code>

<a name="new_module_DataAccess..DataAccess_new"></a>

#### new DataAccess(options)
A DataAccess is a rich connection to a database and provides many non-blocking query functions to manage it.
Normally a connection is leaved open since it is destroyed. Setting persisting to false changes this
default behaviour


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| [options.sqlConn] | <code>Connection</code> |  |  |
| [options.errCallBack] | <code>function</code> |  | optional callback to be called if error occurs.  errCallBack function will be called with the error as parameter |
| [options.doneCallBack] | <code>function</code> |  | optional callback to be called when connection is established  the doneCallBack will be called with (this) Connection as parameter |
| [options.persisting] | <code>boolean</code> \| <code>undefined</code> | <code>true</code> | if true the connection will stay open until one explicitly closes it |
| [options.securityProvider] | <code>SecurityProvider</code> |  | this is an alternative to options.security |
| [options.security] | <code>Security</code> |  | this can ben provided instead of securityProvider, to share a Security class  amid different DataAccess |

<a name="module_DataAccess..DataAccess+security"></a>

#### dataAccess.security
Security function provider for this connection

**Kind**: instance property of [<code>DataAccess</code>](#module_DataAccess..DataAccess)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| security | <code>Security</code> | 

<a name="module_DataAccess..DataAccess+externalUser"></a>

#### dataAccess.externalUser
**Kind**: instance property of [<code>DataAccess</code>](#module_DataAccess..DataAccess)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| externalUser | <code>string</code> | 

<a name="module_DataAccess..DataAccess+persisting"></a>

#### dataAccess.persisting
Set persisting to false if you want to manage manually the opening and closing of the connection
Default is true, so that the underlying connection is open at the creation of the connection and closed
 when the object is destroyed

**Kind**: instance property of [<code>DataAccess</code>](#module_DataAccess..DataAccess)  
**Properties**

| Name | Type |
| --- | --- |
| persisting | <code>boolean</code> | 

<a name="module_DataAccess..DataAccess+sqlConn"></a>

#### dataAccess.sqlConn
underlying DB connection

**Kind**: instance property of [<code>DataAccess</code>](#module_DataAccess..DataAccess)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| sqlConn | <code>SqlDriver</code> | 

<a name="module_DataAccess..DataAccess+callSPWithNamedParams"></a>

#### dataAccess.callSPWithNamedParams(spName, paramList, [raw]) ⇒ <code>Promise.&lt;Array&gt;</code>
call SP with a list of parameters each of which is an object of type sqlParameter having:
 value : the value to be passed to the parameter, if it is not an output parameter
 {bool} [out=false]: true if it is an output parameter
 {string} [sqltype] : a type name compatible with the underlying db, necessary if is an output parameter
 {string} [name] necessary if it is an output parameter
 If any output parameter is given, the corresponding outValue will be filled after the SP has runned
 After returning all tables given by the stored procedure, this method eventually returns
  an object with a property for each output parameter

**Kind**: instance method of [<code>DataAccess</code>](#module_DataAccess..DataAccess)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - (a sequence of arrays)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| spName | <code>string</code> |  |  |
| paramList | <code>Array.&lt;sqlParameter&gt;</code> |  |  |
| [raw] |  | <code>false</code> | when true data will be returned as array(s) of simple values, without calling objectify on it |

**Example**  
```js
var arr = [{name:'idcustomer', value:1}, {name:maxValue, sqlType:int, value:null, out:true}];
 DA.callSPWithNamedParams('getMaxOrder',arr);
 At the end arr will be modified and a outValue added:
     [{name:'idcustomer', value:1}, {name:maxValue, sqlType:int, value:null, out:true, outValue:12}]
```
<a name="module_DataAccess..DataAccess+beginTransaction"></a>

#### dataAccess.beginTransaction(isolationLevel) ⇒ <code>Promise</code>
Begins a transaction

**Kind**: instance method of [<code>DataAccess</code>](#module_DataAccess..DataAccess)  

| Param | Type | Description |
| --- | --- | --- |
| isolationLevel | <code>string</code> | 'READ UNCOMMITTED','READ COMMITTED','REPEATABLE READ','SNAPSHOT','SERIALIZABLE' |

<a name="module_DataAccess..rowState"></a>

### DataAccess~rowState
{detached: string, deleted: string, added: string, unchanged: string, modified: string}

**Kind**: inner constant of [<code>DataAccess</code>](#module_DataAccess)  
<a name="module_DataAccess..getSecurity"></a>

### DataAccess~getSecurity(conn)
Gets the security object and then calls the doneCallBack or errCallBack on errors

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type |
| --- | --- |
| conn | <code>Connection</code> | 

<a name="module_DataAccess..secureGetLastError"></a>

### DataAccess~secureGetLastError() ⇒ <code>string</code> \| <code>null</code>
get lastError without destroying it

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
**Access**: public  
<a name="module_DataAccess..clone"></a>

### DataAccess~clone() ⇒ <code>Promise.&lt;DataAccess&gt;</code>
creates a duplicate of the connection, with same external user and connection string

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
**Returns**: <code>Promise.&lt;DataAccess&gt;</code> - promise to DataAccess  
<a name="module_DataAccess..open"></a>

### DataAccess~open() ⇒ <code>Promise</code>
Opens the underlying connection.
Consecutive calls to this function results in a automatic nesting-opening level to be increased.
 the underlying connection is touched only when nesting-opening level goes from 0 to 1
 If `persisting` is true, calling to open increments nesting-opening level but has no other effect

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
<a name="module_DataAccess..close"></a>

### DataAccess~close() ⇒ <code>Promise</code>
Closes the underlying connection.
Consecutive calls to this function results in a automatic nesting-opening level to be decreased.
 the underlying connection is touched only when nesting-opening level goes from 1 to 0
 If persisting is true, calling to close decrements nesting-opening level but has no other effect.
 In that case, the connection will be automatically closed when DataAccess is destroyed

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
<a name="module_DataAccess..destroy"></a>

### DataAccess~destroy()
Destroy the DataAccess and closes the underlying connection

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
<a name="module_DataAccess..readSingleValue"></a>

### DataAccess~readSingleValue(options) ⇒ <code>Promise.&lt;object&gt;</code>
Read a value from database. If multiple values are returned, the first is taken

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options has those fields: |
| options.tableName | <code>string</code> | table name |
| options.expr | <code>sqlFun</code> \| <code>string</code> | expression to get from table |
| [options.filter] | <code>sqlFun</code> |  |
| [options.orderBy] | <code>string</code> |  |
| [options.environment] | <code>Environment</code> |  |

<a name="module_DataAccess..readLastValue"></a>

### DataAccess~readLastValue(query) ⇒ <code>Promise.&lt;object&gt;</code>
Read a value from database. If multiple values are returned, the last is taken

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | command to run |

<a name="module_DataAccess..runCmd"></a>

### DataAccess~runCmd(cmd) ⇒ <code>Promise.&lt;object&gt;</code>
Read a value from database. If multiple values are returned, the first is taken.
It is similar to readSingleValue but accepts a generic sql command

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>string</code> | should be a command resulting in a single value returned from db.    Other output data will be ignored |

<a name="module_DataAccess..runSql"></a>

### DataAccess~runSql(cmd, [raw]) ⇒ <code>Promise.&lt;(Array.&lt;object&gt;\|{meta: Array.&lt;string&gt;, Array.&lt;rows:object&gt;})&gt;</code>
Read a table from database. If multiple tables are returned, the first is taken.
It is similar to readSingleValue but accepts a generic sql command

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cmd | <code>string</code> |  | should be a command resulting in a table. Only first table got will be returned |
| [raw] | <code>boolean</code> | <code>false</code> | if true, Data will not be objectified |

<a name="module_DataAccess..doSingleDelete"></a>

### DataAccess~doSingleDelete(options) ⇒ <code>Promise.&lt;int&gt;</code>
do a delete Command

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.tableName | <code>string</code> | 
| options.filter | <code>sqlFun</code> | 
| [options.environment] | <code>Environment</code> | 

<a name="module_DataAccess..doSingleInsert"></a>

### DataAccess~doSingleInsert(table, columns, values) ⇒ <code>Promise.&lt;int&gt;</code>
do an insert Command

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>string</code> |  |
| columns | <code>string</code> | array of column names |
| values | <code>string</code> | array of corresponding value |

<a name="module_DataAccess..doSingleUpdate"></a>

### DataAccess~doSingleUpdate(options) ⇒ <code>Promise.&lt;int&gt;</code>
do an update Command

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.table | <code>string</code> | 
| options.filter | <code>sqlFun</code> | 
| options.columns | <code>Array</code> | 
| options.values | <code>Array</code> | 
| [options.environment] | <code>Environment</code> | 

<a name="module_DataAccess..getPostCommand"></a>

### DataAccess~getPostCommand(r, optimisticLocking, environment) ⇒ <code>string</code> \| <code>null</code>
gets the sql cmd to post a row to db. On Error, the command must return errNum

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type |
| --- | --- |
| r | <code>DataRow</code> | 
| optimisticLocking | <code>OptimisticLocking</code> | 
| environment | <code>Environment</code> | 

<a name="module_DataAccess..callSP"></a>

### DataAccess~callSP(spName, paramList, [raw], [timeout]) ⇒ <code>Promise.&lt;Array&gt;</code>
call SP with a list of simple values as parameters. The SP returns a collection of tables.

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - (a sequence of arrays)  

| Param | Type | Description |
| --- | --- | --- |
| spName | <code>string</code> |  |
| paramList | <code>Array.&lt;object&gt;</code> | an array of all sp parameters, in the expected order |
| [raw] |  | if true data will be returned as array of simple values, without calling objectify on it |
| [timeout] | <code>int</code> |  |

**Example**  
```js
DA.callSP('reset_customer',[1])
```
<a name="module_DataAccess..select"></a>

### DataAccess~select(opt, [raw]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Reads data from a table and returns the entire table read

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Array of objects with tableName set to the table name of data read  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>object</code> |  |  |
| [opt.tableName] | <code>string</code> |  | physical table or view to be read |
| [opt.alias] | <code>string</code> |  | table name wanted for the result if different from opt.tableName |
| [opt.columns] | <code>string</code> \| <code>\*</code> |  | column names comma separated |
| [opt.orderBy] | <code>string</code> | <code>null</code> |  |
| [opt.filter] | <code>sqlFun</code> | <code></code> |  |
| [opt.top] | <code>string</code> | <code>null</code> |  |
| [opt.applySecurity] | <code>boolean</code> | <code>true</code> | if true,   security condition is appended to filter |
| [opt.environment] | <code>Environment</code> |  | environment for the current user |
| [raw] | <code>boolean</code> | <code>false</code> | if raw, data returned is not objectified |

<a name="module_DataAccess..pagedSelect"></a>

### DataAccess~pagedSelect(opt, [raw]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Reads data from a table and returns a range of rows

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Array of objects with tableName set to the table name of data read  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>object</code> |  |  |
| [opt.tableName] | <code>string</code> |  | physical table or view to be read |
| [opt.columns] | <code>string</code> \| <code>\*</code> |  | column names comma separated |
| [opt.orderBy] | <code>string</code> | <code>null</code> |  |
| [opt.firstRow] | <code>int</code> | <code>1</code> |  |
| opt.nRows | <code>int</code> |  |  |
| [opt.filter] | <code>sqlFun</code> | <code></code> |  |
| [opt.applySecurity] | <code>boolean</code> | <code>true</code> | if true,   security condition is appended to filter |
| [opt.environment] | <code>Environment</code> |  | environment for the current user |
| [raw] | <code>boolean</code> | <code>false</code> | if raw, data returned is not objectified |

<a name="module_DataAccess..selectRows"></a>

### DataAccess~selectRows(opt, [raw]) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Reads data from a table and returns any row read one by one.
Data is returned in a sequence of notification. At the beginning there will be the meta, then each row.
So the first result will be {meta:[array of column descriptors]} then will follow other results like
 if raw is false : {row:{object read from db}}
 if raw is true : {row:[array of column values]}

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>object</code> |  |  |
| opt.tableName | <code>string</code> |  |  |
| opt.columns | <code>string</code> \| <code>\*</code> |  | column names comma separated |
| [opt.orderBy] | <code>string</code> | <code>null</code> |  |
| [opt.filter] | <code>sqlFun</code> | <code></code> |  |
| [opt.top] | <code>string</code> | <code>null</code> |  |
| [opt.applySecurity] | <code>boolean</code> | <code>true</code> | if true,   security condition is appended to filter |
| [opt.environment] | <code>Environment</code> |  | environment for the current user |
| [raw] | <code>boolean</code> | <code>false</code> | if raw=true, data returned is not objectified |

<a name="module_DataAccess..selectIntoTable"></a>

### DataAccess~selectIntoTable() ⇒ <code>Promise</code>
Merge rows taken from DB to an existent table. If existent rows with same primary key are found, they are
  overwritten.

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options.table | <code>DataTable</code> |  |  |
| [options.columns] | <code>string</code> \| <code>\*</code> |  | column names comma separated |
| [options.orderBy] | <code>string</code> |  |  |
| [options.filter] | <code>sqlFun</code> |  |  |
| [options.top] | <code>string</code> |  |  |
| [options.environment] | <code>Environment</code> |  | environment for the current user |
| [options.applySecurity] | <code>boolean</code> | <code>true</code> | if true,   security condition is appended to filter |

<a name="module_DataAccess..getFormatter"></a>

### DataAccess~getFormatter() ⇒ <code>SqlFormatter</code>
Gets a sql-formatter compatible with this Connection

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  
<a name="module_DataAccess..queryPackets"></a>

### DataAccess~queryPackets(opt, packetSize, [raw]) ⇒ <code>Promise</code>
Gets rows from a db splitting them into packets. Packets are given as soon as they are available.
If raw is false, packet are like {set:number, rows:[array of objects]}
 if raw is true, packet are like {set:number, meta:[array of column descriptors], rows:[array of array of values]}
 the array of columns descriptors (meta) is enriched with a property tableName
 if raw===false  it is returned a series of {tableName: alias, set:set Number, rows: [array of plain objects]
 if raw===true   it is returned a series of {tableName: alias, meta:[array of column names], rows:[raw objects]
 set numbers starts from 0

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>object</code> |  |  |
| opt.tableName | <code>string</code> |  |  |
| [opt.alias] | <code>string</code> |  | optional, table name wanted for the result |
| opt.columns | <code>string</code> \| <code>\*</code> |  | column names comma separated |
| [opt.orderBy] | <code>string</code> | <code>null</code> |  |
| [opt.filter] | <code>sqlFun</code> | <code></code> |  |
| [opt.top] | <code>string</code> | <code>null</code> |  |
| [opt.applySecurity] | <code>boolean</code> | <code>true</code> | if true,   security condition is appended to filter |
| [opt.environment] | <code>Environment</code> |  | environment for the current user |
| packetSize | <code>number</code> |  |  |
| [raw] | <code>boolean</code> | <code>false</code> |  |

<a name="module_DataAccess..multiSelect"></a>

### DataAccess~multiSelect(options) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Executes a multi-select given a list of select in input
DataAccess.multiselect

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.selectList | <code>Array.&lt;Select&gt;</code> |  |  |
| [options.packetSize] | <code>number</code> | <code>0</code> | if present, returns data splitted into packets |
| [options.raw] | <code>boolean</code> | <code>false</code> | if true, raw data is returned |
| [options.applySecurity] | <code>object</code> | <code>true</code> | //true if security must be applied |
| [options.environment] | <code>Environment</code> |  |  |

<a name="module_DataAccess..mergeMultiSelect"></a>

### DataAccess~mergeMultiSelect(selectList, ds, [environment]) ⇒ <code>Promise</code>
Executes a multi-select given a list of select in input and merge all data into a specified DataSet

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Description |
| --- | --- | --- |
| selectList | <code>Array.&lt;Select&gt;</code> |  |
| ds | <code>DataSet</code> |  |
| [environment] | <code>Environment</code> | if provided, security is applied |

<a name="module_DataAccess..mergeRowIntoTable"></a>

### DataAccess~mergeRowIntoTable(table, r)
Merge a row into a table discarding any previous row with same primary key when present

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| r | <code>object</code> | 

<a name="module_DataAccess..selectCount"></a>

### DataAccess~selectCount(options) ⇒ <code>Promise.&lt;int&gt;</code>
Counts row from a table

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.tableName | <code>string</code> |  | 
| [options.filter] | <code>sqlFun</code> | <code></code> | 
| options.environment | <code>Environment</code> |  | 
| [options.applySecurity] | <code>boolean</code> | <code>true</code> | 

<a name="module_DataAccess..objectify"></a>

### DataAccess~objectify(colNames, rows) ⇒ <code>Array</code>
Transforms raw data into plain objects

**Kind**: inner method of [<code>DataAccess</code>](#module_DataAccess)  

| Param | Type |
| --- | --- |
| colNames | <code>Array</code> | 
| rows | <code>Array</code> | 

<a name="module_DataAccess..Deferred"></a>

### DataAccess~Deferred
**Kind**: inner typedef of [<code>DataAccess</code>](#module_DataAccess)  
