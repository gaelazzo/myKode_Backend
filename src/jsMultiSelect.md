<a name="module_optimizeComparing"></a>

## optimizeComparing
provides a mechanism to make multiple select with a single sql command


* [optimizeComparing](#module_optimizeComparing)
    * [~MultiCompare](#module_optimizeComparing..MultiCompare)
        * [new MultiCompare()](#new_module_optimizeComparing..MultiCompare_new)
        * [new MultiCompare(fields, values)](#new_module_optimizeComparing..MultiCompare_new)
        * [.fields](#module_optimizeComparing..MultiCompare+fields) : <code>Array.&lt;String&gt;</code>
        * [.values](#module_optimizeComparing..MultiCompare+values)
    * [~MultiCompare](#module_optimizeComparing..MultiCompare)
        * [new MultiCompare()](#new_module_optimizeComparing..MultiCompare_new)
        * [new MultiCompare(fields, values)](#new_module_optimizeComparing..MultiCompare_new)
        * [.fields](#module_optimizeComparing..MultiCompare+fields) : <code>Array.&lt;String&gt;</code>
        * [.values](#module_optimizeComparing..MultiCompare+values)
    * [~OptimizedMultiCompare](#module_optimizeComparing..OptimizedMultiCompare)
        * [new OptimizedMultiCompare()](#new_module_optimizeComparing..OptimizedMultiCompare_new)
        * [new OptimizedMultiCompare(multiComp)](#new_module_optimizeComparing..OptimizedMultiCompare_new)
        * [.fields](#module_optimizeComparing..OptimizedMultiCompare+fields) : <code>Array.&lt;String&gt;</code>
        * [.multiValPosition](#module_optimizeComparing..OptimizedMultiCompare+multiValPosition)
        * [.values](#module_optimizeComparing..OptimizedMultiCompare+values)
        * [.multiValArray](#module_optimizeComparing..OptimizedMultiCompare+multiValArray)
    * [~OptimizedMultiCompare](#module_optimizeComparing..OptimizedMultiCompare)
        * [new OptimizedMultiCompare()](#new_module_optimizeComparing..OptimizedMultiCompare_new)
        * [new OptimizedMultiCompare(multiComp)](#new_module_optimizeComparing..OptimizedMultiCompare_new)
        * [.fields](#module_optimizeComparing..OptimizedMultiCompare+fields) : <code>Array.&lt;String&gt;</code>
        * [.multiValPosition](#module_optimizeComparing..OptimizedMultiCompare+multiValPosition)
        * [.values](#module_optimizeComparing..OptimizedMultiCompare+values)
        * [.multiValArray](#module_optimizeComparing..OptimizedMultiCompare+multiValArray)
    * [~Select](#module_optimizeComparing..Select)
        * [new Select()](#new_module_optimizeComparing..Select_new)
        * [new Select(columnList)](#new_module_optimizeComparing..Select_new)
        * [.columns](#module_optimizeComparing..Select+columns)
        * [.omc](#module_optimizeComparing..Select+omc)
        * [.alias](#module_optimizeComparing..Select+alias)
        * [.filter](#module_optimizeComparing..Select+filter)
        * [.staticF](#module_optimizeComparing..Select+staticF)
        * [.isOptimized](#module_optimizeComparing..Select+isOptimized)
        * [.tableName](#module_optimizeComparing..Select+tableName)
        * [.myTop](#module_optimizeComparing..Select+myTop)
        * [.staticFilter(filter)](#module_optimizeComparing..Select+staticFilter) ⇒ <code>Select</code>
    * [~Select](#module_optimizeComparing..Select)
        * [new Select()](#new_module_optimizeComparing..Select_new)
        * [new Select(columnList)](#new_module_optimizeComparing..Select_new)
        * [.columns](#module_optimizeComparing..Select+columns)
        * [.omc](#module_optimizeComparing..Select+omc)
        * [.alias](#module_optimizeComparing..Select+alias)
        * [.filter](#module_optimizeComparing..Select+filter)
        * [.staticF](#module_optimizeComparing..Select+staticF)
        * [.isOptimized](#module_optimizeComparing..Select+isOptimized)
        * [.tableName](#module_optimizeComparing..Select+tableName)
        * [.myTop](#module_optimizeComparing..Select+myTop)
        * [.staticFilter(filter)](#module_optimizeComparing..Select+staticFilter) ⇒ <code>Select</code>
    * [~sameFieldsAs(multiComp)](#module_optimizeComparing..sameFieldsAs) ⇒ <code>boolean</code>
    * [~isMultiValue()](#module_optimizeComparing..isMultiValue) ⇒ <code>boolean</code>
    * [~getFilter()](#module_optimizeComparing..getFilter) ⇒ <code>sqlFun</code>
    * [~sameFieldsAs(optimizedComparer)](#module_optimizeComparing..sameFieldsAs) ⇒ <code>boolean</code>
    * [~hasValue(value, index)](#module_optimizeComparing..hasValue) ⇒ <code>boolean</code>
    * [~getPartialFilter()](#module_optimizeComparing..getPartialFilter) ⇒ <code>sqlFun</code>
    * [~getFilter()](#module_optimizeComparing..getFilter) ⇒ <code>sqlFun</code>
    * [~from(tableName)](#module_optimizeComparing..from) ⇒ <code>Select</code>
    * [~top([n])](#module_optimizeComparing..top) ⇒ <code>string</code> \| <code>Select</code>
    * [~canAppendTo(other)](#module_optimizeComparing..canAppendTo) ⇒ <code>boolean</code>
    * [~optimizedAppendTo(other)](#module_optimizeComparing..optimizedAppendTo) ⇒ <code>boolean</code>
    * [~appendTo(other)](#module_optimizeComparing..appendTo) ⇒ <code>boolean</code>
    * [~where(filter)](#module_optimizeComparing..where) ⇒ <code>Select</code>
    * [~multiCompare(multiComp)](#module_optimizeComparing..multiCompare) ⇒ <code>Select</code>
    * [~intoTable(alias)](#module_optimizeComparing..intoTable) ⇒ <code>Select</code>
    * [~orderBy(sorting)](#module_optimizeComparing..orderBy) ⇒ <code>Select</code>
    * [~groupSelect(selectList)](#module_optimizeComparing..groupSelect)

<a name="module_optimizeComparing..MultiCompare"></a>

### optimizeComparing~MultiCompare
**Kind**: inner class of [<code>optimizeComparing</code>](#module_optimizeComparing)  

* [~MultiCompare](#module_optimizeComparing..MultiCompare)
    * [new MultiCompare()](#new_module_optimizeComparing..MultiCompare_new)
    * [new MultiCompare(fields, values)](#new_module_optimizeComparing..MultiCompare_new)
    * [.fields](#module_optimizeComparing..MultiCompare+fields) : <code>Array.&lt;String&gt;</code>
    * [.values](#module_optimizeComparing..MultiCompare+values)

<a name="new_module_optimizeComparing..MultiCompare_new"></a>

#### new MultiCompare()
Used to compose query

<a name="new_module_optimizeComparing..MultiCompare_new"></a>

#### new MultiCompare(fields, values)
Multi compare is a class indicating the comparison of n given fields with n given values


| Param | Type |
| --- | --- |
| fields | <code>Array.&lt;String&gt;</code> | 
| values | <code>Array.&lt;Object&gt;</code> | 

<a name="module_optimizeComparing..MultiCompare+fields"></a>

#### multiCompare.fields : <code>Array.&lt;String&gt;</code>
List of fields to compare

**Kind**: instance property of [<code>MultiCompare</code>](#module_optimizeComparing..MultiCompare)  
**Access**: public  
**Properties**

| Name |
| --- |
| fields | 

<a name="module_optimizeComparing..MultiCompare+values"></a>

#### multiCompare.values
List of values to match

**Kind**: instance property of [<code>MultiCompare</code>](#module_optimizeComparing..MultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| values | <code>Array.&lt;Object&gt;</code> | 

<a name="module_optimizeComparing..MultiCompare"></a>

### optimizeComparing~MultiCompare
**Kind**: inner class of [<code>optimizeComparing</code>](#module_optimizeComparing)  

* [~MultiCompare](#module_optimizeComparing..MultiCompare)
    * [new MultiCompare()](#new_module_optimizeComparing..MultiCompare_new)
    * [new MultiCompare(fields, values)](#new_module_optimizeComparing..MultiCompare_new)
    * [.fields](#module_optimizeComparing..MultiCompare+fields) : <code>Array.&lt;String&gt;</code>
    * [.values](#module_optimizeComparing..MultiCompare+values)

<a name="new_module_optimizeComparing..MultiCompare_new"></a>

#### new MultiCompare()
Used to compose query

<a name="new_module_optimizeComparing..MultiCompare_new"></a>

#### new MultiCompare(fields, values)
Multi compare is a class indicating the comparison of n given fields with n given values


| Param | Type |
| --- | --- |
| fields | <code>Array.&lt;String&gt;</code> | 
| values | <code>Array.&lt;Object&gt;</code> | 

<a name="module_optimizeComparing..MultiCompare+fields"></a>

#### multiCompare.fields : <code>Array.&lt;String&gt;</code>
List of fields to compare

**Kind**: instance property of [<code>MultiCompare</code>](#module_optimizeComparing..MultiCompare)  
**Access**: public  
**Properties**

| Name |
| --- |
| fields | 

<a name="module_optimizeComparing..MultiCompare+values"></a>

#### multiCompare.values
List of values to match

**Kind**: instance property of [<code>MultiCompare</code>](#module_optimizeComparing..MultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| values | <code>Array.&lt;Object&gt;</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare"></a>

### optimizeComparing~OptimizedMultiCompare
**Kind**: inner class of [<code>optimizeComparing</code>](#module_optimizeComparing)  

* [~OptimizedMultiCompare](#module_optimizeComparing..OptimizedMultiCompare)
    * [new OptimizedMultiCompare()](#new_module_optimizeComparing..OptimizedMultiCompare_new)
    * [new OptimizedMultiCompare(multiComp)](#new_module_optimizeComparing..OptimizedMultiCompare_new)
    * [.fields](#module_optimizeComparing..OptimizedMultiCompare+fields) : <code>Array.&lt;String&gt;</code>
    * [.multiValPosition](#module_optimizeComparing..OptimizedMultiCompare+multiValPosition)
    * [.values](#module_optimizeComparing..OptimizedMultiCompare+values)
    * [.multiValArray](#module_optimizeComparing..OptimizedMultiCompare+multiValArray)

<a name="new_module_optimizeComparing..OptimizedMultiCompare_new"></a>

#### new OptimizedMultiCompare()
Optimized multi compare. It is a multi-field-comparator that eventually has multiple values for some field.

<a name="new_module_optimizeComparing..OptimizedMultiCompare_new"></a>

#### new OptimizedMultiCompare(multiComp)
creates an OptimizedMultiCompare starting from a MultiCompare


| Param | Type |
| --- | --- |
| multiComp | <code>MultiCompare</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare+fields"></a>

#### optimizedMultiCompare.fields : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name |
| --- |
| fields | 

<a name="module_optimizeComparing..OptimizedMultiCompare+multiValPosition"></a>

#### optimizedMultiCompare.multiValPosition
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| multiValPosition | <code>int</code> \| <code>null</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare+values"></a>

#### optimizedMultiCompare.values
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| values | <code>Array.&lt;Object&gt;</code> \| <code>null</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare+multiValArray"></a>

#### optimizedMultiCompare.multiValArray
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| multiValArray | <code>Array.&lt;Object&gt;</code> \| <code>null</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare"></a>

### optimizeComparing~OptimizedMultiCompare
**Kind**: inner class of [<code>optimizeComparing</code>](#module_optimizeComparing)  

* [~OptimizedMultiCompare](#module_optimizeComparing..OptimizedMultiCompare)
    * [new OptimizedMultiCompare()](#new_module_optimizeComparing..OptimizedMultiCompare_new)
    * [new OptimizedMultiCompare(multiComp)](#new_module_optimizeComparing..OptimizedMultiCompare_new)
    * [.fields](#module_optimizeComparing..OptimizedMultiCompare+fields) : <code>Array.&lt;String&gt;</code>
    * [.multiValPosition](#module_optimizeComparing..OptimizedMultiCompare+multiValPosition)
    * [.values](#module_optimizeComparing..OptimizedMultiCompare+values)
    * [.multiValArray](#module_optimizeComparing..OptimizedMultiCompare+multiValArray)

<a name="new_module_optimizeComparing..OptimizedMultiCompare_new"></a>

#### new OptimizedMultiCompare()
Optimized multi compare. It is a multi-field-comparator that eventually has multiple values for some field.

<a name="new_module_optimizeComparing..OptimizedMultiCompare_new"></a>

#### new OptimizedMultiCompare(multiComp)
creates an OptimizedMultiCompare starting from a MultiCompare


| Param | Type |
| --- | --- |
| multiComp | <code>MultiCompare</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare+fields"></a>

#### optimizedMultiCompare.fields : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name |
| --- |
| fields | 

<a name="module_optimizeComparing..OptimizedMultiCompare+multiValPosition"></a>

#### optimizedMultiCompare.multiValPosition
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| multiValPosition | <code>int</code> \| <code>null</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare+values"></a>

#### optimizedMultiCompare.values
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| values | <code>Array.&lt;Object&gt;</code> \| <code>null</code> | 

<a name="module_optimizeComparing..OptimizedMultiCompare+multiValArray"></a>

#### optimizedMultiCompare.multiValArray
**Kind**: instance property of [<code>OptimizedMultiCompare</code>](#module_optimizeComparing..OptimizedMultiCompare)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| multiValArray | <code>Array.&lt;Object&gt;</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select"></a>

### optimizeComparing~Select
**Kind**: inner class of [<code>optimizeComparing</code>](#module_optimizeComparing)  

* [~Select](#module_optimizeComparing..Select)
    * [new Select()](#new_module_optimizeComparing..Select_new)
    * [new Select(columnList)](#new_module_optimizeComparing..Select_new)
    * [.columns](#module_optimizeComparing..Select+columns)
    * [.omc](#module_optimizeComparing..Select+omc)
    * [.alias](#module_optimizeComparing..Select+alias)
    * [.filter](#module_optimizeComparing..Select+filter)
    * [.staticF](#module_optimizeComparing..Select+staticF)
    * [.isOptimized](#module_optimizeComparing..Select+isOptimized)
    * [.tableName](#module_optimizeComparing..Select+tableName)
    * [.myTop](#module_optimizeComparing..Select+myTop)
    * [.staticFilter(filter)](#module_optimizeComparing..Select+staticFilter) ⇒ <code>Select</code>

<a name="new_module_optimizeComparing..Select_new"></a>

#### new Select()
A class representing a single sql select command

<a name="new_module_optimizeComparing..Select_new"></a>

#### new Select(columnList)
Creates a select providing an optional column list


| Param | Type |
| --- | --- |
| columnList | <code>string</code> | 

<a name="module_optimizeComparing..Select+columns"></a>

#### select.columns
string containing the list  of all columns to read, usually comma separated

**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| Select.columns | <code>String</code> | 

<a name="module_optimizeComparing..Select+omc"></a>

#### select.omc
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| omc | <code>OptimizedMultiCompare</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+alias"></a>

#### select.alias
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| alias | <code>string</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+filter"></a>

#### select.filter
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| filter | <code>sqlFun</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+staticF"></a>

#### select.staticF
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| staticF | <code>sqlFun</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+isOptimized"></a>

#### select.isOptimized
States if a Select is 'optimized', i.e. it is attached to a multicomparator. A select attached to a manual
 filter is considered not-optimized

**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Properties**

| Name | Type |
| --- | --- |
| isOptimized | <code>boolean</code> | 

<a name="module_optimizeComparing..Select+tableName"></a>

#### select.tableName
Table to which this select is applied

**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Properties**

| Name | Type |
| --- | --- |
| tableName | <code>string</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+myTop"></a>

#### select.myTop
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: protected  
**Properties**

| Name | Type |
| --- | --- |
| myTop | <code>string</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+staticFilter"></a>

#### select.staticFilter(filter) ⇒ <code>Select</code>
Sets a static filter for this condition

**Kind**: instance method of [<code>Select</code>](#module_optimizeComparing..Select)  
**Returns**: <code>Select</code> - this  

| Param | Type |
| --- | --- |
| filter | <code>sqlFun</code> | 

<a name="module_optimizeComparing..Select"></a>

### optimizeComparing~Select
**Kind**: inner class of [<code>optimizeComparing</code>](#module_optimizeComparing)  

* [~Select](#module_optimizeComparing..Select)
    * [new Select()](#new_module_optimizeComparing..Select_new)
    * [new Select(columnList)](#new_module_optimizeComparing..Select_new)
    * [.columns](#module_optimizeComparing..Select+columns)
    * [.omc](#module_optimizeComparing..Select+omc)
    * [.alias](#module_optimizeComparing..Select+alias)
    * [.filter](#module_optimizeComparing..Select+filter)
    * [.staticF](#module_optimizeComparing..Select+staticF)
    * [.isOptimized](#module_optimizeComparing..Select+isOptimized)
    * [.tableName](#module_optimizeComparing..Select+tableName)
    * [.myTop](#module_optimizeComparing..Select+myTop)
    * [.staticFilter(filter)](#module_optimizeComparing..Select+staticFilter) ⇒ <code>Select</code>

<a name="new_module_optimizeComparing..Select_new"></a>

#### new Select()
A class representing a single sql select command

<a name="new_module_optimizeComparing..Select_new"></a>

#### new Select(columnList)
Creates a select providing an optional column list


| Param | Type |
| --- | --- |
| columnList | <code>string</code> | 

<a name="module_optimizeComparing..Select+columns"></a>

#### select.columns
string containing the list  of all columns to read, usually comma separated

**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| Select.columns | <code>String</code> | 

<a name="module_optimizeComparing..Select+omc"></a>

#### select.omc
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| omc | <code>OptimizedMultiCompare</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+alias"></a>

#### select.alias
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| alias | <code>string</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+filter"></a>

#### select.filter
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| filter | <code>sqlFun</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+staticF"></a>

#### select.staticF
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: public  
**Properties**

| Name | Type |
| --- | --- |
| staticF | <code>sqlFun</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+isOptimized"></a>

#### select.isOptimized
States if a Select is 'optimized', i.e. it is attached to a multicomparator. A select attached to a manual
 filter is considered not-optimized

**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Properties**

| Name | Type |
| --- | --- |
| isOptimized | <code>boolean</code> | 

<a name="module_optimizeComparing..Select+tableName"></a>

#### select.tableName
Table to which this select is applied

**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Properties**

| Name | Type |
| --- | --- |
| tableName | <code>string</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+myTop"></a>

#### select.myTop
**Kind**: instance property of [<code>Select</code>](#module_optimizeComparing..Select)  
**Access**: protected  
**Properties**

| Name | Type |
| --- | --- |
| myTop | <code>string</code> \| <code>null</code> | 

<a name="module_optimizeComparing..Select+staticFilter"></a>

#### select.staticFilter(filter) ⇒ <code>Select</code>
Sets a static filter for this condition

**Kind**: instance method of [<code>Select</code>](#module_optimizeComparing..Select)  
**Returns**: <code>Select</code> - this  

| Param | Type |
| --- | --- |
| filter | <code>sqlFun</code> | 

<a name="module_optimizeComparing..sameFieldsAs"></a>

### optimizeComparing~sameFieldsAs(multiComp) ⇒ <code>boolean</code>
checks if this has same comparison fields of another multi compare

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| multiComp | <code>MultiCompare</code> | 

<a name="module_optimizeComparing..isMultiValue"></a>

### optimizeComparing~isMultiValue() ⇒ <code>boolean</code>
checks if this is a simple comparator or multi-value comparator

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  
**Access**: public  
<a name="module_optimizeComparing..getFilter"></a>

### optimizeComparing~getFilter() ⇒ <code>sqlFun</code>
Gets the overall filter for this multi select

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  
**Access**: public  
<a name="module_optimizeComparing..sameFieldsAs"></a>

### optimizeComparing~sameFieldsAs(optimizedComparer) ⇒ <code>boolean</code>
**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| optimizedComparer | <code>OptimizedMultiCompare</code> | 

<a name="module_optimizeComparing..hasValue"></a>

### optimizeComparing~hasValue(value, index) ⇒ <code>boolean</code>
check if this comparison has a specified value for the index-th field

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| value | <code>object</code> | 
| index | <code>int</code> | 

<a name="module_optimizeComparing..getPartialFilter"></a>

### optimizeComparing~getPartialFilter() ⇒ <code>sqlFun</code>
get the partial filter (excluding static filter) associated with this Select

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  
<a name="module_optimizeComparing..getFilter"></a>

### optimizeComparing~getFilter() ⇒ <code>sqlFun</code>
Gets the overall filter for this multi select

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  
<a name="module_optimizeComparing..from"></a>

### optimizeComparing~from(tableName) ⇒ <code>Select</code>
Sets the table associated to this select

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_optimizeComparing..top"></a>

### optimizeComparing~top([n]) ⇒ <code>string</code> \| <code>Select</code>
sets the top options for the query

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| [n] | <code>string</code> | 

<a name="module_optimizeComparing..canAppendTo"></a>

### optimizeComparing~canAppendTo(other) ⇒ <code>boolean</code>
Check if this Select can be appended to another one, i.e., has same tableName and alias

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| other | <code>Select</code> | 

<a name="module_optimizeComparing..optimizedAppendTo"></a>

### optimizeComparing~optimizedAppendTo(other) ⇒ <code>boolean</code>
Tries to append this Select to another one in an optimized way and returns true on success
An optimized Append is possible only if two select are both optimized

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| other | <code>Select</code> | 

<a name="module_optimizeComparing..appendTo"></a>

### optimizeComparing~appendTo(other) ⇒ <code>boolean</code>
appends this Select to another one or-joining their conditions, returns true if appending succeeded

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| other | <code>Select</code> | 

<a name="module_optimizeComparing..where"></a>

### optimizeComparing~where(filter) ⇒ <code>Select</code>
sets the manual filter for this Select. We call this kind of filtering  not-optimized

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  
**Returns**: <code>Select</code> - this  

| Param | Type |
| --- | --- |
| filter | <code>sqlFun</code> | 

<a name="module_optimizeComparing..multiCompare"></a>

### optimizeComparing~multiCompare(multiComp) ⇒ <code>Select</code>
Sets the filter as a multi comparator. Here we call it 'optimized'

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| multiComp | <code>MultiCompare</code> | 

<a name="module_optimizeComparing..intoTable"></a>

### optimizeComparing~intoTable(alias) ⇒ <code>Select</code>
Sets a destination table for this select (alias)

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| alias | <code>string</code> | 

<a name="module_optimizeComparing..orderBy"></a>

### optimizeComparing~orderBy(sorting) ⇒ <code>Select</code>
set the sorting for the select

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param |
| --- |
| sorting | 

<a name="module_optimizeComparing..groupSelect"></a>

### optimizeComparing~groupSelect(selectList)
Takes a list of Select to same table and evaluates an equivalent Select joining all input filters

**Kind**: inner method of [<code>optimizeComparing</code>](#module_optimizeComparing)  

| Param | Type |
| --- | --- |
| selectList | <code>Array.&lt;Select&gt;</code> | 

