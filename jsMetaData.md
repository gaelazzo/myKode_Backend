[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/jsMetaData.it.md)

# MetaData

The `MetaData` class is used to centralize information related to database tables. In particular, each derived class, which should be named `meta_[tablename]`, contains information about the `tablename` table.

The naming convention for the class and file is crucial because it is loaded lazily from disk when requested.

Instances of classes derived from `MetaData` in this document are referred to as metadata.

The methods of the `MetaData` class are mostly placeholders where specific information about a table or view can be inserted. This information is later used by the framework and the rest of the application as needed.

Therefore, it is a mechanism to ensure that there is a unique and well-known place for developers and maintainers to describe various aspects of each table, making it unique and accessible everywhere.

## Cross-Platform Usage
The `MetaData` class is designed to be used on both the client and server sides. In the code, metadata common to the client and server is impossible to access properties of the `AppMeta` class on the client.

### Instantiating Metadata
The instantiation method of a `MetaData` object depends on the context:

- In the code of metadata, the correct method to instantiate metadata is to invoke `this.getMeta`. This is done identically on both the client and server sides, allowing the use and maintenance of a single file for metadata.
- Outside the code of metadata:
 - On the client: invoke the `getMeta` method of the `appMeta` object, which is the frontend application `myKode_Frontend`.
 - On the server, the correct method to instantiate metadata is to invoke the `getMeta` function of the `Context`.

### Accessing Data
Methods that intend to access data do so through the `getData` property of the class. Depending on the execution context, it will either be a class that interfaces with the server's web services (if executed on the client) or a class with an identical interface that invokes methods of the [GetData](jsGetData.md) class.

The `MetaData` class exposes a series of methods that describe specific properties of tables:

#### {object} isValid({DataRow}r)
Determines whether a row is valid or not. It is intended to contain simple checks to be executed on the client without using web services; otherwise, it might be better implemented as Business logic.

Returns a Deferred to an object structured as follows:
```js
{  
    {string} warningMsg,  // warning message if it is an ignorable message
    {string} errMsg,      // error message if it is an non-ignorable message
    {string} errField,    // field that generated the issue 
    {object} row          // row that generated the issue
}
```
On the client side, if there is an ignorable message, it is usually shown for confirmation. Non-ignorable messages, however, implicitly determine a condition of invalidity.
On the server side, it is possible to insert an invocation of the `isValid` method, but it is usually performed on the client.

### getNewRow ({objectRow} parentRow, {DataTable} dtDest)
Creates a row in the `dtDest` table (which will be of the type associated with the current metadata), with the optional `parentRow` row as a parent.

In this method, it is possible to define all the properties of auto-increment columns specific to the table.

Auto-increment properties are described in the [PostData](PostData.md) document and are set using the `AutoIncrementColumn` method of the `DataTable` class.

The properties must be set before calling the `getNewRow` method of the base class.

Typically, the `getNewRow` method of metadata (derived from `MetaData`) will set some properties of the columns of the `dtDest` `DataTable` and then call the `getNewRow` method of the base class, passing the result to the caller.

The base class (`MetaData`) takes care of setting defaults on columns where they are defined, calling the `newRow` method of the `DataTable`, and calculating all temporary values for columns defined as auto-increment.

For example, if you want to set the `idorder` column as auto-increment, the method could be redefined as follows:
```js
getNewRow: function (parentRow, dt, editType){ 
    dt.autoIncrement('idorder', { });	
    return this.superClass.getNewRow(parentRow, dt, editType);
}
```
If you also want to have a column `nOrder` that starts from 1 every year (`yOrder`), you could have:
```js
getNewRow: function (parentRow, dt, editType){ 
    dt.autoIncrement('idorder', { });
    dt.autoIncrement('nOrder', {selector:['yOrder']});
    return this.superClass.getNewRow(parentRow, dt, editType);
}
```
If you want to vary the numbering based on the `idOrderKind` field, you could have:
```js
getNewRow: function (parentRow, dt, editType){ 
    dt.autoIncrement('idorder', { });
    dt.autoIncrement('nOrder', {selector:['yOrder','idOrderKind']});
    return this.superClass.getNewRow(parentRow, dt, editType);
}
```
If you want to insert a certain number of orders in

the same transaction and want to be sure that the numbering obtained during saving will never conflict with the temporary values of other rows not yet sent to the database, you could set a minimum value for the temporary values (in memory):
```js
getNewRow: function (parentRow, dt, editType){
    dt.autoIncrement('idorder', { });
    dt.autoIncrement('nOrder', {minimum:99990001, selector:['yOrder','idOrderKind']});
    return this.superClass.getNewRow(parentRow, dt, editType);
}
```
This precaution is never necessary if you insert one row at a time into the same table. On the other hand, actual values obtained during saving could conflict with the temporary values of other rows in the dataset not yet sent to the database.

### {string[]} primaryKey
Returns a list of the primary key fields of the table or view. For views, this is essential because the `DbDescriptor` cannot autonomously retrieve the key of a view.

In any case, when drawing the DataSet, it is good to set the primary key of each table/view inserted into it.

### describeAColumn()
Sets information about a column, such as whether it allows nulls, the caption, etc.
This information is evaluated when the column is displayed in a specific list.

### {[sqlFun](jsDataQuery.md)} insertFilter
Must return a filter to use when a row of this table is searched within the scope of another row (of another table) during insertion. That is, as an external reference of a row in the insertion state.

For example, only rows marked as "active" in a table might be assignable to other tables when new rows are created in them.

In this case, you can redefine this method to return the filter on the active field.

### {[sqlFun](jsDataQuery.md)} searchFilter
Must return a filter to use when a value of a field of this table is used to filter another table in a search form, i.e., as an external reference during searching on other tables.

### {Promise<DataTable>} describeColumns({DataTable} table, {string} listType)
Describes the properties of one or more lists, i.e., ways of displaying a table or view.
Properties are described through the properties of the columns of the `DataTable`.
It usually consists of a series of calls to the aforementioned `describeAColumn` function.

### {[sqlFun](jsDataQuery.md)} getStaticFilter({string} listType)
Returns a filter to always apply when reading a "listType" list on the table or view related to the metadata.

It is used in services exposed to the client that return lists and possibly on the client.

### {string} getName
Returns the application name of the table or view, for use, for example, in messages.

### setDefaults({DataTable} t)
Sets default values for columns when new rows of the table are created. These values are stored in the properties of the [DataTable](jsDataSet.md) itself and are used when the `newRow` method of the [DataTable](jsDataSet.md) is called.

The `MetaPage` class in myKode invokes this method for each entity and sub-entity at the start of each form, ensuring that defaults are applied in subsequent row insertions.

### {string} getSorting(t)
Returns the sorting to apply to the table when it is read. If it returns `undefined`, the result of `t.orderBy()` is usually considered, i.e., the sorting associated with the [DataTable](jsDataSet.md).

### setOrderBy
