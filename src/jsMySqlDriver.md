## Modules

<dl>
<dt><a href="#module_mySqlDriver">mySqlDriver</a></dt>
<dd><p>Interface to Microsoft Sql Server</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#defer">defer</a> : <code><a href="#defer">defer</a></code></dt>
<dd></dd>
</dl>

<a name="module_mySqlDriver"></a>

## mySqlDriver
Interface to Microsoft Sql Server


* [mySqlDriver](#module_mySqlDriver)
    * [~SqlParameter](#module_mySqlDriver..SqlParameter)
        * [new SqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#new_module_mySqlDriver..SqlParameter_new)
        * [.name](#module_mySqlDriver..SqlParameter+name) : <code>string</code> \| <code>undefined</code>
        * [.varName](#module_mySqlDriver..SqlParameter+varName) : <code>string</code> \| <code>undefined</code>
        * [.value](#module_mySqlDriver..SqlParameter+value) : <code>Object</code> \| <code>undefined</code>
        * [.sqltype](#module_mySqlDriver..SqlParameter+sqltype) : <code>string</code> \| <code>undefined</code>
        * [.out](#module_mySqlDriver..SqlParameter+out) : <code>boolean</code> \| <code>undefined</code>
    * [~Connection](#module_mySqlDriver..Connection)
        * [new Connection(options)](#new_module_mySqlDriver..Connection_new)
        * [.opt](#module_mySqlDriver..Connection+opt) : <code>object</code>
        * [.isOpen](#module_mySqlDriver..Connection+isOpen) : <code>boolean</code>
        * [.schema](#module_mySqlDriver..Connection+schema) : <code>string</code>
        * [.transError](#module_mySqlDriver..Connection+transError) : <code>boolean</code>
        * [.isolationLevel](#module_mySqlDriver..Connection+isolationLevel) : <code>String</code>
        * [.edgeConnection](#module_mySqlDriver..Connection+edgeConnection) : <code>EdgeConnection</code>
        * [.checkLogin(login, password)](#module_mySqlDriver..Connection+checkLogin) ⇒ <code>boolean</code>
        * [.variableNameForNBits(num, nbits)](#module_mySqlDriver..Connection+variableNameForNBits)
        * [.getPagedTableCommand()](#module_mySqlDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
        * [.getBitArray(value, nbits)](#module_mySqlDriver..Connection+getBitArray)
        * [.colNameFromVarName(varName)](#module_mySqlDriver..Connection+colNameFromVarName) ⇒ <code>string</code>
        * [.getSelectListOfVariables(vars)](#module_mySqlDriver..Connection+getSelectListOfVariables) ⇒ <code>string</code>
        * [.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#module_mySqlDriver..Connection+createSqlParameter)
        * [.getPagedTableCommand(tableName, filter, firstRow, nRowPerPage, sortBy)](#module_mySqlDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
    * [~mapIsolationLevels](#module_mySqlDriver..mapIsolationLevels) : <code>Object</code>
    * [~useSchema(schema)](#module_mySqlDriver..useSchema) ⇒ <code>\*</code>
    * [~destroy()](#module_mySqlDriver..destroy) ⇒ <code>Deferred</code>
    * [~clone()](#module_mySqlDriver..clone) ⇒ <code>Connection</code>
    * [~setTransactionIsolationLevel(isolationLevel)](#module_mySqlDriver..setTransactionIsolationLevel) ⇒ <code>promise</code>
    * [~queryPackets(query, [raw], [packSize], [timeout])](#module_mySqlDriver..queryPackets) ⇒ <code>\*</code>
    * [~open()](#module_mySqlDriver..open) ⇒ <code>Connection</code>
    * [~close()](#module_mySqlDriver..close) ⇒ <code>promise</code>
    * [~queryLines(query, [raw], [timeout])](#module_mySqlDriver..queryLines) ⇒ <code>\*</code>
    * [~beginTransaction(isolationLevel)](#module_mySqlDriver..beginTransaction) ⇒ <code>\*</code>
    * [~queryBatch(query, [raw], [timeout])](#module_mySqlDriver..queryBatch) ⇒ [<code>defer</code>](#defer)
    * [~commit()](#module_mySqlDriver..commit) ⇒ <code>\*</code>
    * [~rollBack()](#module_mySqlDriver..rollBack) ⇒ <code>\*</code>
    * [~getSelectCommand(options)](#module_mySqlDriver..getSelectCommand) ⇒ <code>string</code>
    * [~getSelectCount(options)](#module_mySqlDriver..getSelectCount) ⇒ <code>string</code>
    * [~getDeleteCommand(options)](#module_mySqlDriver..getDeleteCommand) ⇒ <code>string</code>
    * [~updateBatch(query, [timeout])](#module_mySqlDriver..updateBatch) ⇒ <code>\*</code>
    * [~getInsertCommand(table, columns, values)](#module_mySqlDriver..getInsertCommand) ⇒ <code>string</code>
    * [~getUpdateCommand(options)](#module_mySqlDriver..getUpdateCommand) ⇒ <code>string</code>
    * [~callSPWithNamedParams(options)](#module_mySqlDriver..callSPWithNamedParams) ⇒ <code>String</code>
    * [~callSPWithNamedParams(options)](#module_mySqlDriver..callSPWithNamedParams) ⇒ <code>Array.&lt;Array.&lt;ObjectRow&gt;&gt;</code>
    * [~objectify(colNames, rows)](#module_mySqlDriver..objectify) ⇒ <code>Array</code>
    * [~tableDescriptor(tableName)](#module_mySqlDriver..tableDescriptor) ⇒ <code>TableDescriptor</code>
    * [~appendCommands(cmd)](#module_mySqlDriver..appendCommands) ⇒ <code>string</code>
    * [~sqlTypeForNBits(nbits)](#module_mySqlDriver..sqlTypeForNBits) ⇒ <code>string</code>
    * [~giveErrorNumberDataWasNotWritten(errNumber)](#module_mySqlDriver..giveErrorNumberDataWasNotWritten) ⇒
    * [~getFormatter()](#module_mySqlDriver..getFormatter) ⇒ <code>sqlFormatter</code>

<a name="module_mySqlDriver..SqlParameter"></a>

### mySqlDriver~SqlParameter
SqlParameter

**Kind**: inner class of [<code>mySqlDriver</code>](#module_mySqlDriver)  

* [~SqlParameter](#module_mySqlDriver..SqlParameter)
    * [new SqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#new_module_mySqlDriver..SqlParameter_new)
    * [.name](#module_mySqlDriver..SqlParameter+name) : <code>string</code> \| <code>undefined</code>
    * [.varName](#module_mySqlDriver..SqlParameter+varName) : <code>string</code> \| <code>undefined</code>
    * [.value](#module_mySqlDriver..SqlParameter+value) : <code>Object</code> \| <code>undefined</code>
    * [.sqltype](#module_mySqlDriver..SqlParameter+sqltype) : <code>string</code> \| <code>undefined</code>
    * [.out](#module_mySqlDriver..SqlParameter+out) : <code>boolean</code> \| <code>undefined</code>

<a name="new_module_mySqlDriver..SqlParameter_new"></a>

#### new SqlParameter(paramValue, paramName, varName, sqlType, forOutput)

| Param | Type |
| --- | --- |
| paramValue | <code>object</code> | 
| paramName | <code>string</code> | 
| varName | <code>string</code> | 
| sqlType | <code>string</code> | 
| forOutput | <code>boolean</code> | 

<a name="module_mySqlDriver..SqlParameter+name"></a>

#### sqlParameter.name : <code>string</code> \| <code>undefined</code>
Optional parameter name, anyway there is no named param columns in mySql so it has no real meaning, but it is used as a default to colName  (see below)

**Kind**: instance property of [<code>SqlParameter</code>](#module_mySqlDriver..SqlParameter)  
<a name="module_mySqlDriver..SqlParameter+varName"></a>

#### sqlParameter.varName : <code>string</code> \| <code>undefined</code>
Optional name for the variable that will store the result, in case of output variables. When not present, it is assumed to be equal to paramName.

**Kind**: instance property of [<code>SqlParameter</code>](#module_mySqlDriver..SqlParameter)  
<a name="module_mySqlDriver..SqlParameter+value"></a>

#### sqlParameter.value : <code>Object</code> \| <code>undefined</code>
Parameter value

**Kind**: instance property of [<code>SqlParameter</code>](#module_mySqlDriver..SqlParameter)  
<a name="module_mySqlDriver..SqlParameter+sqltype"></a>

#### sqlParameter.sqltype : <code>string</code> \| <code>undefined</code>
Sql type declaration for output parameters

**Kind**: instance property of [<code>SqlParameter</code>](#module_mySqlDriver..SqlParameter)  
<a name="module_mySqlDriver..SqlParameter+out"></a>

#### sqlParameter.out : <code>boolean</code> \| <code>undefined</code>
Output flag , true when it is output parameter

**Kind**: instance property of [<code>SqlParameter</code>](#module_mySqlDriver..SqlParameter)  
<a name="module_mySqlDriver..Connection"></a>

### mySqlDriver~Connection
**Kind**: inner class of [<code>mySqlDriver</code>](#module_mySqlDriver)  

* [~Connection](#module_mySqlDriver..Connection)
    * [new Connection(options)](#new_module_mySqlDriver..Connection_new)
    * [.opt](#module_mySqlDriver..Connection+opt) : <code>object</code>
    * [.isOpen](#module_mySqlDriver..Connection+isOpen) : <code>boolean</code>
    * [.schema](#module_mySqlDriver..Connection+schema) : <code>string</code>
    * [.transError](#module_mySqlDriver..Connection+transError) : <code>boolean</code>
    * [.isolationLevel](#module_mySqlDriver..Connection+isolationLevel) : <code>String</code>
    * [.edgeConnection](#module_mySqlDriver..Connection+edgeConnection) : <code>EdgeConnection</code>
    * [.checkLogin(login, password)](#module_mySqlDriver..Connection+checkLogin) ⇒ <code>boolean</code>
    * [.variableNameForNBits(num, nbits)](#module_mySqlDriver..Connection+variableNameForNBits)
    * [.getPagedTableCommand()](#module_mySqlDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
    * [.getBitArray(value, nbits)](#module_mySqlDriver..Connection+getBitArray)
    * [.colNameFromVarName(varName)](#module_mySqlDriver..Connection+colNameFromVarName) ⇒ <code>string</code>
    * [.getSelectListOfVariables(vars)](#module_mySqlDriver..Connection+getSelectListOfVariables) ⇒ <code>string</code>
    * [.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#module_mySqlDriver..Connection+createSqlParameter)
    * [.getPagedTableCommand(tableName, filter, firstRow, nRowPerPage, sortBy)](#module_mySqlDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>

<a name="new_module_mySqlDriver..Connection_new"></a>

#### new Connection(options)
Provides function to interact with a Sql Server database


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | {string} [options.driver='SQL Server Native Client 11.0'] Driver name {string} [options.useTrustedConnection=true] is assumed true if no user name is provided {string} [options.user] user name for connecting to db {string} [options.pwd] user password for connecting to db {string} [options.timeOut] time out to connect default 600 {string} [options.database] database name {string} [options.defaultSchema=options.user ||'DBO'] default schema associated with user name {string} [options.connectionString] connection string to connect (can be used instead of all previous listed) |

<a name="module_mySqlDriver..Connection+opt"></a>

#### connection.opt : <code>object</code>
Stores the sql-connect options used for this connection

**Kind**: instance property of [<code>Connection</code>](#module_mySqlDriver..Connection)  
**Properties**

| Name |
| --- |
| opt | 

<a name="module_mySqlDriver..Connection+isOpen"></a>

#### connection.isOpen : <code>boolean</code>
Indicates the open/closed state of the underlying connection

**Kind**: instance property of [<code>Connection</code>](#module_mySqlDriver..Connection)  
**Properties**

| Name |
| --- |
| isOpen | 

<a name="module_mySqlDriver..Connection+schema"></a>

#### connection.schema : <code>string</code>
Current schema in use for this connection

**Kind**: instance property of [<code>Connection</code>](#module_mySqlDriver..Connection)  
**Properties**

| Name |
| --- |
| schema | 

<a name="module_mySqlDriver..Connection+transError"></a>

#### connection.transError : <code>boolean</code>
Current transaction state, true if any rollback has been invoked

**Kind**: instance property of [<code>Connection</code>](#module_mySqlDriver..Connection)  
**Propery**: transError  
<a name="module_mySqlDriver..Connection+isolationLevel"></a>

#### connection.isolationLevel : <code>String</code>
current isolation level

**Kind**: instance property of [<code>Connection</code>](#module_mySqlDriver..Connection)  
**Properties**

| Name |
| --- |
| isolationLevel | 

<a name="module_mySqlDriver..Connection+edgeConnection"></a>

#### connection.edgeConnection : <code>EdgeConnection</code>
**Kind**: instance property of [<code>Connection</code>](#module_mySqlDriver..Connection)  
<a name="module_mySqlDriver..Connection+checkLogin"></a>

#### connection.checkLogin(login, password) ⇒ <code>boolean</code>
Check login/password, returns true if successful, false if user/password does not match

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type |
| --- | --- |
| login | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_mySqlDriver..Connection+variableNameForNBits"></a>

#### connection.variableNameForNBits(num, nbits)
Returns a variable name identified by a number for a variable that can contain n bits of information

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type |
| --- | --- |
| num | <code>int</code> | 
| nbits | <code>int</code> | 

<a name="module_mySqlDriver..Connection+getPagedTableCommand"></a>

#### connection.getPagedTableCommand() ⇒ <code>string</code>
Get a command to select a bunch of rows

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| options.tableName | <code>string</code> |  |
| options.nRows | <code>int</code> |  |
| options.filter | <code>string</code> | , |
| options.firstRow | <code>int</code> |  |
| options.sorting | <code>string</code> | , |
| options.environment | <code>Context</code> |  |

<a name="module_mySqlDriver..Connection+getBitArray"></a>

#### connection.getBitArray(value, nbits)
Type of value depends on nbits

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> |  |
| nbits | <code>int</code> | return {string} |

<a name="module_mySqlDriver..Connection+colNameFromVarName"></a>

#### connection.colNameFromVarName(varName) ⇒ <code>string</code>
Gives the column name for a variable name

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type |
| --- | --- |
| varName | <code>string</code> | 

<a name="module_mySqlDriver..Connection+getSelectListOfVariables"></a>

#### connection.getSelectListOfVariables(vars) ⇒ <code>string</code>
Get a command to convert a list of variables into a table with a column having a variable for each column

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type |
| --- | --- |
| vars | <code>Array.&lt;varName:string, colName:string&gt;</code> | 

<a name="module_mySqlDriver..Connection+createSqlParameter"></a>

#### connection.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)
Create a sql parameter

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| paramValue | <code>object</code> |  |
| paramName | <code>string</code> | parameter name, as declared in the stored procedure |
| varName | <code>string</code> | column name to extract as output |
| sqlType | <code>string</code> |  |
| forOutput | <code>boolean</code> |  |

<a name="module_mySqlDriver..Connection+getPagedTableCommand"></a>

#### connection.getPagedTableCommand(tableName, filter, firstRow, nRowPerPage, sortBy) ⇒ <code>string</code>
Gets the sql command to read from a table nRowPerPage rows starting from firstRow

**Kind**: instance method of [<code>Connection</code>](#module_mySqlDriver..Connection)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| filter | <code>string</code> | 
| firstRow | <code>number</code> | 
| nRowPerPage | <code>number</code> | 
| sortBy | <code>string</code> | 

<a name="module_mySqlDriver..mapIsolationLevels"></a>

### mySqlDriver~mapIsolationLevels : <code>Object</code>
Maps Standard isolation levels to DBMS-level isolation levels. In case of MS SqlServer, the corrispondence is 1:1

**Kind**: inner constant of [<code>mySqlDriver</code>](#module_mySqlDriver)  
**Properties**

| Name |
| --- |
| allIsolationLevels | 

<a name="module_mySqlDriver..useSchema"></a>

### mySqlDriver~useSchema(schema) ⇒ <code>\*</code>
Change current used schema for this connection. MySql does not support schemas

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| schema | <code>string</code> | 

<a name="module_mySqlDriver..destroy"></a>

### mySqlDriver~destroy() ⇒ <code>Deferred</code>
Destroy this connection and closes the underlying connection

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="module_mySqlDriver..clone"></a>

### mySqlDriver~clone() ⇒ <code>Connection</code>
Creates a duplicate of this connection

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="module_mySqlDriver..setTransactionIsolationLevel"></a>

### mySqlDriver~setTransactionIsolationLevel(isolationLevel) ⇒ <code>promise</code>
Sets the Transaction isolation level for current connection

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Description |
| --- | --- | --- |
| isolationLevel | <code>string</code> | one of 'READ_UNCOMMITTED','READ_COMMITTED','REPEATABLE_READ','SNAPSHOT','SERIALIZABLE' |

<a name="module_mySqlDriver..queryPackets"></a>

### mySqlDriver~queryPackets(query, [raw], [packSize], [timeout]) ⇒ <code>\*</code>
Gets data packets row at a time

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Default |
| --- | --- | --- |
| query | <code>string</code> |  | 
| [raw] | <code>boolean</code> | <code>false</code> | 
| [packSize] | <code>number</code> | <code>0</code> | 
| [timeout] | <code>number</code> |  | 

<a name="module_mySqlDriver..open"></a>

### mySqlDriver~open() ⇒ <code>Connection</code>
Opens the underlying connection and sets the current specified schema

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="module_mySqlDriver..close"></a>

### mySqlDriver~close() ⇒ <code>promise</code>
Closes the underlying connection

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="module_mySqlDriver..queryLines"></a>

### mySqlDriver~queryLines(query, [raw], [timeout]) ⇒ <code>\*</code>
Gets a table and returns each SINGLE row by notification. Could eventually return more than a table indeedFor each table read emits a {meta:[column descriptors]} notification, and for each row of data emits a  if raw= false: {row:object read from db}  if raw= true: {row: [array of values read from db]}

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Default |
| --- | --- | --- |
| query | <code>string</code> |  | 
| [raw] | <code>boolean</code> | <code>false</code> | 
| [timeout] | <code>number</code> |  | 

<a name="module_mySqlDriver..beginTransaction"></a>

### mySqlDriver~beginTransaction(isolationLevel) ⇒ <code>\*</code>
Begins a  transaction

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Description |
| --- | --- | --- |
| isolationLevel | <code>string</code> | one of 'READ_UNCOMMITTED','READ_COMMITTED','REPEATABLE_READ','SNAPSHOT','SERIALIZABLE' |

<a name="module_mySqlDriver..queryBatch"></a>

### mySqlDriver~queryBatch(query, [raw], [timeout]) ⇒ [<code>defer</code>](#defer)
Executes a sql command and returns all sets of results. Each Results is given via a notify or resolve

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
**Returns**: [<code>defer</code>](#defer) - a sequence of {[array of plain objects]} or {meta:[column names],rows:[arrays of raw data]}  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> |  |
| [raw] | <code>boolean</code> | if true, data are left in raw state and will be objectified by the client |
| [timeout] | <code>number</code> |  |

<a name="module_mySqlDriver..commit"></a>

### mySqlDriver~commit() ⇒ <code>\*</code>
Commits a transaction

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="module_mySqlDriver..rollBack"></a>

### mySqlDriver~rollBack() ⇒ <code>\*</code>
RollBacks a transaction

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="module_mySqlDriver..getSelectCommand"></a>

### mySqlDriver~getSelectCommand(options) ⇒ <code>string</code>
Get the string representing a select command

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.tableName | <code>string</code> |  |
| options.columns | <code>string</code> | list of columns or expressions, this is taken "as is" to compose the command |
| [options.filter] | <code>jsDataQuery</code> | this is skipped if it is a constantly true condition |
| [options.top] | <code>string</code> |  |
| [options.orderBy] | <code>string</code> |  |
| [options.environment] | <code>object</code> |  |

<a name="module_mySqlDriver..getSelectCount"></a>

### mySqlDriver~getSelectCount(options) ⇒ <code>string</code>
Get the string representing a select count(*) command

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.tableName | <code>string</code> | 
| [options.filter] | <code>jsDataQuery</code> | 
| [options.environment] | <code>object</code> | 

<a name="module_mySqlDriver..getDeleteCommand"></a>

### mySqlDriver~getDeleteCommand(options) ⇒ <code>string</code>
Get the string representing a delete command

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.tableName | <code>string</code> | 
| [options.filter] | <code>jsDataQuery</code> | 
| [options.environment] | <code>object</code> | 

<a name="module_mySqlDriver..updateBatch"></a>

### mySqlDriver~updateBatch(query, [timeout]) ⇒ <code>\*</code>
Executes a series of sql update/insert/delete commands

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 
| [timeout] | <code>number</code> | 

<a name="module_mySqlDriver..getInsertCommand"></a>

### mySqlDriver~getInsertCommand(table, columns, values) ⇒ <code>string</code>
Get the string representing an insert command

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| table | <code>string</code> | 
| columns | <code>Array.&lt;string&gt;</code> | 
| values | <code>Array.&lt;Object&gt;</code> | 

<a name="module_mySqlDriver..getUpdateCommand"></a>

### mySqlDriver~getUpdateCommand(options) ⇒ <code>string</code>
Get the string representing an update command

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.table | <code>string</code> | 
| options.filter | <code>jsDataQuery</code> | 
| options.columns | <code>Array.&lt;string&gt;</code> | 
| options.values | <code>Array.&lt;Object&gt;</code> | 
| [options.environment] | <code>object</code> | 

<a name="module_mySqlDriver..callSPWithNamedParams"></a>

### mySqlDriver~callSPWithNamedParams(options) ⇒ <code>String</code>
evaluates the sql command to call aSP with a list of parameters each of which is an object having: value, optional 'sqltype' name compatible with the used db. it is mandatory if is an output parameter optional out: true if it is an output parameter The SP eventually returns a collection of tables and at the end an object with a property for each output parameter of the SP Unfortunately there is NO named parameter calling in MySql so it will call the SP by param order mysql> CALL test(@a, @b); mysql> SELECT @a AS a, @b AS b; User-defined variables (prefixed with @): You can access any user-defined variable without declaring it or initializing it.     If you refer to a variable that has not been initialized, it has a value of NULL and a type of string.

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.spName | <code>string</code> |  |
| options.paramList | <code>Array.&lt;SqlParameter&gt;</code> |  |
| [options.skipSelect] | <code>boolean</code> | when true, the select of output parameter is omitted |

<a name="module_mySqlDriver..callSPWithNamedParams"></a>

### mySqlDriver~callSPWithNamedParams(options) ⇒ <code>Array.&lt;Array.&lt;ObjectRow&gt;&gt;</code>
call SP with a list of parameters each of which is an object having: value, optional 'sqltype' name compatible with the used db, necessary if is an output parameter optional out: true if it is an output parameter The SP eventually returns a collection of tables and at the end an object with a property for each output parameter of the SP

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.spName | <code>string</code> |  | 
| options.paramList | <code>Array.&lt;SqlParameter&gt;</code> |  | 
| [options.raw] | <code>boolean</code> | <code>false</code> | 
| [options.timeout] | <code>number</code> |  | 

<a name="module_mySqlDriver..objectify"></a>

### mySqlDriver~objectify(colNames, rows) ⇒ <code>Array</code>
Transforms raw data into plain objects

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| colNames | <code>Array</code> | 
| rows | <code>Array</code> | 

<a name="module_mySqlDriver..tableDescriptor"></a>

### mySqlDriver~tableDescriptor(tableName) ⇒ <code>TableDescriptor</code>
Gets information about a db table

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_mySqlDriver..appendCommands"></a>

### mySqlDriver~appendCommands(cmd) ⇒ <code>string</code>
get a sql command given by a sequence of specified sql commands

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| cmd | <code>Array.&lt;string&gt;</code> | 

<a name="module_mySqlDriver..sqlTypeForNBits"></a>

### mySqlDriver~sqlTypeForNBits(nbits) ⇒ <code>string</code>
get Sql type to contain n bits

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  

| Param | Type |
| --- | --- |
| nbits | <code>int</code> | 

<a name="module_mySqlDriver..giveErrorNumberDataWasNotWritten"></a>

### mySqlDriver~giveErrorNumberDataWasNotWritten(errNumber) ⇒
Returns a command that should return a number if last write operation did not have success

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
**Returns**: string  
**Access**: public  

| Param | Type |
| --- | --- |
| errNumber | <code>number</code> | 

<a name="module_mySqlDriver..getFormatter"></a>

### mySqlDriver~getFormatter() ⇒ <code>sqlFormatter</code>
Gets the formatter for this kind of connection

**Kind**: inner method of [<code>mySqlDriver</code>](#module_mySqlDriver)  
<a name="defer"></a>

## defer : [<code>defer</code>](#defer)
**Kind**: global constant  
**Properties**

| Name |
| --- |
| Deferred | 

