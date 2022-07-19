## Modules

<dl>
<dt><a href="#module_dbList">dbList</a></dt>
<dd><p>Maintains a list of db connection information, each identified by a dbCode</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Context">Context</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#Deferred">Deferred</a></dt>
<dd><p>{Deferred}</p>
</dd>
</dl>

<a name="module_dbList"></a>

## dbList
Maintains a list of db connection information, each identified by a dbCode


* [dbList](#module_dbList)
    * [~Context](#module_dbList..Context)
        * [.dbCode](#module_dbList..Context+dbCode)
        * [.dbDescriptor](#module_dbList..Context+dbDescriptor)
        * [.createPostData](#module_dbList..Context+createPostData)
        * [.formatter](#module_dbList..Context+formatter)
        * [.sqlConn](#module_dbList..Context+sqlConn)
        * [.environment](#module_dbList..Context+environment)
        * [.dataAccess](#module_dbList..Context+dataAccess)
    * [~dbListFile](#module_dbList..dbListFile)
    * [~DbDescriptor](#module_dbList..DbDescriptor)
        * [new DbDescriptor(sqlConn)](#new_module_dbList..DbDescriptor_new)
        * [.createTable(tableName)](#module_dbList..DbDescriptor+createTable) ⇒ <code>Promise.&lt;DataTable&gt;</code>
    * [~init(options)](#module_dbList..init)
    * [~table(tableName, [tableDescriptor])](#module_dbList..table) ⇒ <code>Promise.&lt;TableDescriptor&gt;</code>
    * [~forgetTable(tableName)](#module_dbList..forgetTable) ⇒ <code>\*</code>
    * [~columnNames()](#module_dbList..columnNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [~column(columnName)](#module_dbList..column) ⇒ <code>ColumnDescriptor</code>
    * [~getKey()](#module_dbList..getKey) ⇒ <code>Array</code>
    * [~getDescriptor(dbCode)](#module_dbList..getDescriptor) ⇒ <code>DbDescriptor</code>
    * [~getConnection(dbCode)](#module_dbList..getConnection) ⇒ <code>Connection</code>
    * [~getDataAccess(dbCode)](#module_dbList..getDataAccess) ⇒ <code>Promise.&lt;DataAccess&gt;</code>
    * [~getDbInfo(dbCode)](#module_dbList..getDbInfo) ⇒ <code>Object.&lt;driver, useTrustedConnection, user, pwd, database, defaultSchema, connectionString&gt;</code>
    * [~setDbInfo(dbCode, dbData)](#module_dbList..setDbInfo)
    * [~delDbInfo(dbCode)](#module_dbList..delDbInfo) ⇒ <code>\*</code>
    * [~existsDbInfo(dbCode)](#module_dbList..existsDbInfo) ⇒ <code>boolean</code>

<a name="module_dbList..Context"></a>

### dbList~Context
**Kind**: inner class of [<code>dbList</code>](#module_dbList)  

* [~Context](#module_dbList..Context)
    * [.dbCode](#module_dbList..Context+dbCode)
    * [.dbDescriptor](#module_dbList..Context+dbDescriptor)
    * [.createPostData](#module_dbList..Context+createPostData)
    * [.formatter](#module_dbList..Context+formatter)
    * [.sqlConn](#module_dbList..Context+sqlConn)
    * [.environment](#module_dbList..Context+environment)
    * [.dataAccess](#module_dbList..Context+dataAccess)

<a name="module_dbList..Context+dbCode"></a>

#### context.dbCode
**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dbCode | <code>string</code> | dbCode |

<a name="module_dbList..Context+dbDescriptor"></a>

#### context.dbDescriptor
**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dbDescriptor | <code>DbDescriptor</code> | dbDescriptor |

<a name="module_dbList..Context+createPostData"></a>

#### context.createPostData
**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| createPostData | <code>function</code> | createPostData |

<a name="module_dbList..Context+formatter"></a>

#### context.formatter
**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| formatter | <code>sqlFormatter</code> | formatter |

<a name="module_dbList..Context+sqlConn"></a>

#### context.sqlConn
**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sqlConn | <code>Connection</code> | sqlConn |

<a name="module_dbList..Context+environment"></a>

#### context.environment
**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| environment | <code>Environment</code> | environment |

<a name="module_dbList..Context+dataAccess"></a>

#### context.dataAccess
property dataAccess
{DataAccess} dataAccess

**Kind**: instance property of [<code>Context</code>](#module_dbList..Context)  
<a name="module_dbList..dbListFile"></a>

### dbList~dbListFile
DbDescriptor
A dbDescriptor takes track of the structure of a database. It doesn't manage different schemas.
The structure of a table is described with a TableDescriptor
module dbDescriptor

**Kind**: inner class of [<code>dbList</code>](#module_dbList)  
<a name="module_dbList..DbDescriptor"></a>

### dbList~DbDescriptor
DbDescriptor

**Kind**: inner class of [<code>dbList</code>](#module_dbList)  

* [~DbDescriptor](#module_dbList..DbDescriptor)
    * [new DbDescriptor(sqlConn)](#new_module_dbList..DbDescriptor_new)
    * [.createTable(tableName)](#module_dbList..DbDescriptor+createTable) ⇒ <code>Promise.&lt;DataTable&gt;</code>

<a name="new_module_dbList..DbDescriptor_new"></a>

#### new DbDescriptor(sqlConn)
Creates a DbDescriptor, given a database Connection


| Param | Type |
| --- | --- |
| sqlConn | <code>Connection</code> | 

<a name="module_dbList..DbDescriptor+createTable"></a>

#### dbDescriptor.createTable(tableName) ⇒ <code>Promise.&lt;DataTable&gt;</code>
Creates a DataTable or view having the specified name

**Kind**: instance method of [<code>DbDescriptor</code>](#module_dbList..DbDescriptor)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_dbList..init"></a>

### dbList~init(options)
Initializes dbList

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| [options.fileName] | <code>string</code> | Name of the clean config file to encrypt |
| [options.encryptedFileName] | <code>string</code> | name of the config file to be created |
| options.encrypt | <code>boolean</code> | true if the config file has to be encrypted |
| options.decrypt | <code>boolean</code> | true if the config file has to be decrypted |
| [options.secret] | <code>object</code> | object containing key,iv,pwd to replace the config |

<a name="module_dbList..table"></a>

### dbList~table(tableName, [tableDescriptor]) ⇒ <code>Promise.&lt;TableDescriptor&gt;</code>
Get/Set the structure of a table in a JQuery fashioned style

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  
**Returns**: <code>Promise.&lt;TableDescriptor&gt;</code> - or undefined  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| [tableDescriptor] | <code>TableDescriptor</code> | 

<a name="module_dbList..forgetTable"></a>

### dbList~forgetTable(tableName) ⇒ <code>\*</code>
Clears the information stored about a table

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_dbList..columnNames"></a>

### dbList~columnNames() ⇒ <code>Array.&lt;string&gt;</code>
gets a column descriptor given the column name

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  
**Access**: public  
<a name="module_dbList..column"></a>

### dbList~column(columnName) ⇒ <code>ColumnDescriptor</code>
gets a column descriptor given the column name

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| columnName | <code>string</code> | 

<a name="module_dbList..getKey"></a>

### dbList~getKey() ⇒ <code>Array</code>
gets an array of all primary key column names

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  
<a name="module_dbList..getDescriptor"></a>

### dbList~getDescriptor(dbCode) ⇒ <code>DbDescriptor</code>
**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="module_dbList..getConnection"></a>

### dbList~getConnection(dbCode) ⇒ <code>Connection</code>
gets a Connection eventually taking it from a pool, at the moment it simply returns a new Connection

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="module_dbList..getDataAccess"></a>

### dbList~getDataAccess(dbCode) ⇒ <code>Promise.&lt;DataAccess&gt;</code>
Gets  a promise to a DataAccess

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="module_dbList..getDbInfo"></a>

### dbList~getDbInfo(dbCode) ⇒ <code>Object.&lt;driver, useTrustedConnection, user, pwd, database, defaultSchema, connectionString&gt;</code>
Get information about a database

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type | Description |
| --- | --- | --- |
| dbCode | <code>string</code> | required for sqlConnection constructor: {string} [driver='SQL Server Native Client 11.0'] Driver name {string} [useTrustedConnection=true] is assumed true if no user name is provided {string} [user] user name for connecting to db {string} [pwd] user password for connecting to db {string} [database] database name {string} [defaultSchema=options.user ||'DBO'] default schema associated with user name {string} [connectionString] connection string to connect (can be used instead of all previous listed) {string} sqlModule module name to user for getting connection |

<a name="module_dbList..setDbInfo"></a>

### dbList~setDbInfo(dbCode, dbData)
sets information about a database

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 
| dbData | <code>Object.&lt;driver, useTrustedConnection, user, pwd, database, defaultSchema, connectionString&gt;</code> | 

<a name="module_dbList..delDbInfo"></a>

### dbList~delDbInfo(dbCode) ⇒ <code>\*</code>
Deletes a Db from the list

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="module_dbList..existsDbInfo"></a>

### dbList~existsDbInfo(dbCode) ⇒ <code>boolean</code>
Check if a dbCode is present in the list

**Kind**: inner method of [<code>dbList</code>](#module_dbList)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="Context"></a>

## Context
**Kind**: global class  
<a name="new_Context_new"></a>

### new Context()
Execution context for a request

<a name="Deferred"></a>

## Deferred
{Deferred}

**Kind**: global constant  
