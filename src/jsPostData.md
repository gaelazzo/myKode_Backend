<a name="module_PostData"></a>

## PostData
Manages data storing


* [PostData](#module_PostData)
    * [~MaxCacher](#module_PostData..MaxCacher)
        * [new MaxCacher(conn, environment)](#new_module_PostData..MaxCacher_new)
        * [.setMax(r, column, filter, expr, value)](#module_PostData..MaxCacher+setMax)
    * [~PostData](#module_PostData..PostData)
        * [new PostData()](#new_module_PostData..PostData_new)
        * [new PostData()](#new_module_PostData..PostData_new)
        * [.createSingleDataSetPost(ds, conn)](#module_PostData..PostData+createSingleDataSetPost) ⇒ <code>SinglePostData</code>
        * [.setOptimisticLocking(locking)](#module_PostData..PostData+setOptimisticLocking)
        * [.init(ds, context)](#module_PostData..PostData+init) ⇒ <code>Promise.&lt;SinglePostData&gt;</code>
        * [.setInnerPosting(ds, innerPoster)](#module_PostData..PostData+setInnerPosting) ⇒ <code>boolean</code>
        * [.isInnerPoster()](#module_PostData..PostData+isInnerPoster) ⇒ <code>boolean</code>
        * [.setAsInnerPoster()](#module_PostData..PostData+setAsInnerPoster)
        * [.getBusinessLogic(context, rowChanges)](#module_PostData..PostData+getBusinessLogic) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
        * [.getChecks(conn, post)](#module_PostData..PostData+getChecks) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
        * [.doAllPhisicalPostBatch(conn, locking)](#module_PostData..PostData+doAllPhisicalPostBatch) ⇒ <code>Promise</code>
        * [.doAllLog(conn)](#module_PostData..PostData+doAllLog) ⇒ <code>Promise</code>
        * [.doAllUpdate(conn, result)](#module_PostData..PostData+doAllUpdate) ⇒ <code>Promise</code>
        * [.reselectAllViewsAndAcceptChanges(conn)](#module_PostData..PostData+reselectAllViewsAndAcceptChanges) ⇒ <code>Promise</code>
        * [.getAllChanges()](#module_PostData..PostData+getAllChanges) ⇒ <code>Array.&lt;dataSetName:string, changes:Array.&lt;DataRow&gt;&gt;</code>
        * [.recursiveCallAfterPost(committed)](#module_PostData..PostData+recursiveCallAfterPost)
    * [~PostData](#module_PostData..PostData)
        * [new PostData()](#new_module_PostData..PostData_new)
        * [new PostData()](#new_module_PostData..PostData_new)
        * [.createSingleDataSetPost(ds, conn)](#module_PostData..PostData+createSingleDataSetPost) ⇒ <code>SinglePostData</code>
        * [.setOptimisticLocking(locking)](#module_PostData..PostData+setOptimisticLocking)
        * [.init(ds, context)](#module_PostData..PostData+init) ⇒ <code>Promise.&lt;SinglePostData&gt;</code>
        * [.setInnerPosting(ds, innerPoster)](#module_PostData..PostData+setInnerPosting) ⇒ <code>boolean</code>
        * [.isInnerPoster()](#module_PostData..PostData+isInnerPoster) ⇒ <code>boolean</code>
        * [.setAsInnerPoster()](#module_PostData..PostData+setAsInnerPoster)
        * [.getBusinessLogic(context, rowChanges)](#module_PostData..PostData+getBusinessLogic) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
        * [.getChecks(conn, post)](#module_PostData..PostData+getChecks) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
        * [.doAllPhisicalPostBatch(conn, locking)](#module_PostData..PostData+doAllPhisicalPostBatch) ⇒ <code>Promise</code>
        * [.doAllLog(conn)](#module_PostData..PostData+doAllLog) ⇒ <code>Promise</code>
        * [.doAllUpdate(conn, result)](#module_PostData..PostData+doAllUpdate) ⇒ <code>Promise</code>
        * [.reselectAllViewsAndAcceptChanges(conn)](#module_PostData..PostData+reselectAllViewsAndAcceptChanges) ⇒ <code>Promise</code>
        * [.getAllChanges()](#module_PostData..PostData+getAllChanges) ⇒ <code>Array.&lt;dataSetName:string, changes:Array.&lt;DataRow&gt;&gt;</code>
        * [.recursiveCallAfterPost(committed)](#module_PostData..PostData+recursiveCallAfterPost)
    * [~BasicMessage](#module_PostData..BasicMessage)
        * [new BasicMessage(msg, canIgnore)](#new_module_PostData..BasicMessage_new)
        * [.canIgnore](#module_PostData..BasicMessage+canIgnore)
        * [.msg](#module_PostData..BasicMessage+msg)
        * [.getId()](#module_PostData..BasicMessage+getId) ⇒ <code>string</code> \| <code>\*</code>
    * [~DataRow](#module_PostData..DataRow)
    * [~getMax(r, column, selectors, filter, expr)](#module_PostData..getMax) ⇒ <code>Promise.&lt;int&gt;</code>
    * [~getSqlStatements(changedRows, optimisticLocking)](#module_PostData..getSqlStatements) ⇒ <code>Deferred</code>
    * [~reselect(row)](#module_PostData..reselect) ⇒ <code>\*</code>
    * [~physicalPostBatch(conn, optimisticLocking)](#module_PostData..physicalPostBatch) ⇒ <code>\*</code>
    * [~reselectAllViews()](#module_PostData..reselectAllViews) ⇒ <code>\*</code>
    * [~calcAutoId(r, autoIncrementProperty)](#module_PostData..calcAutoId) ⇒ <code>promise</code>
    * [~setMessage
Sets the message of the rule()](#module_PostData..setMessage
Sets the message of the rule) ⇒ <code>\*</code>
    * [~getMessage
Gets the message of the rule()](#module_PostData..getMessage
Gets the message of the rule) ⇒ <code>string</code>
    * [~promiseWaterfall(tasks)](#module_PostData..promiseWaterfall) ⇒ <code>Promise</code>
    * [~promiseParallel(tasks)](#module_PostData..promiseParallel)
    * [~doPost(options)](#module_PostData..doPost) ⇒ <code>Promise.&lt;{canIgnore:boolean, Array.&lt;checks:BasicMessage&gt;, data:DataSet}&gt;</code>
    * [~resolve()](#module_PostData..resolve) ⇒ <code>Deferred</code>
    * [~doPost(options)](#module_PostData..doPost) ⇒ <code>Object</code>

<a name="module_PostData..MaxCacher"></a>

### PostData~MaxCacher
MaxCacher

**Kind**: inner class of [<code>PostData</code>](#module_PostData)  

* [~MaxCacher](#module_PostData..MaxCacher)
    * [new MaxCacher(conn, environment)](#new_module_PostData..MaxCacher_new)
    * [.setMax(r, column, filter, expr, value)](#module_PostData..MaxCacher+setMax)

<a name="new_module_PostData..MaxCacher_new"></a>

#### new MaxCacher(conn, environment)
Manages a cache of select max done in a transaction


| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| environment | <code>Environment</code> | 

<a name="module_PostData..MaxCacher+setMax"></a>

#### maxCacher.setMax(r, column, filter, expr, value)
**Kind**: instance method of [<code>MaxCacher</code>](#module_PostData..MaxCacher)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| column | <code>string</code> | 
| filter | <code>sqlFun</code> | 
| expr | <code>sqlFun</code> | 
| value | <code>object</code> | 

<a name="module_PostData..PostData"></a>

### PostData~PostData
PostData

**Kind**: inner class of [<code>PostData</code>](#module_PostData)  

* [~PostData](#module_PostData..PostData)
    * [new PostData()](#new_module_PostData..PostData_new)
    * [new PostData()](#new_module_PostData..PostData_new)
    * [.createSingleDataSetPost(ds, conn)](#module_PostData..PostData+createSingleDataSetPost) ⇒ <code>SinglePostData</code>
    * [.setOptimisticLocking(locking)](#module_PostData..PostData+setOptimisticLocking)
    * [.init(ds, context)](#module_PostData..PostData+init) ⇒ <code>Promise.&lt;SinglePostData&gt;</code>
    * [.setInnerPosting(ds, innerPoster)](#module_PostData..PostData+setInnerPosting) ⇒ <code>boolean</code>
    * [.isInnerPoster()](#module_PostData..PostData+isInnerPoster) ⇒ <code>boolean</code>
    * [.setAsInnerPoster()](#module_PostData..PostData+setAsInnerPoster)
    * [.getBusinessLogic(context, rowChanges)](#module_PostData..PostData+getBusinessLogic) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
    * [.getChecks(conn, post)](#module_PostData..PostData+getChecks) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
    * [.doAllPhisicalPostBatch(conn, locking)](#module_PostData..PostData+doAllPhisicalPostBatch) ⇒ <code>Promise</code>
    * [.doAllLog(conn)](#module_PostData..PostData+doAllLog) ⇒ <code>Promise</code>
    * [.doAllUpdate(conn, result)](#module_PostData..PostData+doAllUpdate) ⇒ <code>Promise</code>
    * [.reselectAllViewsAndAcceptChanges(conn)](#module_PostData..PostData+reselectAllViewsAndAcceptChanges) ⇒ <code>Promise</code>
    * [.getAllChanges()](#module_PostData..PostData+getAllChanges) ⇒ <code>Array.&lt;dataSetName:string, changes:Array.&lt;DataRow&gt;&gt;</code>
    * [.recursiveCallAfterPost(committed)](#module_PostData..PostData+recursiveCallAfterPost)

<a name="new_module_PostData..PostData_new"></a>

#### new PostData()
Saves a single DataSet using a given DataAccess

<a name="new_module_PostData..PostData_new"></a>

#### new PostData()
Saves one or more DataSet using a given DataAccess

<a name="module_PostData..PostData+createSingleDataSetPost"></a>

#### postData.createSingleDataSetPost(ds, conn) ⇒ <code>SinglePostData</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param |
| --- |
| ds | 
| conn | 

<a name="module_PostData..PostData+setOptimisticLocking"></a>

#### postData.setOptimisticLocking(locking)
Sets a default for optimistic locking

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| locking | <code>OptimisticLocking</code> | 

<a name="module_PostData..PostData+init"></a>

#### postData.init(ds, context) ⇒ <code>Promise.&lt;SinglePostData&gt;</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 
| context | <code>Context</code> | 

<a name="module_PostData..PostData+setInnerPosting"></a>

#### postData.setInnerPosting(ds, innerPoster) ⇒ <code>boolean</code>
Check if this PostClass is run-time nested insider another one

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 
| innerPoster | <code>IInnerPoster</code> | 

<a name="module_PostData..PostData+isInnerPoster"></a>

#### postData.isInnerPoster() ⇒ <code>boolean</code>
Check if this PostClass is run-time nested insider another one

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
<a name="module_PostData..PostData+setAsInnerPoster"></a>

#### postData.setAsInnerPoster()
Establish that this PostClass is run-time nested insider another one

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
<a name="module_PostData..PostData+getBusinessLogic"></a>

#### postData.getBusinessLogic(context, rowChanges) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
This is meant to be replaced or overridden in derived classes

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| rowChanges | <code>Array.&lt;ObjectRow&gt;</code> | 

<a name="module_PostData..PostData+getChecks"></a>

#### postData.getChecks(conn, post) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
This function  is called before and after applying changes to db.
 The first time is called with post=false and the second time with post=true.
 Should give a list of messages to return to client. If it does return an empty array, the transaction is committed.
 If it does return some rows, those are merged and returned to client, and transaction is roll-backed.
 if canIgnore is false in the first call, the procedure terminates and no data is written at all
 This is meant to be replaced or overridden in derived classes

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type | Description |
| --- | --- | --- |
| conn | <code>DataAccess</code> |  |
| post | <code>boolean</code> | True if post check otherwise precheck are requested |

<a name="module_PostData..PostData+doAllPhisicalPostBatch"></a>

#### postData.doAllPhisicalPostBatch(conn, locking) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
**Returns**: <code>Promise</code> - promise fails on errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| locking | <code>OptimisticLocking</code> | 

<a name="module_PostData..PostData+doAllLog"></a>

#### postData.doAllLog(conn) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
**Returns**: <code>Promise</code> - promise fails on errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="module_PostData..PostData+doAllUpdate"></a>

#### postData.doAllUpdate(conn, result) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
**Returns**: <code>Promise</code> - promise fails on errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| result | <code>BusinessLogicResult</code> | 

<a name="module_PostData..PostData+reselectAllViewsAndAcceptChanges"></a>

#### postData.reselectAllViewsAndAcceptChanges(conn) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="module_PostData..PostData+getAllChanges"></a>

#### postData.getAllChanges() ⇒ <code>Array.&lt;dataSetName:string, changes:Array.&lt;DataRow&gt;&gt;</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
<a name="module_PostData..PostData+recursiveCallAfterPost"></a>

#### postData.recursiveCallAfterPost(committed)
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| committed | <code>boolean</code> | 

<a name="module_PostData..PostData"></a>

### PostData~PostData
PostData

**Kind**: inner class of [<code>PostData</code>](#module_PostData)  

* [~PostData](#module_PostData..PostData)
    * [new PostData()](#new_module_PostData..PostData_new)
    * [new PostData()](#new_module_PostData..PostData_new)
    * [.createSingleDataSetPost(ds, conn)](#module_PostData..PostData+createSingleDataSetPost) ⇒ <code>SinglePostData</code>
    * [.setOptimisticLocking(locking)](#module_PostData..PostData+setOptimisticLocking)
    * [.init(ds, context)](#module_PostData..PostData+init) ⇒ <code>Promise.&lt;SinglePostData&gt;</code>
    * [.setInnerPosting(ds, innerPoster)](#module_PostData..PostData+setInnerPosting) ⇒ <code>boolean</code>
    * [.isInnerPoster()](#module_PostData..PostData+isInnerPoster) ⇒ <code>boolean</code>
    * [.setAsInnerPoster()](#module_PostData..PostData+setAsInnerPoster)
    * [.getBusinessLogic(context, rowChanges)](#module_PostData..PostData+getBusinessLogic) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
    * [.getChecks(conn, post)](#module_PostData..PostData+getChecks) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
    * [.doAllPhisicalPostBatch(conn, locking)](#module_PostData..PostData+doAllPhisicalPostBatch) ⇒ <code>Promise</code>
    * [.doAllLog(conn)](#module_PostData..PostData+doAllLog) ⇒ <code>Promise</code>
    * [.doAllUpdate(conn, result)](#module_PostData..PostData+doAllUpdate) ⇒ <code>Promise</code>
    * [.reselectAllViewsAndAcceptChanges(conn)](#module_PostData..PostData+reselectAllViewsAndAcceptChanges) ⇒ <code>Promise</code>
    * [.getAllChanges()](#module_PostData..PostData+getAllChanges) ⇒ <code>Array.&lt;dataSetName:string, changes:Array.&lt;DataRow&gt;&gt;</code>
    * [.recursiveCallAfterPost(committed)](#module_PostData..PostData+recursiveCallAfterPost)

<a name="new_module_PostData..PostData_new"></a>

#### new PostData()
Saves a single DataSet using a given DataAccess

<a name="new_module_PostData..PostData_new"></a>

#### new PostData()
Saves one or more DataSet using a given DataAccess

<a name="module_PostData..PostData+createSingleDataSetPost"></a>

#### postData.createSingleDataSetPost(ds, conn) ⇒ <code>SinglePostData</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param |
| --- |
| ds | 
| conn | 

<a name="module_PostData..PostData+setOptimisticLocking"></a>

#### postData.setOptimisticLocking(locking)
Sets a default for optimistic locking

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| locking | <code>OptimisticLocking</code> | 

<a name="module_PostData..PostData+init"></a>

#### postData.init(ds, context) ⇒ <code>Promise.&lt;SinglePostData&gt;</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 
| context | <code>Context</code> | 

<a name="module_PostData..PostData+setInnerPosting"></a>

#### postData.setInnerPosting(ds, innerPoster) ⇒ <code>boolean</code>
Check if this PostClass is run-time nested insider another one

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| ds | <code>DataSet</code> | 
| innerPoster | <code>IInnerPoster</code> | 

<a name="module_PostData..PostData+isInnerPoster"></a>

#### postData.isInnerPoster() ⇒ <code>boolean</code>
Check if this PostClass is run-time nested insider another one

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
<a name="module_PostData..PostData+setAsInnerPoster"></a>

#### postData.setAsInnerPoster()
Establish that this PostClass is run-time nested insider another one

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
<a name="module_PostData..PostData+getBusinessLogic"></a>

#### postData.getBusinessLogic(context, rowChanges) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
This is meant to be replaced or overridden in derived classes

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| rowChanges | <code>Array.&lt;ObjectRow&gt;</code> | 

<a name="module_PostData..PostData+getChecks"></a>

#### postData.getChecks(conn, post) ⇒ <code>Promise.&lt;BusinessLogicResult&gt;</code>
This function  is called before and after applying changes to db.
 The first time is called with post=false and the second time with post=true.
 Should give a list of messages to return to client. If it does return an empty array, the transaction is committed.
 If it does return some rows, those are merged and returned to client, and transaction is roll-backed.
 if canIgnore is false in the first call, the procedure terminates and no data is written at all
 This is meant to be replaced or overridden in derived classes

**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type | Description |
| --- | --- | --- |
| conn | <code>DataAccess</code> |  |
| post | <code>boolean</code> | True if post check otherwise precheck are requested |

<a name="module_PostData..PostData+doAllPhisicalPostBatch"></a>

#### postData.doAllPhisicalPostBatch(conn, locking) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
**Returns**: <code>Promise</code> - promise fails on errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| locking | <code>OptimisticLocking</code> | 

<a name="module_PostData..PostData+doAllLog"></a>

#### postData.doAllLog(conn) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
**Returns**: <code>Promise</code> - promise fails on errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="module_PostData..PostData+doAllUpdate"></a>

#### postData.doAllUpdate(conn, result) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
**Returns**: <code>Promise</code> - promise fails on errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| result | <code>BusinessLogicResult</code> | 

<a name="module_PostData..PostData+reselectAllViewsAndAcceptChanges"></a>

#### postData.reselectAllViewsAndAcceptChanges(conn) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="module_PostData..PostData+getAllChanges"></a>

#### postData.getAllChanges() ⇒ <code>Array.&lt;dataSetName:string, changes:Array.&lt;DataRow&gt;&gt;</code>
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  
<a name="module_PostData..PostData+recursiveCallAfterPost"></a>

#### postData.recursiveCallAfterPost(committed)
**Kind**: instance method of [<code>PostData</code>](#module_PostData..PostData)  

| Param | Type |
| --- | --- |
| committed | <code>boolean</code> | 

<a name="module_PostData..BasicMessage"></a>

### PostData~BasicMessage
**Kind**: inner class of [<code>PostData</code>](#module_PostData)  

* [~BasicMessage](#module_PostData..BasicMessage)
    * [new BasicMessage(msg, canIgnore)](#new_module_PostData..BasicMessage_new)
    * [.canIgnore](#module_PostData..BasicMessage+canIgnore)
    * [.msg](#module_PostData..BasicMessage+msg)
    * [.getId()](#module_PostData..BasicMessage+getId) ⇒ <code>string</code> \| <code>\*</code>

<a name="new_module_PostData..BasicMessage_new"></a>

#### new BasicMessage(msg, canIgnore)
Simple check result


| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| canIgnore | <code>boolean</code> | 

<a name="module_PostData..BasicMessage+canIgnore"></a>

#### basicMessage.canIgnore
**Kind**: instance property of [<code>BasicMessage</code>](#module_PostData..BasicMessage)  
**Properties**

| Name | Type |
| --- | --- |
| canIgnore | <code>boolean</code> | 

<a name="module_PostData..BasicMessage+msg"></a>

#### basicMessage.msg
**Kind**: instance property of [<code>BasicMessage</code>](#module_PostData..BasicMessage)  
**Properties**

| Name | Type |
| --- | --- |
| msg | <code>string</code> | 

<a name="module_PostData..BasicMessage+getId"></a>

#### basicMessage.getId() ⇒ <code>string</code> \| <code>\*</code>
Gets an identifier for this message, uses to suppress duplicates messages

**Kind**: instance method of [<code>BasicMessage</code>](#module_PostData..BasicMessage)  
<a name="module_PostData..DataRow"></a>

### PostData~DataRow
{DataRow}

**Kind**: inner constant of [<code>PostData</code>](#module_PostData)  
<a name="module_PostData..getMax"></a>

### PostData~getMax(r, column, selectors, filter, expr) ⇒ <code>Promise.&lt;int&gt;</code>
Get the max for an expression eventually getting it from cache or giving null if reasonably there is no row
 on that match the filter
 If there is no selector, then the result can be taken from cache if a query with same parameters has already
  be done.

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>ObjectRow</code> | objectRow for which evaluate the max |
| column | <code>string</code> | column to evaluate |
| selectors | <code>Array.&lt;string&gt;</code> | //selector fields for the calculation |
| filter | <code>sqlFun</code> | //filter to apply |
| expr | <code>sqlFun</code> | //expression to evaluate |

<a name="module_PostData..getSqlStatements"></a>

### PostData~getSqlStatements(changedRows, optimisticLocking) ⇒ <code>Deferred</code>
Gets an array of changed rows and returns a sequence of sql command that does the post.

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
**Returns**: <code>Deferred</code> - Deferred is notified with n sets of (rows,sql) where sql is the sql command used to
  save rows. This is useful if some error is returned, to evaluate messages.
  Saving stops as soon as an error occurs.  

| Param | Type |
| --- | --- |
| changedRows | <code>Array.&lt;DataRow&gt;</code> | 
| optimisticLocking | <code>OptimisticLocking</code> | 

<a name="module_PostData..reselect"></a>

### PostData~reselect(row) ⇒ <code>\*</code>
Reads again a row from db

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  

| Param | Type |
| --- | --- |
| row | <code>ObjectRow</code> | 

<a name="module_PostData..physicalPostBatch"></a>

### PostData~physicalPostBatch(conn, optimisticLocking) ⇒ <code>\*</code>
Runs a sequence of db commands in order to save an array of rows

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
**Returns**: <code>\*</code> - Resolved promise if all ok, rejected promise if errors  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 
| optimisticLocking | <code>OptimisticLocking</code> | 

<a name="module_PostData..reselectAllViews"></a>

### PostData~reselectAllViews() ⇒ <code>\*</code>
Read all changed view rows from db

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
<a name="module_PostData..calcAutoId"></a>

### PostData~calcAutoId(r, autoIncrementProperty) ⇒ <code>promise</code>
Calculates an autoincrement column checking that there is no other rows with that key in table

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
**Returns**: <code>promise</code> - //resolves true if it was a regular auto increment fields, false if it was a custom one  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>ObjectRow</code> |  |
| autoIncrementProperty | <code>AutoIncrementColumn</code> | ({DataRow} r, {string} columnName, {DataAccess} conn} |

<a name="module_PostData..setMessage
Sets the message of the rule"></a>

### PostData~setMessage
Sets the message of the rule() ⇒ <code>\*</code>
**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
<a name="module_PostData..getMessage
Gets the message of the rule"></a>

### PostData~getMessage
Gets the message of the rule() ⇒ <code>string</code>
**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
<a name="module_PostData..promiseWaterfall"></a>

### PostData~promiseWaterfall(tasks) ⇒ <code>Promise</code>
Builds a chained function, chaining each the Deferred function with "then"

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  

| Param | Type | Description |
| --- | --- | --- |
| tasks | <code>Array.&lt;Deferred&gt;</code> | each task is a function that returns a deferred. Not the deferred itself! |

<a name="module_PostData..promiseParallel"></a>

### PostData~promiseParallel(tasks)
**Kind**: inner method of [<code>PostData</code>](#module_PostData)  

| Param | Type |
| --- | --- |
| tasks | <code>Array.&lt;function()&gt;</code> | 

<a name="module_PostData..doPost"></a>

### PostData~doPost(options) ⇒ <code>Promise.&lt;{canIgnore:boolean, Array.&lt;checks:BasicMessage&gt;, data:DataSet}&gt;</code>
Saves a dataSet and return empty list if successful or a list of messages if they have to be verified before
 effectively committing changes. If successfull, also returns saved DataSet

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| [options.isolationLevel] | <code>string</code> | <code>&quot;DataAccess.isolationLevels.readCommitted&quot;</code> | 
| [options.optimisticLocking] | <code>OptimisticLocking</code> |  | 
| [options.previousRules] | <code>BusinessLogicResult</code> |  | 

<a name="module_PostData..resolve"></a>

### PostData~resolve() ⇒ <code>Deferred</code>
Resolve the promise with result, and do the necessary cleanup: rollback transaction if a transaction is open,
 and close connection if the connection is open. If further errors arise, add them to checks as dbErrors

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  
<a name="module_PostData..doPost"></a>

### PostData~doPost(options) ⇒ <code>Object</code>
Saves a dataSet and return empty list if successful or a list of messages if they have to be verified before
 effectively committing changes.

**Kind**: inner method of [<code>PostData</code>](#module_PostData)  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| [options.isolationLevel] | <code>string</code> | <code>&quot;DataAccess.isolationLevels.readCommitted&quot;</code> | 
| [options.optimisticLocking] | <code>OptimisticLocking</code> |  | 
| [options.previousRules] | <code>BusinessLogicResult</code> |  | 

