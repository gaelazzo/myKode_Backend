## Modules

<dl>
<dt><a href="#module_jsDataQuery">jsDataQuery</a></dt>
<dd><p>Provides utility functions to filter data and to create sql condition over database.<br></p>
<p>Every function returns a function f where:<br></p>
<ul>
<li>f ( r, environment )  = true if r matches condition in the given environment</li>
<li>f( r, environment ) = result  evaluated in the given environment if f is a computation function</li>
<li>f.isTrue = true if f is always true</li>
<li>f.isFalse = true if f is always false</li>
<li>f ( r, environment) = undefined if there is no sufficient data to evaluate f</li>
</ul>
null fields and undefined fields are all considered (and returned) as null values (so they compare equal)
f.toSql(formatter, environment)  = a string representing the underlying condition to be applied to a database.
 formatter is used to obtain details about making the expression, see sqlFormatter for an example
 [environment] is the environment into which the expression have to be evaluated</dd>
</dl>

## Classes

<dl>
<dt><a href="#sqlFun">sqlFun</a></dt>
<dd><p>function</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#toSql">toSql(formatter, env)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a SqlFun into a string</p>
</dd>
<dt><a href="#isNullOrUndefined">isNullOrUndefined(o)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if an object is the null or undefined constant</p>
</dd>
<dt><a href="#as">as(fieldName)</a> ⇒ <code><a href="#sqlFun">sqlFun</a></code></dt>
<dd><p>Establish the output name for an expression</p>
</dd>
</dl>

<a name="module_jsDataQuery"></a>

## jsDataQuery
Provides utility functions to filter data and to create sql condition over database.<br>Every function returns a function f where:<br><ul><li>f ( r, environment )  = true if r matches condition in the given environment</li><li>f( r, environment ) = result  evaluated in the given environment if f is a computation function</li><li>f.isTrue = true if f is always true</li><li>f.isFalse = true if f is always false</li><li>f ( r, environment) = undefined if there is no sufficient data to evaluate f</li></ul>null fields and undefined fields are all considered (and returned) as null values (so they compare equal)f.toSql(formatter, environment)  = a string representing the underlying condition to be applied to a database. formatter is used to obtain details about making the expression, see sqlFormatter for an example [environment] is the environment into which the expression have to be evaluated


