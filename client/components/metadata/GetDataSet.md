<a name="GetDataSet"></a>

## GetDataSet()
Retrieves dataset from repository

**Kind**: global function  

* [GetDataSet()](#GetDataSet)
    * [.getDataSet(tableName, editType)](#GetDataSet+getDataSet) ⇒ <code>DataSet</code> \| <code>null</code>
    * [.createEmptyDataSet(ctx, tableName, editType)](#GetDataSet+createEmptyDataSet) ⇒ <code>Promise.&lt;DataSet&gt;</code>
    * [.addSubEntityExtProperties(ctx, parent, editType, scannedTable)](#GetDataSet+addSubEntityExtProperties)

<a name="GetDataSet+getDataSet"></a>

### getDataSet.getDataSet(tableName, editType) ⇒ <code>DataSet</code> \| <code>null</code>
Creates a metadata with a specified name

**Kind**: instance method of [<code>GetDataSet</code>](#GetDataSet)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| editType | <code>string</code> | 

<a name="GetDataSet+createEmptyDataSet"></a>

### getDataSet.createEmptyDataSet(ctx, tableName, editType) ⇒ <code>Promise.&lt;DataSet&gt;</code>
**Kind**: instance method of [<code>GetDataSet</code>](#GetDataSet)  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 
| tableName | <code>string</code> | 
| editType | <code>string</code> | 

<a name="GetDataSet+addSubEntityExtProperties"></a>

### getDataSet.addSubEntityExtProperties(ctx, parent, editType, scannedTable)
**Kind**: instance method of [<code>GetDataSet</code>](#GetDataSet)  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 
| parent | <code>DataTable</code> | 
| editType | <code>string</code> | 
| scannedTable | <code>Set</code> | 

