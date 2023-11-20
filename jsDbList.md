[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/jsDbList.it.md)

# jsDbList

The `jsDbList` module declares two classes:

## Context

It is a class that serves as a dashboard for all information related to the execution context of a session.

The properties of a `Context` object are assigned by `jsApplication` when accepting the execution of a route. Among these, we distinguish:

### `dbCode` {string}
The code of the used database (used to invoke the **getDbInfo** function).

### `dbDescriptor` {DbDescriptor}
Instance of the `DbDescriptor` for the connected database (a singleton per database).

### `createPostData` {PostData}
Function that creates a class implementing the [PostData](PostData.md) interface. The default implementation returns an instance of [BusinessPostData](jsBusinessLogic.md).

### `getDataInvoke` {GetDataInvoke}
Function that creates an instance of the `GetDataInvoke` class associated with the current context. This class can be invoked by metadata, which is shared between the client and the server.

When used on the server side, metadata will reference the class present in `client/components/metadata`. When used on the client side, metadata will reference the `getData` class associated with `appMeta`. However, in the metadata, this mechanism is transparent when used, and it is sufficient to use the instance as `(this).getData`, where `this` is the metadata itself. The class used on the client side exposes the same interface as the one used on the server side, so the code can run interchangeably.

This does not preclude the application from using the [GetData](jsGetData.md) class in classes not shared with the client.

### `formatter` {sqlFormatter}
SqlFormatter associated with the connected database; it should not be necessary unless manually composing SQL commands.

### `sqlConn` {Connection}
`Connection` associated with the current database. The `Connection` is a lower-level class compared to `DataAccess`. For details, consult the relevant documentation: [jsSqlDriver](src/jsSqlServerDriver.md) and [jsMySqlDriver](src/jsMySqlDriver.md).

### `environment` {Environment}
[Environment](Environment.md) associated with the request.

### `dataAccess` {DataAccess}
[DataAccess](DataAccess.md) associated with the request.

Overall, the `Context` has all the information needed to operate on the database and all knowledge about the connected user. In each middleware, it is accessible in the property:

```javascript
req.app.locals.context
```

## DbDescriptor

This class knows the structure of tables and views and can be used, for example, to create DataTables to add to DataSets or to know what fields each table has, what type they are, and what the keys are.

Main methods of `DbDescriptor`:

- `table(tableName, tableDescriptor)`: reads or sets the `TableDescriptor` of a table or view. If attempting to read a `TableDescriptor` not previously set, the `tableDescriptor` method of the underlying `Connection` is invoked to obtain the desired information directly from the system tables of the database.
- `createTable(tableName)`: creates a `DataTable` with the columns of a specific table or view.
- `forgetTable(tableName)`: deletes information about a `DataTable` so that it can potentially be recalculated on the next request.

## init
The `init` method of `DbDescriptor` takes the name of a file as input, which is usually encrypted but can also be unencrypted depending on the parameters:

- `encryptedFileName`: name of the encrypted file to read
- `fileName`: name of the file to possibly create decrypted
- `encrypt`: if true, the read file is to be encrypted
- `decrypt`: if true, a copy of the encrypted file is to be created in clear text
- `key`, `iv`, `pwd`: parameters for decrypting or encrypting the file

This method reads the information about connections (of type `DbInfo`, which will be explained shortly) in bulk.

It is still possible to use the `getDbInfo/setDbInfo/delDbInfo` methods to manage the information read from the file.

The configuration file is automatically updated with the changes.

### TableDescriptor

It is a class that describes a table and exposes:

- `columnNames()`: array of column names
- `column(columnName)`: descriptor of the given column
- `describeTable(t)`: adds the columns of this table to the `DataTable` t, setting the name of the column and the properties `ctype`, `is_nullable`, `max_length` for each column. It also sets the key of the `DataTable`.
- `getKey()`: array of key column names

### ColumnDescriptor

Column descriptor. It has the following fields:

- `name` {string} - field name
- `type` {string} - db type
- `ctype` {string} - JavaScript type
- `max_length` {number} - maximum size in bytes if a string
- `precision` {number} - total number of digits for decimals
- `scale` {number} - number of decimal places for decimals
- `is_nullable` {boolean} - true if it allows null
- `pk` {boolean} - true if it is a primary key

## getDbInfo, setDbInfo, delDbInfo, existsDbInfo

Methods to read / write / delete / check the presence of database access information (`DbInfo`)

`DbInfo` is a structure like the following:
```javascript
{
 server: "server name",
 useTrustedConnection: true/false, if true user/pwd are not used
 user: "user to connect to the db",
 pwd: "password to connect to the db",
 database: "database name",
 sqlModule: 'jsMySqlDriver' or 'jsSqlServerDriver'
}
```
and is required for the `jsDbList` module to know how to build connections (`Connection`).

## getConnection

Function that, given a `dbCode`, returns the `Connection`. For its operation, it requires that `setDbInfo` has been previously called for that `dbCode`. Note that there is no `Connection` class; it only represents an abstract interface.

The returned instance will actually be of type `SqlServerConnection` or `MySqlConnection` (or other) depending on the type of database.

## getDescriptor

Function that, given a `dbCode`, returns the `DbDescriptor`. The `DbDescriptor` is placed in a cache, where there is only one for each `dbCode`. If it is not already present, it calculates it, but it requires that `setDbInfo` has been previously invoked for that `dbCode` or that the requested connection was in the configuration file used to initialize the `dbList`.

## getDataAccess

Function that, given a `dbCode`, gets a connection (`DataAccess`). Closing the connection is the responsibility of the caller. For correct operation, it requires that `setDbInfo` has been previously called or that the requested connection was in the configuration file used to initialize the `dbList`.
