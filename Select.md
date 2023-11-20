[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/Select.it.md)


# Select

Select is a class designed to compose queries in a highly readable way for use.

It is implemented in the jsMultiSelect module.

The DataAccess class exposes a method, multiSelect, which allows specifying a list of Select instances that need to be sent to the database in a single batch, thus saving roundtrip times.

The constructor of Select expects the specification of a list of fields to read or, alternatively, "*" to indicate all fields in the table or view.

Then, there are a series of methods, each of which returns the object itself, allowing for a concatenated and fluent writing style:

### from({string} tableName)
Specifies from which table to read the data.

### top({string} N)
Specifies to read only the top N rows.

### where({sqlFun} filter)
Specifies a filter for reading the data.

### intoTable({string} alias)
Specifies a name for the table to insert the data, i.e., for the result of the reading, which may differ from the table from which the data is physically read from the database.

### orderBy({string} sorting)
Specifies a sorting clause for reading. It can be useful when used in conjunction with top().

### multiCompare({MultiCompare} comp)
Specifies an object of type MultiCompare instead of a generic SqlFun filter as where does. A MultiCompare object is a filter that simply compares a list of fields with values, i.e., it is not a generic filter like a SqlFun, which can contain any combination of logical expressions on fields.

This allows the execution of the query with very advanced optimizations when multiple batches of rows from a certain table are requested in the same batch. All of this happens transparently to the user.

## MultiCompare
The MultiCompare class is a simple structure containing a series of field names and a series of values to compare with those fields.