[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/DbDescriptor.it.md)

# DbDescriptor

The `DbDescriptor` class is the class that "knows" the structure of a database. A database table or view is represented by the `TableDescriptor` class, which has the following properties:

### TableDescriptor
- `{string} name`: name of the table or view
- `{string} xtype`: T for tables, V for views
- `{boolean} dbo`: true if it is a DBO table (common to all schemas where specified by the database)
- `{ColumnDescriptor[]} columns`: an array of column descriptors

A `TableDescriptor` exposes a method `getKey` that returns an array of key field names for the associated table.

### ColumnDescriptor
A `ColumnDescriptor` describes a single column and contains the fields:

```plaintext
- {string} name        - field name
- {string} type        - type in the database
- {string} ctype       - JavaScript type
- {number} max_length  - size in bytes
- {number} precision   - number of integer digits
- {number} scale       - number of decimal digits
- {boolean} is_nullable - true if it can be null
- {boolean} pk          - true if it is part of the primary key
```

The `DbDescriptor` class manages a dictionary of `TableDescriptor`, which is shared among all connections to the same database.

- `createTable(tableName)`: returns the promise for a `DataTable` with the structure (columns, key) of the specified table. This `DataTable` will have the properties `maxLenght`, `allowNull`, and `cType` of the `DataColumn` set, and the primary key.
- `table(tableName, tableDescriptor)`: reads or sets the table descriptor associated with a tableName. If the `TableDescriptor` of a table has not been set manually before, it is requested from the database's system tables (which will vary depending on the database).

The `DbList` module initializes with the `init` method, which reads the configuration of existing databases. In particular, it is a JSON file that stores a dictionary of the form "db code" => database settings, for example:

```json
{
    "main": {
        "server": "192.168.10.122,1434",
        "useTrustedConnection": false,
        "user": "nino ",
        "pwd": "yourPassword",
        "database": "dbName",
        "sqlModule": "jsSqlServerDriver", 
        "defaultSchema": "amministrazione",
        "persisting": true
    }
}
```

`sqlModule` is the name of the `SqlDriver` to load for this database. It could also be, for example, `jsMySqlDriver`. The data contained in this file will be passed as is to the constructor of the `DataAccess` when it is necessary to create a connection to the database.

This file may also contain more than one database description if needed.

Through the `getDbInfo` function exported by the `jsDbList` module, we can obtain information about a database. This information is what is read with the `init` function and may also include other custom fields if desired.

Similarly, with `setDbInfo`, we can set this information. The changes will also be saved to the file used during `init`, so we will find them at the next initialization.

With the `getConnection(dbCode)` and `getDataAccess(dbCode)` functions exposed by the `jsDbList` module, it is possible to obtain a physical connection (`Connection`) or an instance of a `DataAccess` to the database with a specific `dbCode`. The `Security` class associated with `DataAccess` from the same database is a shared singleton among all `DataAccess` connected to the same `dbCode`, for efficiency reasons.

However, we usually do not directly call the `getConnection` or `getDataAccess` functions of `dbList`, but we do it indirectly through the `JsConnectionPool` class. The latter manages a pool of connections to the same `dbCode` and exposes a `getDataAccess` method that returns a `JsConnectionPool`, which in turn exposes a `getDataAccess` method that gives the actual `DataAccess`. It is then possible to release the connection using the `release` method of `JsConnectionPool`.

In any case, these operations are normally all performed by the `jsApplication` class and are usually not used since we already have the database connection in `req.app.locals.context.sqlConn` (the physical `Connection`) and `req.app.locals.context.dataAccess` (the [DataAccess](DataAccess.md)).

Deallocation is also done automatically by `jsApplication`.

