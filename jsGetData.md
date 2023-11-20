[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/jsGetData.it.md)

# GetData

It is the class responsible for reading entire DataSets in an optimized way.

It does not have a constructor but a number of static methods, each of which has the effect of populating a [DataSet](jsDataSet.md) with rows from the database based on certain criteria.

All filters used in this class, as well as those in the entire framework, are of type [SqlFun](jsDataQuery.md).

The methods of `GetData` assume a DataSet in which various DataTables are present, related with DataRelations in such a way that it is possible to navigate logically related data.

It is, therefore, essential to add both DataTables and DataRelations to the DataSet, and from this information will depend on which rows the methods will read from the database, together with any specified filters.

The reading of DataSets occurs spirally, starting from the tables related to the specified table, and then in subsequent steps, other tables are read with filters that depend on the rows read in the previous steps.

Filters depend on the DataRelations present in the DataSet, and that is why it is essential that they are inserted correctly, keeping this objective in mind.

This mechanism, based on these conventions, allows you not to have to write code to read sets of data linked to web forms or various functionalities but simply to invoke one of the functions for reading or updating DataSets in the `GetData` class.

Let's see the different methods it exposes; for details, refer to the [JSDoc](https://temposrl.github.io/myKode_Backend/getData.html) or the [Markdown conversion](src/jsGetData.md).

# Filter Calculation

## getFilterByExample
Calculates a filter by comparing all the fields of an object.
If the `useLike` parameter is provided, string fields are compared with "like"; otherwise, they are compared for equality.

# Reading a Table

Sometimes it may be useful to read data from a single table, for example, as a preparatory step for a call to `doGet`, which, in turn, reads an entire DataSet starting from the rows contained in a specified table.

## getByFilter
Reads rows from the database into a specified DataTable based on a specified criterion ([SqlFun](jsDataQuery.md)).

## getByKey
Like `getByFilter`, but obtains the filter based on the values of an object, considering the key fields of the table. Obviously, the object must have fields with the same names as the key of the table.

# Reading a DataSet

## fillDataSetByKey
Starting from a certain filter, it first fills the specified table of the DataSet, and then, starting from the found rows, it spirally reads all the rows of the tables in the DataSet related to the already read rows, until exhaustion of the relations with additional tables.

This and other methods only work if in the DataSet the DataTables are related with DataRelations in the correct way.

## fillDataSetByFilter
Like `fillDataSetByKey`, but requires an already formatted filter instead of an object from which to derive it.

## doGet
Given a DataSet, and possibly a row to start from, it reads the tables of the DataSet, making sure to

- pre-read tables marked as "cached"
- not modify rows of tables of entities and sub-entities already present in the DataSet
- if requested (parameter `onlyPeripherals`), only read secondary tables and not sub-entities
- If a row is specified (parameter `oneRow`), only that row and its children are read
- If `oneRow` is not specified, it is assumed that there are already rows in the specified table from which to start the spiral reading
- All non-cached tables are reset before starting to read the data unless `onlyPeripherals` is specified, in which case only secondary tables are initially reset.

`doGet` should be used the first time with `onlyPeripherals=false`, but subsequent times with `onlyPeripherals=true` if only updating satellite tables is intended; otherwise, the main table and sub-entities, which may have been modified in the user's interaction with the form, will also be re-read.

Note that sub-entities refer to related child tables, with their key fields, with the entire primary key of the parent table, where the parent table is the main table or another sub-entity (the sub-entity relationship is transitive).
