## Modules

<dl>
<dt><a href="#module_DataSet">DataSet</a></dt>
<dd><p>DataRow shim, provides methods to manage objects as Ado.Net DataRows</p>
</dd>
<dt><a href="#module_DataSet">DataSet</a></dt>
<dd><p>Provides shim for Ado.net DataSet class</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#DataColumn">DataColumn</a></dt>
<dd></dd>
</dl>

<a name="module_DataSet"></a>

## DataSet
DataRow shim, provides methods to manage objects as Ado.Net DataRows

**Submodule**: DataRow  

* [DataSet](#module_DataSet)
    * [~ObjectRow](#module_DataSet..ObjectRow)
        * [new ObjectRow()](#new_module_DataSet..ObjectRow_new)
    * [~DataRow](#module_DataSet..DataRow)
        * [new DataRow()](#new_module_DataSet..DataRow_new)
        * [new DataRow(o)](#new_module_DataSet..DataRow_new)
    * [~DataRow](#module_DataSet..DataRow)
        * [new DataRow()](#new_module_DataSet..DataRow_new)
        * [new DataRow(o)](#new_module_DataSet..DataRow_new)
    * [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
        * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
        * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)
    * [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
        * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
        * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)
    * [~DataTable](#module_DataSet..DataTable)
        * [new DataTable()](#new_module_DataSet..DataTable_new)
    * [~OptimisticLocking](#module_DataSet..OptimisticLocking)
        * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
        * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)
    * [~OptimisticLocking](#module_DataSet..OptimisticLocking)
        * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
        * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)
    * [~DataRelation](#module_DataSet..DataRelation)
        * [new DataRelation()](#new_module_DataSet..DataRelation_new)
        * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)
    * [~DataRelation](#module_DataSet..DataRelation)
        * [new DataRelation()](#new_module_DataSet..DataRelation_new)
        * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)
    * [~DataSet](#module_DataSet..DataSet)
        * [new DataSet()](#new_module_DataSet..DataSet_new)
        * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)
    * [~DataSet](#module_DataSet..DataSet)
        * [new DataSet()](#new_module_DataSet..DataSet_new)
        * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)
    * [~getRow()](#module_DataSet..getRow) ⇒ <code>DataRow</code>
    * [~getValue(fieldName, [dataRowVer])](#module_DataSet..getValue) ⇒ <code>object</code>
    * [~originalRow()](#module_DataSet..originalRow) ⇒ <code>object</code>
    * [~makeEqualTo(o)](#module_DataSet..makeEqualTo) ⇒ <code>DataRow</code>
    * [~patchTo(o)](#module_DataSet..patchTo) ⇒ <code>DataRow</code>
    * [~acceptChanges()](#module_DataSet..acceptChanges) ⇒ <code>DataRow</code>
    * [~rejectChanges()](#module_DataSet..rejectChanges) ⇒ <code>DataRow</code>
    * [~detach()](#module_DataSet..detach) ⇒ <code>undefined</code>
    * [~del()](#module_DataSet..del) ⇒ <code>DataRow</code>
    * [~toString()](#module_DataSet..toString) ⇒ <code>string</code>
    * [~getParentRows(relName)](#module_DataSet..getParentRows) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getParentsInTable(parentTableName)](#module_DataSet..getParentsInTable) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getChildRows(relName)](#module_DataSet..getChildRows) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getChildInTable(childTableName)](#module_DataSet..getChildInTable) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~keySample()](#module_DataSet..keySample) ⇒ <code>object</code>
    * [~getSelector(r)](#module_DataSet..getSelector) ⇒ <code>sqlFun</code>
    * [~getPrefix(r)](#module_DataSet..getPrefix) ⇒
    * [~getExpression(r)](#module_DataSet..getExpression) ⇒ <code>sqlFun</code>
    * [~customFunction(r, columnName, conn)](#module_DataSet..customFunction) ⇒ <code>object</code>
    * [~setOptimize(value)](#module_DataSet..setOptimize)
    * [~isOptimized()](#module_DataSet..isOptimized) ⇒ <code>boolean</code>
    * [~clearMaxCache()](#module_DataSet..clearMaxCache)
    * [~setMaxExpr(field, expr, filter, num)](#module_DataSet..setMaxExpr)
    * [~minimumTempValue(field, [value])](#module_DataSet..minimumTempValue)
    * [~getMaxExpr(field, expr, filter)](#module_DataSet..getMaxExpr) ⇒ <code>number</code>
    * [~cachedMaxSubstring(field, start, len, filter)](#module_DataSet..cachedMaxSubstring) ⇒ <code>number</code>
    * [~select([filter])](#module_DataSet..select) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~selectAll(filter)](#module_DataSet..selectAll) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~keyFilter(row)](#module_DataSet..keyFilter) ⇒ <code>\*</code> \| <code>sqlFun</code>
    * [~key([k])](#module_DataSet..key) ⇒ <code>\*</code> \| <code>Array.&lt;string&gt;</code>
    * [~clear()](#module_DataSet..clear)
    * [~detach(obj)](#module_DataSet..detach)
    * [~add(obj)](#module_DataSet..add) ⇒
    * [~existingRow(obj)](#module_DataSet..existingRow) ⇒ <code>DataRow</code> \| <code>undefined</code>
    * [~load(obj, [safe])](#module_DataSet..load) ⇒ <code>DataRow</code>
    * [~loadArray(arr, safe)](#module_DataSet..loadArray) ⇒
    * [~acceptChanges()](#module_DataSet..acceptChanges)
    * [~rejectChanges()](#module_DataSet..rejectChanges)
    * [~hasChanges()](#module_DataSet..hasChanges) ⇒ <code>boolean</code>
    * [~getChanges()](#module_DataSet..getChanges) ⇒ <code>Array</code>
    * [~toString()](#module_DataSet..toString) ⇒ <code>string</code>
    * [~importRow(row)](#module_DataSet..importRow) ⇒ <code>DataRow</code>
    * [~defaults([def])](#module_DataSet..defaults) ⇒ <code>object</code> \| <code>\*</code>
    * [~clearDefaults()](#module_DataSet..clearDefaults)
    * [~newRow([obj], [parentRow])](#module_DataSet..newRow) ⇒ <code>object</code>
    * [~makeChild(childRow, parentTable, [parentRow])](#module_DataSet..makeChild)
    * [~skipSecurity([arg])](#module_DataSet..skipSecurity) ⇒ <code>\*</code> \| <code>boolean</code>
    * [~skipInsertCopy([arg])](#module_DataSet..skipInsertCopy) ⇒ <code>\*</code> \| <code>boolean</code>
    * [~denyClear([arg])](#module_DataSet..denyClear) ⇒ <code>\*</code> \| <code>string</code>
    * [~viewTable([arg])](#module_DataSet..viewTable) ⇒ <code>\*</code> \| <code>string</code>
    * [~realTable([arg])](#module_DataSet..realTable) ⇒ <code>null</code> \| <code>string</code>
    * [~postingTable()](#module_DataSet..postingTable) ⇒ <code>string</code>
    * [~tableForReading([tableName])](#module_DataSet..tableForReading) ⇒ <code>\*</code> \| <code>DataTable.myTableForReading</code> \| <code>DataTable.name</code>
    * [~tableForWriting([tableName])](#module_DataSet..tableForWriting) ⇒ <code>\*</code> \| <code>DataTable.myTableForWriting</code> \| <code>DataTable.name</code>
    * [~staticFilter([filter])](#module_DataSet..staticFilter) ⇒ <code>sqlFun</code>
    * [~columnList()](#module_DataSet..columnList) ⇒
    * [~getAutoIncrementColumns()](#module_DataSet..getAutoIncrementColumns) ⇒
    * [~autoIncrement(fieldName, [autoIncrementInfo])](#module_DataSet..autoIncrement) ⇒ <code>\*</code> \| <code>AutoIncrementColumn</code>
    * [~parentRelations()](#module_DataSet..parentRelations) ⇒
    * [~childRelations()](#module_DataSet..childRelations) ⇒
    * [~mergeArray(arr, overwrite)](#module_DataSet..mergeArray) ⇒ <code>\*</code>
    * [~clone()](#module_DataSet..clone) ⇒ <code>DataTable</code>
    * [~safeAssign(r, field, value)](#module_DataSet..safeAssign) ⇒ <code>\*</code>
    * [~avoidCollisions(r, field, value)](#module_DataSet..avoidCollisions)
    * [~assignField(r, field, value)](#module_DataSet..assignField)
    * [~updateDependencies(row, field)](#module_DataSet..updateDependencies) ⇒ <code>\*</code>
    * [~calcTemporaryId(r, [field])](#module_DataSet..calcTemporaryId)
    * [~mergeAsPut(t)](#module_DataSet..mergeAsPut)
    * [~mergeAsPost(t)](#module_DataSet..mergeAsPost)
    * [~mergeAsPatch(t)](#module_DataSet..mergeAsPatch)
    * [~prepareForPosting(r, env)](#module_DataSet..prepareForPosting)
    * [~getOptimisticLock(r)](#module_DataSet..getOptimisticLock) ⇒ <code>sqlFun</code>
    * [~getChildFilter(parentRow, [alias])](#module_DataSet..getChildFilter)
    * [~getChild(parentRow)](#module_DataSet..getChild) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getParentsFilter(childRow, [alias])](#module_DataSet..getParentsFilter)
    * [~getParents(childRow)](#module_DataSet..getParents) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~isEntityRelation()](#module_DataSet..isEntityRelation) ⇒ <code>boolean</code>
    * [~makeChild(parentRow, childRow)](#module_DataSet..makeChild) ⇒ <code>\*</code>
    * [~clone()](#module_DataSet..clone) ⇒ <code>DataSet</code>
    * [~newTable(tableName)](#module_DataSet..newTable) ⇒ <code>DataTable</code>
    * [~addTable(table)](#module_DataSet..addTable) ⇒ <code>DataTable</code>
    * [~copy()](#module_DataSet..copy) ⇒ <code>DataSet</code>
    * [~acceptChanges()](#module_DataSet..acceptChanges)
    * [~rejectChanges()](#module_DataSet..rejectChanges)
    * [~hasChanges()](#module_DataSet..hasChanges) ⇒ <code>boolean</code>
    * [~newRelation(relationName, parentTableName, parentColsName, childTableName, childColsName)](#module_DataSet..newRelation) ⇒ <code>DataRelation</code>
    * [~cascadeDelete(row)](#module_DataSet..cascadeDelete) ⇒ <code>\*</code>
    * [~serialize([serializeStructure], [filterRow])](#module_DataSet..serialize) ⇒ <code>object</code>
    * [~deSerialize(d, deSerializeStructure)](#module_DataSet..deSerialize)
    * [~mergeAsPut(d)](#module_DataSet..mergeAsPut)
    * [~mergeAsPost(d)](#module_DataSet..mergeAsPost)
    * [~mergeAsPatch(d)](#module_DataSet..mergeAsPatch)
    * [~importData(d)](#module_DataSet..importData)

<a name="module_DataSet..ObjectRow"></a>

### DataSet~ObjectRow
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  
**Access**: public  
<a name="new_module_DataSet..ObjectRow_new"></a>

#### new ObjectRow()
class type to host data

<a name="module_DataSet..DataRow"></a>

### DataSet~DataRow
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRow](#module_DataSet..DataRow)
    * [new DataRow()](#new_module_DataSet..DataRow_new)
    * [new DataRow(o)](#new_module_DataSet..DataRow_new)

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow()
Provides methods to manage objects as Ado.Net DataRows

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow(o)
Creates a DataRow from a generic plain object, and returns the DataRow


| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | this is the main object managed by the application logic, it is attached to a getRow function |

<a name="module_DataSet..DataRow"></a>

### DataSet~DataRow
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRow](#module_DataSet..DataRow)
    * [new DataRow()](#new_module_DataSet..DataRow_new)
    * [new DataRow(o)](#new_module_DataSet..DataRow_new)

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow()
Provides methods to manage objects as Ado.Net DataRows

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow(o)
Creates a DataRow from a generic plain object, and returns the DataRow


| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | this is the main object managed by the application logic, it is attached to a getRow function |

<a name="module_DataSet..AutoIncrementColumn"></a>

### DataSet~AutoIncrementColumn
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
    * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
    * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn()
Describe how to evaluate the value of a column before posting it

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn(columnName, options)
Create a AutoIncrementColumn


| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>string</code> |  |
| options | <code>object</code> | same options as AutoIncrement properties |

<a name="module_DataSet..AutoIncrementColumn"></a>

### DataSet~AutoIncrementColumn
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
    * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
    * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn()
Describe how to evaluate the value of a column before posting it

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn(columnName, options)
Create a AutoIncrementColumn


| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>string</code> |  |
| options | <code>object</code> | same options as AutoIncrement properties |

<a name="module_DataSet..DataTable"></a>

### DataSet~DataTable
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  
<a name="new_module_DataSet..DataTable_new"></a>

#### new DataTable()
A DataTable is s collection of ObjectRow and provides information about the structure of logical table

<a name="module_DataSet..OptimisticLocking"></a>

### DataSet~OptimisticLocking
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~OptimisticLocking](#module_DataSet..OptimisticLocking)
    * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
    * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking()
Manages auto fill of locking purposed fields and evaluates filter for optimistic locking for updateIn his basic implementation accept a list of fields to fill. Values for filling are taken from environment.

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking(updateFields, createFields)

| Param | Type | Description |
| --- | --- | --- |
| updateFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during update operations |
| createFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during insert operations |

<a name="module_DataSet..OptimisticLocking"></a>

### DataSet~OptimisticLocking
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~OptimisticLocking](#module_DataSet..OptimisticLocking)
    * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
    * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking()
Manages auto fill of locking purposed fields and evaluates filter for optimistic locking for updateIn his basic implementation accept a list of fields to fill. Values for filling are taken from environment.

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking(updateFields, createFields)

| Param | Type | Description |
| --- | --- | --- |
| updateFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during update operations |
| createFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during insert operations |

<a name="module_DataSet..DataRelation"></a>

### DataSet~DataRelation
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRelation](#module_DataSet..DataRelation)
    * [new DataRelation()](#new_module_DataSet..DataRelation_new)
    * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation()
Describe a relation between two DataTables of a DataSet.

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])
creates a DataRelation


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| relationName | <code>string</code> |  |  |
| parentTableName | <code>string</code> |  |  |
| parentColsName | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | array of string |
| childTableName | <code>string</code> |  |  |
| [childColsName] | <code>String</code> \| <code>Array.&lt;String&gt;</code> | <code>parentColsName</code> | optional names of child columns |

<a name="module_DataSet..DataRelation"></a>

### DataSet~DataRelation
DataRelation

**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRelation](#module_DataSet..DataRelation)
    * [new DataRelation()](#new_module_DataSet..DataRelation_new)
    * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation()
Describe a relation between two DataTables of a DataSet.

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])
creates a DataRelation


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| relationName | <code>string</code> |  |  |
| parentTableName | <code>string</code> |  |  |
| parentColsName | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | array of string |
| childTableName | <code>string</code> |  |  |
| [childColsName] | <code>String</code> \| <code>Array.&lt;String&gt;</code> | <code>parentColsName</code> | optional names of child columns |

<a name="module_DataSet..DataSet"></a>

### DataSet~DataSet
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataSet](#module_DataSet..DataSet)
    * [new DataSet()](#new_module_DataSet..DataSet_new)
    * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet()
Stores and manages a set of DataTables and DataRelations

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet(dataSetName)
Creates an empty DataSet


| Param | Type |
| --- | --- |
| dataSetName | <code>string</code> | 

<a name="module_DataSet..DataSet"></a>

### DataSet~DataSet
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataSet](#module_DataSet..DataSet)
    * [new DataSet()](#new_module_DataSet..DataSet_new)
    * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet()
Stores and manages a set of DataTables and DataRelations

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet(dataSetName)
Creates an empty DataSet


| Param | Type |
| --- | --- |
| dataSetName | <code>string</code> | 

<a name="module_DataSet..getRow"></a>

### DataSet~getRow() ⇒ <code>DataRow</code>
Gets the DataRow linked to an ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Access**: public  
<a name="module_DataSet..getValue"></a>

### DataSet~getValue(fieldName, [dataRowVer]) ⇒ <code>object</code>
get the value of a field of the object. If dataRowVer is omitted, it's equivalent to o.fieldName

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fieldName | <code>string</code> |  |  |
| [dataRowVer] | <code>DataRowVersion</code> | <code>&#x27;current&#x27;</code> | possible values are 'original', 'current' |

<a name="module_DataSet..originalRow"></a>

### DataSet~originalRow() ⇒ <code>object</code>
Gets the original row, before changes was made, undefined if current state is added

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..makeEqualTo"></a>

### DataSet~makeEqualTo(o) ⇒ <code>DataRow</code>
changes current row to make it's current values equal to another one. Deleted rows becomes modifiedcompared to patchTo, this also removes values that are not present in other row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| o | <code>object</code> | 

<a name="module_DataSet..patchTo"></a>

### DataSet~patchTo(o) ⇒ <code>DataRow</code>
changes current row to make it's current values equal to another one. Deleted rows becomes modified

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| o | <code>object</code> | 

<a name="module_DataSet..acceptChanges"></a>

### DataSet~acceptChanges() ⇒ <code>DataRow</code>
Makes changes permanents, discarding old values. state becomes unchanged, detached remains detached

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..rejectChanges"></a>

### DataSet~rejectChanges() ⇒ <code>DataRow</code>
Discard changes, restoring the original values of the object. state becomes unchanged,detached remains detached

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..detach"></a>

### DataSet~detach() ⇒ <code>undefined</code>
Detaches row, loosing all changes made. object is also removed from the underlying DataTable.Proxy is disposed.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..del"></a>

### DataSet~del() ⇒ <code>DataRow</code>
Deletes the row. If it is in added state it becomes detached. Otherwise any changes are lost, and only rejectChanges can bring the row into life again

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..toString"></a>

### DataSet~toString() ⇒ <code>string</code>
Debug - helper function

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..getParentRows"></a>

### DataSet~getParentRows(relName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets the parent(s) of this row in the dataSet it is contained, following the relation with the specified name

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| relName | <code>string</code> | 

<a name="module_DataSet..getParentsInTable"></a>

### DataSet~getParentsInTable(parentTableName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets parents row of this row in a given table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| parentTableName | <code>string</code> | 

<a name="module_DataSet..getChildRows"></a>

### DataSet~getChildRows(relName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets the child(s) of this row in the dataSet it is contained, following the relation with the specified name

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| relName | <code>string</code> | 

<a name="module_DataSet..getChildInTable"></a>

### DataSet~getChildInTable(childTableName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets child rows of this row in a given table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| childTableName | <code>string</code> | 

<a name="module_DataSet..keySample"></a>

### DataSet~keySample() ⇒ <code>object</code>
Get an object with all key fields of this row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..getSelector"></a>

### DataSet~getSelector(r) ⇒ <code>sqlFun</code>
evaluates the function to filter selector on a specified row and column

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_DataSet..getPrefix"></a>

### DataSet~getPrefix(r) ⇒
Gets the prefix evaluated for a given row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: string  

| Param |
| --- |
| r | 

<a name="module_DataSet..getExpression"></a>

### DataSet~getExpression(r) ⇒ <code>sqlFun</code>
gets the expression to be used for retrieving the max

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_DataSet..customFunction"></a>

### DataSet~customFunction(r, columnName, conn) ⇒ <code>object</code>
Optional custom function to be called to evaluate the maximum value

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| columnName | <code>string</code> | 
| conn | <code>jsDataAccess</code> | 

<a name="module_DataSet..setOptimize"></a>

### DataSet~setOptimize(value)
Mark the table as optimized / not optimizedAn optimized table has a cache for all autoincrement field

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| value | <code>boolean</code> | 

<a name="module_DataSet..isOptimized"></a>

### DataSet~isOptimized() ⇒ <code>boolean</code>
Check if this table is optimized

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..clearMaxCache"></a>

### DataSet~clearMaxCache()
Clear evaluated max cache

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..setMaxExpr"></a>

### DataSet~setMaxExpr(field, expr, filter, num)
Set a value in the max cache

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| expr | <code>sqlFun</code> | 
| filter | <code>sqlFun</code> | 
| num | <code>int</code> | 

<a name="module_DataSet..minimumTempValue"></a>

### DataSet~minimumTempValue(field, [value])
get/set the minimum temp value for a field, assuming 0 if undefined

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| [value] | <code>number</code> | 

<a name="module_DataSet..getMaxExpr"></a>

### DataSet~getMaxExpr(field, expr, filter) ⇒ <code>number</code>
gets the max in cache for a field and updates the cache

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| expr | <code>sqlFun</code> \| <code>string</code> | 
| filter | <code>sqlFun</code> | 

<a name="module_DataSet..cachedMaxSubstring"></a>

### DataSet~cachedMaxSubstring(field, start, len, filter) ⇒ <code>number</code>
Evaluates the max of an expression eventually using a cached value

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| start | <code>number</code> | 
| len | <code>number</code> | 
| filter | <code>sqlFun</code> | 

<a name="module_DataSet..select"></a>

### DataSet~select([filter]) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Extract a set of rows matching a filter function - skipping deleted rows

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [filter] | <code>sqlFun</code> | 

<a name="module_DataSet..selectAll"></a>

### DataSet~selectAll(filter) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Extract a set of rows matching a filter function - including deleted rows

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| filter | <code>sqlFun</code> | 

<a name="module_DataSet..keyFilter"></a>

### DataSet~keyFilter(row) ⇒ <code>\*</code> \| <code>sqlFun</code>
Get the filter that compares key fields of a given row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| row | <code>object</code> | 

<a name="module_DataSet..key"></a>

### DataSet~key([k]) ⇒ <code>\*</code> \| <code>Array.&lt;string&gt;</code>
Get/Set the primary key in a Jquery fashioned style. If k is given, the key is set, otherwise the existing key is returned

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [k] | <code>Array.&lt;string&gt;</code> | 

<a name="module_DataSet..clear"></a>

### DataSet~clear()
Clears the table detaching all rows.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..detach"></a>

### DataSet~detach(obj)
Detaches a row from the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param |
| --- |
| obj | 

<a name="module_DataSet..add"></a>

### DataSet~add(obj) ⇒
Adds an object to the table setting the datarow in the state of "added"

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: DataRow created  

| Param | Description |
| --- | --- |
| obj | plain object |

<a name="module_DataSet..existingRow"></a>

### DataSet~existingRow(obj) ⇒ <code>DataRow</code> \| <code>undefined</code>
check if a row is present in the table. If there is  a key, it is used for finding the row, otherwise a ==== comparison is made

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_DataSet..load"></a>

### DataSet~load(obj, [safe]) ⇒ <code>DataRow</code>
Adds an object to the table setting the datarow in the state of "unchanged"

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: <code>DataRow</code> - created DataRow  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  | plain object to load in the table |
| [safe] | <code>boolean</code> | <code>true</code> | if false doesn't verify existence of row |

<a name="module_DataSet..loadArray"></a>

### DataSet~loadArray(arr, safe) ⇒
Adds an object to the table setting the datarow in the state of 'unchanged'

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: *  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | array of plain objects |
| safe | <code>boolean</code> | if false doesn't verify existence of row |

<a name="module_DataSet..acceptChanges"></a>

### DataSet~acceptChanges()
Accept any changes setting all dataRows in the state of 'unchanged'.Deleted rows become detached and are removed from the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..rejectChanges"></a>

### DataSet~rejectChanges()
Reject any changes putting all to 'unchanged' state.Added rows become detached.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..hasChanges"></a>

### DataSet~hasChanges() ⇒ <code>boolean</code>
Check if any DataRow in the table has changes

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..getChanges"></a>

### DataSet~getChanges() ⇒ <code>Array</code>
gets an array of all modified/added/deleted rows

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..toString"></a>

### DataSet~toString() ⇒ <code>string</code>
Debug-helper function

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..importRow"></a>

### DataSet~importRow(row) ⇒ <code>DataRow</code>
import a row preserving it's state, the row should already have a DataRow attached

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: <code>DataRow</code> - created  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>object</code> | input |

<a name="module_DataSet..defaults"></a>

### DataSet~defaults([def]) ⇒ <code>object</code> \| <code>\*</code>
Get/set the object defaults in a JQuery fashioned style. When def is present, its fields and values are merged into existent defaults.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param |
| --- |
| [def] | 

<a name="module_DataSet..clearDefaults"></a>

### DataSet~clearDefaults()
Clears any stored default value for the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..newRow"></a>

### DataSet~newRow([obj], [parentRow]) ⇒ <code>object</code>
creates a DataRow and returns the created object. The created object has the default values merged to the values in the optional parameter obj.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| [obj] | <code>object</code> | contains the initial value of the created objects. |
| [parentRow] | <code>ObjectRow</code> |  |

<a name="module_DataSet..makeChild"></a>

### DataSet~makeChild(childRow, parentTable, [parentRow])
Make childRow child of parentRow if a relation between the two is found

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| childRow | <code>object</code> | 
| parentTable | <code>string</code> | 
| [parentRow] | <code>ObjectRow</code> | 

<a name="module_DataSet..skipSecurity"></a>

### DataSet~skipSecurity([arg]) ⇒ <code>\*</code> \| <code>boolean</code>
Get/Set a flag indicating that this table is not subjected to security functions in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>boolean</code> | 

<a name="module_DataSet..skipInsertCopy"></a>

### DataSet~skipInsertCopy([arg]) ⇒ <code>\*</code> \| <code>boolean</code>
Get/Set a flag indicating that this table is not subjected to the Insert and Copy function

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>boolean</code> | 

<a name="module_DataSet..denyClear"></a>

### DataSet~denyClear([arg]) ⇒ <code>\*</code> \| <code>string</code>
Get/Set DenyClear. === y avoid to clear table on backend reads

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>string</code> | 

<a name="module_DataSet..viewTable"></a>

### DataSet~viewTable([arg]) ⇒ <code>\*</code> \| <code>string</code>
Get/Set a table name, that represents the view table associated to the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>string</code> | 

<a name="module_DataSet..realTable"></a>

### DataSet~realTable([arg]) ⇒ <code>null</code> \| <code>string</code>
Get/Set a table name, that represents the real table associated to the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>string</code> | 

<a name="module_DataSet..postingTable"></a>

### DataSet~postingTable() ⇒ <code>string</code>
Returns the table that should be used for writing, using tableForReading as a default for tableForWriting, or this.name if none of them is set

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Access**: public  
<a name="module_DataSet..tableForReading"></a>

### DataSet~tableForReading([tableName]) ⇒ <code>\*</code> \| <code>DataTable.myTableForReading</code> \| <code>DataTable.name</code>
Get/Set the name of table  to be used to read data from database in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [tableName] | <code>string</code> | 

<a name="module_DataSet..tableForWriting"></a>

### DataSet~tableForWriting([tableName]) ⇒ <code>\*</code> \| <code>DataTable.myTableForWriting</code> \| <code>DataTable.name</code>
Get/Set the name of table  to be used to write data from database in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [tableName] | <code>string</code> | 

<a name="module_DataSet..staticFilter"></a>

### DataSet~staticFilter([filter]) ⇒ <code>sqlFun</code>
Get/Set a static filter  to be used to read data from database in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [filter] | <code>sqlFun</code> | 

<a name="module_DataSet..columnList"></a>

### DataSet~columnList() ⇒
get the list of columns or * if there is no column set

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: string  
<a name="module_DataSet..getAutoIncrementColumns"></a>

### DataSet~getAutoIncrementColumns() ⇒
Gets all autoincrement column names of this table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: string[]  
<a name="module_DataSet..autoIncrement"></a>

### DataSet~autoIncrement(fieldName, [autoIncrementInfo]) ⇒ <code>\*</code> \| <code>AutoIncrementColumn</code>
Get/Set autoincrement properties of fields

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| [autoIncrementInfo] | <code>object</code> | //see AutoIncrementColumn properties for details |

<a name="module_DataSet..parentRelations"></a>

### DataSet~parentRelations() ⇒
Get all relation where THIS table is the child and another table is the parent

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: DataRelation[]  
<a name="module_DataSet..childRelations"></a>

### DataSet~childRelations() ⇒
Get all relation where THIS table is the parent and another table is the child

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: DataRelation[]  
<a name="module_DataSet..mergeArray"></a>

### DataSet~mergeArray(arr, overwrite) ⇒ <code>\*</code>
adds an array of objects to collection, as unchanged, if they still are not present. Existence is verified basing on  key

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | 
| overwrite | <code>boolean</code> | 

<a name="module_DataSet..clone"></a>

### DataSet~clone() ⇒ <code>DataTable</code>
clones table structure without copying any DataRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..safeAssign"></a>

### DataSet~safeAssign(r, field, value) ⇒ <code>\*</code>
Assign a field assuring it will not cause duplicates on table's autoincrement fields

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| field | <code>string</code> | 
| value | <code>object</code> | 

<a name="module_DataSet..avoidCollisions"></a>

### DataSet~avoidCollisions(r, field, value)
check if changing a key field of a row it would collide with come autoincrement field. If it would, recalculates colliding rows/filter in accordance

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| field | <code>string</code> | 
| value | <code>object</code> | 

<a name="module_DataSet..assignField"></a>

### DataSet~assignField(r, field, value)
Assign a value to a field and update all dependencies

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| field | <code>string</code> | 
| value | <code>object</code> | 

<a name="module_DataSet..updateDependencies"></a>

### DataSet~updateDependencies(row, field) ⇒ <code>\*</code>
Re calculate temporaryID affected by a field change. It should be done for every autoincrement field that has that field as a selector or as a prefix field

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 
| field | <code>string</code> | 

<a name="module_DataSet..calcTemporaryId"></a>

### DataSet~calcTemporaryId(r, [field])
Augment r[field] in order to avoid collision with another row that needs to take that valueif field is not specified, this is applied to all autoincrement field of the tablePrecondition: r[[field] should be an autoincrement field

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| [field] | <code>string</code> | 

<a name="module_DataSet..mergeAsPut"></a>

### DataSet~mergeAsPut(t)
merges changes from dataTable t assuming they are unchanged and they can be present in this or not.If a row is not present, it is added. If it is present, it is updated.It is assumed that "this" dataTable is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_DataSet..mergeAsPost"></a>

### DataSet~mergeAsPost(t)
merges changes from dataTable t assuming they are unchanged and they are not present in this dataTable.Rows are all added 'as is' to this, in the state of ADDEDIt is assumed that "this" dataTable is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_DataSet..mergeAsPatch"></a>

### DataSet~mergeAsPatch(t)
merges changes from dataTable t assuming they are unchanged and they are all present in this dataTable.Rows are updated, but only  fields actually present in d are modified. Other field are left unchanged.It is assumed that "this" dataTable is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_DataSet..prepareForPosting"></a>

### DataSet~prepareForPosting(r, env)
This function is called before posting row into db for every insert/update

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| env | <code>Environment</code> | 

<a name="module_DataSet..getOptimisticLock"></a>

### DataSet~getOptimisticLock(r) ⇒ <code>sqlFun</code>
Get the optimistic lock for updating or deleting a row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_DataSet..getChildFilter"></a>

### DataSet~getChildFilter(parentRow, [alias])
Gets a filter that will be applied to the child table and will find any child row of a given ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| parentRow | <code>ObjectRow</code> |  |
| [alias] | <code>string</code> | when present is used to attach an alias for the parent table in the composed filter |

<a name="module_DataSet..getChild"></a>

### DataSet~getChild(parentRow) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Get any child of a given ObjectRow following this DataRelation

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| parentRow | <code>ObjectRow</code> | 

<a name="module_DataSet..getParentsFilter"></a>

### DataSet~getParentsFilter(childRow, [alias])
Gets a filter that will be applied to the parent table and will find any parent row of a given ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| childRow | <code>object</code> |  |
| [alias] | <code>string</code> | when present is used to attach an alias for the parent table in the composed filter |

<a name="module_DataSet..getParents"></a>

### DataSet~getParents(childRow) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Get any parent of a given ObjectRow following this DataRelation

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| childRow | <code>ObjectRow</code> | 

<a name="module_DataSet..isEntityRelation"></a>

### DataSet~isEntityRelation() ⇒ <code>boolean</code>
Establish if  a relation links the key of  a table into a subset of another table key

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..makeChild"></a>

### DataSet~makeChild(parentRow, childRow) ⇒ <code>\*</code>
Modifies childRow in order to make it child of parentRow. Sets to null corresponding fields if parentRow is null or undefined

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| parentRow | <code>ObjectRow</code> | 
| childRow | <code>ObjectRow</code> | 

<a name="module_DataSet..clone"></a>

### DataSet~clone() ⇒ <code>DataSet</code>
Clones a DataSet replicating its structure but without copying any ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..newTable"></a>

### DataSet~newTable(tableName) ⇒ <code>DataTable</code>
Creates a new DataTable attaching it to the DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_DataSet..addTable"></a>

### DataSet~addTable(table) ⇒ <code>DataTable</code>
Adds a datatable to DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 

<a name="module_DataSet..copy"></a>

### DataSet~copy() ⇒ <code>DataSet</code>
Creates a copy of the DataSet, including both structure and data.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..acceptChanges"></a>

### DataSet~acceptChanges()
Calls acceptChanges to all contained DataTables

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..rejectChanges"></a>

### DataSet~rejectChanges()
Calls rejectChanges to all contained DataTables

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..hasChanges"></a>

### DataSet~hasChanges() ⇒ <code>boolean</code>
Check if any contained DataTable has any changes

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..newRelation"></a>

### DataSet~newRelation(relationName, parentTableName, parentColsName, childTableName, childColsName) ⇒ <code>DataRelation</code>
Creates a new DataRelation and attaches it to the DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> |  |
| parentTableName | <code>string</code> |  |
| parentColsName | <code>Array.&lt;string&gt;</code> | array of string |
| childTableName | <code>string</code> |  |
| childColsName | <code>Array.&lt;string&gt;</code> | array of string |

<a name="module_DataSet..cascadeDelete"></a>

### DataSet~cascadeDelete(row) ⇒ <code>\*</code>
Deletes a row with all subentity child

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 

<a name="module_DataSet..serialize"></a>

### DataSet~serialize([serializeStructure], [filterRow]) ⇒ <code>object</code>
Creates a serializable version of this DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [serializeStructure] | <code>boolean</code> | <code>false</code> | when true serialized also structure, when false only row data |
| [filterRow] | <code>function</code> |  | function to select which rows have to be serialized |

<a name="module_DataSet..deSerialize"></a>

### DataSet~deSerialize(d, deSerializeStructure)
Restores data from an object obtained with serialize().

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>object</code> | 
| deSerializeStructure | <code>boolean</code> | 

<a name="module_DataSet..mergeAsPut"></a>

### DataSet~mergeAsPut(d)
merges changes from DataSet d assuming they are unchanged and they can be present in this or not.If a row is not present, it is added. If it is present, it is updated.It is assumed that "this" dataset is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet..mergeAsPost"></a>

### DataSet~mergeAsPost(d)
merges changes from DataSet d assuming they are unchanged and they are not present in this dataset.Rows are all added 'as is' to this, in the state of ADDEDIt is assumed that "this" dataset is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet..mergeAsPatch"></a>

### DataSet~mergeAsPatch(d)
merges changes from DataSet d assuming they are unchanged and they are all present in this dataset.Rows are updated, but only  fields actually present in d are modified. Other field are left unchanged.It is assumed that "this" dataset is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet..importData"></a>

### DataSet~importData(d)
Import data from a given dataset

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet"></a>

## DataSet
Provides shim for Ado.net DataSet class


* [DataSet](#module_DataSet)
    * [~ObjectRow](#module_DataSet..ObjectRow)
        * [new ObjectRow()](#new_module_DataSet..ObjectRow_new)
    * [~DataRow](#module_DataSet..DataRow)
        * [new DataRow()](#new_module_DataSet..DataRow_new)
        * [new DataRow(o)](#new_module_DataSet..DataRow_new)
    * [~DataRow](#module_DataSet..DataRow)
        * [new DataRow()](#new_module_DataSet..DataRow_new)
        * [new DataRow(o)](#new_module_DataSet..DataRow_new)
    * [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
        * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
        * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)
    * [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
        * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
        * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)
    * [~DataTable](#module_DataSet..DataTable)
        * [new DataTable()](#new_module_DataSet..DataTable_new)
    * [~OptimisticLocking](#module_DataSet..OptimisticLocking)
        * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
        * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)
    * [~OptimisticLocking](#module_DataSet..OptimisticLocking)
        * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
        * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)
    * [~DataRelation](#module_DataSet..DataRelation)
        * [new DataRelation()](#new_module_DataSet..DataRelation_new)
        * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)
    * [~DataRelation](#module_DataSet..DataRelation)
        * [new DataRelation()](#new_module_DataSet..DataRelation_new)
        * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)
    * [~DataSet](#module_DataSet..DataSet)
        * [new DataSet()](#new_module_DataSet..DataSet_new)
        * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)
    * [~DataSet](#module_DataSet..DataSet)
        * [new DataSet()](#new_module_DataSet..DataSet_new)
        * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)
    * [~getRow()](#module_DataSet..getRow) ⇒ <code>DataRow</code>
    * [~getValue(fieldName, [dataRowVer])](#module_DataSet..getValue) ⇒ <code>object</code>
    * [~originalRow()](#module_DataSet..originalRow) ⇒ <code>object</code>
    * [~makeEqualTo(o)](#module_DataSet..makeEqualTo) ⇒ <code>DataRow</code>
    * [~patchTo(o)](#module_DataSet..patchTo) ⇒ <code>DataRow</code>
    * [~acceptChanges()](#module_DataSet..acceptChanges) ⇒ <code>DataRow</code>
    * [~rejectChanges()](#module_DataSet..rejectChanges) ⇒ <code>DataRow</code>
    * [~detach()](#module_DataSet..detach) ⇒ <code>undefined</code>
    * [~del()](#module_DataSet..del) ⇒ <code>DataRow</code>
    * [~toString()](#module_DataSet..toString) ⇒ <code>string</code>
    * [~getParentRows(relName)](#module_DataSet..getParentRows) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getParentsInTable(parentTableName)](#module_DataSet..getParentsInTable) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getChildRows(relName)](#module_DataSet..getChildRows) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getChildInTable(childTableName)](#module_DataSet..getChildInTable) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~keySample()](#module_DataSet..keySample) ⇒ <code>object</code>
    * [~getSelector(r)](#module_DataSet..getSelector) ⇒ <code>sqlFun</code>
    * [~getPrefix(r)](#module_DataSet..getPrefix) ⇒
    * [~getExpression(r)](#module_DataSet..getExpression) ⇒ <code>sqlFun</code>
    * [~customFunction(r, columnName, conn)](#module_DataSet..customFunction) ⇒ <code>object</code>
    * [~setOptimize(value)](#module_DataSet..setOptimize)
    * [~isOptimized()](#module_DataSet..isOptimized) ⇒ <code>boolean</code>
    * [~clearMaxCache()](#module_DataSet..clearMaxCache)
    * [~setMaxExpr(field, expr, filter, num)](#module_DataSet..setMaxExpr)
    * [~minimumTempValue(field, [value])](#module_DataSet..minimumTempValue)
    * [~getMaxExpr(field, expr, filter)](#module_DataSet..getMaxExpr) ⇒ <code>number</code>
    * [~cachedMaxSubstring(field, start, len, filter)](#module_DataSet..cachedMaxSubstring) ⇒ <code>number</code>
    * [~select([filter])](#module_DataSet..select) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~selectAll(filter)](#module_DataSet..selectAll) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~keyFilter(row)](#module_DataSet..keyFilter) ⇒ <code>\*</code> \| <code>sqlFun</code>
    * [~key([k])](#module_DataSet..key) ⇒ <code>\*</code> \| <code>Array.&lt;string&gt;</code>
    * [~clear()](#module_DataSet..clear)
    * [~detach(obj)](#module_DataSet..detach)
    * [~add(obj)](#module_DataSet..add) ⇒
    * [~existingRow(obj)](#module_DataSet..existingRow) ⇒ <code>DataRow</code> \| <code>undefined</code>
    * [~load(obj, [safe])](#module_DataSet..load) ⇒ <code>DataRow</code>
    * [~loadArray(arr, safe)](#module_DataSet..loadArray) ⇒
    * [~acceptChanges()](#module_DataSet..acceptChanges)
    * [~rejectChanges()](#module_DataSet..rejectChanges)
    * [~hasChanges()](#module_DataSet..hasChanges) ⇒ <code>boolean</code>
    * [~getChanges()](#module_DataSet..getChanges) ⇒ <code>Array</code>
    * [~toString()](#module_DataSet..toString) ⇒ <code>string</code>
    * [~importRow(row)](#module_DataSet..importRow) ⇒ <code>DataRow</code>
    * [~defaults([def])](#module_DataSet..defaults) ⇒ <code>object</code> \| <code>\*</code>
    * [~clearDefaults()](#module_DataSet..clearDefaults)
    * [~newRow([obj], [parentRow])](#module_DataSet..newRow) ⇒ <code>object</code>
    * [~makeChild(childRow, parentTable, [parentRow])](#module_DataSet..makeChild)
    * [~skipSecurity([arg])](#module_DataSet..skipSecurity) ⇒ <code>\*</code> \| <code>boolean</code>
    * [~skipInsertCopy([arg])](#module_DataSet..skipInsertCopy) ⇒ <code>\*</code> \| <code>boolean</code>
    * [~denyClear([arg])](#module_DataSet..denyClear) ⇒ <code>\*</code> \| <code>string</code>
    * [~viewTable([arg])](#module_DataSet..viewTable) ⇒ <code>\*</code> \| <code>string</code>
    * [~realTable([arg])](#module_DataSet..realTable) ⇒ <code>null</code> \| <code>string</code>
    * [~postingTable()](#module_DataSet..postingTable) ⇒ <code>string</code>
    * [~tableForReading([tableName])](#module_DataSet..tableForReading) ⇒ <code>\*</code> \| <code>DataTable.myTableForReading</code> \| <code>DataTable.name</code>
    * [~tableForWriting([tableName])](#module_DataSet..tableForWriting) ⇒ <code>\*</code> \| <code>DataTable.myTableForWriting</code> \| <code>DataTable.name</code>
    * [~staticFilter([filter])](#module_DataSet..staticFilter) ⇒ <code>sqlFun</code>
    * [~columnList()](#module_DataSet..columnList) ⇒
    * [~getAutoIncrementColumns()](#module_DataSet..getAutoIncrementColumns) ⇒
    * [~autoIncrement(fieldName, [autoIncrementInfo])](#module_DataSet..autoIncrement) ⇒ <code>\*</code> \| <code>AutoIncrementColumn</code>
    * [~parentRelations()](#module_DataSet..parentRelations) ⇒
    * [~childRelations()](#module_DataSet..childRelations) ⇒
    * [~mergeArray(arr, overwrite)](#module_DataSet..mergeArray) ⇒ <code>\*</code>
    * [~clone()](#module_DataSet..clone) ⇒ <code>DataTable</code>
    * [~safeAssign(r, field, value)](#module_DataSet..safeAssign) ⇒ <code>\*</code>
    * [~avoidCollisions(r, field, value)](#module_DataSet..avoidCollisions)
    * [~assignField(r, field, value)](#module_DataSet..assignField)
    * [~updateDependencies(row, field)](#module_DataSet..updateDependencies) ⇒ <code>\*</code>
    * [~calcTemporaryId(r, [field])](#module_DataSet..calcTemporaryId)
    * [~mergeAsPut(t)](#module_DataSet..mergeAsPut)
    * [~mergeAsPost(t)](#module_DataSet..mergeAsPost)
    * [~mergeAsPatch(t)](#module_DataSet..mergeAsPatch)
    * [~prepareForPosting(r, env)](#module_DataSet..prepareForPosting)
    * [~getOptimisticLock(r)](#module_DataSet..getOptimisticLock) ⇒ <code>sqlFun</code>
    * [~getChildFilter(parentRow, [alias])](#module_DataSet..getChildFilter)
    * [~getChild(parentRow)](#module_DataSet..getChild) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~getParentsFilter(childRow, [alias])](#module_DataSet..getParentsFilter)
    * [~getParents(childRow)](#module_DataSet..getParents) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
    * [~isEntityRelation()](#module_DataSet..isEntityRelation) ⇒ <code>boolean</code>
    * [~makeChild(parentRow, childRow)](#module_DataSet..makeChild) ⇒ <code>\*</code>
    * [~clone()](#module_DataSet..clone) ⇒ <code>DataSet</code>
    * [~newTable(tableName)](#module_DataSet..newTable) ⇒ <code>DataTable</code>
    * [~addTable(table)](#module_DataSet..addTable) ⇒ <code>DataTable</code>
    * [~copy()](#module_DataSet..copy) ⇒ <code>DataSet</code>
    * [~acceptChanges()](#module_DataSet..acceptChanges)
    * [~rejectChanges()](#module_DataSet..rejectChanges)
    * [~hasChanges()](#module_DataSet..hasChanges) ⇒ <code>boolean</code>
    * [~newRelation(relationName, parentTableName, parentColsName, childTableName, childColsName)](#module_DataSet..newRelation) ⇒ <code>DataRelation</code>
    * [~cascadeDelete(row)](#module_DataSet..cascadeDelete) ⇒ <code>\*</code>
    * [~serialize([serializeStructure], [filterRow])](#module_DataSet..serialize) ⇒ <code>object</code>
    * [~deSerialize(d, deSerializeStructure)](#module_DataSet..deSerialize)
    * [~mergeAsPut(d)](#module_DataSet..mergeAsPut)
    * [~mergeAsPost(d)](#module_DataSet..mergeAsPost)
    * [~mergeAsPatch(d)](#module_DataSet..mergeAsPatch)
    * [~importData(d)](#module_DataSet..importData)

<a name="module_DataSet..ObjectRow"></a>

### DataSet~ObjectRow
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  
**Access**: public  
<a name="new_module_DataSet..ObjectRow_new"></a>

#### new ObjectRow()
class type to host data

<a name="module_DataSet..DataRow"></a>

### DataSet~DataRow
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRow](#module_DataSet..DataRow)
    * [new DataRow()](#new_module_DataSet..DataRow_new)
    * [new DataRow(o)](#new_module_DataSet..DataRow_new)

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow()
Provides methods to manage objects as Ado.Net DataRows

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow(o)
Creates a DataRow from a generic plain object, and returns the DataRow


| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | this is the main object managed by the application logic, it is attached to a getRow function |

<a name="module_DataSet..DataRow"></a>

### DataSet~DataRow
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRow](#module_DataSet..DataRow)
    * [new DataRow()](#new_module_DataSet..DataRow_new)
    * [new DataRow(o)](#new_module_DataSet..DataRow_new)

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow()
Provides methods to manage objects as Ado.Net DataRows

<a name="new_module_DataSet..DataRow_new"></a>

#### new DataRow(o)
Creates a DataRow from a generic plain object, and returns the DataRow


| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | this is the main object managed by the application logic, it is attached to a getRow function |

<a name="module_DataSet..AutoIncrementColumn"></a>

### DataSet~AutoIncrementColumn
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
    * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
    * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn()
Describe how to evaluate the value of a column before posting it

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn(columnName, options)
Create a AutoIncrementColumn


| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>string</code> |  |
| options | <code>object</code> | same options as AutoIncrement properties |

<a name="module_DataSet..AutoIncrementColumn"></a>

### DataSet~AutoIncrementColumn
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~AutoIncrementColumn](#module_DataSet..AutoIncrementColumn)
    * [new AutoIncrementColumn()](#new_module_DataSet..AutoIncrementColumn_new)
    * [new AutoIncrementColumn(columnName, options)](#new_module_DataSet..AutoIncrementColumn_new)

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn()
Describe how to evaluate the value of a column before posting it

<a name="new_module_DataSet..AutoIncrementColumn_new"></a>

#### new AutoIncrementColumn(columnName, options)
Create a AutoIncrementColumn


| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>string</code> |  |
| options | <code>object</code> | same options as AutoIncrement properties |

<a name="module_DataSet..DataTable"></a>

### DataSet~DataTable
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  
<a name="new_module_DataSet..DataTable_new"></a>

#### new DataTable()
A DataTable is s collection of ObjectRow and provides information about the structure of logical table

<a name="module_DataSet..OptimisticLocking"></a>

### DataSet~OptimisticLocking
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~OptimisticLocking](#module_DataSet..OptimisticLocking)
    * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
    * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking()
Manages auto fill of locking purposed fields and evaluates filter for optimistic locking for updateIn his basic implementation accept a list of fields to fill. Values for filling are taken from environment.

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking(updateFields, createFields)

| Param | Type | Description |
| --- | --- | --- |
| updateFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during update operations |
| createFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during insert operations |

<a name="module_DataSet..OptimisticLocking"></a>

### DataSet~OptimisticLocking
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~OptimisticLocking](#module_DataSet..OptimisticLocking)
    * [new OptimisticLocking()](#new_module_DataSet..OptimisticLocking_new)
    * [new OptimisticLocking(updateFields, createFields)](#new_module_DataSet..OptimisticLocking_new)

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking()
Manages auto fill of locking purposed fields and evaluates filter for optimistic locking for updateIn his basic implementation accept a list of fields to fill. Values for filling are taken from environment.

<a name="new_module_DataSet..OptimisticLocking_new"></a>

#### new OptimisticLocking(updateFields, createFields)

| Param | Type | Description |
| --- | --- | --- |
| updateFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during update operations |
| createFields | <code>Array.&lt;string&gt;</code> | Fields to fill and to check during insert operations |

<a name="module_DataSet..DataRelation"></a>

### DataSet~DataRelation
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRelation](#module_DataSet..DataRelation)
    * [new DataRelation()](#new_module_DataSet..DataRelation_new)
    * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation()
Describe a relation between two DataTables of a DataSet.

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])
creates a DataRelation


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| relationName | <code>string</code> |  |  |
| parentTableName | <code>string</code> |  |  |
| parentColsName | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | array of string |
| childTableName | <code>string</code> |  |  |
| [childColsName] | <code>String</code> \| <code>Array.&lt;String&gt;</code> | <code>parentColsName</code> | optional names of child columns |

<a name="module_DataSet..DataRelation"></a>

### DataSet~DataRelation
DataRelation

**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataRelation](#module_DataSet..DataRelation)
    * [new DataRelation()](#new_module_DataSet..DataRelation_new)
    * [new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])](#new_module_DataSet..DataRelation_new)

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation()
Describe a relation between two DataTables of a DataSet.

<a name="new_module_DataSet..DataRelation_new"></a>

#### new DataRelation(relationName, parentTableName, parentColsName, childTableName, [childColsName])
creates a DataRelation


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| relationName | <code>string</code> |  |  |
| parentTableName | <code>string</code> |  |  |
| parentColsName | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | array of string |
| childTableName | <code>string</code> |  |  |
| [childColsName] | <code>String</code> \| <code>Array.&lt;String&gt;</code> | <code>parentColsName</code> | optional names of child columns |

<a name="module_DataSet..DataSet"></a>

### DataSet~DataSet
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataSet](#module_DataSet..DataSet)
    * [new DataSet()](#new_module_DataSet..DataSet_new)
    * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet()
Stores and manages a set of DataTables and DataRelations

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet(dataSetName)
Creates an empty DataSet


| Param | Type |
| --- | --- |
| dataSetName | <code>string</code> | 

<a name="module_DataSet..DataSet"></a>

### DataSet~DataSet
**Kind**: inner class of [<code>DataSet</code>](#module_DataSet)  

* [~DataSet](#module_DataSet..DataSet)
    * [new DataSet()](#new_module_DataSet..DataSet_new)
    * [new DataSet(dataSetName)](#new_module_DataSet..DataSet_new)

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet()
Stores and manages a set of DataTables and DataRelations

<a name="new_module_DataSet..DataSet_new"></a>

#### new DataSet(dataSetName)
Creates an empty DataSet


| Param | Type |
| --- | --- |
| dataSetName | <code>string</code> | 

<a name="module_DataSet..getRow"></a>

### DataSet~getRow() ⇒ <code>DataRow</code>
Gets the DataRow linked to an ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Access**: public  
<a name="module_DataSet..getValue"></a>

### DataSet~getValue(fieldName, [dataRowVer]) ⇒ <code>object</code>
get the value of a field of the object. If dataRowVer is omitted, it's equivalent to o.fieldName

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fieldName | <code>string</code> |  |  |
| [dataRowVer] | <code>DataRowVersion</code> | <code>&#x27;current&#x27;</code> | possible values are 'original', 'current' |

<a name="module_DataSet..originalRow"></a>

### DataSet~originalRow() ⇒ <code>object</code>
Gets the original row, before changes was made, undefined if current state is added

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..makeEqualTo"></a>

### DataSet~makeEqualTo(o) ⇒ <code>DataRow</code>
changes current row to make it's current values equal to another one. Deleted rows becomes modifiedcompared to patchTo, this also removes values that are not present in other row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| o | <code>object</code> | 

<a name="module_DataSet..patchTo"></a>

### DataSet~patchTo(o) ⇒ <code>DataRow</code>
changes current row to make it's current values equal to another one. Deleted rows becomes modified

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| o | <code>object</code> | 

<a name="module_DataSet..acceptChanges"></a>

### DataSet~acceptChanges() ⇒ <code>DataRow</code>
Makes changes permanents, discarding old values. state becomes unchanged, detached remains detached

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..rejectChanges"></a>

### DataSet~rejectChanges() ⇒ <code>DataRow</code>
Discard changes, restoring the original values of the object. state becomes unchanged,detached remains detached

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..detach"></a>

### DataSet~detach() ⇒ <code>undefined</code>
Detaches row, loosing all changes made. object is also removed from the underlying DataTable.Proxy is disposed.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..del"></a>

### DataSet~del() ⇒ <code>DataRow</code>
Deletes the row. If it is in added state it becomes detached. Otherwise any changes are lost, and only rejectChanges can bring the row into life again

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..toString"></a>

### DataSet~toString() ⇒ <code>string</code>
Debug - helper function

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..getParentRows"></a>

### DataSet~getParentRows(relName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets the parent(s) of this row in the dataSet it is contained, following the relation with the specified name

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| relName | <code>string</code> | 

<a name="module_DataSet..getParentsInTable"></a>

### DataSet~getParentsInTable(parentTableName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets parents row of this row in a given table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| parentTableName | <code>string</code> | 

<a name="module_DataSet..getChildRows"></a>

### DataSet~getChildRows(relName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets the child(s) of this row in the dataSet it is contained, following the relation with the specified name

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| relName | <code>string</code> | 

<a name="module_DataSet..getChildInTable"></a>

### DataSet~getChildInTable(childTableName) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Gets child rows of this row in a given table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| childTableName | <code>string</code> | 

<a name="module_DataSet..keySample"></a>

### DataSet~keySample() ⇒ <code>object</code>
Get an object with all key fields of this row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..getSelector"></a>

### DataSet~getSelector(r) ⇒ <code>sqlFun</code>
evaluates the function to filter selector on a specified row and column

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_DataSet..getPrefix"></a>

### DataSet~getPrefix(r) ⇒
Gets the prefix evaluated for a given row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: string  

| Param |
| --- |
| r | 

<a name="module_DataSet..getExpression"></a>

### DataSet~getExpression(r) ⇒ <code>sqlFun</code>
gets the expression to be used for retrieving the max

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_DataSet..customFunction"></a>

### DataSet~customFunction(r, columnName, conn) ⇒ <code>object</code>
Optional custom function to be called to evaluate the maximum value

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| columnName | <code>string</code> | 
| conn | <code>jsDataAccess</code> | 

<a name="module_DataSet..setOptimize"></a>

### DataSet~setOptimize(value)
Mark the table as optimized / not optimizedAn optimized table has a cache for all autoincrement field

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| value | <code>boolean</code> | 

<a name="module_DataSet..isOptimized"></a>

### DataSet~isOptimized() ⇒ <code>boolean</code>
Check if this table is optimized

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..clearMaxCache"></a>

### DataSet~clearMaxCache()
Clear evaluated max cache

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..setMaxExpr"></a>

### DataSet~setMaxExpr(field, expr, filter, num)
Set a value in the max cache

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| expr | <code>sqlFun</code> | 
| filter | <code>sqlFun</code> | 
| num | <code>int</code> | 

<a name="module_DataSet..minimumTempValue"></a>

### DataSet~minimumTempValue(field, [value])
get/set the minimum temp value for a field, assuming 0 if undefined

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| [value] | <code>number</code> | 

<a name="module_DataSet..getMaxExpr"></a>

### DataSet~getMaxExpr(field, expr, filter) ⇒ <code>number</code>
gets the max in cache for a field and updates the cache

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| expr | <code>sqlFun</code> \| <code>string</code> | 
| filter | <code>sqlFun</code> | 

<a name="module_DataSet..cachedMaxSubstring"></a>

### DataSet~cachedMaxSubstring(field, start, len, filter) ⇒ <code>number</code>
Evaluates the max of an expression eventually using a cached value

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| field | <code>string</code> | 
| start | <code>number</code> | 
| len | <code>number</code> | 
| filter | <code>sqlFun</code> | 

<a name="module_DataSet..select"></a>

### DataSet~select([filter]) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Extract a set of rows matching a filter function - skipping deleted rows

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [filter] | <code>sqlFun</code> | 

<a name="module_DataSet..selectAll"></a>

### DataSet~selectAll(filter) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Extract a set of rows matching a filter function - including deleted rows

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| filter | <code>sqlFun</code> | 

<a name="module_DataSet..keyFilter"></a>

### DataSet~keyFilter(row) ⇒ <code>\*</code> \| <code>sqlFun</code>
Get the filter that compares key fields of a given row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| row | <code>object</code> | 

<a name="module_DataSet..key"></a>

### DataSet~key([k]) ⇒ <code>\*</code> \| <code>Array.&lt;string&gt;</code>
Get/Set the primary key in a Jquery fashioned style. If k is given, the key is set, otherwise the existing key is returned

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [k] | <code>Array.&lt;string&gt;</code> | 

<a name="module_DataSet..clear"></a>

### DataSet~clear()
Clears the table detaching all rows.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..detach"></a>

### DataSet~detach(obj)
Detaches a row from the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param |
| --- |
| obj | 

<a name="module_DataSet..add"></a>

### DataSet~add(obj) ⇒
Adds an object to the table setting the datarow in the state of "added"

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: DataRow created  

| Param | Description |
| --- | --- |
| obj | plain object |

<a name="module_DataSet..existingRow"></a>

### DataSet~existingRow(obj) ⇒ <code>DataRow</code> \| <code>undefined</code>
check if a row is present in the table. If there is  a key, it is used for finding the row, otherwise a ==== comparison is made

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_DataSet..load"></a>

### DataSet~load(obj, [safe]) ⇒ <code>DataRow</code>
Adds an object to the table setting the datarow in the state of "unchanged"

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: <code>DataRow</code> - created DataRow  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  | plain object to load in the table |
| [safe] | <code>boolean</code> | <code>true</code> | if false doesn't verify existence of row |

<a name="module_DataSet..loadArray"></a>

### DataSet~loadArray(arr, safe) ⇒
Adds an object to the table setting the datarow in the state of 'unchanged'

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: *  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | array of plain objects |
| safe | <code>boolean</code> | if false doesn't verify existence of row |

<a name="module_DataSet..acceptChanges"></a>

### DataSet~acceptChanges()
Accept any changes setting all dataRows in the state of 'unchanged'.Deleted rows become detached and are removed from the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..rejectChanges"></a>

### DataSet~rejectChanges()
Reject any changes putting all to 'unchanged' state.Added rows become detached.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..hasChanges"></a>

### DataSet~hasChanges() ⇒ <code>boolean</code>
Check if any DataRow in the table has changes

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..getChanges"></a>

### DataSet~getChanges() ⇒ <code>Array</code>
gets an array of all modified/added/deleted rows

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..toString"></a>

### DataSet~toString() ⇒ <code>string</code>
Debug-helper function

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..importRow"></a>

### DataSet~importRow(row) ⇒ <code>DataRow</code>
import a row preserving it's state, the row should already have a DataRow attached

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: <code>DataRow</code> - created  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>object</code> | input |

<a name="module_DataSet..defaults"></a>

### DataSet~defaults([def]) ⇒ <code>object</code> \| <code>\*</code>
Get/set the object defaults in a JQuery fashioned style. When def is present, its fields and values are merged into existent defaults.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param |
| --- |
| [def] | 

<a name="module_DataSet..clearDefaults"></a>

### DataSet~clearDefaults()
Clears any stored default value for the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..newRow"></a>

### DataSet~newRow([obj], [parentRow]) ⇒ <code>object</code>
creates a DataRow and returns the created object. The created object has the default values merged to the values in the optional parameter obj.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| [obj] | <code>object</code> | contains the initial value of the created objects. |
| [parentRow] | <code>ObjectRow</code> |  |

<a name="module_DataSet..makeChild"></a>

### DataSet~makeChild(childRow, parentTable, [parentRow])
Make childRow child of parentRow if a relation between the two is found

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| childRow | <code>object</code> | 
| parentTable | <code>string</code> | 
| [parentRow] | <code>ObjectRow</code> | 

<a name="module_DataSet..skipSecurity"></a>

### DataSet~skipSecurity([arg]) ⇒ <code>\*</code> \| <code>boolean</code>
Get/Set a flag indicating that this table is not subjected to security functions in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>boolean</code> | 

<a name="module_DataSet..skipInsertCopy"></a>

### DataSet~skipInsertCopy([arg]) ⇒ <code>\*</code> \| <code>boolean</code>
Get/Set a flag indicating that this table is not subjected to the Insert and Copy function

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>boolean</code> | 

<a name="module_DataSet..denyClear"></a>

### DataSet~denyClear([arg]) ⇒ <code>\*</code> \| <code>string</code>
Get/Set DenyClear. === y avoid to clear table on backend reads

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>string</code> | 

<a name="module_DataSet..viewTable"></a>

### DataSet~viewTable([arg]) ⇒ <code>\*</code> \| <code>string</code>
Get/Set a table name, that represents the view table associated to the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>string</code> | 

<a name="module_DataSet..realTable"></a>

### DataSet~realTable([arg]) ⇒ <code>null</code> \| <code>string</code>
Get/Set a table name, that represents the real table associated to the table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [arg] | <code>string</code> | 

<a name="module_DataSet..postingTable"></a>

### DataSet~postingTable() ⇒ <code>string</code>
Returns the table that should be used for writing, using tableForReading as a default for tableForWriting, or this.name if none of them is set

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Access**: public  
<a name="module_DataSet..tableForReading"></a>

### DataSet~tableForReading([tableName]) ⇒ <code>\*</code> \| <code>DataTable.myTableForReading</code> \| <code>DataTable.name</code>
Get/Set the name of table  to be used to read data from database in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [tableName] | <code>string</code> | 

<a name="module_DataSet..tableForWriting"></a>

### DataSet~tableForWriting([tableName]) ⇒ <code>\*</code> \| <code>DataTable.myTableForWriting</code> \| <code>DataTable.name</code>
Get/Set the name of table  to be used to write data from database in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [tableName] | <code>string</code> | 

<a name="module_DataSet..staticFilter"></a>

### DataSet~staticFilter([filter]) ⇒ <code>sqlFun</code>
Get/Set a static filter  to be used to read data from database in a Jquery fashioned style

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| [filter] | <code>sqlFun</code> | 

<a name="module_DataSet..columnList"></a>

### DataSet~columnList() ⇒
get the list of columns or * if there is no column set

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: string  
<a name="module_DataSet..getAutoIncrementColumns"></a>

### DataSet~getAutoIncrementColumns() ⇒
Gets all autoincrement column names of this table

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: string[]  
<a name="module_DataSet..autoIncrement"></a>

### DataSet~autoIncrement(fieldName, [autoIncrementInfo]) ⇒ <code>\*</code> \| <code>AutoIncrementColumn</code>
Get/Set autoincrement properties of fields

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| [autoIncrementInfo] | <code>object</code> | //see AutoIncrementColumn properties for details |

<a name="module_DataSet..parentRelations"></a>

### DataSet~parentRelations() ⇒
Get all relation where THIS table is the child and another table is the parent

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: DataRelation[]  
<a name="module_DataSet..childRelations"></a>

### DataSet~childRelations() ⇒
Get all relation where THIS table is the parent and another table is the child

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
**Returns**: DataRelation[]  
<a name="module_DataSet..mergeArray"></a>

### DataSet~mergeArray(arr, overwrite) ⇒ <code>\*</code>
adds an array of objects to collection, as unchanged, if they still are not present. Existence is verified basing on  key

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | 
| overwrite | <code>boolean</code> | 

<a name="module_DataSet..clone"></a>

### DataSet~clone() ⇒ <code>DataTable</code>
clones table structure without copying any DataRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..safeAssign"></a>

### DataSet~safeAssign(r, field, value) ⇒ <code>\*</code>
Assign a field assuring it will not cause duplicates on table's autoincrement fields

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| field | <code>string</code> | 
| value | <code>object</code> | 

<a name="module_DataSet..avoidCollisions"></a>

### DataSet~avoidCollisions(r, field, value)
check if changing a key field of a row it would collide with come autoincrement field. If it would, recalculates colliding rows/filter in accordance

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| field | <code>string</code> | 
| value | <code>object</code> | 

<a name="module_DataSet..assignField"></a>

### DataSet~assignField(r, field, value)
Assign a value to a field and update all dependencies

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| field | <code>string</code> | 
| value | <code>object</code> | 

<a name="module_DataSet..updateDependencies"></a>

### DataSet~updateDependencies(row, field) ⇒ <code>\*</code>
Re calculate temporaryID affected by a field change. It should be done for every autoincrement field that has that field as a selector or as a prefix field

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 
| field | <code>string</code> | 

<a name="module_DataSet..calcTemporaryId"></a>

### DataSet~calcTemporaryId(r, [field])
Augment r[field] in order to avoid collision with another row that needs to take that valueif field is not specified, this is applied to all autoincrement field of the tablePrecondition: r[[field] should be an autoincrement field

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| [field] | <code>string</code> | 

<a name="module_DataSet..mergeAsPut"></a>

### DataSet~mergeAsPut(t)
merges changes from dataTable t assuming they are unchanged and they can be present in this or not.If a row is not present, it is added. If it is present, it is updated.It is assumed that "this" dataTable is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_DataSet..mergeAsPost"></a>

### DataSet~mergeAsPost(t)
merges changes from dataTable t assuming they are unchanged and they are not present in this dataTable.Rows are all added 'as is' to this, in the state of ADDEDIt is assumed that "this" dataTable is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_DataSet..mergeAsPatch"></a>

### DataSet~mergeAsPatch(t)
merges changes from dataTable t assuming they are unchanged and they are all present in this dataTable.Rows are updated, but only  fields actually present in d are modified. Other field are left unchanged.It is assumed that "this" dataTable is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_DataSet..prepareForPosting"></a>

### DataSet~prepareForPosting(r, env)
This function is called before posting row into db for every insert/update

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| env | <code>Environment</code> | 

<a name="module_DataSet..getOptimisticLock"></a>

### DataSet~getOptimisticLock(r) ⇒ <code>sqlFun</code>
Get the optimistic lock for updating or deleting a row

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_DataSet..getChildFilter"></a>

### DataSet~getChildFilter(parentRow, [alias])
Gets a filter that will be applied to the child table and will find any child row of a given ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| parentRow | <code>ObjectRow</code> |  |
| [alias] | <code>string</code> | when present is used to attach an alias for the parent table in the composed filter |

<a name="module_DataSet..getChild"></a>

### DataSet~getChild(parentRow) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Get any child of a given ObjectRow following this DataRelation

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| parentRow | <code>ObjectRow</code> | 

<a name="module_DataSet..getParentsFilter"></a>

### DataSet~getParentsFilter(childRow, [alias])
Gets a filter that will be applied to the parent table and will find any parent row of a given ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| childRow | <code>object</code> |  |
| [alias] | <code>string</code> | when present is used to attach an alias for the parent table in the composed filter |

<a name="module_DataSet..getParents"></a>

### DataSet~getParents(childRow) ⇒ <code>Array.&lt;ObjectRow&gt;</code>
Get any parent of a given ObjectRow following this DataRelation

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| childRow | <code>ObjectRow</code> | 

<a name="module_DataSet..isEntityRelation"></a>

### DataSet~isEntityRelation() ⇒ <code>boolean</code>
Establish if  a relation links the key of  a table into a subset of another table key

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..makeChild"></a>

### DataSet~makeChild(parentRow, childRow) ⇒ <code>\*</code>
Modifies childRow in order to make it child of parentRow. Sets to null corresponding fields if parentRow is null or undefined

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| parentRow | <code>ObjectRow</code> | 
| childRow | <code>ObjectRow</code> | 

<a name="module_DataSet..clone"></a>

### DataSet~clone() ⇒ <code>DataSet</code>
Clones a DataSet replicating its structure but without copying any ObjectRow

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..newTable"></a>

### DataSet~newTable(tableName) ⇒ <code>DataTable</code>
Creates a new DataTable attaching it to the DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_DataSet..addTable"></a>

### DataSet~addTable(table) ⇒ <code>DataTable</code>
Adds a datatable to DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 

<a name="module_DataSet..copy"></a>

### DataSet~copy() ⇒ <code>DataSet</code>
Creates a copy of the DataSet, including both structure and data.

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..acceptChanges"></a>

### DataSet~acceptChanges()
Calls acceptChanges to all contained DataTables

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..rejectChanges"></a>

### DataSet~rejectChanges()
Calls rejectChanges to all contained DataTables

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..hasChanges"></a>

### DataSet~hasChanges() ⇒ <code>boolean</code>
Check if any contained DataTable has any changes

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  
<a name="module_DataSet..newRelation"></a>

### DataSet~newRelation(relationName, parentTableName, parentColsName, childTableName, childColsName) ⇒ <code>DataRelation</code>
Creates a new DataRelation and attaches it to the DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> |  |
| parentTableName | <code>string</code> |  |
| parentColsName | <code>Array.&lt;string&gt;</code> | array of string |
| childTableName | <code>string</code> |  |
| childColsName | <code>Array.&lt;string&gt;</code> | array of string |

<a name="module_DataSet..cascadeDelete"></a>

### DataSet~cascadeDelete(row) ⇒ <code>\*</code>
Deletes a row with all subentity child

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 

<a name="module_DataSet..serialize"></a>

### DataSet~serialize([serializeStructure], [filterRow]) ⇒ <code>object</code>
Creates a serializable version of this DataSet

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [serializeStructure] | <code>boolean</code> | <code>false</code> | when true serialized also structure, when false only row data |
| [filterRow] | <code>function</code> |  | function to select which rows have to be serialized |

<a name="module_DataSet..deSerialize"></a>

### DataSet~deSerialize(d, deSerializeStructure)
Restores data from an object obtained with serialize().

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>object</code> | 
| deSerializeStructure | <code>boolean</code> | 

<a name="module_DataSet..mergeAsPut"></a>

### DataSet~mergeAsPut(d)
merges changes from DataSet d assuming they are unchanged and they can be present in this or not.If a row is not present, it is added. If it is present, it is updated.It is assumed that "this" dataset is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet..mergeAsPost"></a>

### DataSet~mergeAsPost(d)
merges changes from DataSet d assuming they are unchanged and they are not present in this dataset.Rows are all added 'as is' to this, in the state of ADDEDIt is assumed that "this" dataset is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet..mergeAsPatch"></a>

### DataSet~mergeAsPatch(d)
merges changes from DataSet d assuming they are unchanged and they are all present in this dataset.Rows are updated, but only  fields actually present in d are modified. Other field are left unchanged.It is assumed that "this" dataset is unchanged at the beginning

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_DataSet..importData"></a>

### DataSet~importData(d)
Import data from a given dataset

**Kind**: inner method of [<code>DataSet</code>](#module_DataSet)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="DataColumn"></a>

## DataColumn
**Kind**: global class  
**Access**: public  
<a name="new_DataColumn_new"></a>

### new DataColumn(columnName, ctype)

| Param | Type | Description |
| --- | --- | --- |
| columnName | <code>string</code> |  |
| ctype | <code>CType</code> | type of the column field |

