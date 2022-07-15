<a name="JsApplication"></a>

## JsApplication
**Kind**: global class  

* [JsApplication](#JsApplication)
    * [new JsApplication()](#new_JsApplication_new)
    * [.environments](#JsApplication+environments) : <code>Object.&lt;string, Environment&gt;</code>
    * [.createConnectionPool(dbCode)](#JsApplication+createConnectionPool) ⇒ <code>JsConnectionPool</code>
    * [.releaseConnection(req, ctx)](#JsApplication+releaseConnection)
    * [.init(dbCode)](#JsApplication+init) ⇒ <code>Promise</code>
    * [.getDataAccess()](#JsApplication+getDataAccess) ⇒ <code>Promise.&lt;JsPooledConnection&gt;</code>
    * [.createEnvironment(identity, conn)](#JsApplication+createEnvironment) ⇒ <code>Environment</code>
    * [.createSession(identity, conn)](#JsApplication+createSession) ⇒ <code>Promise.&lt;Environment&gt;</code>
    * [.createPostData(ctx)](#JsApplication+createPostData) ⇒ <code>BusinessPostData</code>
    * [.getDataSet(tableName, editType)](#JsApplication+getDataSet) ⇒ <code>DataSet</code>
    * [.getOrCreateContext(req, res, next)](#JsApplication+getOrCreateContext)
    * [.createContext(pooledConn, env, req, res, next)](#JsApplication+createContext)
    * [.getContext(req, res, next, env)](#JsApplication+getContext)

<a name="new_JsApplication_new"></a>

### new JsApplication()
Main Application

<a name="JsApplication+environments"></a>

### jsApplication.environments : <code>Object.&lt;string, Environment&gt;</code>
Collection of all user environments of the application, the key is the sessionID

**Kind**: instance property of [<code>JsApplication</code>](#JsApplication)  
<a name="JsApplication+createConnectionPool"></a>

### jsApplication.createConnectionPool(dbCode) ⇒ <code>JsConnectionPool</code>
Creates the connection pool, it is supposed to be overridden in derived classes

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="JsApplication+releaseConnection"></a>

### jsApplication.releaseConnection(req, ctx)
Attaches a release event on close/finish of the request (the one which fires first)releases the pool connection after a request has been processed

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param |
| --- |
| req | 
| ctx | 

<a name="JsApplication+init"></a>

### jsApplication.init(dbCode) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| dbCode | <code>string</code> | 

<a name="JsApplication+getDataAccess"></a>

### jsApplication.getDataAccess() ⇒ <code>Promise.&lt;JsPooledConnection&gt;</code>
returns an open connection to db

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  
<a name="JsApplication+createEnvironment"></a>

### jsApplication.createEnvironment(identity, conn) ⇒ <code>Environment</code>
Meant to be redefined in subclasses, creates an Environment class

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| identity | <code>Identity</code> | 
| conn | <code>DataAccess</code> | 

<a name="JsApplication+createSession"></a>

### jsApplication.createSession(identity, conn) ⇒ <code>Promise.&lt;Environment&gt;</code>
Create a Session for the user represented by the token.

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| identity | <code>Identity</code> | 
| conn | <code>DataAccess</code> | 

<a name="JsApplication+createPostData"></a>

### jsApplication.createPostData(ctx) ⇒ <code>BusinessPostData</code>
Function that must create a PostData class, this is meant to be overridden in derived classes

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| ctx | <code>Context</code> | 

<a name="JsApplication+getDataSet"></a>

### jsApplication.getDataSet(tableName, editType) ⇒ <code>DataSet</code>
**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param |
| --- |
| tableName | 
| editType | 

<a name="JsApplication+getOrCreateContext"></a>

### jsApplication.getOrCreateContext(req, res, next)
Creates a context object in req.app.local.context. If the token is not provided in the header, creates an anonymous connection.

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>Middleware</code> | 

<a name="JsApplication+createContext"></a>

### jsApplication.createContext(pooledConn, env, req, res, next)
Creates a context and attach it to req.app.localAlso adds the

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| pooledConn |  | 
| env |  | 
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>Middleware</code> | 

<a name="JsApplication+getContext"></a>

### jsApplication.getContext(req, res, next, env)
Creates a context object in req.app.local.context, when environment already exists

**Kind**: instance method of [<code>JsApplication</code>](#JsApplication)  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>Middleware</code> | 
| env | <code>Environment</code> | 

