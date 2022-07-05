<a name="module_sqlFormatter"></a>

## sqlFormatter
provides formatting facilities for Microsoft Sql Server query creation


* [sqlFormatter](#module_sqlFormatter)
    * [~sqlFormatter](#module_sqlFormatter..sqlFormatter)
        * [new sqlFormatter()](#new_module_sqlFormatter..sqlFormatter_new)
    * [~isEmptyCondition(cond)](#module_sqlFormatter..isEmptyCondition) ⇒ <code>boolean</code>
    * [~quote(v, [noSurroundQuotes])](#module_sqlFormatter..quote) ⇒ <code>string</code>
    * [~toSql(v, context)](#module_sqlFormatter..toSql) ⇒ <code>string</code>
    * [~conditionToSql(cond, context)](#module_sqlFormatter..conditionToSql) ⇒ <code>string</code>
    * [~doPar(expr)](#module_sqlFormatter..doPar) ⇒ <code>string</code>
    * [~isNull(o, context)](#module_sqlFormatter..isNull) ⇒ <code>string</code>
    * [~isNull(o, context)](#module_sqlFormatter..isNull) ⇒ <code>string</code>
    * [~eq(a, b, context)](#module_sqlFormatter..eq) ⇒ <code>string</code>
    * [~ne(a, b, context)](#module_sqlFormatter..ne) ⇒ <code>string</code>
    * [~gt(a, b, context)](#module_sqlFormatter..gt) ⇒ <code>string</code>
    * [~min(expr, context)](#module_sqlFormatter..min) ⇒ <code>string</code>
    * [~max(expr, context)](#module_sqlFormatter..max) ⇒ <code>string</code>
    * [~substring(expr, start, len, context)](#module_sqlFormatter..substring) ⇒ <code>string</code>
    * [~convertToInt(expr, context)](#module_sqlFormatter..convertToInt) ⇒ <code>string</code>
    * [~convertToString(expr, maxLen, context)](#module_sqlFormatter..convertToString) ⇒ <code>string</code>
    * [~ge(a, b, context)](#module_sqlFormatter..ge) ⇒ <code>string</code>
    * [~lt(a, b, context)](#module_sqlFormatter..lt) ⇒ <code>string</code>
    * [~le(a, b, context)](#module_sqlFormatter..le) ⇒ <code>string</code>
    * [~bitSet(a, b, context)](#module_sqlFormatter..bitSet) ⇒ <code>string</code>
    * [~bitClear(a, b, context)](#module_sqlFormatter..bitClear) ⇒ <code>string</code>
    * [~not(a, context)](#module_sqlFormatter..not) ⇒ <code>string</code>
    * [~minus(a, context)](#module_sqlFormatter..minus) ⇒ <code>string</code>
    * [~joinAnd(arr)](#module_sqlFormatter..joinAnd) ⇒ <code>string</code>
    * [~joinOr(arr)](#module_sqlFormatter..joinOr) ⇒ <code>string</code>
    * [~add(arr, context)](#module_sqlFormatter..add) ⇒ <code>string</code>
    * [~mul(arr, context)](#module_sqlFormatter..mul) ⇒ <code>string</code>
    * [~concat(arr, context)](#module_sqlFormatter..concat) ⇒ <code>string</code>
    * [~sub(a, b, context)](#module_sqlFormatter..sub) ⇒ <code>string</code>
    * [~div(a, b, context)](#module_sqlFormatter..div) ⇒ <code>string</code>
    * [~sum(expr, context)](#module_sqlFormatter..sum) ⇒ <code>string</code>
    * [~sum(exprList, context)](#module_sqlFormatter..sum) ⇒ <code>string</code>
    * [~isIn(expr, list, context)](#module_sqlFormatter..isIn) ⇒ <code>string</code>
    * [~testMask(expr, mask, val, context)](#module_sqlFormatter..testMask) ⇒ <code>string</code>
    * [~between(expr, min, max, context)](#module_sqlFormatter..between) ⇒ <code>string</code>
    * [~like(expr, mask, context)](#module_sqlFormatter..like) ⇒ <code>string</code>
    * [~getObject(s, sqlType,)](#module_sqlFormatter..getObject) ⇒ <code>object</code>

<a name="module_sqlFormatter..sqlFormatter"></a>

### sqlFormatter~sqlFormatter
**Kind**: inner class of [<code>sqlFormatter</code>](#module_sqlFormatter)  
<a name="new_module_sqlFormatter..sqlFormatter_new"></a>

#### new sqlFormatter()
provides formatting facilities for Microsoft Sql Server query creation

<a name="module_sqlFormatter..isEmptyCondition"></a>

### sqlFormatter~isEmptyCondition(cond) ⇒ <code>boolean</code>
Check if obj is not a real condition, giving true if it is null, undefined or empty string

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| cond | <code>string</code> \| <code>sqlFun</code> | 

<a name="module_sqlFormatter..quote"></a>

### sqlFormatter~quote(v, [noSurroundQuotes]) ⇒ <code>string</code>
Gives the sql string representation of an object

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>object</code> | literal constant |
| [noSurroundQuotes] |  | if true strings are not surrounded with quotes |

<a name="module_sqlFormatter..toSql"></a>

### sqlFormatter~toSql(v, context) ⇒ <code>string</code>
Converts a function into a sql expression. The result is meant to be used as conditional expression in sql WHERE clauses. Usually you will not use this function, but instead you will use the toSql method of dataquery objects. This can be used to manage slightly more generic objects like null values, undefined, arrays. Arrays are converted into lists.

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | function to be converted |
| context | <code>Environment</code> | context into which the expression has to be evaluated |

**Example**  
```js
eq('a',1) is converted into 'a=1' eq('a','1') is converted into 'a=\'1\'' i.e. strings are quoted when evaluated [1,2,3] is converted into (1,2,3)
```
<a name="module_sqlFormatter..conditionToSql"></a>

### sqlFormatter~conditionToSql(cond, context) ⇒ <code>string</code>
Get the string filter from a sqlFunction

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| cond | <code>sqlFun</code> \| <code>string</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..doPar"></a>

### sqlFormatter~doPar(expr) ⇒ <code>string</code>
Surround expression in parenthesis

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>string</code> | 

<a name="module_sqlFormatter..isNull"></a>

### sqlFormatter~isNull(o, context) ⇒ <code>string</code>
get the 'is null' condition over object o

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| o | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
isnull('f') would be converted as 'f is null'
```
<a name="module_sqlFormatter..isNull"></a>

### sqlFormatter~isNull(o, context) ⇒ <code>string</code>
get the 'is not null' condition over object o

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| o | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
isNotnull('f') would be converted as 'f is not null'
```
<a name="module_sqlFormatter..eq"></a>

### sqlFormatter~eq(a, b, context) ⇒ <code>string</code>
gets the 'object are equal' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..ne"></a>

### sqlFormatter~ne(a, b, context) ⇒ <code>string</code>
gets the 'object are not equal' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..gt"></a>

### sqlFormatter~gt(a, b, context) ⇒ <code>string</code>
gets the 'a > b' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
gt('a','b') would be converted into 'a>b'
```
<a name="module_sqlFormatter..min"></a>

### sqlFormatter~min(expr, context) ⇒ <code>string</code>
gets the aggregates of mimimum value

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..max"></a>

### sqlFormatter~max(expr, context) ⇒ <code>string</code>
gets the aggregates of max value

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..substring"></a>

### sqlFormatter~substring(expr, start, len, context) ⇒ <code>string</code>
gets a substring from the expression

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| start | <code>number</code> | 
| len | <code>number</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..convertToInt"></a>

### sqlFormatter~convertToInt(expr, context) ⇒ <code>string</code>
Convert an expression into integer

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..convertToString"></a>

### sqlFormatter~convertToString(expr, maxLen, context) ⇒ <code>string</code>
Convert an expression into integer

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>string</code> \| <code>null</code> \| <code>undefined</code> | 
| maxLen | <code>number</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..ge"></a>

### sqlFormatter~ge(a, b, context) ⇒ <code>string</code>
gets the 'a >= b' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
ge('a','b') would be converted into 'a>=b'
```
<a name="module_sqlFormatter..lt"></a>

### sqlFormatter~lt(a, b, context) ⇒ <code>string</code>
gets the 'a < b' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
lt('a','b') would be converted into 'a<b'
```
<a name="module_sqlFormatter..le"></a>

### sqlFormatter~le(a, b, context) ⇒ <code>string</code>
gets the 'a <= b' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
le('a','b') would be converted into 'a<=b'
```
<a name="module_sqlFormatter..bitSet"></a>

### sqlFormatter~bitSet(a, b, context) ⇒ <code>string</code>
gets the 'test if Nth bit is set' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
bitSet('a','3') would be converted into '(a&(1<<3))<>0'
```
<a name="module_sqlFormatter..bitClear"></a>

### sqlFormatter~bitClear(a, b, context) ⇒ <code>string</code>
gets the 'test if Nth bit is not set' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
bitClear('a','3') would be converted into '(a&(1<<3))=0'
```
<a name="module_sqlFormatter..not"></a>

### sqlFormatter~not(a, context) ⇒ <code>string</code>
gets the 'not expression' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
not('a') would be converted into 'not(a)'
```
<a name="module_sqlFormatter..minus"></a>

### sqlFormatter~minus(a, context) ⇒ <code>string</code>
gets the 'not expression' representation for the db

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>Array</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
-('a') would be converted into '-a'
```
<a name="module_sqlFormatter..joinAnd"></a>

### sqlFormatter~joinAnd(arr) ⇒ <code>string</code>
gets the result of boolean "and" between an array of condition

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;string&gt;</code> | 

**Example**  
```js
joinAnd(['a','b','c']) would give 'a and b and c'
```
<a name="module_sqlFormatter..joinOr"></a>

### sqlFormatter~joinOr(arr) ⇒ <code>string</code>
gets the result of boolean "or" between an array of condition

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;string&gt;</code> | 

**Example**  
```js
joinOr(['a','b','c']) would give 'a or b or c'
```
<a name="module_sqlFormatter..add"></a>

### sqlFormatter~add(arr, context) ⇒ <code>string</code>
gets the result of the sum of an array of expression

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;(sqlFun\|Array\|object\|null\|undefined)&gt;</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
add(['a','b','c']) would give 'a+b+c'
```
<a name="module_sqlFormatter..mul"></a>

### sqlFormatter~mul(arr, context) ⇒ <code>string</code>
gets the result of the multiply of an array of expression

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;(sqlFun\|Array\|object\|null\|undefined)&gt;</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
mul(['a','b','c']) would give 'a*b*c'
```
<a name="module_sqlFormatter..concat"></a>

### sqlFormatter~concat(arr, context) ⇒ <code>string</code>
gets the result of the sum of an array of expression

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;(sqlFun\|Array\|object\|null\|undefined)&gt;</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
add(['a','b','c']) would give 'a+b+c'
```
<a name="module_sqlFormatter..sub"></a>

### sqlFormatter~sub(a, b, context) ⇒ <code>string</code>
gets the expression a-b

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..div"></a>

### sqlFormatter~div(a, b, context) ⇒ <code>string</code>
gets the expression a/b

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| a | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| b | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..sum"></a>

### sqlFormatter~sum(expr, context) ⇒ <code>string</code>
gets the expression sum(expr)

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..sum"></a>

### sqlFormatter~sum(exprList, context) ⇒ <code>string</code>
gets the expression distinct expr1, expr2,..

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| exprList | <code>Array.&lt;(sqlFun\|object\|null\|undefined)&gt;</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..isIn"></a>

### sqlFormatter~isIn(expr, list, context) ⇒ <code>string</code>
gets the 'elements belongs to list' sql condition

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| list | <code>Array.&lt;(sqlFun\|object\|null\|undefined)&gt;</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
isIn('el',[1,2,3,4]) would be compiled into 'el in (1,2,3,4)'
```
<a name="module_sqlFormatter..testMask"></a>

### sqlFormatter~testMask(expr, mask, val, context) ⇒ <code>string</code>
get the '(expr (bitwise and) testMask) equal to val ' sql condition

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| mask | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| val | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

**Example**  
```js
testMask('a',5,1) would give '(a &  5) = 1'
```
<a name="module_sqlFormatter..between"></a>

### sqlFormatter~between(expr, min, max, context) ⇒ <code>string</code>
get the 'expr between min and max' sql condition

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  
**Access**: public  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| min | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| max | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..like"></a>

### sqlFormatter~like(expr, mask, context) ⇒ <code>string</code>
gets the 'expression like mask' sql condition

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type |
| --- | --- |
| expr | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| mask | <code>sqlFun</code> \| <code>object</code> \| <code>null</code> \| <code>undefined</code> | 
| context | <code>Environment</code> | 

<a name="module_sqlFormatter..getObject"></a>

### sqlFormatter~getObject(s, sqlType,) ⇒ <code>object</code>
Get object from a string, assuming that the strings represents a given sql type

**Kind**: inner method of [<code>sqlFormatter</code>](#module_sqlFormatter)  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>string</code> |  |
| sqlType, | <code>string</code> | one of the db specific allowed |

