## Classes

<dl>
<dt><a href="#getData">getData</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getFilterByExample">getFilterByExample(context, tableName, example, [useLike])</a> ⇒ <code>sqlFun</code></dt>
<dd><p>Gets a a filter</p>
</dd>
<dt><a href="#getByFilter">getByFilter(ctx, table, filter, [orderBy])</a> ⇒ <code>Array.&lt;DataRow&gt;</code></dt>
<dd><p>Gets an array of datarow given a filter</p>
</dd>
<dt><a href="#fillDataSetByKey">fillDataSetByKey(ctx, ds, table, keyValues)</a> ⇒ <code>*</code></dt>
<dd><p>Fills a DataSet given the key of a row</p>
</dd>
<dt><a href="#fillDataSetByFilter">fillDataSetByFilter(ctx, table, filter)</a> ⇒ <code>Array.&lt;DataRow&gt;</code></dt>
<dd><p>Fill a dataset starting with a set of filtered rows in a table</p>
</dd>
<dt><a href="#recursivelyMarkSubEntityAsVisited">recursivelyMarkSubEntityAsVisited(table, visited, toVisit)</a></dt>
<dd></dd>
<dt><a href="#doGet">doGet(ctx, primaryTable, onlyPeripherals, [oneRow])</a></dt>
<dd><p>Gets all data of the DataSet cascated-related to the primary table.
The first relations considered are child of primary, then
 proper child / parent relations are called in cascade style.</p>
</dd>
<dt><a href="#getStartingFrom">getStartingFrom(ctx, primaryTable)</a> ⇒ <code>promise</code></dt>
<dd><p>Assuming that primaryTable has ALREADY been filled with data, read all childs and parents starting from
 rows present in primaryTable.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#function">function</a></dt>
<dd></dd>
</dl>

<a name="getData"></a>

## getData
**Kind**: global class  
<a name="new_getData_new"></a>

### new getData()
Utility class with methods to fill a DataSet starting from a set of rows

<a name="getFilterByExample"></a>

## getFilterByExample(context, tableName, example, [useLike]) ⇒ <code>sqlFun</code>
Gets a a filter

**Kind**: global function  
**Returns**: <code>sqlFun</code> - DataRow obtained with the given filter  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>Context</code> |  |  |
| tableName | <code>string</code> |  |  |
| example | <code>object</code> |  |  |
| [useLike] | <code>boolean</code> | <code>false</code> | -if true, uses 'like' for any string comparisons |

<a name="getByFilter"></a>

## getByFilter(ctx, table, filter, [orderBy]) ⇒ <code>Array.&lt;DataRow&gt;</code>
Gets an array of datarow given a filter

**Kind**: global function  
**Returns**: <code>Array.&lt;DataRow&gt;</code> - DataRow obtained with the given filter  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 
| table | <code>DataTable</code> | 
| filter | <code>sqlFun</code> | 
| [orderBy] | <code>string</code> | 

<a name="fillDataSetByKey"></a>

## fillDataSetByKey(ctx, ds, table, keyValues) ⇒ <code>\*</code>
Fills a DataSet given the key of a row

**Kind**: global function  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 
| ds | <code>DataSet</code> | 
| table | <code>DataTable</code> | 
| keyValues | <code>Array.&lt;object&gt;</code> \| <code>object</code> | 

<a name="fillDataSetByFilter"></a>

## fillDataSetByFilter(ctx, table, filter) ⇒ <code>Array.&lt;DataRow&gt;</code>
Fill a dataset starting with a set of filtered rows in a table

**Kind**: global function  
**Returns**: <code>Array.&lt;DataRow&gt;</code> - DataRow obtained with the given filter  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 
| table | <code>DataTable</code> | 
| filter | <code>sqlFun</code> | 

<a name="recursivelyMarkSubEntityAsVisited"></a>

## recursivelyMarkSubEntityAsVisited(table, visited, toVisit)
**Kind**: global function  

| Param | Type |
| --- | --- |
| table | <code>DataTable</code> | 
| visited | <code>Object</code> | 
| toVisit | <code>Object</code> | 

<a name="doGet"></a>

## doGet(ctx, primaryTable, onlyPeripherals, [oneRow])
Gets all data of the DataSet cascated-related to the primary table.The first relations considered are child of primary, then proper child / parent relations are called in cascade style.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Context</code> |  |
| primaryTable | <code>DataTable</code> |  |
| onlyPeripherals | <code>boolean</code> | if true, only peripheral (not primary or secondary) tables are refilled |
| [oneRow] | <code>DataRow</code> | The (eventually) only primary table row on which get the entire sub-graph.  Can be null if PrimaryDataTable already contains rows.  R is not required to belong to PrimaryDataTable. |

<a name="getStartingFrom"></a>

## getStartingFrom(ctx, primaryTable) ⇒ <code>promise</code>
Assuming that primaryTable has ALREADY been filled with data, read all childs and parents starting from rows present in primaryTable.

**Kind**: global function  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 
| primaryTable | <code>DataTable</code> | 

<a name="function"></a>

## function
**Kind**: global typedef  
