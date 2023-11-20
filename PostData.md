[![it](https://img.shields.io/badge/lang-it-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/PostData.it.md)

# PostData

The `PostData` class allows saving the content of entire DataSets to the Database.

The changes are derived from the DataSet based on the state of the rows present in its tables.

### Order of Saving Rows and Tables
The order of saving rows depends on the relationships of the tables and the state of the rows. Therefore, rows in the insertion state of parent tables will be written before the insertion state child rows.

Conversely, child rows to be deleted will be deleted before any parent rows to be deleted.

### Calculation of Auto-increment Fields
Based on the auto-increment properties defined on the columns of the DataSet, calculations and subsequent database reads are performed at the time of saving to manage fields with an incremental logic, even discreetly complex and dependent on the other fields of the row being saved.

Regarding auto-increment fields, these are set through the properties of the [DataTable](jsDataSet.md) class, in particular with the AutoIncrementColumn(columnName, options) method, specifying in the options:

- `columnName`: name of the auto-increment field, i.e., a field that, when saving a row in the insertion state, is calculated as the maximum value of that column, with any other additional conditions and modes that we will see now.
- `{string[]}` `selector`: an array of column names selector for the calculation of this field. The selectors are fields that are compared to calculate the max()+1 of an auto-increment field when a row is inserted. For example, if the selector fields are A and B, and the object to be inserted is {N:1, A:'x', B:'y'}, the query for calculating the max will be like select max(N) from table where A='x' and B='y', assuming that N is auto-increment.
- `{number[]}` `selectorMask`: masks to apply to the selector fields. The mask is bitwise AND with the value of the selector.
- `{string}` `prefixField`: the name of the prefix field to use as a prefix after calculating the maximum value. For example, if the `prefixField` is C and the row to be inserted is {N:'AAA1', C:'AAA'}, a query like SELECT MAX(convert(int, substring(N,4,12) where N like 'AAA%') will be performed.
- `{string}` `middleConst`: constant value to be appended to the prefix value obtained with `prefixField`.
- `{int}` `idLen`: size of the auto-increment field in characters when it consists of a substring, default is 12.

### Application of Business Logic
The `PostData` class is designed for the application of Business Logic. In fact, to obtain the object that deals with it, it invokes the `getBusinessLogic` method, which by default returns a class that performs no checks but is easily redefinable, and this has been done in the [BusinessPostData](jsBusinessLogic.md) class.

### Application of Security Logic
For each row to be saved, the `canPost` method of the `Security` class is invoked to verify if the user has the ability to perform that operation. The instance of the `Security` class is taken from the `security` property of the `Context` passed in the `init` method. If even a single row is not insertable/deletable/modifiable based on this criterion, the entire transaction is canceled.

Although `PostData` is a class that performs a rather complex function, its methods are essentially two:

- `init({[DataSet](jsDataSet.md)} d, {[Context](Context.md)} c)`: instructs the instance of the class to save the data of DataSet `d` using the `Context` context. It is possible to save multiple DataSets simultaneously by calling this method multiple times before invoking the `doPost` method.
- `doPost(options)`: saves all specified DataSets, returning a series of messages where Business rules are violated or errors in writing to the Database.

The `doPost` options include:

- `isolationLevel`: by default `DataAccess.isolationLevels.readCommitted`, the isolation level to use in the transaction.
- `OptimisticLocking`: an instance of `OptimisticLocking`, which is a class defined in [jsDataSet](jsDataSet.md), and its default is set by the `createPostData` method of the `jsApplication` class.
- `previousRules`: a list of business messages to ignore, in case of duplicates during saving. How duplicates are defined depends on the `getId` method of the `BasicMessage` class, which usually simply compares the `msg` field of the message itself.

## Nested Saves
It is also possible, and documented in the unit tests, to use the `PostData` class more advancedly, namely nested saving. This can be useful if one of the two DataSets to be saved is not available initially but can only be calculated after writing the data of the first to the Database (but before committing the transaction). With the nested mode, it is the external `PostData` class that opens and closes the transaction, and the internal `PostData` class saves the data and returns messages that are combined with those of the external class. The method used for this purpose is `setInnerPosting`, to be called on the external class, which takes two parameters:

- `DataSet`: data to be saved in the nested posting (but not examined until the external one is saved).
- `innerPoster` (of type `IInnerPoster`): class to use to initialize the internal `PostData` class when the external one has written the data to the db.

The `IInnerPoster` class is written so that it can be easily redefined, in particular:

- The constructor creates a simple `PostData` class and puts it in the `p` property. It can be redefined to create a different class, for example, `BusinessPostData`, derived from `PostData`.
- The `init` method, which simply calls `p.setAsInnerPoster()` and then the `init` method of `p` with the dataset passed from the caller. At this stage, you can modify the DataSet and make any type of change before calling the `init` method of the internal class.
