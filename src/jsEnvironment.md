<a name="Environment"></a>

## Environment
**Kind**: global class  

* [Environment](#Environment)
    * [new Environment(identity)](#new_Environment_new)
    * [.getAnonymousName()](#Environment+getAnonymousName) ⇒ <code>string</code>
    * [.getStampFields()](#Environment+getStampFields) ⇒ <code>Array.&lt;string&gt;</code>
    * [.sys(key, [value])](#Environment+sys) ⇒ <code>object</code>
    * [.field(key, [value])](#Environment+field) ⇒ <code>object</code>
    * [.usr(key, [value])](#Environment+usr) ⇒ <code>object</code>
    * [.enumSys()](#Environment+enumSys) ⇒ <code>Array.&lt;string&gt;</code>
    * [.enumUsr()](#Environment+enumUsr) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getCustomUser(conn)](#Environment+getCustomUser) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getGroupList(conn)](#Environment+getGroupList) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
    * [.calcUserEnvironment(conn)](#Environment+calcUserEnvironment) ⇒ <code>Promise</code>
    * [.load(conn)](#Environment+load) ⇒ <code>Promise</code>

<a name="new_Environment_new"></a>

### new Environment(identity)
Identity class is declared in jsToken. Identity must have name,idflowchart,ndetail set


| Param | Type | Description |
| --- | --- | --- |
| identity | <code>Identity</code> | identity.name must match a username in the customuser table |

<a name="Environment+getAnonymousName"></a>

### environment.getAnonymousName() ⇒ <code>string</code>
this is meant to be redefined in derived classes

**Kind**: instance method of [<code>Environment</code>](#Environment)  
<a name="Environment+getStampFields"></a>

### environment.getStampFields() ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of fields used as stamp in evaluating field function for optimistic locking This function means to be redefined in derived classes

**Kind**: instance method of [<code>Environment</code>](#Environment)  
<a name="Environment+sys"></a>

### environment.sys(key, [value]) ⇒ <code>object</code>
Get/set a value for an environment sys variable

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| [value] | <code>object</code> | 

<a name="Environment+field"></a>

### environment.field(key, [value]) ⇒ <code>object</code>
Get a value for an environment field or a new Date if the field is a stamp field

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| [value] | <code>object</code> | 

<a name="Environment+usr"></a>

### environment.usr(key, [value]) ⇒ <code>object</code>
Get/set a value for an environment usr variable

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| [value] | <code>object</code> | 

<a name="Environment+enumSys"></a>

### environment.enumSys() ⇒ <code>Array.&lt;string&gt;</code>
Enumerates all sys keys

**Kind**: instance method of [<code>Environment</code>](#Environment)  
<a name="Environment+enumUsr"></a>

### environment.enumUsr() ⇒ <code>Array.&lt;string&gt;</code>
Enumerates all usr keys

**Kind**: instance method of [<code>Environment</code>](#Environment)  
<a name="Environment+getCustomUser"></a>

### environment.getCustomUser(conn) ⇒ <code>Promise.&lt;object&gt;</code>
Evaluates env.sys[idcustomuser], requires env.sys[user] to be already defined

**Kind**: instance method of [<code>Environment</code>](#Environment)  
**Access**: public  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="Environment+getGroupList"></a>

### environment.getGroupList(conn) ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Evaluates env.sys[usergrouplist], requires env.sys[user] to be already defined.This is meant to be invoked when environment is created

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="Environment+calcUserEnvironment"></a>

### environment.calcUserEnvironment(conn) ⇒ <code>Promise</code>
invokes a stored procedure to compute environment, needs sys(idcustomuser)

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="Environment+load"></a>

### environment.load(conn) ⇒ <code>Promise</code>
Loads environment from a database, it needs sys(user) and eventually idflowchart and ndetail to be present in sys variables

**Kind**: instance method of [<code>Environment</code>](#Environment)  

| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

