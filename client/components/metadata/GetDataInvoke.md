<a name="module_GetDataInvoke"></a>

## GetDataInvoke
Fakes client web service invocation of GetDataServices, in order to share metadata classes


* [GetDataInvoke](#module_GetDataInvoke)
    * [~GetDataInvoke](#module_GetDataInvoke..GetDataInvoke)
        * [new GetDataInvoke(ctx)](#new_module_GetDataInvoke..GetDataInvoke_new)
        * [.getMappingWebListRedir(tableName, listType)](#module_GetDataInvoke..GetDataInvoke+getMappingWebListRedir) ⇒ <code>Deferred.&lt;Array.&lt;string&gt;&gt;</code>
    * [~readCached(d)](#module_GetDataInvoke..readCached) ⇒ <code>Deferred</code>
    * [~doGetTable(t, filter, clear, top, selectList)](#module_GetDataInvoke..doGetTable) ⇒ <code>Deferred</code>
    * [~getRowsByFilter(filter, multiCompare, table, top, prepare, [selList])](#module_GetDataInvoke..getRowsByFilter) ⇒ <code>Deferred</code>
    * [~selectCount(tableName, filter)](#module_GetDataInvoke..selectCount) ⇒ <code>Deferred</code>
    * [~runSelect(tableName, columnList, filter, [top])](#module_GetDataInvoke..runSelect) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
    * [~addRowToTable(t, r)](#module_GetDataInvoke..addRowToTable) ⇒ <code>ObjectRow</code>
    * [~multiRunSelect(selectList)](#module_GetDataInvoke..multiRunSelect) ⇒ <code>Deferred</code>
    * [~runSelectIntoTable(t)](#module_GetDataInvoke..runSelectIntoTable) ⇒ <code>DataTable</code>
    * [~createTableByName(tableName, columnList)](#module_GetDataInvoke..createTableByName) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
    * [~getPagedTable(tableName, nPage, nRowPerPage, filter, listType, sortBy)](#module_GetDataInvoke..getPagedTable) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
    * [~getDsByRowKey(dataRow, table, [editType])](#module_GetDataInvoke..getDsByRowKey) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
    * [~getByKey(table, row)](#module_GetDataInvoke..getByKey) ⇒ <code>Deferred.&lt;DataRow&gt;</code>
    * [~getDataSet(tableName, editType)](#module_GetDataInvoke..getDataSet) ⇒ <code>DataSet</code>
    * [~createEmptyDataSet(tableName, editType)](#module_GetDataInvoke..createEmptyDataSet) ⇒
    * [~prefillDataSet(dsTarget, tableName, editType)](#module_GetDataInvoke..prefillDataSet) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
    * [~fillDataSet(dsTarget, tableName, editType, filter)](#module_GetDataInvoke..fillDataSet) ⇒ <code>Deferred.&lt;(DataSet\|string)&gt;</code>
    * [~doGet(ds, dataRow, primaryTableName, onlyPeripherals)](#module_GetDataInvoke..doGet) ⇒ <code>Deferred</code>
    * [~doGetTableRoots(table, filter, clear)](#module_GetDataInvoke..doGetTableRoots)
    * [~describeColumns(table, listType)](#module_GetDataInvoke..describeColumns) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
    * [~describeTree(table, listType)](#module_GetDataInvoke..describeTree) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
    * [~getSpecificChild(table, startCondition, startValueWanted, startFieldWanted)](#module_GetDataInvoke..getSpecificChild) ⇒ <code>Deferred.&lt;ObjectRow&gt;</code>
    * [~launchCustomServerMethod(method, prms)](#module_GetDataInvoke..launchCustomServerMethod) ⇒ <code>Deferred</code>
    * [~doReadValue(tableName, filter, expr, orderBy)](#module_GetDataInvoke..doReadValue) ⇒ <code>Deferred</code>

<a name="module_GetDataInvoke..GetDataInvoke"></a>

### GetDataInvoke~GetDataInvoke
**Kind**: inner class of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  

* [~GetDataInvoke](#module_GetDataInvoke..GetDataInvoke)
    * [new GetDataInvoke(ctx)](#new_module_GetDataInvoke..GetDataInvoke_new)
    * [.getMappingWebListRedir(tableName, listType)](#module_GetDataInvoke..GetDataInvoke+getMappingWebListRedir) ⇒ <code>Deferred.&lt;Array.&lt;string&gt;&gt;</code>

<a name="new_module_GetDataInvoke..GetDataInvoke_new"></a>

#### new GetDataInvoke(ctx)
Exposes server web services as local functions so that code can use them seemingly


| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 

<a name="module_GetDataInvoke..GetDataInvoke+getMappingWebListRedir"></a>

#### getDataInvoke.getMappingWebListRedir(tableName, listType) ⇒ <code>Deferred.&lt;Array.&lt;string&gt;&gt;</code>
Executes the mapping of tableName and listType on "web_listredir" table taking a new tableName (usually a custom view) and a new listType

**Kind**: instance method of [<code>GetDataInvoke</code>](#module_GetDataInvoke..GetDataInvoke)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| listType | <code>string</code> | 

<a name="module_GetDataInvoke..readCached"></a>

### GetDataInvoke~readCached(d) ⇒ <code>Deferred</code>
ASYNCReads all cached tables

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_GetDataInvoke..doGetTable"></a>

### GetDataInvoke~doGetTable(t, filter, clear, top, selectList) ⇒ <code>Deferred</code>
ASYNCGets a DataTable with an optional set of Select. If a list of select is given, adds a select in selectList

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>DataTable</code> | DataTable to Get from DataBase |
| filter | <code>sqlFun</code> |  |
| clear | <code>boolean</code> | if true table is cleared before reading |
| top | <code>string</code> | parameter for "top" clause of select |
| selectList | <code>Array.&lt;filter:sqlFun, top:string, table:DataTable&gt;</code> |  |

<a name="module_GetDataInvoke..getRowsByFilter"></a>

### GetDataInvoke~getRowsByFilter(filter, multiCompare, table, top, prepare, [selList]) ⇒ <code>Deferred</code>
ASYNCReturns the Rows from the DataTable "table" based on the clause "filter"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| filter | <code>sqlFun</code> | 
| multiCompare | <code>boolean</code> | 
| table | <code>DataTable</code> | 
| top | <code>string</code> | 
| prepare | <code>boolean</code> | 
| [selList] | <code>Array.&lt;filter:sqlFun, top:string, table:DataTable&gt;</code> | 

<a name="module_GetDataInvoke..selectCount"></a>

### GetDataInvoke~selectCount(tableName, filter) ⇒ <code>Deferred</code>
ASYNCGets the rows count of the "tableName" filtered on "filter"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| filter | <code>sqlFun</code> | 

<a name="module_GetDataInvoke..runSelect"></a>

### GetDataInvoke~runSelect(tableName, columnList, filter, [top]) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
ASYNCReturns a deferred DataTable where the rows are select on "tableName" filtered on "filter". If "columnList" is "*" it returns all columns,otherwise only those specified in "columnList".If top is specified it returns only a max of "top" rows, otherwise it returns all the rows.

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| columnList | <code>string</code> | 
| filter | <code>sqlFun</code> | 
| [top] | <code>string</code> | 

<a name="module_GetDataInvoke..addRowToTable"></a>

### GetDataInvoke~addRowToTable(t, r) ⇒ <code>ObjectRow</code>
SYNCAdds a copy of the row "r" to the DataTable "t", and returns the linked DataRow

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| r | <code>ObjectRow</code> | 

<a name="module_GetDataInvoke..multiRunSelect"></a>

### GetDataInvoke~multiRunSelect(selectList) ⇒ <code>Deferred</code>
Executes a bunch of select, based on "selectList". Not much different from a multiple runSelectIntoTable

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| selectList | <code>Array.&lt;filter:sqlFun, top:string, table:DataTable&gt;</code> | 

<a name="module_GetDataInvoke..runSelectIntoTable"></a>

### GetDataInvoke~runSelectIntoTable(t) ⇒ <code>DataTable</code>
ASYNCReads a set of rows in a given DataTable "t" based on clause "filter"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Returns**: <code>DataTable</code> - The table with the rows read  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>DataTable</code> |  |
| filter. | <code>sqlFun</code> | The filter to apply to the select |
| top. | <code>string</code> | Max num of rows to read |

<a name="module_GetDataInvoke..createTableByName"></a>

### GetDataInvoke~createTableByName(tableName, columnList) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
ASYNCCreates and returns a DataTable "tableName" with the specified columns

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| columnList | <code>string</code> | 

<a name="module_GetDataInvoke..getPagedTable"></a>

### GetDataInvoke~getPagedTable(tableName, nPage, nRowPerPage, filter, listType, sortBy) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
ASYNCReturns the rows paginated of the DataTable "tableName".The rows are filtered based on clause "filter"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| nPage | <code>number</code> | 
| nRowPerPage | <code>number</code> | 
| filter | <code>sqlFun</code> | 
| listType | <code>string</code> | 
| sortBy | <code>string</code> | 

<a name="module_GetDataInvoke..getDsByRowKey"></a>

### GetDataInvoke~getDsByRowKey(dataRow, table, [editType]) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
ASYNCFills the dataSet starting from a table

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dataRow | <code>DataRow</code> |  |
| table | <code>DataTable</code> | primaryTable |
| [editType] | <code>string</code> | used to retrieve a DataSet. If not specified, table.dataset is used |

<a name="module_GetDataInvoke..getByKey"></a>

### GetDataInvoke~getByKey(table, row) ⇒ <code>Deferred.&lt;DataRow&gt;</code>
ASYNCReturns a deferred with the DataRow of the table, filtered based on the keys of the DataTable "table", where the values are those of "row"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| row | <code>DataRow</code> | 

<a name="module_GetDataInvoke..getDataSet"></a>

### GetDataInvoke~getDataSet(tableName, editType) ⇒ <code>DataSet</code>
ASYNCReturns a deferred resolved with jsDataSet based on "tableName" and "editType" keys

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Returns**: <code>DataSet</code> - )  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| editType | <code>string</code> | 

<a name="module_GetDataInvoke..createEmptyDataSet"></a>

### GetDataInvoke~createEmptyDataSet(tableName, editType) ⇒
ASYNCReturns a deferred resolved with jsDataSet based on "tableName" and "editType" keys

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Returns**: Promise<DataSet>  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| editType | <code>string</code> | 

<a name="module_GetDataInvoke..prefillDataSet"></a>

### GetDataInvoke~prefillDataSet(dsTarget, tableName, editType) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
ASYNCReturns a deferred resolved with the DataSet. It loads data from cached DataTable, based on "staticfilter" property

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Returns**: <code>Deferred.&lt;DataSet&gt;</code> - )  
**Access**: public  

| Param | Type |
| --- | --- |
| dsTarget | <code>jsDataSet</code> | 
| tableName | <code>string</code> | 
| editType | <code>string</code> | 

<a name="module_GetDataInvoke..fillDataSet"></a>

### GetDataInvoke~fillDataSet(dsTarget, tableName, editType, filter) ⇒ <code>Deferred.&lt;(DataSet\|string)&gt;</code>
ASYNCReads and fills from the server the DatSet with tableName.editType, filters it on "filter" and merges it into dsTarget.Returns a deferred resolved with the DataSet merged.

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| dsTarget | <code>DataSet</code> | 
| tableName | <code>string</code> | 
| editType | <code>string</code> | 
| filter | <code>sqlFun</code> | 

<a name="module_GetDataInvoke..doGet"></a>

### GetDataInvoke~doGet(ds, dataRow, primaryTableName, onlyPeripherals) ⇒ <code>Deferred</code>
ASYNCReturns a deferred resolved with a DataSet. The dataSet is the "ds" merged with the dataset filtered on the datarow values.

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 
| dataRow | <code>DataRow</code> | 
| primaryTableName | <code>string</code> | 
| onlyPeripherals | <code>boolean</code> | 

<a name="module_GetDataInvoke..doGetTableRoots"></a>

### GetDataInvoke~doGetTableRoots(table, filter, clear)
ASYNCGets some row from a datatable, with all child rows in the same table

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  
**Remarks**: it was DO_GET_TABLE_ROOTS() in TreViewDataAccess  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| filter | <code>jsDataQuery</code> | 
| clear | <code>boolean</code> | 

<a name="module_GetDataInvoke..describeColumns"></a>

### GetDataInvoke~describeColumns(table, listType) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
ASYNC

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>DataTable</code> |  |
| listType | <code>string</code> | Calls the describeColumns server side method on "tableName" and "listType" |

<a name="module_GetDataInvoke..describeTree"></a>

### GetDataInvoke~describeTree(table, listType) ⇒ <code>Deferred.&lt;DataTable&gt;</code>
ASYNC

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | <code>DataTable</code> |  |
| listType | <code>string</code> | Calls the describeTree server side method on "tableName" and "listType" |

<a name="module_GetDataInvoke..getSpecificChild"></a>

### GetDataInvoke~getSpecificChild(table, startCondition, startValueWanted, startFieldWanted) ⇒ <code>Deferred.&lt;ObjectRow&gt;</code>
ASYNCGets a row from a table T taking the first row by the filterstartCondition AND (startfield like startval%)If more than one row is found, the one with the smallest startfield isreturned. Used for AutoManage functions. and treevewmanger

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| startCondition | <code>sqlFun</code> | 
| startValueWanted | <code>string</code> | 
| startFieldWanted | <code>string</code> | 

<a name="module_GetDataInvoke..launchCustomServerMethod"></a>

### GetDataInvoke~launchCustomServerMethod(method, prms) ⇒ <code>Deferred</code>
ASYNCLaunches a post call to the server with eventName that is the method custom to call, and with custom "prms"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| method | <code>string</code> | 
| prms | <code>object</code> | 

<a name="module_GetDataInvoke..doReadValue"></a>

### GetDataInvoke~doReadValue(tableName, filter, expr, orderBy) ⇒ <code>Deferred</code>
ASYNCReturns a single value from a table based on filter. "select value from tableName where filter"

**Kind**: inner method of [<code>GetDataInvoke</code>](#module_GetDataInvoke)  
**Access**: public  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| filter | <code>sqlFun</code> | 
| expr | <code>sqlFun</code> | 
| orderBy | <code>string</code> | 

