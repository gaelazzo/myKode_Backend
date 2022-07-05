## Modules

<dl>
<dt><a href="#module_sqlServerDriver">sqlServerDriver</a></dt>
<dd><p>Interface to Microsoft Sql Server</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Deferred">Deferred</a></dt>
<dd></dd>
</dl>

<a name="module_sqlServerDriver"></a>

## sqlServerDriver
Interface to Microsoft Sql Server


* [sqlServerDriver](#module_sqlServerDriver)
    * [~SqlParameter](#module_sqlServerDriver..SqlParameter)
        * [new SqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#new_module_sqlServerDriver..SqlParameter_new)
        * [.name](#module_sqlServerDriver..SqlParameter+name) : <code>string</code> \| <code>undefined</code>
        * [.value](#module_sqlServerDriver..SqlParameter+value) : <code>object</code> \| <code>undefined</code>
        * [.varName](#module_sqlServerDriver..SqlParameter+varName)
        * [.sqltype](#module_sqlServerDriver..SqlParameter+sqltype) : <code>string</code> \| <code>undefined</code>
        * [.out](#module_sqlServerDriver..SqlParameter+out) : <code>boolean</code> \| <code>undefined</code>
    * [~Connection](#module_sqlServerDriver..Connection)
        * [new Connection()](#new_module_sqlServerDriver..Connection_new)
        * [new Connection(options)](#new_module_sqlServerDriver..Connection_new)
        * [.opt](#module_sqlServerDriver..Connection+opt) : <code>object</code>
        * [.isOpen](#module_sqlServerDriver..Connection+isOpen) : <code>boolean</code>
        * [.schema](#module_sqlServerDriver..Connection+schema) : <code>string</code>
        * [.transError](#module_sqlServerDriver..Connection+transError) : <code>boolean</code>
        * [.isolationLevel](#module_sqlServerDriver..Connection+isolationLevel) : <code>String</code>
        * [.edgeConnection](#module_sqlServerDriver..Connection+edgeConnection) : <code>EdgeConnection</code>
        * [.checkLogin(login, password)](#module_sqlServerDriver..Connection+checkLogin) ⇒ <code>boolean</code>
        * [.variableNameForNBits(num, nbits)](#module_sqlServerDriver..Connection+variableNameForNBits)
        * [.colNameFromVarName(varName)](#module_sqlServerDriver..Connection+colNameFromVarName) ⇒ <code>string</code>
        * [.getSelectListOfVariables(vars)](#module_sqlServerDriver..Connection+getSelectListOfVariables) ⇒ <code>string</code>
        * [.getPagedTableCommand()](#module_sqlServerDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
        * [.getBitArray(value, nbits)](#module_sqlServerDriver..Connection+getBitArray)
        * [.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#module_sqlServerDriver..Connection+createSqlParameter)
    * [~Connection](#module_sqlServerDriver..Connection)
        * [new Connection()](#new_module_sqlServerDriver..Connection_new)
        * [new Connection(options)](#new_module_sqlServerDriver..Connection_new)
        * [.opt](#module_sqlServerDriver..Connection+opt) : <code>object</code>
        * [.isOpen](#module_sqlServerDriver..Connection+isOpen) : <code>boolean</code>
        * [.schema](#module_sqlServerDriver..Connection+schema) : <code>string</code>
        * [.transError](#module_sqlServerDriver..Connection+transError) : <code>boolean</code>
        * [.isolationLevel](#module_sqlServerDriver..Connection+isolationLevel) : <code>String</code>
        * [.edgeConnection](#module_sqlServerDriver..Connection+edgeConnection) : <code>EdgeConnection</code>
        * [.checkLogin(login, password)](#module_sqlServerDriver..Connection+checkLogin) ⇒ <code>boolean</code>
        * [.variableNameForNBits(num, nbits)](#module_sqlServerDriver..Connection+variableNameForNBits)
        * [.colNameFromVarName(varName)](#module_sqlServerDriver..Connection+colNameFromVarName) ⇒ <code>string</code>
        * [.getSelectListOfVariables(vars)](#module_sqlServerDriver..Connection+getSelectListOfVariables) ⇒ <code>string</code>
        * [.getPagedTableCommand()](#module_sqlServerDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
        * [.getBitArray(value, nbits)](#module_sqlServerDriver..Connection+getBitArray)
        * [.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#module_sqlServerDriver..Connection+createSqlParameter)
    * [~mapIsolationLevels](#module_sqlServerDriver..mapIsolationLevels) : <code>Object</code>
    * [~useSchema(schema)](#module_sqlServerDriver..useSchema) ⇒ <code>\*</code>
    * [~destroy()](#module_sqlServerDriver..destroy) ⇒ [<code>Deferred</code>](#Deferred)
    * [~clone()](#module_sqlServerDriver..clone) ⇒ <code>Connection</code>
    * [~setTransactionIsolationLevel(isolationLevel)](#module_sqlServerDriver..setTransactionIsolationLevel) ⇒ <code>promise</code>
    * [~open()](#module_sqlServerDriver..open) ⇒ <code>Connection</code>
    * [~queryPackets(query, [raw], [packSize], [timeout])](#module_sqlServerDriver..queryPackets) ⇒ <code>\*</code>
    * [~close()](#module_sqlServerDriver..close) ⇒ <code>promise</code>
    * [~beginTransaction(isolationLevel)](#module_sqlServerDriver..beginTransaction) ⇒ <code>\*</code>
    * [~commit()](#module_sqlServerDriver..commit) ⇒ <code>\*</code>
    * [~rollBack()](#module_sqlServerDriver..rollBack) ⇒ <code>\*</code>
    * [~getSelectCommand(options)](#module_sqlServerDriver..getSelectCommand) ⇒ <code>string</code>
    * [~getSelectCount(options)](#module_sqlServerDriver..getSelectCount) ⇒ <code>string</code>
    * [~updateBatch(query, [timeout])](#module_sqlServerDriver..updateBatch) ⇒ <code>\*</code>
    * [~getDeleteCommand(options)](#module_sqlServerDriver..getDeleteCommand) ⇒ <code>string</code>
    * [~getInsertCommand(table, columns, values)](#module_sqlServerDriver..getInsertCommand) ⇒ <code>string</code>
    * [~getUpdateCommand(options)](#module_sqlServerDriver..getUpdateCommand) ⇒ <code>string</code>
    * [~callSPWithNamedParams(options)](#module_sqlServerDriver..callSPWithNamedParams) ⇒ <code>String</code>
    * [~callSPWithNamedParams(options)](#module_sqlServerDriver..callSPWithNamedParams) ⇒ <code>Array.&lt;object&gt;</code>
    * [~objectify(colNames, rows)](#module_sqlServerDriver..objectify) ⇒ <code>Array</code>
    * [~tableDescriptor(tableName)](#module_sqlServerDriver..tableDescriptor) ⇒ <code>TableDescriptor</code>
    * [~appendCommands(cmd)](#module_sqlServerDriver..appendCommands) ⇒ <code>string</code>
    * [~queryLines(query, [raw], [timeout])](#module_sqlServerDriver..queryLines) ⇒ <code>\*</code>
    * [~queryBatch(query, [raw], [timeout])](#module_sqlServerDriver..queryBatch) ⇒ <code>Promise</code>
    * [~giveErrorNumberDataWasNotWritten(errNumber)](#module_sqlServerDriver..giveErrorNumberDataWasNotWritten) ⇒
    * [~sqlTypeForNBits(nbits)](#module_sqlServerDriver..sqlTypeForNBits) ⇒ <code>string</code>
    * [~giveConstant(c)](#module_sqlServerDriver..giveConstant) ⇒
    * [~getFormatter()](#module_sqlServerDriver..getFormatter) ⇒ <code>sqlFormatter</code>
    * [~run(script, [timeout])](#module_sqlServerDriver..run) ⇒ <code>\*</code>

<a name="module_sqlServerDriver..SqlParameter"></a>

### sqlServerDriver~SqlParameter
SqlParameter

**Kind**: inner class of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

* [~SqlParameter](#module_sqlServerDriver..SqlParameter)
    * [new SqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#new_module_sqlServerDriver..SqlParameter_new)
    * [.name](#module_sqlServerDriver..SqlParameter+name) : <code>string</code> \| <code>undefined</code>
    * [.value](#module_sqlServerDriver..SqlParameter+value) : <code>object</code> \| <code>undefined</code>
    * [.varName](#module_sqlServerDriver..SqlParameter+varName)
    * [.sqltype](#module_sqlServerDriver..SqlParameter+sqltype) : <code>string</code> \| <code>undefined</code>
    * [.out](#module_sqlServerDriver..SqlParameter+out) : <code>boolean</code> \| <code>undefined</code>

<a name="new_module_sqlServerDriver..SqlParameter_new"></a>

#### new SqlParameter(paramValue, paramName, varName, sqlType, forOutput)

| Param | Type |
| --- | --- |
| paramValue | <code>object</code> | 
| paramName | <code>string</code> | 
| varName | <code>string</code> | 
| sqlType | <code>string</code> | 
| forOutput | <code>boolean</code> | 

<a name="module_sqlServerDriver..SqlParameter+name"></a>

#### sqlParameter.name : <code>string</code> \| <code>undefined</code>
Optional parameter name

**Kind**: instance property of [<code>SqlParameter</code>](#module_sqlServerDriver..SqlParameter)  
<a name="module_sqlServerDriver..SqlParameter+value"></a>

#### sqlParameter.value : <code>object</code> \| <code>undefined</code>
Parameter value

**Kind**: instance property of [<code>SqlParameter</code>](#module_sqlServerDriver..SqlParameter)  
<a name="module_sqlServerDriver..SqlParameter+varName"></a>

#### sqlParameter.varName
Optional name for the variable that will store the result, in case of output variables. When not present, it is assumed to
 be equal to paramName.

**Kind**: instance property of [<code>SqlParameter</code>](#module_sqlServerDriver..SqlParameter)  
<a name="module_sqlServerDriver..SqlParameter+sqltype"></a>

#### sqlParameter.sqltype : <code>string</code> \| <code>undefined</code>
Sql type declaration for output parameters

**Kind**: instance property of [<code>SqlParameter</code>](#module_sqlServerDriver..SqlParameter)  
<a name="module_sqlServerDriver..SqlParameter+out"></a>

#### sqlParameter.out : <code>boolean</code> \| <code>undefined</code>
Output flag , true when it is output parameter

**Kind**: instance property of [<code>SqlParameter</code>](#module_sqlServerDriver..SqlParameter)  
<a name="module_sqlServerDriver..Connection"></a>

### sqlServerDriver~Connection
**Kind**: inner class of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

* [~Connection](#module_sqlServerDriver..Connection)
    * [new Connection()](#new_module_sqlServerDriver..Connection_new)
    * [new Connection(options)](#new_module_sqlServerDriver..Connection_new)
    * [.opt](#module_sqlServerDriver..Connection+opt) : <code>object</code>
    * [.isOpen](#module_sqlServerDriver..Connection+isOpen) : <code>boolean</code>
    * [.schema](#module_sqlServerDriver..Connection+schema) : <code>string</code>
    * [.transError](#module_sqlServerDriver..Connection+transError) : <code>boolean</code>
    * [.isolationLevel](#module_sqlServerDriver..Connection+isolationLevel) : <code>String</code>
    * [.edgeConnection](#module_sqlServerDriver..Connection+edgeConnection) : <code>EdgeConnection</code>
    * [.checkLogin(login, password)](#module_sqlServerDriver..Connection+checkLogin) ⇒ <code>boolean</code>
    * [.variableNameForNBits(num, nbits)](#module_sqlServerDriver..Connection+variableNameForNBits)
    * [.colNameFromVarName(varName)](#module_sqlServerDriver..Connection+colNameFromVarName) ⇒ <code>string</code>
    * [.getSelectListOfVariables(vars)](#module_sqlServerDriver..Connection+getSelectListOfVariables) ⇒ <code>string</code>
    * [.getPagedTableCommand()](#module_sqlServerDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
    * [.getBitArray(value, nbits)](#module_sqlServerDriver..Connection+getBitArray)
    * [.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#module_sqlServerDriver..Connection+createSqlParameter)

<a name="new_module_sqlServerDriver..Connection_new"></a>

#### new Connection()
Provides function to interact with a Sql Server database

<a name="new_module_sqlServerDriver..Connection_new"></a>

#### new Connection(options)
Create a connection


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | {string} [options.driver='SQL Server Native Client 11.0'] Driver name {string} [options.useTrustedConnection=true] is assumed true if no user name is provided {string} [options.user] user name for connecting to db {string} [options.pwd] user password for connecting to db {string} [options.timeOut] time out to connect default 600 {string} [options.database] database name {string} [options.sqlCompiler] Edge Compiler {string} [options.defaultSchema=options.user ||'DBO'] default schema associated with user name {string} [options.connectionString] connection string to connect (can be used instead of all previous listed) |

<a name="module_sqlServerDriver..Connection+opt"></a>

#### connection.opt : <code>object</code>
Stores the sql-connect options used for this connection

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| opt | 

<a name="module_sqlServerDriver..Connection+isOpen"></a>

#### connection.isOpen : <code>boolean</code>
Indicates the open/closed state of the underlying connection

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| isOpen | 

<a name="module_sqlServerDriver..Connection+schema"></a>

#### connection.schema : <code>string</code>
Current schema in use for this connection

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| schema | 

<a name="module_sqlServerDriver..Connection+transError"></a>

#### connection.transError : <code>boolean</code>
Current transaction state, true if any rollback has been invoked

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Propery**: transError  
<a name="module_sqlServerDriver..Connection+isolationLevel"></a>

#### connection.isolationLevel : <code>String</code>
current isolation level

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| isolationLevel | 

<a name="module_sqlServerDriver..Connection+edgeConnection"></a>

#### connection.edgeConnection : <code>EdgeConnection</code>
**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
<a name="module_sqlServerDriver..Connection+checkLogin"></a>

#### connection.checkLogin(login, password) ⇒ <code>boolean</code>
Check login/password, returns true if successful, false if user/password does not match

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| login | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_sqlServerDriver..Connection+variableNameForNBits"></a>

#### connection.variableNameForNBits(num, nbits)
Returns a variable name identified by a number for a variable that can contain n bits of information

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| num | <code>int</code> | 
| nbits | <code>int</code> | 

<a name="module_sqlServerDriver..Connection+colNameFromVarName"></a>

#### connection.colNameFromVarName(varName) ⇒ <code>string</code>
Gives the column name for a variable name

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| varName | <code>string</code> | 

<a name="module_sqlServerDriver..Connection+getSelectListOfVariables"></a>

#### connection.getSelectListOfVariables(vars) ⇒ <code>string</code>
Get a command to convert a list of variables into a table with a column having a variable for each column

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| vars | <code>Array.&lt;{varName:string, colName:string}&gt;</code> | 

<a name="module_sqlServerDriver..Connection+getPagedTableCommand"></a>

#### connection.getPagedTableCommand() ⇒ <code>string</code>
Get a command to select a bunch of rows

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| options.tableName | <code>string</code> |  |
| options.nRows | <code>int</code> |  |
| options.filter | <code>string</code> | , |
| options.firstRow | <code>int</code> |  |
| options.sorting | <code>string</code> | , |
| options.environment | <code>Context</code> |  |

<a name="module_sqlServerDriver..Connection+getBitArray"></a>

#### connection.getBitArray(value, nbits)
Type of value depends on nbits

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> |  |
| nbits | <code>int</code> | return {string} |

<a name="module_sqlServerDriver..Connection+createSqlParameter"></a>

#### connection.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)
Create a sql parameter

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| paramValue | <code>object</code> | 
| paramName | <code>string</code> | 
| varName | <code>string</code> | 
| sqlType | <code>string</code> | 
| forOutput | <code>boolean</code> | 

<a name="module_sqlServerDriver..Connection"></a>

### sqlServerDriver~Connection
**Kind**: inner class of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

* [~Connection](#module_sqlServerDriver..Connection)
    * [new Connection()](#new_module_sqlServerDriver..Connection_new)
    * [new Connection(options)](#new_module_sqlServerDriver..Connection_new)
    * [.opt](#module_sqlServerDriver..Connection+opt) : <code>object</code>
    * [.isOpen](#module_sqlServerDriver..Connection+isOpen) : <code>boolean</code>
    * [.schema](#module_sqlServerDriver..Connection+schema) : <code>string</code>
    * [.transError](#module_sqlServerDriver..Connection+transError) : <code>boolean</code>
    * [.isolationLevel](#module_sqlServerDriver..Connection+isolationLevel) : <code>String</code>
    * [.edgeConnection](#module_sqlServerDriver..Connection+edgeConnection) : <code>EdgeConnection</code>
    * [.checkLogin(login, password)](#module_sqlServerDriver..Connection+checkLogin) ⇒ <code>boolean</code>
    * [.variableNameForNBits(num, nbits)](#module_sqlServerDriver..Connection+variableNameForNBits)
    * [.colNameFromVarName(varName)](#module_sqlServerDriver..Connection+colNameFromVarName) ⇒ <code>string</code>
    * [.getSelectListOfVariables(vars)](#module_sqlServerDriver..Connection+getSelectListOfVariables) ⇒ <code>string</code>
    * [.getPagedTableCommand()](#module_sqlServerDriver..Connection+getPagedTableCommand) ⇒ <code>string</code>
    * [.getBitArray(value, nbits)](#module_sqlServerDriver..Connection+getBitArray)
    * [.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)](#module_sqlServerDriver..Connection+createSqlParameter)

<a name="new_module_sqlServerDriver..Connection_new"></a>

#### new Connection()
Provides function to interact with a Sql Server database

<a name="new_module_sqlServerDriver..Connection_new"></a>

#### new Connection(options)
Create a connection


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | {string} [options.driver='SQL Server Native Client 11.0'] Driver name {string} [options.useTrustedConnection=true] is assumed true if no user name is provided {string} [options.user] user name for connecting to db {string} [options.pwd] user password for connecting to db {string} [options.timeOut] time out to connect default 600 {string} [options.database] database name {string} [options.sqlCompiler] Edge Compiler {string} [options.defaultSchema=options.user ||'DBO'] default schema associated with user name {string} [options.connectionString] connection string to connect (can be used instead of all previous listed) |

<a name="module_sqlServerDriver..Connection+opt"></a>

#### connection.opt : <code>object</code>
Stores the sql-connect options used for this connection

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| opt | 

<a name="module_sqlServerDriver..Connection+isOpen"></a>

#### connection.isOpen : <code>boolean</code>
Indicates the open/closed state of the underlying connection

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| isOpen | 

<a name="module_sqlServerDriver..Connection+schema"></a>

#### connection.schema : <code>string</code>
Current schema in use for this connection

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| schema | 

<a name="module_sqlServerDriver..Connection+transError"></a>

#### connection.transError : <code>boolean</code>
Current transaction state, true if any rollback has been invoked

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Propery**: transError  
<a name="module_sqlServerDriver..Connection+isolationLevel"></a>

#### connection.isolationLevel : <code>String</code>
current isolation level

**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
**Properties**

| Name |
| --- |
| isolationLevel | 

<a name="module_sqlServerDriver..Connection+edgeConnection"></a>

#### connection.edgeConnection : <code>EdgeConnection</code>
**Kind**: instance property of [<code>Connection</code>](#module_sqlServerDriver..Connection)  
<a name="module_sqlServerDriver..Connection+checkLogin"></a>

#### connection.checkLogin(login, password) ⇒ <code>boolean</code>
Check login/password, returns true if successful, false if user/password does not match

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| login | <code>string</code> | 
| password | <code>string</code> | 

<a name="module_sqlServerDriver..Connection+variableNameForNBits"></a>

#### connection.variableNameForNBits(num, nbits)
Returns a variable name identified by a number for a variable that can contain n bits of information

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| num | <code>int</code> | 
| nbits | <code>int</code> | 

<a name="module_sqlServerDriver..Connection+colNameFromVarName"></a>

#### connection.colNameFromVarName(varName) ⇒ <code>string</code>
Gives the column name for a variable name

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| varName | <code>string</code> | 

<a name="module_sqlServerDriver..Connection+getSelectListOfVariables"></a>

#### connection.getSelectListOfVariables(vars) ⇒ <code>string</code>
Get a command to convert a list of variables into a table with a column having a variable for each column

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| vars | <code>Array.&lt;{varName:string, colName:string}&gt;</code> | 

<a name="module_sqlServerDriver..Connection+getPagedTableCommand"></a>

#### connection.getPagedTableCommand() ⇒ <code>string</code>
Get a command to select a bunch of rows

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| options.tableName | <code>string</code> |  |
| options.nRows | <code>int</code> |  |
| options.filter | <code>string</code> | , |
| options.firstRow | <code>int</code> |  |
| options.sorting | <code>string</code> | , |
| options.environment | <code>Context</code> |  |

<a name="module_sqlServerDriver..Connection+getBitArray"></a>

#### connection.getBitArray(value, nbits)
Type of value depends on nbits

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> |  |
| nbits | <code>int</code> | return {string} |

<a name="module_sqlServerDriver..Connection+createSqlParameter"></a>

#### connection.createSqlParameter(paramValue, paramName, varName, sqlType, forOutput)
Create a sql parameter

**Kind**: instance method of [<code>Connection</code>](#module_sqlServerDriver..Connection)  

| Param | Type |
| --- | --- |
| paramValue | <code>object</code> | 
| paramName | <code>string</code> | 
| varName | <code>string</code> | 
| sqlType | <code>string</code> | 
| forOutput | <code>boolean</code> | 

<a name="module_sqlServerDriver..mapIsolationLevels"></a>

### sqlServerDriver~mapIsolationLevels : <code>Object</code>
Maps Standard isolation levels to DBMS-level isolation levels. In case of MS SqlServer, the corrispondence
 is 1:1

**Kind**: inner constant of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
**Properties**

| Name |
| --- |
| allIsolationLevels | 

<a name="module_sqlServerDriver..useSchema"></a>

### sqlServerDriver~useSchema(schema) ⇒ <code>\*</code>
Change current used schema for this connection

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| schema | <code>string</code> | 

<a name="module_sqlServerDriver..destroy"></a>

### sqlServerDriver~destroy() ⇒ [<code>Deferred</code>](#Deferred)
Destroy this connection and closes the underlying connection

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..clone"></a>

### sqlServerDriver~clone() ⇒ <code>Connection</code>
Creates a duplicate of this connection

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..setTransactionIsolationLevel"></a>

### sqlServerDriver~setTransactionIsolationLevel(isolationLevel) ⇒ <code>promise</code>
Sets the Transaction isolation level for current connection

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type | Description |
| --- | --- | --- |
| isolationLevel | <code>string</code> | one of 'READ_UNCOMMITTED','READ_COMMITTED','REPEATABLE_READ','SNAPSHOT','SERIALIZABLE' |

<a name="module_sqlServerDriver..open"></a>

### sqlServerDriver~open() ⇒ <code>Connection</code>
Opens the underlying connection and sets the current specified schema

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..queryPackets"></a>

### sqlServerDriver~queryPackets(query, [raw], [packSize], [timeout]) ⇒ <code>\*</code>
Gets data packets row at a time

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type | Default |
| --- | --- | --- |
| query | <code>string</code> |  | 
| [raw] | <code>boolean</code> | <code>false</code> | 
| [packSize] | <code>number</code> | <code>0</code> | 
| [timeout] | <code>number</code> |  | 

<a name="module_sqlServerDriver..close"></a>

### sqlServerDriver~close() ⇒ <code>promise</code>
Closes the underlying connection

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..beginTransaction"></a>

### sqlServerDriver~beginTransaction(isolationLevel) ⇒ <code>\*</code>
Begins a  transaction

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type | Description |
| --- | --- | --- |
| isolationLevel | <code>string</code> | one of 'READ_UNCOMMITTED','READ_COMMITTED','REPEATABLE_READ','SNAPSHOT','SERIALIZABLE' |

<a name="module_sqlServerDriver..commit"></a>

### sqlServerDriver~commit() ⇒ <code>\*</code>
Commits a transaction

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..rollBack"></a>

### sqlServerDriver~rollBack() ⇒ <code>\*</code>
RollBacks a transaction

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..getSelectCommand"></a>

### sqlServerDriver~getSelectCommand(options) ⇒ <code>string</code>
Get the string representing a select command

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.tableName | <code>string</code> |  |
| options.columns | <code>string</code> | list of columns or expressions, this is taken "as is" to compose the command |
| [options.filter] | <code>sqlFun</code> | this is skipped if it is a constantly true condition |
| [options.top] | <code>string</code> |  |
| [options.orderBy] | <code>string</code> |  |
| [options.environment] | <code>object</code> |  |

<a name="module_sqlServerDriver..getSelectCount"></a>

### sqlServerDriver~getSelectCount(options) ⇒ <code>string</code>
Get the string representing a select count(*) command

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.tableName | <code>string</code> | 
| [options.filter] | <code>sqlFun</code> | 
| [options.environment] | <code>object</code> | 

<a name="module_sqlServerDriver..updateBatch"></a>

### sqlServerDriver~updateBatch(query, [timeout]) ⇒ <code>\*</code>
Executes a series of sql update/insert/delete commands

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 
| [timeout] | <code>number</code> | 

<a name="module_sqlServerDriver..getDeleteCommand"></a>

### sqlServerDriver~getDeleteCommand(options) ⇒ <code>string</code>
Get the string representing a delete command

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.tableName | <code>string</code> | 
| [options.filter] | <code>sqlFun</code> | 
| [options.environment] | <code>object</code> | 

<a name="module_sqlServerDriver..getInsertCommand"></a>

### sqlServerDriver~getInsertCommand(table, columns, values) ⇒ <code>string</code>
Get the string representing an insert command

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| table | <code>string</code> | 
| columns | <code>Array.&lt;string&gt;</code> | 
| values | <code>Array.&lt;Object&gt;</code> | 

<a name="module_sqlServerDriver..getUpdateCommand"></a>

### sqlServerDriver~getUpdateCommand(options) ⇒ <code>string</code>
Get the string representing an update command

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.table | <code>string</code> | 
| options.filter | <code>sqlFun</code> | 
| options.columns | <code>Array.&lt;string&gt;</code> | 
| options.values | <code>Array.&lt;Object&gt;</code> | 
| [options.environment] | <code>object</code> | 

<a name="module_sqlServerDriver..callSPWithNamedParams"></a>

### sqlServerDriver~callSPWithNamedParams(options) ⇒ <code>String</code>
evaluates the sql command to call aSP with a list of parameters each of which is an object having:
 value,
 optional 'sqltype' name compatible with the used db, necessary if is an output parameter
 optional out: true if it is an output parameter
 The SP eventually returns a collection of tables and at the end an object with a property for each output parameter
 of the SP
 declare @s1 smallint;
 set @s1=0;
 exec check_fin_u_pre @res=@s1 output,@sys_idflowchart=null,@OLD_flag='2',@NEW_flag='2',@NEW_ayear=2021,@NEW_printingorder='04',@NEW_idfin=19468,@sys_esercizio=2021;
 SELECT @s1 AS s1

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.spName | <code>string</code> |  |
| options.paramList | <code>Array.&lt;SqlParameter&gt;</code> |  |
| [options.skipSelect] | <code>boolean</code> | when true, the select of output parameter is omitted |

<a name="module_sqlServerDriver..callSPWithNamedParams"></a>

### sqlServerDriver~callSPWithNamedParams(options) ⇒ <code>Array.&lt;object&gt;</code>
call SP with a list of parameters each of which is an object having:
 value,
 optional 'sqltype' name compatible with the used db, necessary if is an output parameter
 optional out: true if it is an output parameter
 The SP eventually returns a collection of tables and at the end an object with a property for each output parameter
 of the SP

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
**Returns**: <code>Array.&lt;object&gt;</code> - [] }  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.spName | <code>string</code> |  | 
| options.paramList | <code>Array.&lt;SqlParameter&gt;</code> |  | 
| [options.raw] | <code>boolean</code> | <code>false</code> | 
| [options.timeout] | <code>number</code> |  | 

<a name="module_sqlServerDriver..objectify"></a>

### sqlServerDriver~objectify(colNames, rows) ⇒ <code>Array</code>
Transforms raw data into plain objects
This must be the same as the objectify existing in jsDataAccess

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| colNames | <code>Array</code> | 
| rows | <code>Array</code> | 

<a name="module_sqlServerDriver..tableDescriptor"></a>

### sqlServerDriver~tableDescriptor(tableName) ⇒ <code>TableDescriptor</code>
Gets information about a db table

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_sqlServerDriver..appendCommands"></a>

### sqlServerDriver~appendCommands(cmd) ⇒ <code>string</code>
get a sql command given by a sequence of specified sql commands

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| cmd | <code>Array.&lt;string&gt;</code> | 

<a name="module_sqlServerDriver..queryLines"></a>

### sqlServerDriver~queryLines(query, [raw], [timeout]) ⇒ <code>\*</code>
Gets a table and returns each SINGLE row by notification. Could eventually return more than a table indeed
For each table read emits a {meta:[column descriptors]} notification, and for each row of data emits a
  if raw= false: {row:object read from db}
  if raw= true: {row: [array of values read from db]}

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type | Default |
| --- | --- | --- |
| query | <code>string</code> |  | 
| [raw] | <code>boolean</code> | <code>false</code> | 
| [timeout] | <code>number</code> |  | 

<a name="module_sqlServerDriver..queryBatch"></a>

### sqlServerDriver~queryBatch(query, [raw], [timeout]) ⇒ <code>Promise</code>
Executes a sql command and returns all sets of results. Each Results is given via a notify or resolve

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
**Returns**: <code>Promise</code> - a sequence of {[array of plain objects]} or {meta:[column names],rows:[arrays of raw data]}  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> |  |
| [raw] | <code>boolean</code> | if true, data are left in raw state and will be objectified by the client |
| [timeout] | <code>number</code> |  |

<a name="module_sqlServerDriver..giveErrorNumberDataWasNotWritten"></a>

### sqlServerDriver~giveErrorNumberDataWasNotWritten(errNumber) ⇒
Returns a command that should return a number if last write operation did not have success

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
**Returns**: string  
**Access**: public  

| Param | Type |
| --- | --- |
| errNumber | <code>number</code> | 

<a name="module_sqlServerDriver..sqlTypeForNBits"></a>

### sqlServerDriver~sqlTypeForNBits(nbits) ⇒ <code>string</code>
get Sql type to contain n bits

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| nbits | <code>int</code> | 

<a name="module_sqlServerDriver..giveConstant"></a>

### sqlServerDriver~giveConstant(c) ⇒
Returns a command that should return a constant number

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
**Returns**: string  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>object</code> | 

<a name="module_sqlServerDriver..getFormatter"></a>

### sqlServerDriver~getFormatter() ⇒ <code>sqlFormatter</code>
Gets the formatter for this kind of connection

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  
<a name="module_sqlServerDriver..run"></a>

### sqlServerDriver~run(script, [timeout]) ⇒ <code>\*</code>
Runs a sql script, eventually composed of multiple blocks separed by GO lines

**Kind**: inner method of [<code>sqlServerDriver</code>](#module_sqlServerDriver)  

| Param | Type |
| --- | --- |
| script | <code>string</code> | 
| [timeout] | <code>number</code> | 

<a name="Deferred"></a>

## Deferred
**Kind**: global typedef  
