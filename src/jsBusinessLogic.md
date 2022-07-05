<a name="module_jsBusinessLogic"></a>

## jsBusinessLogic
Manages inviocation of business logic


* [jsBusinessLogic](#module_jsBusinessLogic)
    * [~BusinessMessage](#module_jsBusinessLogic..BusinessMessage) ⇐ <code>BasicMessage</code>
        * [new BusinessMessage()](#new_module_jsBusinessLogic..BusinessMessage_new)
        * [.openSubstitutions](#module_jsBusinessLogic..BusinessMessage+openSubstitutions) : <code>Array.&lt;OneSubst&gt;</code>
        * [.getParameter(focusedRow, colName, msgTable, fromTable)](#module_jsBusinessLogic..BusinessMessage+getParameter) ⇒ <code>string</code>
        * [.compileParameter(rowChange, expr)](#module_jsBusinessLogic..BusinessMessage+compileParameter)
        * [.findPostingColumn(t, field)](#module_jsBusinessLogic..BusinessMessage+findPostingColumn) ⇒ <code>string</code> \| <code>null</code>
            * [~c](#module_jsBusinessLogic..BusinessMessage+findPostingColumn..c) : <code>DataColumn</code>
    * [~BusinessLogic](#module_jsBusinessLogic..BusinessLogic)
        * [new BusinessLogic(context, rowChanges)](#new_module_jsBusinessLogic..BusinessLogic_new)
        * [.getFilterForRules()](#module_jsBusinessLogic..BusinessLogic+getFilterForRules) ⇒ <code>jsDataQuery</code>
        * [.getProcName(r, post)](#module_jsBusinessLogic..BusinessLogic+getProcName) ⇒ <code>string</code>
        * [.opCode(r)](#module_jsBusinessLogic..BusinessLogic+opCode) ⇒ <code>string</code>
        * [.getProcFilter(r, post)](#module_jsBusinessLogic..BusinessLogic+getProcFilter) ⇒ <code>sqlFun</code>
            * [~row](#module_jsBusinessLogic..BusinessLogic+getProcFilter..row)
        * [.createAuditDataSet()](#module_jsBusinessLogic..BusinessLogic+createAuditDataSet) ⇒ <code>DataSet</code>
        * [.getRules(rowChanges)](#module_jsBusinessLogic..BusinessLogic+getRules) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
        * [.getChecks(result, conn, post)](#module_jsBusinessLogic..BusinessLogic+getChecks) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
        * [.getChecksAsync(result, conn, post)](#module_jsBusinessLogic..BusinessLogic+getChecksAsync) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
        * [.refineMessages_evaluateQueries(d, results)](#module_jsBusinessLogic..BusinessLogic+refineMessages_evaluateQueries) ⇒ <code>Deferred</code>
        * [.refineMessages_groupQueries(results, maxQueryLength)](#module_jsBusinessLogic..BusinessLogic+refineMessages_groupQueries) ⇒ <code>Array.&lt;SubstGroup&gt;</code>
        * [.refineMessages_executeQueries(subs)](#module_jsBusinessLogic..BusinessLogic+refineMessages_executeQueries)
        * [.refineMessages_applySubstitutions(subs, msgs)](#module_jsBusinessLogic..BusinessLogic+refineMessages_applySubstitutions) ⇒ <code>\*</code>
        * [.refineMessages(conn, results)](#module_jsBusinessLogic..BusinessLogic+refineMessages) ⇒ <code>Promise.&lt;Array.&lt;BusinessMessage&gt;&gt;</code>
        * [.getQuery(fromT, fromR, toTable, cols)](#module_jsBusinessLogic..BusinessLogic+getQuery) ⇒ <code>jsDataQuery</code>
        * [.execCheckBatch(conn, checks, cmd, result, post)](#module_jsBusinessLogic..BusinessLogic+execCheckBatch) ⇒ <code>\*</code>
        * [.addMessages(rowChange, bits, result, post)](#module_jsBusinessLogic..BusinessLogic+addMessages) ⇒ <code>\*</code>
        * [.filterParameters(r, post)](#module_jsBusinessLogic..BusinessLogic+filterParameters)
        * [.isTempAutoIncrement(r, colName)](#module_jsBusinessLogic..BusinessLogic+isTempAutoIncrement)
        * [.parametersFor(auditParameters, rc, post)](#module_jsBusinessLogic..BusinessLogic+parametersFor) ⇒ <code>Array.&lt;{name:string, value}&gt;</code>
    * [~OneSubst](#module_jsBusinessLogic..OneSubst)
        * [new OneSubst(field, tableName, original, fromTable)](#new_module_jsBusinessLogic..OneSubst_new)
        * [.error](#module_jsBusinessLogic..OneSubst+error)
        * [.original](#module_jsBusinessLogic..OneSubst+original)
        * [.newValue](#module_jsBusinessLogic..OneSubst+newValue)
        * [.fromTable](#module_jsBusinessLogic..OneSubst+fromTable)
        * [.field](#module_jsBusinessLogic..OneSubst+field)
        * [.queryString](#module_jsBusinessLogic..OneSubst+queryString)
        * [.query](#module_jsBusinessLogic..OneSubst+query)
        * [.queryCols](#module_jsBusinessLogic..OneSubst+queryCols)
        * [.setQuery(query)](#module_jsBusinessLogic..OneSubst+setQuery)
        * [.setCols(cols)](#module_jsBusinessLogic..OneSubst+setCols)
    * [~SubstGroup](#module_jsBusinessLogic..SubstGroup)
        * [new SubstGroup(tableName)](#new_module_jsBusinessLogic..SubstGroup_new)
        * [.tableName](#module_jsBusinessLogic..SubstGroup+tableName)
        * [.query](#module_jsBusinessLogic..SubstGroup+query)
        * [.querySet](#module_jsBusinessLogic..SubstGroup+querySet)
        * [.queryCols](#module_jsBusinessLogic..SubstGroup+queryCols)
        * [.data](#module_jsBusinessLogic..SubstGroup+data)
        * [.mergeQuery(subst, maxQueryLength)](#module_jsBusinessLogic..SubstGroup+mergeQuery) ⇒ <code>boolean</code>
    * [~RowChange](#module_jsBusinessLogic..RowChange)
        * [new RowChange(nChecks, r, audits, varName, colName)](#new_module_jsBusinessLogic..RowChange_new)
        * [.r](#module_jsBusinessLogic..RowChange+r)
        * [.tableName](#module_jsBusinessLogic..RowChange+tableName)
        * [.getRelated(tableName)](#module_jsBusinessLogic..RowChange+getRelated) ⇒ <code>DataRow</code> \| <code>undefined</code>
        * [.searchRelated(tableName)](#module_jsBusinessLogic..RowChange+searchRelated) ⇒ <code>\*</code>
        * [._getRelatedRowExactTable(relatedTableName)](#module_jsBusinessLogic..RowChange+_getRelatedRowExactTable) ⇒ <code>ObjectRow</code> \| <code>null</code>
        * [._getRelatedRow(relatedTableName)](#module_jsBusinessLogic..RowChange+_getRelatedRow) ⇒ <code>ObjectRow</code> \| <code>null</code>
    * [~PostData](#module_jsBusinessLogic..PostData) ⇐ <code>PostData</code>
        * [new PostData(context)](#new_module_jsBusinessLogic..PostData_new)
    * [~Deferred](#module_jsBusinessLogic..Deferred) : <code>function</code>
    * [~getParserparam {string} msg()](#module_jsBusinessLogic..getParserparam {string} msg) ⇒ <code>MsgParser</code>
    * [~fromAsyncToDeferred(f)](#module_jsBusinessLogic..fromAsyncToDeferred)
    * [~getBusinessLogic(context, rowChanges)](#module_jsBusinessLogic..getBusinessLogic) ⇒ <code>BusinessLogicResult</code>

<a name="module_jsBusinessLogic..BusinessMessage"></a>

### jsBusinessLogic~BusinessMessage ⇐ <code>BasicMessage</code>
**Kind**: inner class of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  
**Extends**: <code>BasicMessage</code>  

* [~BusinessMessage](#module_jsBusinessLogic..BusinessMessage) ⇐ <code>BasicMessage</code>
    * [new BusinessMessage()](#new_module_jsBusinessLogic..BusinessMessage_new)
    * [.openSubstitutions](#module_jsBusinessLogic..BusinessMessage+openSubstitutions) : <code>Array.&lt;OneSubst&gt;</code>
    * [.getParameter(focusedRow, colName, msgTable, fromTable)](#module_jsBusinessLogic..BusinessMessage+getParameter) ⇒ <code>string</code>
    * [.compileParameter(rowChange, expr)](#module_jsBusinessLogic..BusinessMessage+compileParameter)
    * [.findPostingColumn(t, field)](#module_jsBusinessLogic..BusinessMessage+findPostingColumn) ⇒ <code>string</code> \| <code>null</code>
        * [~c](#module_jsBusinessLogic..BusinessMessage+findPostingColumn..c) : <code>DataColumn</code>

<a name="new_module_jsBusinessLogic..BusinessMessage_new"></a>

#### new BusinessMessage()
BusinessMessageRepresents a message connected to a changed (modified, added, deleted) row


| Param | Type | Description |
| --- | --- | --- |
| [options.rowChange] | <code>RowChange</code> | row to check |
| [options.r] | <code>DataRow</code> | DataRow to check, needed if rowChange is not provided |
| options.post | <code>boolean</code> | true is is a post commit data check * @param {string} options.toCompile |
| options.shortMsg | <code>string</code> | rule name, audit["title"] |
| options.longMsg | <code>string</code> | complete message, used for merging , audit["message"] compiled |
| [options.idRule] | <code>string</code> | id of the business rule, audit["idaudit"], means to be the b.r. "group code" |
| [options.idDetail] | <code>int</code> | id of the detail for the business rule, audit["idcheck"], b.r. number |
| options.environment | <code>Environment</code> |  |
| options.canIgnore | <code>boolean</code> | true if it is a warning, false if it is an unrecoverable error (audit["severity"].toLowerCase()==="w") |

<a name="module_jsBusinessLogic..BusinessMessage+openSubstitutions"></a>

#### businessMessage.openSubstitutions : <code>Array.&lt;OneSubst&gt;</code>
**Kind**: instance property of [<code>BusinessMessage</code>](#module_jsBusinessLogic..BusinessMessage)  
<a name="module_jsBusinessLogic..BusinessMessage+getParameter"></a>

#### businessMessage.getParameter(focusedRow, colName, msgTable, fromTable) ⇒ <code>string</code>
Gets parameter from row or delays evaluation adding an open substitution to the openSubstitutions list

**Kind**: instance method of [<code>BusinessMessage</code>](#module_jsBusinessLogic..BusinessMessage)  

| Param | Type |
| --- | --- |
| focusedRow | <code>DataRow</code> | 
| colName | <code>string</code> | 
| msgTable | <code>string</code> | 
| fromTable | <code>string</code> | 

<a name="module_jsBusinessLogic..BusinessMessage+compileParameter"></a>

#### businessMessage.compileParameter(rowChange, expr)
Translate a Parameter name into a value, taking data from A and related. If it is not possible to extract it, pushes a new open substitution to the openSubstitutions array and returns the uncompiled expression

**Kind**: instance method of [<code>BusinessMessage</code>](#module_jsBusinessLogic..BusinessMessage)  

| Param | Type |
| --- | --- |
| rowChange | <code>RowChange</code> | 
| expr | <code>string</code> | 

<a name="module_jsBusinessLogic..BusinessMessage+findPostingColumn"></a>

#### businessMessage.findPostingColumn(t, field) ⇒ <code>string</code> \| <code>null</code>
Evaluates the column corresponding to a db field

**Kind**: instance method of [<code>BusinessMessage</code>](#module_jsBusinessLogic..BusinessMessage)  

| Param | Type |
| --- | --- |
| t | <code>DataTable</code> | 
| field | <code>string</code> | 

<a name="module_jsBusinessLogic..BusinessMessage+findPostingColumn..c"></a>

##### findPostingColumn~c : <code>DataColumn</code>
**Kind**: inner property of [<code>findPostingColumn</code>](#module_jsBusinessLogic..BusinessMessage+findPostingColumn)  
<a name="module_jsBusinessLogic..BusinessLogic"></a>

### jsBusinessLogic~BusinessLogic
BusinessLogic

**Kind**: inner class of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  

* [~BusinessLogic](#module_jsBusinessLogic..BusinessLogic)
    * [new BusinessLogic(context, rowChanges)](#new_module_jsBusinessLogic..BusinessLogic_new)
    * [.getFilterForRules()](#module_jsBusinessLogic..BusinessLogic+getFilterForRules) ⇒ <code>jsDataQuery</code>
    * [.getProcName(r, post)](#module_jsBusinessLogic..BusinessLogic+getProcName) ⇒ <code>string</code>
    * [.opCode(r)](#module_jsBusinessLogic..BusinessLogic+opCode) ⇒ <code>string</code>
    * [.getProcFilter(r, post)](#module_jsBusinessLogic..BusinessLogic+getProcFilter) ⇒ <code>sqlFun</code>
        * [~row](#module_jsBusinessLogic..BusinessLogic+getProcFilter..row)
    * [.createAuditDataSet()](#module_jsBusinessLogic..BusinessLogic+createAuditDataSet) ⇒ <code>DataSet</code>
    * [.getRules(rowChanges)](#module_jsBusinessLogic..BusinessLogic+getRules) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
    * [.getChecks(result, conn, post)](#module_jsBusinessLogic..BusinessLogic+getChecks) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
    * [.getChecksAsync(result, conn, post)](#module_jsBusinessLogic..BusinessLogic+getChecksAsync) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
    * [.refineMessages_evaluateQueries(d, results)](#module_jsBusinessLogic..BusinessLogic+refineMessages_evaluateQueries) ⇒ <code>Deferred</code>
    * [.refineMessages_groupQueries(results, maxQueryLength)](#module_jsBusinessLogic..BusinessLogic+refineMessages_groupQueries) ⇒ <code>Array.&lt;SubstGroup&gt;</code>
    * [.refineMessages_executeQueries(subs)](#module_jsBusinessLogic..BusinessLogic+refineMessages_executeQueries)
    * [.refineMessages_applySubstitutions(subs, msgs)](#module_jsBusinessLogic..BusinessLogic+refineMessages_applySubstitutions) ⇒ <code>\*</code>
    * [.refineMessages(conn, results)](#module_jsBusinessLogic..BusinessLogic+refineMessages) ⇒ <code>Promise.&lt;Array.&lt;BusinessMessage&gt;&gt;</code>
    * [.getQuery(fromT, fromR, toTable, cols)](#module_jsBusinessLogic..BusinessLogic+getQuery) ⇒ <code>jsDataQuery</code>
    * [.execCheckBatch(conn, checks, cmd, result, post)](#module_jsBusinessLogic..BusinessLogic+execCheckBatch) ⇒ <code>\*</code>
    * [.addMessages(rowChange, bits, result, post)](#module_jsBusinessLogic..BusinessLogic+addMessages) ⇒ <code>\*</code>
    * [.filterParameters(r, post)](#module_jsBusinessLogic..BusinessLogic+filterParameters)
    * [.isTempAutoIncrement(r, colName)](#module_jsBusinessLogic..BusinessLogic+isTempAutoIncrement)
    * [.parametersFor(auditParameters, rc, post)](#module_jsBusinessLogic..BusinessLogic+parametersFor) ⇒ <code>Array.&lt;{name:string, value}&gt;</code>

<a name="new_module_jsBusinessLogic..BusinessLogic_new"></a>

#### new BusinessLogic(context, rowChanges)
Manages business logic invocation


| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| rowChanges | <code>Array.&lt;ObjectRow&gt;</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+getFilterForRules"></a>

#### businessLogic.getFilterForRules() ⇒ <code>jsDataQuery</code>
**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  
<a name="module_jsBusinessLogic..BusinessLogic+getProcName"></a>

#### businessLogic.getProcName(r, post) ⇒ <code>string</code>
Get stored procedure name to be called to check r audits

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| post | <code>boolean</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+opCode"></a>

#### businessLogic.opCode(r) ⇒ <code>string</code>
Gives a code for operation being applied to r

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| r | <code>DataRow</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+getProcFilter"></a>

#### businessLogic.getProcFilter(r, post) ⇒ <code>sqlFun</code>
calculate a filter to obtain rule parameters

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| post | <code>boolean</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+getProcFilter..row"></a>

##### getProcFilter~row
{DataTable

**Kind**: inner property of [<code>getProcFilter</code>](#module_jsBusinessLogic..BusinessLogic+getProcFilter)  
<a name="module_jsBusinessLogic..BusinessLogic+createAuditDataSet"></a>

#### businessLogic.createAuditDataSet() ⇒ <code>DataSet</code>
Creates a dataset to read db checks

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  
<a name="module_jsBusinessLogic..BusinessLogic+getRules"></a>

#### businessLogic.getRules(rowChanges) ⇒ <code>Deferred.&lt;DataSet&gt;</code>
Gets necessary rules from a database in order to save a set of row change. This can ben invoked before the start of a transaction.

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| rowChanges | <code>Array.&lt;ObjectRow&gt;</code> | changes made in memory |

<a name="module_jsBusinessLogic..BusinessLogic+getChecks"></a>

#### businessLogic.getChecks(result, conn, post) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
Evaluates a series of messages

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| result | <code>BusinessLogicResult</code> |  |
| conn | <code>DataAccess</code> | Current connection having the transaction attached |
| post | <code>boolean</code> |  |

<a name="module_jsBusinessLogic..BusinessLogic+getChecksAsync"></a>

#### businessLogic.getChecksAsync(result, conn, post) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
Evaluates a series of messages

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| result | <code>BusinessLogicResult</code> |  |
| conn | <code>DataAccess</code> | Current connection having the transaction attached |
| post | <code>boolean</code> |  |

<a name="module_jsBusinessLogic..BusinessLogic+refineMessages_evaluateQueries"></a>

#### businessLogic.refineMessages\_evaluateQueries(d, results) ⇒ <code>Deferred</code>
Evaluate queries for business messages open substitutions calling setQuery and setCols

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| d | <code>DataSet</code> | 
| results | <code>Array.&lt;BusinessMessage&gt;</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+refineMessages_groupQueries"></a>

#### businessLogic.refineMessages\_groupQueries(results, maxQueryLength) ⇒ <code>Array.&lt;SubstGroup&gt;</code>
Group all queries into SubstGroup

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array.&lt;BusinessMessage&gt;</code> |  |
| maxQueryLength | <code>int</code> | max len for queries |

<a name="module_jsBusinessLogic..BusinessLogic+refineMessages_executeQueries"></a>

#### businessLogic.refineMessages\_executeQueries(subs)
Execute queries stored in grouped substitutions

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| subs | <code>Array.&lt;SubstGroup&gt;</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+refineMessages_applySubstitutions"></a>

#### businessLogic.refineMessages\_applySubstitutions(subs, msgs) ⇒ <code>\*</code>
Apply substitutions basing on data got in subs

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| subs | <code>Array.&lt;SubstGroup&gt;</code> | 
| msgs | <code>Array.&lt;BusinessMessage&gt;</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+refineMessages"></a>

#### businessLogic.refineMessages(conn, results) ⇒ <code>Promise.&lt;Array.&lt;BusinessMessage&gt;&gt;</code>
Reads data from db in order to compile messages. Tries to optimize db access performing as little reads as possible

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| results | <code>Array.&lt;BusinessMessage&gt;</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+getQuery"></a>

#### businessLogic.getQuery(fromT, fromR, toTable, cols) ⇒ <code>jsDataQuery</code>
Evaluates a jsDataQuery to read data of toTable from databaseFromT is a table while toTable could be a view, so could not have a primary key

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| fromT | <code>DataTable</code> |  |
| fromR | <code>DataRow</code> |  |
| toTable | <code>DataTable</code> |  |
| cols | <code>Array.&lt;string&gt;</code> | key columns  and eventually  ayear field if it belongs to table columns |

<a name="module_jsBusinessLogic..BusinessLogic+execCheckBatch"></a>

#### businessLogic.execCheckBatch(conn, checks, cmd, result, post) ⇒ <code>\*</code>
Executes a batch and adds messages to results

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| conn | <code>DataAccess</code> |  |
| checks | <code>Array.&lt;RowChange&gt;</code> |  |
| cmd | <code>string</code> |  |
| result | <code>BusinessLogicResult</code> | used to push found errors |
| post | <code>boolean</code> |  |

<a name="module_jsBusinessLogic..BusinessLogic+addMessages"></a>

#### businessLogic.addMessages(rowChange, bits, result, post) ⇒ <code>\*</code>
Takes error messages and append them to results

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type | Description |
| --- | --- | --- |
| rowChange | <code>RowChange</code> |  |
| bits | <code>string</code> | 01 representation of sp result |
| result | <code>BusinessLogicResult</code> | set, messages are added to this list |
| post | <code>boolean</code> | true if post message |

<a name="module_jsBusinessLogic..BusinessLogic+filterParameters"></a>

#### businessLogic.filterParameters(r, post)
Evaluates the filter to obtain parameters for a audit call

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| r | <code>DataRow</code> | 
| post | <code>boolean</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+isTempAutoIncrement"></a>

#### businessLogic.isTempAutoIncrement(r, colName)
Establish if a field must be passed to Business audits

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| r | <code>DataRow</code> | 
| colName | <code>string</code> | 

<a name="module_jsBusinessLogic..BusinessLogic+parametersFor"></a>

#### businessLogic.parametersFor(auditParameters, rc, post) ⇒ <code>Array.&lt;{name:string, value}&gt;</code>
Returns a collection of (name, value) couples, evaluated basing on auditParameters

**Kind**: instance method of [<code>BusinessLogic</code>](#module_jsBusinessLogic..BusinessLogic)  

| Param | Type |
| --- | --- |
| auditParameters | <code>DataTable</code> | 
| rc | <code>RowChange</code> | 
| post | <code>boolean</code> | 

<a name="module_jsBusinessLogic..OneSubst"></a>

### jsBusinessLogic~OneSubst
**Kind**: inner class of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  

* [~OneSubst](#module_jsBusinessLogic..OneSubst)
    * [new OneSubst(field, tableName, original, fromTable)](#new_module_jsBusinessLogic..OneSubst_new)
    * [.error](#module_jsBusinessLogic..OneSubst+error)
    * [.original](#module_jsBusinessLogic..OneSubst+original)
    * [.newValue](#module_jsBusinessLogic..OneSubst+newValue)
    * [.fromTable](#module_jsBusinessLogic..OneSubst+fromTable)
    * [.field](#module_jsBusinessLogic..OneSubst+field)
    * [.queryString](#module_jsBusinessLogic..OneSubst+queryString)
    * [.query](#module_jsBusinessLogic..OneSubst+query)
    * [.queryCols](#module_jsBusinessLogic..OneSubst+queryCols)
    * [.setQuery(query)](#module_jsBusinessLogic..OneSubst+setQuery)
    * [.setCols(cols)](#module_jsBusinessLogic..OneSubst+setCols)

<a name="new_module_jsBusinessLogic..OneSubst_new"></a>

#### new OneSubst(field, tableName, original, fromTable)

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> |  |
| tableName | <code>string</code> |  |
| original | <code>string</code> | Table name.field as in original message |
| fromTable | <code>string</code> | Table name of changed row |

<a name="module_jsBusinessLogic..OneSubst+error"></a>

#### oneSubst.error
when true, substitution is wrong

**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Name | Type |
| --- | --- |
| error | <code>boolean</code> | 

<a name="module_jsBusinessLogic..OneSubst+original"></a>

#### oneSubst.original
%<table.field>% or %<field>%

**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Name | Type |
| --- | --- |
| original | <code>string</code> | 

<a name="module_jsBusinessLogic..OneSubst+newValue"></a>

#### oneSubst.newValue
string that will replace the "original" sequence in the message

**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Name | Type |
| --- | --- |
| newValue | <code>string</code> \| <code>null</code> | 

<a name="module_jsBusinessLogic..OneSubst+fromTable"></a>

#### oneSubst.fromTable
Table name of changed row

**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Name | Type |
| --- | --- |
| fromTable | <code>string</code> | 

<a name="module_jsBusinessLogic..OneSubst+field"></a>

#### oneSubst.field
Field name

**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Name | Type |
| --- | --- |
| field | <code>string</code> | 

<a name="module_jsBusinessLogic..OneSubst+queryString"></a>

#### oneSubst.queryString
**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Type |
| --- |
| <code>string</code> | 

<a name="module_jsBusinessLogic..OneSubst+query"></a>

#### oneSubst.query
**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Type |
| --- |
| <code>jsDataQuery</code> | 

<a name="module_jsBusinessLogic..OneSubst+queryCols"></a>

#### oneSubst.queryCols
Columns present

**Kind**: instance property of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  
**Properties**

| Name | Type |
| --- | --- |
| queryCols | <code>Set.&lt;string&gt;</code> | 

<a name="module_jsBusinessLogic..OneSubst+setQuery"></a>

#### oneSubst.setQuery(query)
Sets the first query and puts the hash in a property

**Kind**: instance method of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  

| Param | Type |
| --- | --- |
| query | <code>jsDataQuery</code> | 

<a name="module_jsBusinessLogic..OneSubst+setCols"></a>

#### oneSubst.setCols(cols)
**Kind**: instance method of [<code>OneSubst</code>](#module_jsBusinessLogic..OneSubst)  

| Param | Type |
| --- | --- |
| cols | <code>Array.&lt;string&gt;</code> | 

<a name="module_jsBusinessLogic..SubstGroup"></a>

### jsBusinessLogic~SubstGroup
**Kind**: inner class of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  

* [~SubstGroup](#module_jsBusinessLogic..SubstGroup)
    * [new SubstGroup(tableName)](#new_module_jsBusinessLogic..SubstGroup_new)
    * [.tableName](#module_jsBusinessLogic..SubstGroup+tableName)
    * [.query](#module_jsBusinessLogic..SubstGroup+query)
    * [.querySet](#module_jsBusinessLogic..SubstGroup+querySet)
    * [.queryCols](#module_jsBusinessLogic..SubstGroup+queryCols)
    * [.data](#module_jsBusinessLogic..SubstGroup+data)
    * [.mergeQuery(subst, maxQueryLength)](#module_jsBusinessLogic..SubstGroup+mergeQuery) ⇒ <code>boolean</code>

<a name="new_module_jsBusinessLogic..SubstGroup_new"></a>

#### new SubstGroup(tableName)
Groups a set of OneSubst


| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_jsBusinessLogic..SubstGroup+tableName"></a>

#### substGroup.tableName
**Kind**: instance property of [<code>SubstGroup</code>](#module_jsBusinessLogic..SubstGroup)  
**Properties**

| Name | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_jsBusinessLogic..SubstGroup+query"></a>

#### substGroup.query
**Kind**: instance property of [<code>SubstGroup</code>](#module_jsBusinessLogic..SubstGroup)  
**Properties**

| Name | Type |
| --- | --- |
| query | <code>Array.&lt;jsDataQuery&gt;</code> | 

<a name="module_jsBusinessLogic..SubstGroup+querySet"></a>

#### substGroup.querySet
**Kind**: instance property of [<code>SubstGroup</code>](#module_jsBusinessLogic..SubstGroup)  
**Properties**

| Name | Type |
| --- | --- |
| querySet | <code>Set.&lt;string&gt;</code> | 

<a name="module_jsBusinessLogic..SubstGroup+queryCols"></a>

#### substGroup.queryCols
**Kind**: instance property of [<code>SubstGroup</code>](#module_jsBusinessLogic..SubstGroup)  
**Properties**

| Name | Type |
| --- | --- |
| queryCols | <code>Set.&lt;string&gt;</code> | 

<a name="module_jsBusinessLogic..SubstGroup+data"></a>

#### substGroup.data
**Kind**: instance property of [<code>SubstGroup</code>](#module_jsBusinessLogic..SubstGroup)  
**Properties**

| Name | Type |
| --- | --- |
| data | <code>Array.&lt;ObjectRow&gt;</code> | 

<a name="module_jsBusinessLogic..SubstGroup+mergeQuery"></a>

#### substGroup.mergeQuery(subst, maxQueryLength) ⇒ <code>boolean</code>
adds a new query if it is on same table and it is not already present

**Kind**: instance method of [<code>SubstGroup</code>](#module_jsBusinessLogic..SubstGroup)  
**Returns**: <code>boolean</code> - true if could merge  

| Param | Type |
| --- | --- |
| subst | <code>OneSubst</code> | 
| maxQueryLength | <code>int</code> | 

<a name="module_jsBusinessLogic..RowChange"></a>

### jsBusinessLogic~RowChange
**Kind**: inner class of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  

* [~RowChange](#module_jsBusinessLogic..RowChange)
    * [new RowChange(nChecks, r, audits, varName, colName)](#new_module_jsBusinessLogic..RowChange_new)
    * [.r](#module_jsBusinessLogic..RowChange+r)
    * [.tableName](#module_jsBusinessLogic..RowChange+tableName)
    * [.getRelated(tableName)](#module_jsBusinessLogic..RowChange+getRelated) ⇒ <code>DataRow</code> \| <code>undefined</code>
    * [.searchRelated(tableName)](#module_jsBusinessLogic..RowChange+searchRelated) ⇒ <code>\*</code>
    * [._getRelatedRowExactTable(relatedTableName)](#module_jsBusinessLogic..RowChange+_getRelatedRowExactTable) ⇒ <code>ObjectRow</code> \| <code>null</code>
    * [._getRelatedRow(relatedTableName)](#module_jsBusinessLogic..RowChange+_getRelatedRow) ⇒ <code>ObjectRow</code> \| <code>null</code>

<a name="new_module_jsBusinessLogic..RowChange_new"></a>

#### new RowChange(nChecks, r, audits, varName, colName)
Represents a changed row with related information to display a message


| Param | Type | Description |
| --- | --- | --- |
| nChecks | <code>int</code> | number of checks  applied to the row |
| r | <code>DataRow</code> | DataRow being changed (added/modified/deleted) |
| audits | <code>Array.&lt;ObjectRow&gt;</code> | rows from auditcheckview related to this change |
| varName | <code>string</code> | variable name used in stored procedure invocation |
| colName | <code>string</code> | column name that will receive the result |

<a name="module_jsBusinessLogic..RowChange+r"></a>

#### rowChange.r
changed DataRow

**Kind**: instance property of [<code>RowChange</code>](#module_jsBusinessLogic..RowChange)  
**Properties**

| Name | Type |
| --- | --- |
| r | <code>DataRow</code> | 

<a name="module_jsBusinessLogic..RowChange+tableName"></a>

#### rowChange.tableName
**Kind**: instance property of [<code>RowChange</code>](#module_jsBusinessLogic..RowChange)  
**Properties**

| Name | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_jsBusinessLogic..RowChange+getRelated"></a>

#### rowChange.getRelated(tableName) ⇒ <code>DataRow</code> \| <code>undefined</code>
Get a DataRow related to the RowChange, in a given tablename

**Kind**: instance method of [<code>RowChange</code>](#module_jsBusinessLogic..RowChange)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_jsBusinessLogic..RowChange+searchRelated"></a>

#### rowChange.searchRelated(tableName) ⇒ <code>\*</code>
Fills related searching the specified table

**Kind**: instance method of [<code>RowChange</code>](#module_jsBusinessLogic..RowChange)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 

<a name="module_jsBusinessLogic..RowChange+_getRelatedRowExactTable"></a>

#### rowChange.\_getRelatedRowExactTable(relatedTableName) ⇒ <code>ObjectRow</code> \| <code>null</code>
Searches a row in parent/child tables

**Kind**: instance method of [<code>RowChange</code>](#module_jsBusinessLogic..RowChange)  

| Param | Type |
| --- | --- |
| relatedTableName | <code>string</code> | 

<a name="module_jsBusinessLogic..RowChange+_getRelatedRow"></a>

#### rowChange.\_getRelatedRow(relatedTableName) ⇒ <code>ObjectRow</code> \| <code>null</code>
Searches a row in parent/child tables

**Kind**: instance method of [<code>RowChange</code>](#module_jsBusinessLogic..RowChange)  

| Param | Type |
| --- | --- |
| relatedTableName | <code>string</code> | 

<a name="module_jsBusinessLogic..PostData"></a>

### jsBusinessLogic~PostData ⇐ <code>PostData</code>
BusinessPostData

**Kind**: inner class of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  
**Extends**: <code>PostData</code>  
<a name="new_module_jsBusinessLogic..PostData_new"></a>

#### new PostData(context)
BusinessPostDataA class able to save data invoking business rules


| Param | Type |
| --- | --- |
| context | <code>Context</code> | 

<a name="module_jsBusinessLogic..Deferred"></a>

### jsBusinessLogic~Deferred : <code>function</code>
**Kind**: inner constant of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  
<a name="module_jsBusinessLogic..getParserparam {string} msg"></a>

### jsBusinessLogic~getParserparam {string} msg() ⇒ <code>MsgParser</code>
**Kind**: inner method of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  
<a name="module_jsBusinessLogic..fromAsyncToDeferred"></a>

### jsBusinessLogic~fromAsyncToDeferred(f)
returns a Deferred that resolves when f resolves or throw

**Kind**: inner method of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  

| Param |
| --- |
| f | 

<a name="module_jsBusinessLogic..getBusinessLogic"></a>

### jsBusinessLogic~getBusinessLogic(context, rowChanges) ⇒ <code>BusinessLogicResult</code>
This is meant to be replaced or overridden in derived classes

**Kind**: inner method of [<code>jsBusinessLogic</code>](#module_jsBusinessLogic)  

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| rowChanges | <code>Array.&lt;ObjectRow&gt;</code> | 

