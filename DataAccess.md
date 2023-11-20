[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/DataAccess.it.md)

# DataAccess

The `DataAccess` class is used for reading individual tables or expressions from the database, while we use [GetData](jsGetData.md) to read entire DataSets. Although it is virtually possible, we do not directly use `DataAccess` to save data to the database. Instead, we use the [PostData](PostData.md) class for this purpose, which also handles security, auto-increment fields, etc.

## Persistence

When creating a connection, we distinguish between two management modes: persistent and non-persistent, based on the `persisting` parameter passed to the constructor.

If the connection is persistent, it will be opened with the first `open()` and then remain open until the connection is released. Conversely, it will be opened and closed every time there is an `open()` or a `close()`. However, if an operation on the database is attempted with the connection closed, an error will occur. Additionally, the `open()` times are much longer when compared to processor times.

If the connection is set as persistent, subsequent `open()` calls are allowed and only increase a nesting level but have no effect on the physical connection. Similarly, `close()` calls. Therefore, you can decide at the application level whether to use persistent connections or not, and in the code of each method directly accessing the database, enclose the access instructions between an `open()` and a `close()`. These methods will work regardless of the global setting for connection persistence.

If `persisting` is true:
```js
conn.open(); // increases only an internal nesting level, has no physical effect

/// database operations using conn

conn.close(); // decreases only an internal nesting level, has no physical effect
```
If `persisting` is false:
```js
conn.open(); // opens the connection if not already open or increases a nesting level if already open

/// database operations using conn

conn.close(); // decreases the nesting level and closes the connection if it has dropped to zero
```
As you can see, the code for a generic method accessing the database can be written in the same way regardless of how connection persistence is managed.

Here is a concise list of methods exposed by the class. For the complete interface, consult the [jsDoc](https://temposrl.github.io/myKode_Backend/module-DataAccess.html).

## Common Aspects for All Functions

All methods accessing the database return jQuery Deferred objects. Each input expression or filter to the methods is of type `sqlFun`, which is an expression generated with the methods of [jsDataQuery](jsDataQuery.md).

## Functions Reading a Single Expression

- `readSingleValue`: Reads a single value from a table, taking the first value based on the given filter.
- `readLastValue`: Similar to `readSingleValue` but takes the last value returned by the query.
- `runCmd`: Reads a single value but accepts an SQL command as input (not portable).

## Functions Reading a Table

Functions returning tables sometimes have the boolean option `raw`, which determines if the result should be an array of objects where each object represents a row read from the database (if `raw` is false), or a pair `{meta: string[], rows: object[]}` where `meta` is the array of field names read, and `rows` is an array where each element is itself an array with the values of the row. In this case, the value `rows[i][j]` represents the field `meta[j]` of row `i`. If nothing is specified, `raw` is assumed to be false, and thus, a simple array of objects is output.

- `select`: Performs a SELECT on a table.
- `pagedSelect`: Performs a SELECT on a range of rows of a table, accepting the initial row number and the number of rows to read, but requires specifying an order to apply.
- `runSql`: Executes an SQL command and returns a DataTable.
- `selectRows`: Performs a SELECT and returns the rows through the `notify` function of the Deferred.
- `selectIntoTable`: Performs a SELECT and inserts the read rows into an existing DataTable, without deleting existing ones.

## Functions Reading One or More Tables

#### `queryPackets`

Reads one or more tables, returning the rows all at once or in blocks. This function is used by the `GetData` class to access the database; it is recommended to use the `GetData` class. The output differs depending on whether you want the result all at once or in packets and whether it is raw or not.

If `raw` and in packets are sent, through the `notify` of the Deferred, a sequence of:

```plaintext
{string[] meta} {object[][] rows} ... {rows} ... {meta} {rows} ... {rows} ... {resolve: 1}
```

where `{meta}` is the array of column names, and there are as many `{meta}` as tables read, `{rows}` is the array of arrays of row values as described before, and the last packet is an object `{resolve: 1}`.

If not raw and in packets, it sends, through the `notify`:
```plaintext
{string [] meta, object [][] rows} {meta, rows} ...
```

If not raw and not in packets, it sends a sequence of:
```plaintext
{object[] rows, int set}, ... {object[] rows, int set} ...
```
where `set` indicates the number of the table read (starting from 0), but there could be multiple packets related to the same table, as the maximum packet size is being specified.

If not raw and not in packets, it sends a sequence of:
```plaintext
{object[] rows, int set}, ... {object[] rows, int set}...
```
with as many data blocks as there are tables read.

#### `multiSelect`

Takes a list of [Select](Select.md) in input and executes them in a single batch, returning the result differently depending on whether `raw` is true or false and whether the desired output is in packets or not:

if `raw`:
```plaintext
{string[] meta, string tableName, object [][]rows}, ...
```
where `tableName` is the alias assigned to the table in the method call.

if not `raw`:
```plaintext
{object[] rows, int set, string tablename},.. {object[] rows, int set, string tablename}
```

Usage example (present in unit tests):

```js
const multiSel = [];
multiSel.push(new Select('*').from('customer').multiCompare(new MultiCompare(['cat20'], [2])).intoTable('A'));
multiSel.push(new Select('*').from('seller').multiCompare(new MultiCompare(['idseller'], [6])).intoTable('B'));
multiSel.push(new Select('*').from('customerkind'));
const mSel = DAC.multiSelect({selectList: multiSel, packetSize: 5});

mSel.progress(function (r) {
  tableCount += 1;
  expect(r.rows).toEqual(jasmine.any(Array));
  expect(r.meta).toEqual(jasmine.any(Array));
  expect(r.tableName).toEqual(jasmine.any(String));
  tables[r.tableName] = DA.objectify(r.meta, r.rows);
});
```

#### `mergeMultiSelect`

Similar to `multiSelect`, but instead of returning a series of notifications for each table or packet read, it merges

all the data read into the `DataSet` passed in as input.

### Functions Executing Single SQL Commands

Usually, it is preferable to use the functions of the `PostData` class to perform write operations on the database. The functions of `DataAccess` are to be used for extremely particular cases, for example, if for some reason, a transaction is not desired, which is automatic in the `PostData` class.

- `doSingleDelete`: Performs the deletion of a row from a table based on the given filter.
- `doSingleInsert`: Inserts a row into a table.
- `doSingleUpdate`: Updates a row of a table.

### Functions Invoking Stored Procedures

- `callSP`: Invokes an SP by passing an ordered list of parameters and returns one or more tables.
- `callSPWithNamedParams`: Invokes an SP using parameters by name if the database allows it.

See [jsDataAccessSpec](test/spec/jsDataAccessSpec.js) for various usage examples of the class.
