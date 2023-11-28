[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/readme.it.md)

# myKode Backend

myKode Backend is a set of Node.js classes accompanied by a minimal backend designed to minimize the development time of a Node.js application.

The framework's classes are designed to access various relational databases interchangeably. The chosen structure for managing data sets in memory is [jsDataSet](jsDataSet.md), a class similar to .NET's DataSets, where DataRow objects are much like plain objects but retain the original state of the row, i.e., the state after the last `acceptChanges` (a method that makes changes permanent) or `rejectChanges` (a method that cancels changes to the row).

The class [jsDataQuery](jsDataQuery.md) is used to represent filters and expressions, and its instances can be applied interchangeably to database tables or any collection of JavaScript objects, especially to DataRow objects of a DataSet.

Classes are provided for managing different applications and databases.

## jsApplication

[jsApplication](jsApplication.md) is the general prototype of the application at its highest level.

It is possible to integrate or modify its various methods to customize them according to specific needs.

### Authentication
Authentication is managed through JSON Web Tokens ([JWT](https://jwt.io/introduction)). Each user is associated with a session identified by a code that the client must send in every request, in the encrypted JWT token.

`jsApplication` handles creating a context ([Context](Context.md)) for each request and destroying it when the request is fulfilled. It creates the environment of the connected user with information such as their role and permissions.

It also creates routes and ensures access is granted only to clients providing an appropriate token in the request header unless the route has been specifically configured with the `getNoTokenFolders` function. `getNoTokenFolders` is a method of `jsApplication` defined simply as:

```js
getNoTokenFolders: function(){
    return {
        "auth": true
    };
}
```

This allows access (only) to the "auth" folder without requiring a valid token. Even unauthenticated requests must provide a fictitious, "anonymous" token, the value of which is configured in the `config/tokenConfig` file under the `AnonymousToken` property.

In the HTTP header of each client request, there must be a line like:

```
Authorization: Bearer <token>
```

Where `<token>` is either the "anonymous" token or a token issued by the application upon authentication.

`jsApplication` decodes the token for each request and sets the data obtained from the `req.headers.authorization` property of the request `req`. This way, all routes can access it.

The token is verified and decoded in the `req.auth` field (configurable in `tokenConfig.options.requestProperty`). In general, `req.auth` will contain an object of type [Token](src/jsToken.js). A simple example of an authentication route can be found in the [login](routes/auth/login.md) module.

Upon startup, a `jsApplication` creates an `ExpressApplication` and an `Express.Router`. For each subfolder in the `routes/` folder, it reads the files inside it and associates a router with each one that responds to the request `/folder/fileName`, provided that the file is a node module whose file name does not start with an underscore and exposes a router as its only exported property. This makes it easy to add a new route by exposing it in a node module inside a subfolder of `routes`, regardless of the type of service (GET/POST) and its parameters.

It also handles authenticating the user and providing an anonymous context if not authenticated yet. For each connected user, it establishes a session identified with a sessionID.

Each database is identified by a `dbCode`, and `jsApplication` is associated with a database and creates a connection pool to make access more efficient. When a request arrives, a connection is taken from the pool if one is available.

## Data Access

To read/write data from/to the database, invoke stored procedures, or perform any other operation, there are three main classes: [DataAccess](DataAccess.md), [GetData](jsGetData.md), and [PostData](PostData.md).

- [DataAccess](DataAccess.md) is used for low-level operations, such as sending simple read or write commands.
- [GetData](jsGetData.md) is used to read entire DataSets or parts of them.
- [PostData](PostData.md) is used to write entire DataSets.

## Business Logic

[jsBusinessLogic](jsBusinessLogic.md) is the class responsible for invoking business rules. These rules are essentially SQL checks applied to each individual row written to the database. The text of the checks is stored in some configuration tables. The rules are "compiled" by an external tool into database stored procedures and invoked when saving data. If the configuration tables contain no rows, no checks will be applied.

## Security

The class [jsSecurity](Security.md) is queried by the `PostData` class during the data saving phase. The rules are stored as textual conditions in the `customgroupoperation` table.

For details, refer to the [jsDoc](docs/module-Security.html) and the [summary](Security.md).

## DataSet

The [DataSets](jsDataSet.md) of the application are stored in JSON format in the `client/dataset` folder. The JSON follows the format used for serializing the `jsDataSet` class, based on the `serialize` and `deserialize` methods.

Serialization also includes the state of DataRow with current values and original values for rows in the modified state.

When creating a DataSet, all DataTables with all necessary DataColumn and DataRelation that link the included DataTables must be inserted. This is especially important for navigation when extracting data using the [GetData](jsGetData.md) class.

The basic assumption is that there is a "main" table of the DataSet and a set of "subentity" tables representing its details. Then there are parent tables of the entity and subentity tables, whose rows are read as needed based on the data present in the first set.

The subentity relationship is logically identified by the fact that it cannot exist in any way without the entity (table) of which it is a detail. This must be formalized through keys; the subentity must include in its key fields all key fields of the entity and must be related with a DataRelation in the DataSet. It is possible to have subentities at a lower level without any limit.

Satellite tables can also be present, i.e., tables that are parents of entity and subentity tables.

To create a DataSet, several methods can be used:

### Manual creation of a DataSet
You can instantiate a DataSet and then add tables and columns to them. This is a bit cumbersome unless a code generator is used to update the code based on any changes to the table structure.

Example:

```js
let d = new DataSet();
let tOrder = d.newTable("order");
tOrder.setDataColumn("idorder", CType.int);
tOrder.setDataColumn("name", CType.string);
tOrder.setDataColumn("surname", CType.string);
tOrder.key("idorder");

let tOrderDetail = d.newTable("orderdetail");
tOrderDetail.setDataColumn("idorder", CType.int);
tOrderDetail.setDataColumn("iddetail", CType.int);
tOrderDetail.setDataColumn("name", CType.string);
tOrderDetail.setDataColumn("surname", CType.string);
tOrderDetail.key("idorder");

d.newRelation("

order_orderdetail", "order", ["idorder"], "orderdetail", ["idorder"]);
```

### Semi-manual creation of a DataSet
It is possible to instantiate a DataSet and then add tables by invoking the `createTable()` method of a [DbDescriptor](jsDbList.md). This way, the table will automatically have columns, and the primary key set.

Then, add the desired relationships:

```js
let d = new DataSet();
let tOrder = await dbDescriptor.createTable("order");
d.addTable(tOrder);

let tOrderDetail = await dbDescriptor.createTable("orderdetail");
d.addTable(tOrderDetail);

d.newRelation("order_orderdetail", "order", ["idorder"], "orderdetail", ["idorder"]);
```

### Visual creation with the HDSGene tool
It is possible to use a tool, HDSGene, provided by Tempo S.r.l., which integrates with the visual editor of DataSet in Visual Studio. It generates the corresponding JSON in the folder where the DataSet is saved.

Copy the JSON file to the `client/datasets` folder, assuming the name is `dsmeta_order_main.json`, and load it with the `getDataSet` function in the context:

```js
let d = ctx.getDataSet("order", "main");
```

The convention is that the file name should be `dsmeta_[tableName]_[editType].json`.

## MetaData

The purpose of the MetaData class is to centralize the knowledge of each table in a specific class, which derives from MetaData.

Its use is not specifically required on the backend, but if the frontend `myKode_Frontend` is used on the client, which might make use of it, and backend services are implemented, they could in turn use the same metadata (instances of MetaData) as the client.

If backend services are implemented that involve creating or manipulating DataSets beyond simple data reading from the database, it is advisable to use the methods of this class.

In summary, each class deriving from MetaData centralizes information about a table, such as:

- Validity of row data
- Defaults for field values when a row is created
- Calculation schema for auto-increment fields (see the [PostData](PostData.md) class for more information)
- Structure of lists on that table: which fields should appear, with what label, sorting, etc.

Details can be found in the [MetaData](jsMetaData.md) file.