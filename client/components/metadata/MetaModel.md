<a name="module_MetaModel"></a>

## MetaModel
Knows how to manipulate DataSet accordingly to MetaData assumptions


* [MetaModel](#module_MetaModel)
    * [~allowClear(t, [allow])](#module_MetaModel..allowClear) ⇒ <code>boolean</code>
    * [~allowAllClear(ds)](#module_MetaModel..allowAllClear)
    * [~sorting(t, orderBy)](#module_MetaModel..sorting) ⇒ <code>string</code>
    * [~notEntityChildFilter(t, [filter])](#module_MetaModel..notEntityChildFilter) ⇒ <code>jsDataQuery</code>
    * [~notEntityChild(t)](#module_MetaModel..notEntityChild) ⇒ <code>jsDataQuery</code>
    * [~addNotEntityChild(t, child)](#module_MetaModel..addNotEntityChild)
    * [~addNotEntityChildRel(child, relName)](#module_MetaModel..addNotEntityChildRel)
    * [~getName(child, relName)](#module_MetaModel..getName)
    * [~addNotEntityChildFilter(t, child)](#module_MetaModel..addNotEntityChildFilter)
    * [~getName(table)](#module_MetaModel..getName)
    * [~temporaryTable(t, [value])](#module_MetaModel..temporaryTable) ⇒ <code>boolean</code>
    * [~getRowTemporaryValues(r)](#module_MetaModel..getRowTemporaryValues)
    * [~getTemporaryValues(t)](#module_MetaModel..getTemporaryValues)
    * [~getRelatedRowColumn(r, relatedTableName, relatedColumn)](#module_MetaModel..getRelatedRowColumn) ⇒ <code>object</code>
    * [~calculateTable(t)](#module_MetaModel..calculateTable)
    * [~calculateRow(r)](#module_MetaModel..calculateRow)
    * [~computeRowsAs(t, listType, calcFunction)](#module_MetaModel..computeRowsAs)
    * [~realTable(t)](#module_MetaModel..realTable) ⇒ <code>boolean</code>
    * [~columnExpression(c, value)](#module_MetaModel..columnExpression) ⇒ <code>string</code> \| <code>jsDataQuery</code> \| <code>\*</code>
    * [~temporaryColumn(c)](#module_MetaModel..temporaryColumn) ⇒ <code>boolean</code>
    * [~clearEntity(d)](#module_MetaModel..clearEntity) ⇒
    * [~lockRead(t)](#module_MetaModel..lockRead)
    * [~canRead(t)](#module_MetaModel..canRead) ⇒ <code>boolean</code>
    * [~reCache(t)](#module_MetaModel..reCache)
    * [~setAsRead(t)](#module_MetaModel..setAsRead)
    * [~cachedTable(t, [value])](#module_MetaModel..cachedTable) ⇒ <code>\*</code>
    * [~insertFilter(t, [value])](#module_MetaModel..insertFilter) ⇒ <code>jsDataQuery</code>
    * [~searchFilter(t, [value])](#module_MetaModel..searchFilter) ⇒ <code>\*</code>
    * [~getgetMaxLenName(col)](#module_MetaModel..getgetMaxLenName) ⇒ <code>\*</code>
    * [~denyNull(c, [value])](#module_MetaModel..denyNull) ⇒ <code>boolean</code>
    * [~denyZero(c, [value])](#module_MetaModel..denyZero) ⇒ <code>boolean</code>
    * [~allowDbNull(c, [value])](#module_MetaModel..allowDbNull) ⇒ <code>boolean</code>
    * [~allowZero(c, [value])](#module_MetaModel..allowZero) ⇒ <code>boolean</code>
    * [~isColumnNumeric(c)](#module_MetaModel..isColumnNumeric) ⇒ <code>boolean</code>
    * [~visitedFullyTable(t, [value])](#module_MetaModel..visitedFullyTable) ⇒ <code>boolean</code>
    * [~isSubEntity(childTable, parentTable)](#module_MetaModel..isSubEntity) ⇒ <code>boolean</code>
    * [~isParentTableByKey(ds, parentTable, childTable)](#module_MetaModel..isParentTableByKey) ⇒ <code>boolean</code>
    * [~hasChanges(ds, primary, sourceRow, detailPage)](#module_MetaModel..hasChanges) ⇒ <code>boolean</code>
    * [~checkForFalseUpdates(dRow)](#module_MetaModel..checkForFalseUpdates) ⇒ <code>boolean</code>
    * [~xVerifyChangeChilds(dest, tDest, rif, rSource)](#module_MetaModel..xVerifyChangeChilds) ⇒ <code>boolean</code>
    * [~isSubEntityRelation(rel, childTable, parentTable)](#module_MetaModel..isSubEntityRelation) ⇒ <code>boolean</code>
    * [~isEntityChildRelation(r)](#module_MetaModel..isEntityChildRelation) ⇒ <code>boolean</code>
    * [~xVerifyRowChange(dest, tDest, source, rSource)](#module_MetaModel..xVerifyRowChange)
    * [~xCopy(dsSource, dsDest, rSource, rDest)](#module_MetaModel..xCopy) ⇒ <code>DataRow</code>
    * [~xCopyChilds(dsDest, dsSource, rowSource)](#module_MetaModel..xCopyChilds)
    * [~getName(dsDest, tDest, dsRif, rSource, forceAddState)](#module_MetaModel..getName) ⇒ <code>DataRow</code>
    * [~moveDataRow(destTable, toCopy, forceAddState)](#module_MetaModel..moveDataRow) ⇒ <code>DataRow</code>
    * [~getWhereKeyClauseByColumns(valueRow, valueCol, filterCol, filterColTable, posting)](#module_MetaModel..getWhereKeyClauseByColumns) ⇒ <code>sqlFun</code>
    * [~getWhereKeyClause(valueRow, valueColTable, filterColTable, posting)](#module_MetaModel..getWhereKeyClause) ⇒ <code>jsDataQuery</code>
    * [~xRemoveChilds(dsRif, rDest)](#module_MetaModel..xRemoveChilds)
    * [~copyAutoincrementsProperties(dtIn, dtOut)](#module_MetaModel..copyAutoincrementsProperties)
    * [~cmpSelectors(t, row1, row2)](#module_MetaModel..cmpSelectors) ⇒ <code>boolean</code>
    * [~calcTemporaryID(table, row)](#module_MetaModel..calcTemporaryID)
    * [~applyCascadeDelete(rowToDelete)](#module_MetaModel..applyCascadeDelete)
    * [~cascadeDelete(row)](#module_MetaModel..cascadeDelete) ⇒ <code>\*</code>
    * [~columnNameList(table)](#module_MetaModel..columnNameList) ⇒ <code>string</code>

<a name="module_MetaModel..allowClear"></a>

### MetaModel~allowClear(t, [allow]) ⇒ <code>boolean</code>
SYNC
Gets/sets the clearAllowed property for a DataTable "t". It is used to check if a table can be cleared without loosing data

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [allow] | <code>boolean</code> | 

<a name="module_MetaModel..allowAllClear"></a>

### MetaModel~allowAllClear(ds)
SYNC
Sets all "NotSubEntityChild" tables ofthe dataset "ds" as "CanClear". Called when form is cleared or data is posted

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 

<a name="module_MetaModel..sorting"></a>

### MetaModel~sorting(t, orderBy) ⇒ <code>string</code>
SYNC
Gets/sets the sorting of the DataTable "t"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| orderBy | <code>string</code> | 

<a name="module_MetaModel..notEntityChildFilter"></a>

### MetaModel~notEntityChildFilter(t, [filter]) ⇒ <code>jsDataQuery</code>
SYNC
Gets/sets the "notEntityChild" property of the DataTable "t".

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [filter] | <code>jsDataQuery</code> | 

<a name="module_MetaModel..notEntityChild"></a>

### MetaModel~notEntityChild(t) ⇒ <code>jsDataQuery</code>
SYNC
Gets the "notEntityChild" property of the DataTable "t".

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..addNotEntityChild"></a>

### MetaModel~addNotEntityChild(t, child)
SYNC
Sets the table as "notEntityChild". So the table isn't cleared during freshform and refills

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| child | <code>DataTable</code> | 

<a name="module_MetaModel..addNotEntityChildRel"></a>

### MetaModel~addNotEntityChildRel(child, relName)
SYNC
Sets the table as NotEntitychild. So the table isn't cleared during freshform and refills

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| child | <code>DataTable</code> | 
| relName | <code>string</code> | 

<a name="module_MetaModel..getName"></a>

### MetaModel~getName(child, relName)
SYNC

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| child | <code>DataTable</code> | 
| relName | <code>string</code> | 

<a name="module_MetaModel..addNotEntityChildFilter"></a>

### MetaModel~addNotEntityChildFilter(t, child)
SYNC

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| child | <code>DataTable</code> | 

<a name="module_MetaModel..getName"></a>

### MetaModel~getName(table)
SYNC
Removes a table from being a NotEntitychild

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 

<a name="module_MetaModel..temporaryTable"></a>

### MetaModel~temporaryTable(t, [value]) ⇒ <code>boolean</code>
SYNC
Gets/sets temporary flag on a table

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [value] | <code>boolean</code> | 

<a name="module_MetaModel..getRowTemporaryValues"></a>

### MetaModel~getRowTemporaryValues(r)
SYNC
Evaluates expressions for the given row

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| r | <code>DataRow</code> | 

<a name="module_MetaModel..getTemporaryValues"></a>

### MetaModel~getTemporaryValues(t)
SYNC
Evaluates expressions for each DataTable "t" rows

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..getRelatedRowColumn"></a>

### MetaModel~getRelatedRowColumn(r, relatedTableName, relatedColumn) ⇒ <code>object</code>
SYNC
Returns a field of a row related to row "r" in the table relatedTableName

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>ObjectRow</code> | base row |
| relatedTableName | <code>string</code> | table where the related row is to be searched |
| relatedColumn | <code>string</code> | column containing the value |

<a name="module_MetaModel..calculateTable"></a>

### MetaModel~calculateTable(t)
SYNC
Evaluates custom fields for every row of a DataTable "t". Calls the delegate linked to the table,
corresponding to the MetaData.CalculateFields() virtual method (if it has been defined).

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..calculateRow"></a>

### MetaModel~calculateRow(r)
SYNC
Evaluates custom fields for a single row "r". Calls the delegate linked to the table,
corresponding to the MetaData.CalculateFields() virtual method (if it has been defined).

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 

<a name="module_MetaModel..computeRowsAs"></a>

### MetaModel~computeRowsAs(t, listType, calcFunction)
SYNC
 Tells MetaData Engine to call CalculateFields(R,ListingType) whenever:
- a row is loaded from DataBase
- a row is changed in a sub-entity form and modification accepted with mainsave

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| listType | <code>string</code> | 
| calcFunction | <code>function</code> | 

<a name="module_MetaModel..realTable"></a>

### MetaModel~realTable(t) ⇒ <code>boolean</code>
SYNC
Checks if a table is a real table (not temporary)

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..columnExpression"></a>

### MetaModel~columnExpression(c, value) ⇒ <code>string</code> \| <code>jsDataQuery</code> \| <code>\*</code>
SYNC
Gets/Sets an expression associated to a DataColumn "c"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 
| value | <code>string</code> \| <code>jsDataQuery</code> | 

<a name="module_MetaModel..temporaryColumn"></a>

### MetaModel~temporaryColumn(c) ⇒ <code>boolean</code>
SYNC
Returns true if the DataColumn "c" is a temporay Column, flase otherwise

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 

<a name="module_MetaModel..clearEntity"></a>

### MetaModel~clearEntity(d) ⇒
SYNC
Clears all tables of dataset "d" except for temporary and cached (including pre-filled combobox).
Also undoes the effect of denyclear on all secondary tables setting tables with AllowClear()

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 

<a name="module_MetaModel..lockRead"></a>

### MetaModel~lockRead(t)
SYNC
Set cached flag on a DataTable "t"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..canRead"></a>

### MetaModel~canRead(t) ⇒ <code>boolean</code>
SYNC
 Tells if a table should be cleared and read again during a refresh.
 Cached tables are not read again during refresh if they have been already been read

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..reCache"></a>

### MetaModel~reCache(t)
SYNC
If a table "t" is cached, is marked to be read again in next
ReadCached. If the table is not cached, has no effect

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..setAsRead"></a>

### MetaModel~setAsRead(t)
SYNC
Set a table as "read". It has no effect if table isn't a chached table

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 

<a name="module_MetaModel..cachedTable"></a>

### MetaModel~cachedTable(t, [value]) ⇒ <code>\*</code>
SYNC
Gets/sets cached flag on a table "t"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [value] | <code>boolean</code> | 

<a name="module_MetaModel..insertFilter"></a>

### MetaModel~insertFilter(t, [value]) ⇒ <code>jsDataQuery</code>
SYNC
Gets/sets insert filter "value" on a table "t"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [value] | <code>jsDataQuery</code> | 

<a name="module_MetaModel..searchFilter"></a>

### MetaModel~searchFilter(t, [value]) ⇒ <code>\*</code>
SYNC
Gets/Sets a search filter "value" on a table "t"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [value] | <code>jsDataQuery</code> | 

<a name="module_MetaModel..getgetMaxLenName"></a>

### MetaModel~getgetMaxLenName(col) ⇒ <code>\*</code>
SYNC
Given col type returns the length of the field

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| col | <code>DataColumn</code> | 

<a name="module_MetaModel..denyNull"></a>

### MetaModel~denyNull(c, [value]) ⇒ <code>boolean</code>
SYNC
Gets/sets denyNull property on DataColumn "c" property

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 
| [value] | <code>boolean</code> | 

<a name="module_MetaModel..denyZero"></a>

### MetaModel~denyZero(c, [value]) ⇒ <code>boolean</code>
SYNC
Gets/sets denyZero property on DataColumn "c" property

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 
| [value] | <code>boolean</code> | 

<a name="module_MetaModel..allowDbNull"></a>

### MetaModel~allowDbNull(c, [value]) ⇒ <code>boolean</code>
SYNC
Gets/sets "allowDbNull"  property on DataColumn "c" property (False if data is not nullable in the database)

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 
| [value] | <code>boolean</code> | 

<a name="module_MetaModel..allowZero"></a>

### MetaModel~allowZero(c, [value]) ⇒ <code>boolean</code>
SYNC
Gets/sets "allowZero"  property on DataColumn "c" property (False if data not permit zero in the database)

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 
| [value] | <code>boolean</code> | 

<a name="module_MetaModel..isColumnNumeric"></a>

### MetaModel~isColumnNumeric(c) ⇒ <code>boolean</code>
SYNC
Returns true if the column is numeric, false otherwise

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| c | <code>DataColumn</code> | 

<a name="module_MetaModel..visitedFullyTable"></a>

### MetaModel~visitedFullyTable(t, [value]) ⇒ <code>boolean</code>
SYNC
Gets/Sets cached flag on a table "t"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| [value] | <code>bool</code> | 

<a name="module_MetaModel..isSubEntity"></a>

### MetaModel~isSubEntity(childTable, parentTable) ⇒ <code>boolean</code>
SYNC
Returns true if "childTable" is a subentity table of "parentTable", false otherwise
A table is subentity if it is child and all columns of primary table must be connected to a child key field

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| childTable | <code>DataTable</code> | 
| parentTable | <code>DataTable</code> | 

<a name="module_MetaModel..isParentTableByKey"></a>

### MetaModel~isParentTableByKey(ds, parentTable, childTable) ⇒ <code>boolean</code>
SYNC
Checks if parent table "parentTable" is related with KEY fields of Child table "childTable"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 
| parentTable | <code>DataTable</code> | 
| childTable | <code>DataTable</code> | 

<a name="module_MetaModel..hasChanges"></a>

### MetaModel~hasChanges(ds, primary, sourceRow, detailPage) ⇒ <code>boolean</code>
SYNC
Returns true if dataset has changes, false otherwise.

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| ds | <code>DataSet</code> |  |
| primary | <code>DataTable</code> |  |
| sourceRow | <code>DataRow</code> | >> Row in master DataSet |
| detailPage | <code>boolean</code> |  |

<a name="module_MetaModel..checkForFalseUpdates"></a>

### MetaModel~checkForFalseUpdates(dRow) ⇒ <code>boolean</code>
SYNC
Returns true if row (modified) is not really a modified row

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dRow | <code>DataRow</code> | 

<a name="module_MetaModel..xVerifyChangeChilds"></a>

### MetaModel~xVerifyChangeChilds(dest, tDest, rif, rSource) ⇒ <code>boolean</code>
SYNC
Checks if rSource and all childs have not changed comparing them with Dest content
Returns true if there are changes

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dest | <code>DataSet</code> | 
| tDest | <code>DataTable</code> | 
| rif | <code>DataSet</code> | 
| rSource | <code>ObjectRow</code> | 

<a name="module_MetaModel..isSubEntityRelation"></a>

### MetaModel~isSubEntityRelation(rel, childTable, parentTable) ⇒ <code>boolean</code>
SYNC
Returns true if the relation "rel" is a db relation between "childTable" and "parentTable"
and all columns of primary table must be connected to a child key field

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| rel | <code>DataRelation</code> | 
| childTable | <code>DataTable</code> | 
| parentTable | <code>DataTable</code> | 

<a name="module_MetaModel..isEntityChildRelation"></a>

### MetaModel~isEntityChildRelation(r) ⇒ <code>boolean</code>
SYNC
Checks if a relation connects any field that is primarykey for both parent and child

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| r | <code>DataRelation</code> | 

<a name="module_MetaModel..xVerifyRowChange"></a>

### MetaModel~xVerifyRowChange(dest, tDest, source, rSource)
SYNC
Verifies if a row is not changed between parent and child dataset
Return true if there are changes

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>DataSet</code> |  |
| tDest | <code>DataTable</code> |  |
| source | <code>DataSet</code> |  |
| rSource | <code>ObjectRow</code> | * @returns {boolean} |

<a name="module_MetaModel..xCopy"></a>

### MetaModel~xCopy(dsSource, dsDest, rSource, rDest) ⇒ <code>DataRow</code>
SYNC
Copies a DataRow from dsSource to dsDest.
rSource and rDest must have same key, or rSource have to not generate conflicts in dsDest

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dsSource | <code>DataSet</code> | 
| dsDest | <code>DataSet</code> | 
| rSource | <code>DataRow</code> | 
| rDest | <code>DataRow</code> | 

<a name="module_MetaModel..xCopyChilds"></a>

### MetaModel~xCopyChilds(dsDest, dsSource, rowSource)
SYNC
Copies a DataRow and all its childs from "dsSource" to "dsDest"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dsDest | <code>DataSet</code> | 
| dsSource | <code>DataSet</code> | 
| rowSource | <code>DataRow</code> | 

<a name="module_MetaModel..getName"></a>

### MetaModel~getName(dsDest, tDest, dsRif, rSource, forceAddState) ⇒ <code>DataRow</code>
SYNC
Moves a DataRow and all its childs from "dsRif" to "dsDest".

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dsDest | <code>DataSet</code> | 
| tDest | <code>DataTable</code> | 
| dsRif | <code>DataSet</code> | 
| rSource | <code>DataRow</code> | 
| forceAddState | <code>boolean</code> | 

<a name="module_MetaModel..moveDataRow"></a>

### MetaModel~moveDataRow(destTable, toCopy, forceAddState) ⇒ <code>DataRow</code>
SYNC
Moves "toCopy" row to "destTable" DataTable

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| destTable | <code>DataTable</code> | 
| toCopy | <code>DataRow</code> | 
| forceAddState | <code>boolean</code> | 

<a name="module_MetaModel..getWhereKeyClauseByColumns"></a>

### MetaModel~getWhereKeyClauseByColumns(valueRow, valueCol, filterCol, filterColTable, posting) ⇒ <code>sqlFun</code>
SYNC
Builds a DataQuery clause where the keys are the columns in "filterColTable" and the values are those in "valueRow" DataRow

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| valueRow | <code>DataRow</code> | Row to use for getting values to compare |
| valueCol | <code>Array.&lt;DataColumn&gt;</code> | Columns  of ParentRow from which values to be compare have to be taken |
| filterCol | <code>Array.&lt;DataColumn&gt;</code> | Columns  of ChildRows for which the Column NAMES have to be taken |
| filterColTable | <code>DataTable</code> | table linked to the filtercolcolumns |
| posting | <code>bool</code> | use posting column names where set |

<a name="module_MetaModel..getWhereKeyClause"></a>

### MetaModel~getWhereKeyClause(valueRow, valueColTable, filterColTable, posting) ⇒ <code>jsDataQuery</code>
SYNC
Builds a DataQuery clause where the keys are the columns in "filterColTable" and the values are those in "valueRow" DataRow

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| valueRow | <code>DataRow</code> | Row to use for getting values to compare |
| valueColTable | <code>DataTable</code> | Row Columns  of ParentRow from which values to be compare have to be taken |
| filterColTable | <code>DataTable</code> | Row Column  of ChildRows for which the Column NAMES have to be taken |
| posting | <code>bool</code> | use posting column names where set |

<a name="module_MetaModel..xRemoveChilds"></a>

### MetaModel~xRemoveChilds(dsRif, rDest)
SYNC
Removes a row "rDest" with all his subentity childs. Only considers tables of D inters. Rif

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dsRif | <code>DataSet</code> | 
| rDest | <code>DataRow</code> | 

<a name="module_MetaModel..copyAutoincrementsProperties"></a>

### MetaModel~copyAutoincrementsProperties(dtIn, dtOut)
SYNC
Copies the autoincrement properties form DataTable  "dtIn" to  DataTable "dtOut"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| dtIn | <code>DataTable</code> | 
| dtOut | <code>DataTable</code> | 

<a name="module_MetaModel..cmpSelectors"></a>

### MetaModel~cmpSelectors(t, row1, row2) ⇒ <code>boolean</code>
SYNC
For each AutoIncrement obj of table t, compares the values of the two rows.
Returns false if a value is different, returns true if all values on selector columns are equal

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Returns**: <code>boolean</code> - true if all values for row1 and row2 in all selector columns are equal, false otherwise  
**Access**: public  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| row1 | <code>DataRow</code> | 
| row2 | <code>DataRow</code> | 

<a name="module_MetaModel..calcTemporaryID"></a>

### MetaModel~calcTemporaryID(table, row)
SYNC
Evaluates a temporary value for a field of a row, basing on AutoIncrement
properties of the column, without reading from DB.

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| row | <code>DataRow</code> | 

<a name="module_MetaModel..applyCascadeDelete"></a>

### MetaModel~applyCascadeDelete(rowToDelete)
SYNC
Does the cascade delete of the row "rowToDelete"

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| rowToDelete | <code>ObjectRow</code> | 

<a name="module_MetaModel..cascadeDelete"></a>

### MetaModel~cascadeDelete(row) ⇒ <code>\*</code>
Deletes a row with all subentity child

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 

<a name="module_MetaModel..columnNameList"></a>

### MetaModel~columnNameList(table) ⇒ <code>string</code>
ASYNC
Returns the list of real (not temporary or expression) columns NAMES of a table "table"
formatting it like "fieldname1, fieldname2,...."
Returns "*" if no column is set

**Kind**: inner method of [<code>MetaModel</code>](#module_MetaModel)  
**Access**: public  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 