* [jsDataQuery](#module_jsDataQuery)
    * [~context(environmentVariable)](#module_jsDataQuery..context) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~constant(value)](#module_jsDataQuery..constant) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~calc(expr, r, environment)](#module_jsDataQuery..calc) ⇒ <code>Object</code> \| <code>string</code> \| <code>null</code> \| <code>undefined</code>
    * [~isNull(expr1)](#module_jsDataQuery..isNull) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNotNull(expr1)](#module_jsDataQuery..isNotNull) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~minus(expr1)](#module_jsDataQuery..minus) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~not(expr1)](#module_jsDataQuery..not) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~bitSet(expression, nbit)](#module_jsDataQuery..bitSet) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~bitClear(expression, nbit)](#module_jsDataQuery..bitClear) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~testMask(expr1, mask, val)](#module_jsDataQuery..testMask) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~between(expr1, min, max)](#module_jsDataQuery..between) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~like(expr1, mask)](#module_jsDataQuery..like) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~distinctVal(arr, fieldname)](#module_jsDataQuery..distinctVal) ⇒ <code>Array.&lt;object&gt;</code> \| <code>undefined</code>
    * [~distinctVal(exprList)](#module_jsDataQuery..distinctVal) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isIn(expr1, list)](#module_jsDataQuery..isIn) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNotIn(expr1, list)](#module_jsDataQuery..isNotIn) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~eq(expr1, expr2)](#module_jsDataQuery..eq) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~ne(expr1, expr2)](#module_jsDataQuery..ne) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~lt(expr1, expr2)](#module_jsDataQuery..lt) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~le(expr1, expr2)](#module_jsDataQuery..le) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~gt(expr1, expr2)](#module_jsDataQuery..gt) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~ge(expr1, expr2)](#module_jsDataQuery..ge) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~or(arr)](#module_jsDataQuery..or) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNullOrEq(expr1, expr2)](#module_jsDataQuery..isNullOrEq) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNullOrGt(expr1, expr2)](#module_jsDataQuery..isNullOrGt) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNullOrGe(expr1, expr2)](#module_jsDataQuery..isNullOrGe) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNullOrLt(expr1, expr2)](#module_jsDataQuery..isNullOrLt) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~isNullOrLe(expr1, expr2)](#module_jsDataQuery..isNullOrLe) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~max(expr1)](#module_jsDataQuery..max) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~min(expr1)](#module_jsDataQuery..min) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~substring(expr1, start, len)](#module_jsDataQuery..substring) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~convertToInt(expr1)](#module_jsDataQuery..convertToInt) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~convertToString(expr1, maxLen)](#module_jsDataQuery..convertToString) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~and(arr)](#module_jsDataQuery..and) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~mcmp(keys, values, [alias])](#module_jsDataQuery..mcmp) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~mcmpLike(example, [alias])](#module_jsDataQuery..mcmpLike) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~mcmpEq(example, [alias])](#module_jsDataQuery..mcmpEq) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~sub(expr1, expr2)](#module_jsDataQuery..sub) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~div(expr1, expr2)](#module_jsDataQuery..div) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~concat(values)](#module_jsDataQuery..concat) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~sum(expr1)](#module_jsDataQuery..sum) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~mul(values)](#module_jsDataQuery..mul) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~list(values)](#module_jsDataQuery..list) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~bitwiseNot(expression)](#module_jsDataQuery..bitwiseNot) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~bitwiseAnd(arr)](#module_jsDataQuery..bitwiseAnd) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~bitwiseOr(arr)](#module_jsDataQuery..bitwiseOr) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~bitwiseXor(arr)](#module_jsDataQuery..bitwiseXor) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~modulus(expr1, expr2)](#module_jsDataQuery..modulus) ⇒ [<code>sqlFun</code>](#sqlFun)
    * [~doPar(expr)](#module_jsDataQuery..doPar) ⇒ [<code>sqlFun</code>](#sqlFun)

<a name="module_jsDataQuery..context"></a>

### jsDataQuery~context(environmentVariable) ⇒ [<code>sqlFun</code>](#sqlFun)
Transforms a generic function into a sqlFun, returning a similar function with some additional methods

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| environmentVariable | <code>string</code> \| <code>function</code> | Environment variable path or function |

**Example**  
```js
if environment = {a:1, b:2} and environmentFunction = function (env){return env.a}  context(environmentFunction) applied to environment will return 1
```
<a name="module_jsDataQuery..constant"></a>

### jsDataQuery~constant(value) ⇒ [<code>sqlFun</code>](#sqlFun)
Defines a constant function. The toSql method invokes the formatter.quote function

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f such that f()= k, f.toSql()= formatter.quote(k)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | is a literal |

<a name="module_jsDataQuery..calc"></a>

### jsDataQuery~calc(expr, r, environment) ⇒ <code>Object</code> \| <code>string</code> \| <code>null</code> \| <code>undefined</code>
Evaluates an expression in a given environment

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: <code>Object</code> \| <code>string</code> \| <code>null</code> \| <code>undefined</code> - expr(r) evaluated in the given environment undefined are returned as null constant  

| Param | Type | Description |
| --- | --- | --- |
| expr |  | function representing a generic expression |
| r | <code>object</code> |  |
| environment | <code>Environment</code> |  |

<a name="module_jsDataQuery..isNull"></a>

### jsDataQuery~isNull(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
Check if an expression evaluates to null

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f where f(expr) = true if expr evaluates to null f.toSql() = something like '(EXPR is null)' where EXPR is the sql representation of the given expr  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..isNotNull"></a>

### jsDataQuery~isNotNull(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
Check if an expression does not evaluate to null

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f where f(expr) = true if expr does not evaluate to null f.toSql() = something like '(EXPR is not null)' where EXPR is the sql representation of the given expr  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..minus"></a>

### jsDataQuery~minus(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f where f(r) = - r. r should evaluate into a number  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..not"></a>

### jsDataQuery~not(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f where f(r) = not r. r should evaluate into a boolean  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..bitSet"></a>

### jsDataQuery~bitSet(expression, nbit) ⇒ [<code>sqlFun</code>](#sqlFun)
Check if the nth bit of expression is set

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expression | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| nbit | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..bitClear"></a>

### jsDataQuery~bitClear(expression, nbit) ⇒ [<code>sqlFun</code>](#sqlFun)
Check if the nth bit of expression is not set

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expression | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> | note: this is autofield-ed, so if you can use a field name for it |
| nbit | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..testMask"></a>

### jsDataQuery~testMask(expr1, mask, val) ⇒ [<code>sqlFun</code>](#sqlFun)
check if expr1 & mask === val & mask

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> | note: this is autofield-ed, so if you can use a field name for it |
| mask | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |
| val | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..between"></a>

### jsDataQuery~between(expr1, min, max) ⇒ [<code>sqlFun</code>](#sqlFun)
Check if expr1 evaluates between min and max

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| min | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |
| max | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..like"></a>

### jsDataQuery~like(expr1, mask) ⇒ [<code>sqlFun</code>](#sqlFun)
Checks if expr1 is (sql-like) mask, where mask can contain * and _ characters

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | expr1 note: this is autofield-ed, so if you can use a field name for it |
| mask | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> | mask is a string or a function that evaluates into a string |

**Example**  
```js
like('a','s%') compiles into (a like 's%')       like(const('a'),'s%') compiles into ('a' like 's%')
```
<a name="module_jsDataQuery..distinctVal"></a>

### jsDataQuery~distinctVal(arr, fieldname) ⇒ <code>Array.&lt;object&gt;</code> \| <code>undefined</code>
Finds distinct values of a field

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;object&gt;</code> | 
| fieldname |  | 

<a name="module_jsDataQuery..distinctVal"></a>

### jsDataQuery~distinctVal(exprList) ⇒ [<code>sqlFun</code>](#sqlFun)
Finds distinct values of a list of fields

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| exprList | <code>Array.&lt;(sqlFun\|object)&gt;</code> | 

<a name="module_jsDataQuery..isIn"></a>

### jsDataQuery~isIn(expr1, list) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is in the array list

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| list | <code>Array.&lt;(sqlFun\|object)&gt;</code> | Array or function that evaluates into an array |

<a name="module_jsDataQuery..isNotIn"></a>

### jsDataQuery~isNotIn(expr1, list) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is not in the array list

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| list | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | {Array} Array or function that evaluates into an array |

<a name="module_jsDataQuery..eq"></a>

### jsDataQuery~eq(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 evaluates equal to expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..ne"></a>

### jsDataQuery~ne(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 evaluates different from expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..lt"></a>

### jsDataQuery~lt(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 evaluates less than from expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..le"></a>

### jsDataQuery~le(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 evaluates less than or equal to from expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..gt"></a>

### jsDataQuery~gt(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 evaluates greater than expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..ge"></a>

### jsDataQuery~ge(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 evaluates greater than or equal to expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..or"></a>

### jsDataQuery~or(arr) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if at least one of supplied expression evaluates to a truthy value

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | array or list of expression |

<a name="module_jsDataQuery..isNullOrEq"></a>

### jsDataQuery~isNullOrEq(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is null or equal to expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..isNullOrGt"></a>

### jsDataQuery~isNullOrGt(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is null or greater than expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..isNullOrGe"></a>

### jsDataQuery~isNullOrGe(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is null or greater than or equal to expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Description |
| --- | --- |
| expr1 | note: this is autofield-ed, so if you can use a field name for it |
| expr2 |  |

<a name="module_jsDataQuery..isNullOrLt"></a>

### jsDataQuery~isNullOrLt(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is null or less than expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..isNullOrLe"></a>

### jsDataQuery~isNullOrLe(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if expr1 is null or less than or equal to expr2

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | note: this is autofield-ed, so if you can use a field name for it |
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> |  |

<a name="module_jsDataQuery..max"></a>

### jsDataQuery~max(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
Evaluates the maximum value of an expression in a table. If any undefined is found, return undefined.Null are skipped. If all is null return null

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..min"></a>

### jsDataQuery~min(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
Evaluates the minimum value of an expression in a table. If any undefined is found, return undefined.Null are skipped. If all is null return null

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..substring"></a>

### jsDataQuery~substring(expr1, start, len) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 
| start | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> | 
| len | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> | 

<a name="module_jsDataQuery..convertToInt"></a>

### jsDataQuery~convertToInt(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
Converts a generic expression into an integer

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..convertToString"></a>

### jsDataQuery~convertToString(expr1, maxLen) ⇒ [<code>sqlFun</code>](#sqlFun)
Converts a generic expression into a string

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> |  |
| maxLen | <code>int</code> | maximum string len |

<a name="module_jsDataQuery..and"></a>

### jsDataQuery~and(arr) ⇒ [<code>sqlFun</code>](#sqlFun)
checks if all supplied expression evaluate to truthy values

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | array or list of expression |

<a name="module_jsDataQuery..mcmp"></a>

### jsDataQuery~mcmp(keys, values, [alias]) ⇒ [<code>sqlFun</code>](#sqlFun)
Compares a set of keys of an object with an array of values or with fields of another object values can be an array or an object

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f(r) = true if : case values is an array: r[keys[i]] = values[i] for each i=0..keys.length-1 case values is an object: r[keys[i]] = values[keys[i]] for each i=0..keys.length-1  

| Param | Type |
| --- | --- |
| keys | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;object&gt;</code> | 
| values | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> \| <code>object</code> | 
| [alias] | <code>string</code> | 

<a name="module_jsDataQuery..mcmpLike"></a>

### jsDataQuery~mcmpLike(example, [alias]) ⇒ [<code>sqlFun</code>](#sqlFun)
Compares a set of keys of an object with an array of values or with fields of another object

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f(r) = true if  for each non empty field of r: case field is a string containing a %:  field LIKE example[field] otherwise: field = example[field]  

| Param | Type | Description |
| --- | --- | --- |
| example | <code>object</code> |  |
| [alias] | <code>string</code> | eventually table alias to use in conjunction with example field names |

<a name="module_jsDataQuery..mcmpEq"></a>

### jsDataQuery~mcmpEq(example, [alias]) ⇒ [<code>sqlFun</code>](#sqlFun)
Compares a set of keys of an object with an array of values or with fields of another object

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  
**Returns**: [<code>sqlFun</code>](#sqlFun) - f(r) = true if  for each non empty field of r: case field is null :    field is null otherwise: r[field] = example[field]  

| Param | Type |
| --- | --- |
| example | <code>object</code> | 
| [alias] | <code>string</code> | 

<a name="module_jsDataQuery..sub"></a>

### jsDataQuery~sub(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
returns a functions that does a subtraction

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> | 

<a name="module_jsDataQuery..div"></a>

### jsDataQuery~div(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
returns a functions that does a division

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> | 

<a name="module_jsDataQuery..concat"></a>

### jsDataQuery~concat(values) ⇒ [<code>sqlFun</code>](#sqlFun)
returns a functions that evaluates the concatenation of a list or array of strings given when it is CREATED

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| values | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | 

<a name="module_jsDataQuery..sum"></a>

### jsDataQuery~sum(expr1) ⇒ [<code>sqlFun</code>](#sqlFun)
Evaluates the sum of an array of element given at run time

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="module_jsDataQuery..mul"></a>

### jsDataQuery~mul(values) ⇒ [<code>sqlFun</code>](#sqlFun)
returns a functions that evaluates the multiply of a list or array of valuesIf some operand is 0, returns the always 0 function

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| values | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | 

<a name="module_jsDataQuery..list"></a>

### jsDataQuery~list(values) ⇒ [<code>sqlFun</code>](#sqlFun)
returns an array list from the parameters if all the parameters are legal.Oterwise it returns undefined or null.

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| values | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | 

<a name="module_jsDataQuery..bitwiseNot"></a>

### jsDataQuery~bitwiseNot(expression) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| expression | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> \| <code>function</code> | note: this is auto-field, so if you can use a field name for it |

<a name="module_jsDataQuery..bitwiseAnd"></a>

### jsDataQuery~bitwiseAnd(arr) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | array or list of expression |

<a name="module_jsDataQuery..bitwiseOr"></a>

### jsDataQuery~bitwiseOr(arr) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | array or list of expression |

<a name="module_jsDataQuery..bitwiseXor"></a>

### jsDataQuery~bitwiseXor(arr) ⇒ [<code>sqlFun</code>](#sqlFun)
**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type | Description |
| --- | --- | --- |
| arr | [<code>Array.&lt;sqlFun&gt;</code>](#sqlFun) \| <code>Array.&lt;object&gt;</code> | array or list of expression |

<a name="module_jsDataQuery..modulus"></a>

### jsDataQuery~modulus(expr1, expr2) ⇒ [<code>sqlFun</code>](#sqlFun)
returns a functions that does the modulus

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr1 | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 
| expr2 | [<code>sqlFun</code>](#sqlFun) \| <code>object</code> | 

<a name="module_jsDataQuery..doPar"></a>

### jsDataQuery~doPar(expr) ⇒ [<code>sqlFun</code>](#sqlFun)
returns the result of internal expression

**Kind**: inner method of [<code>jsDataQuery</code>](#module_jsDataQuery)  

| Param | Type |
| --- | --- |
| expr | [<code>sqlFun</code>](#sqlFun) \| <code>string</code> \| <code>object</code> | 

<a name="sqlFun"></a>

## sqlFun
function

**Kind**: global class  
**Access**: public  
<a name="new_sqlFun_new"></a>

### new sqlFun()
Function with ability to be converted to sql. When invoked gives a result depending on the arguments.

<a name="toSql"></a>

## toSql(formatter, env) ⇒ <code>string</code>
Converts a SqlFun into a string

**Kind**: global function  
**Returns**: <code>string</code> - //the sql representation of the expression  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| formatter | <code>sqlFormatter</code> | used to obtain details about making the expression,      see sqlFormatter for an example |
| env | <code>Environment</code> | is the environment into which the expression have to be evaluated |

<a name="isNullOrUndefined"></a>

## isNullOrUndefined(o) ⇒ <code>boolean</code>
Check if an object is the null or undefined constant

**Kind**: global function  
**Returns**: <code>boolean</code> - true if o is null or undefined  

| Param | Type |
| --- | --- |
| o | [<code>sqlFun</code>](#sqlFun) \| <code>undefined</code> \| <code>null</code> \| <code>object</code> | 

<a name="as"></a>

## as(fieldName) ⇒ [<code>sqlFun</code>](#sqlFun)
Establish the output name for an expression

**Kind**: global function  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 

