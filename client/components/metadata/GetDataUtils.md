<a name="module_getDataUtils"></a>

## getDataUtils
Collection of utility functions for GetData


* [getDataUtils](#module_getDataUtils)
    * [~getJsObjectFromJson(json)](#module_getDataUtils..getJsObjectFromJson) ⇒ <code>object</code>
    * [~getJsDataTableFromJson(jsonJsDataTable)](#module_getDataUtils..getJsDataTableFromJson) ⇒ <code>DataTable</code>
    * [~getJsDataSetFromJson(jsonJsDataSet)](#module_getDataUtils..getJsDataSetFromJson) ⇒ <code>DataSet</code>
    * [~getJsonFromJsDataSet(ds)](#module_getDataUtils..getJsonFromJsDataSet) ⇒ <code>string</code>
    * [~getJsonFromJsDataSet(dt)](#module_getDataUtils..getJsonFromJsDataSet) ⇒ <code>string</code>
    * [~getJsonFromMessages(messages)](#module_getDataUtils..getJsonFromMessages) ⇒ <code>string</code>
    * [~getJsDataQueryFromJson(jsonJsDataQuery)](#module_getDataUtils..getJsDataQueryFromJson) ⇒ <code>sqlFun</code>
    * [~getJsonFromJsDataQuery(dataQuery)](#module_getDataUtils..getJsonFromJsDataQuery) ⇒ <code>string</code>
    * [~getDataRelationSerialized(rel)](#module_getDataUtils..getDataRelationSerialized) ⇒ <code>string</code>
    * [~cloneDataTable(dt)](#module_getDataUtils..cloneDataTable) ⇒ <code>DataTable</code>
    * [~cloneDataSet(ds)](#module_getDataUtils..cloneDataSet) ⇒ <code>DataSet</code>
    * [~mergeDataSet(checkExistence)](#module_getDataUtils..mergeDataSet)
    * [~mergeDataSetChanges(dsDest, dsSource, changesCommittedToDB)](#module_getDataUtils..mergeDataSetChanges)
    * [~mergeRowsIntoTable(tDest, rows, checkExistence)](#module_getDataUtils..mergeRowsIntoTable)
    * [~containsNull(row, cols)](#module_getDataUtils..containsNull) ⇒ <code>boolean</code>

<a name="module_getDataUtils..getJsObjectFromJson"></a>

### getDataUtils~getJsObjectFromJson(json) ⇒ <code>object</code>
SYNCGiven a json representation of the DataSet/DataTable returns a javascript object

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>object</code> - an object (DataTable or DataSet)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | Json string |

<a name="module_getDataUtils..getJsDataTableFromJson"></a>

### getDataUtils~getJsDataTableFromJson(jsonJsDataTable) ⇒ <code>DataTable</code>
SYNCGiven a json representation of the DataTable returns a Js DataTable

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>DataTable</code> - the datatable  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| jsonJsDataTable | <code>string</code> | JSon string |

<a name="module_getDataUtils..getJsDataSetFromJson"></a>

### getDataUtils~getJsDataSetFromJson(jsonJsDataSet) ⇒ <code>DataSet</code>
SYNCGiven a json representation of the DataSet returns a JsDataSet

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>DataSet</code> - the dataset  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| jsonJsDataSet | <code>string</code> | JSon string |

<a name="module_getDataUtils..getJsonFromJsDataSet"></a>

### getDataUtils~getJsonFromJsDataSet(ds) ⇒ <code>string</code>
SYNCGiven a jsDataSet returns the json string. First it calls the methods serialize() of jsDataSet and then returns the json representation of the dataset object

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>string</code> - the json string  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>DataSet</code> |  |
| serializeStructure. | <code>boolean</code> | If true it serialize data and structure |

<a name="module_getDataUtils..getJsonFromJsDataSet"></a>

### getDataUtils~getJsonFromJsDataSet(dt) ⇒ <code>string</code>
SYNCSerializes a DataTable with the data and structure

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>string</code> - the json string  
**Access**: public  

| Param | Type |
| --- | --- |
| dt | <code>DataTable</code> | 

<a name="module_getDataUtils..getJsonFromMessages"></a>

### getDataUtils~getJsonFromMessages(messages) ⇒ <code>string</code>
SYNCGiven an array of message object returns the json string

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Access**: public  

| Param | Type |
| --- | --- |
| messages | <code>Array.&lt;string&gt;</code> | 

<a name="module_getDataUtils..getJsDataQueryFromJson"></a>

### getDataUtils~getJsDataQueryFromJson(jsonJsDataQuery) ⇒ <code>sqlFun</code>
SYNCGiven a json representation of the JsDataQuery returns a JsDataQuery

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>sqlFun</code> - the jsDataQuery representation of the json  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| jsonJsDataQuery | <code>string</code> | Json string |

<a name="module_getDataUtils..getJsonFromJsDataQuery"></a>

### getDataUtils~getJsonFromJsDataQuery(dataQuery) ⇒ <code>string</code>
SYNCGiven jsDataQuery returns the json string. first it converts jsDataQuery into js object and to a json string

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>string</code> - the json string  
**Access**: public  

| Param | Type |
| --- | --- |
| dataQuery | <code>jsDataQuery</code> | 

<a name="module_getDataUtils..getDataRelationSerialized"></a>

### getDataUtils~getDataRelationSerialized(rel) ⇒ <code>string</code>
SYNCSerializes the DataRelation "rel"

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>string</code> - the string of DataRelation serialized  
**Access**: public  

| Param | Type |
| --- | --- |
| rel | <code>DataRelation</code> | 

<a name="module_getDataUtils..cloneDataTable"></a>

### getDataUtils~cloneDataTable(dt) ⇒ <code>DataTable</code>
SYNCReturns a cloned copy of "dt" input using the ser/der methods of the framework

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Access**: public  

| Param | Type |
| --- | --- |
| dt | <code>DataTable</code> | 

<a name="module_getDataUtils..cloneDataSet"></a>

### getDataUtils~cloneDataSet(ds) ⇒ <code>DataSet</code>
SYNCReturns a cloned copy of "ds" input using the ser/der methods of the framework

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Access**: public  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 

<a name="module_getDataUtils..mergeDataSet"></a>

### getDataUtils~mergeDataSet(checkExistence)
SYNCMerges the rows of dsSource into dsTarget

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dsDest. | <code>DataSet</code> | DataSet target, where inject new rows, taken form dsSource |
| dsSource. | <code>DataSet</code> | The new DataSet, with modifies read from server. Need to merge these rows into dsTarget |
| checkExistence | <code>boolean</code> |  |

<a name="module_getDataUtils..mergeDataSetChanges"></a>

### getDataUtils~mergeDataSetChanges(dsDest, dsSource, changesCommittedToDB)
SYNCMerges rows modified of dsSource into dsDest. Use "merge" method of DataTable of jsDataSet

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Access**: public  

| Param | Type |
| --- | --- |
| dsDest | <code>DataSet</code> | 
| dsSource | <code>DataSet</code> | 
| changesCommittedToDB | <code>boolean</code> | 

<a name="module_getDataUtils..mergeRowsIntoTable"></a>

### getDataUtils~mergeRowsIntoTable(tDest, rows, checkExistence)
SYNCMerges given "rows" in a specified table "tDest"

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Access**: public  

| Param | Type |
| --- | --- |
| tDest | <code>DataTable</code> | 
| rows | <code>Array.&lt;ObjectRow&gt;</code> | 
| checkExistence | <code>boolean</code> | 

<a name="module_getDataUtils..containsNull"></a>

### getDataUtils~containsNull(row, cols) ⇒ <code>boolean</code>
SYNCReturns true if there is a null value or "", for some value in row on the columns cols

**Kind**: inner method of [<code>getDataUtils</code>](#module_getDataUtils)  
**Returns**: <code>boolean</code> - true or false depending if there are null values on row in cols  
**Access**: public  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 
| cols | <code>Array.&lt;DataColumn&gt;</code> | 

