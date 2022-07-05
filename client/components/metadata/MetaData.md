<a name="module_MetaData"></a>

## MetaData
Contains all the information for a MetaData


* [MetaData](#module_MetaData)
    * [~AutoInfo](#module_MetaData..AutoInfo)
        * [new AutoInfo(G, type, startFilter, startField, table, kind)](#new_module_MetaData..AutoInfo_new)
    * [~MetaData](#module_MetaData..MetaData)
        * [new MetaData(tableName)](#new_module_MetaData..MetaData_new)
    * [~isValid(r)](#module_MetaData..isValid) ⇒ <code>Deferred</code>
    * [~primaryKey()](#module_MetaData..primaryKey) ⇒ <code>Array.&lt;string&gt;</code>
    * [~describeColumnsStructure(table)](#module_MetaData..describeColumnsStructure) ⇒ <code>\*</code>
    * [~describeColumnsStructure(t, cName, caption, format, pos, maxLen)](#module_MetaData..describeColumnsStructure)
    * [~insertFilter()](#module_MetaData..insertFilter) ⇒ <code>jsDataQuery</code> \| <code>null</code>
    * [~searchFilter()](#module_MetaData..searchFilter) ⇒ <code>jsDataQuery</code> \| <code>null</code>
    * [~describeColumns(table, listType)](#module_MetaData..describeColumns) ⇒ <code>Promise.&lt;DataTable&gt;</code>
    * [~describeTree(table, listType)](#module_MetaData..describeTree) ⇒ <code>Object</code>
    * [~getStaticFilter(listType)](#module_MetaData..getStaticFilter) ⇒ <code>jsDataQuery</code> \| <code>null</code>
    * [~sortedColumnNameList(table)](#module_MetaData..sortedColumnNameList)
    * [~getName(editType)](#module_MetaData..getName) ⇒ <code>string</code>
    * [~getSorting(listType)](#module_MetaData..getSorting) ⇒ <code>string</code> \| <code>null</code>
    * [~getNewRow(dtDest)](#module_MetaData..getNewRow) ⇒ <code>Deferred.&lt;(DataRow\|null)&gt;</code>
    * [~copyExtraPropertiesTable(dtIn, dtDest)](#module_MetaData..copyExtraPropertiesTable)
    * [~doDelete(col, sourceRow, destRow)](#module_MetaData..doDelete)

<a name="module_MetaData..AutoInfo"></a>

### MetaData~AutoInfo
**Kind**: inner class of [<code>MetaData</code>](#module_MetaData)  
<a name="new_module_MetaData..AutoInfo_new"></a>

#### new AutoInfo(G, type, startFilter, startField, table, kind)
Information abount an AutoManage or AutoChoose div


| Param | Type | Description |
| --- | --- | --- |
| G | <code>element</code> | usually DIV or SPAN |
| type | <code>string</code> |  |
| startFilter | <code>jsDataQuery</code> |  |
| startField | <code>string</code> |  |
| table | <code>string</code> |  |
| kind | <code>string</code> |  |

<a name="module_MetaData..MetaData"></a>

### MetaData~MetaData
**Kind**: inner class of [<code>MetaData</code>](#module_MetaData)  
<a name="new_module_MetaData..MetaData_new"></a>

#### new MetaData(tableName)
Information about a metadata


| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_MetaData..isValid"></a>

### MetaData~isValid(r) ⇒ <code>Deferred</code>
ASYNC
Checks if a DataRow "r" has a valid data. Returns an object { warningMsg, errMsg, errField, row }

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Returns**: <code>Deferred</code> - can be null or Object  
**Access**: public  

| Param | Type |
| --- | --- |
| r | <code>DataRow</code> | 

<a name="module_MetaData..primaryKey"></a>

### MetaData~primaryKey() ⇒ <code>Array.&lt;string&gt;</code>
SYNC
Returns the list of primary key fields, this has to be redefined for views.

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  
<a name="module_MetaData..describeColumnsStructure"></a>

### MetaData~describeColumnsStructure(table) ⇒ <code>\*</code>
ASYNCH
Sets Captions, DenyNull and Format properties of Columns. They are usually set on backend.

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 

<a name="module_MetaData..describeColumnsStructure"></a>

### MetaData~describeColumnsStructure(t, cName, caption, format, pos, maxLen)
SYNC
Set some information (useful on visualization) on column "cName"

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| cName | <code>string</code> | 
| caption | <code>string</code> | 
| format | <code>string</code> | 
| pos | <code>Number</code> | 
| maxLen | <code>Number</code> | 

<a name="module_MetaData..insertFilter"></a>

### MetaData~insertFilter() ⇒ <code>jsDataQuery</code> \| <code>null</code>
SYNC

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  
<a name="module_MetaData..searchFilter"></a>

### MetaData~searchFilter() ⇒ <code>jsDataQuery</code> \| <code>null</code>
SYNC

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  
<a name="module_MetaData..describeColumns"></a>

### MetaData~describeColumns(table, listType) ⇒ <code>Promise.&lt;DataTable&gt;</code>
ASYNC
Describes a listing type (captions, column order, formulas, column formats and so on)

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| listType | <code>string</code> | 

<a name="module_MetaData..describeTree"></a>

### MetaData~describeTree(table, listType) ⇒ <code>Object</code>
ASYNC
Describes the table of the tree

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| listType | <code>string</code> | 

<a name="module_MetaData..getStaticFilter"></a>

### MetaData~getStaticFilter(listType) ⇒ <code>jsDataQuery</code> \| <code>null</code>
ASYNC
Gets the static filter associated to the "listType"

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param |
| --- |
| listType | 

<a name="module_MetaData..sortedColumnNameList"></a>

### MetaData~sortedColumnNameList(table)
ASYNC
Returns the list of real (not temporary or expression) columns NAMES of a table "table"
formatting it like "fieldname1, fieldname2,...."

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 

<a name="module_MetaData..getName"></a>

### MetaData~getName(editType) ⇒ <code>string</code>
SYNC
Gets metadata name

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| editType | <code>string</code> | 

<a name="module_MetaData..getSorting"></a>

### MetaData~getSorting(listType) ⇒ <code>string</code> \| <code>null</code>
SYNC
Returns the default sorting for a list type "listType"

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| listType | <code>string</code> | 

<a name="module_MetaData..getNewRow"></a>

### MetaData~getNewRow(dtDest) ⇒ <code>Deferred.&lt;(DataRow\|null)&gt;</code>
ASYNC
Gets new row, having ParentRow as Parent, and adds it on DataTable "dtDest"

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| parentRow. | <code>DataRow</code> | Parent Row of the new Row to create, or null if no parent is present |
| dtDest | <code>DataTable</code> | Table in which row has to be added |

<a name="module_MetaData..copyExtraPropertiesTable"></a>

### MetaData~copyExtraPropertiesTable(dtIn, dtDest)
SYNC
Copies some useful properties form dtIn to dtOut

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| dtIn | <code>DataTable</code> | 
| dtDest | <code>DataTable</code> | 

<a name="module_MetaData..doDelete"></a>

### MetaData~doDelete(col, sourceRow, destRow)
SYNC
To override eventually. Copies the value of the column col of the row "source" on the row "dest"

**Kind**: inner method of [<code>MetaData</code>](#module_MetaData)  
**Access**: public  

| Param | Type |
| --- | --- |
| col | <code>DataColumn</code> | 
| sourceRow | <code>ObjectRow</code> | 
| destRow | <code>ObjectRow</code> | 

