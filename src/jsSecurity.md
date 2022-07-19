<a name="module_Security"></a>

## Security
Manages data storing


* [Security](#module_Security)
    * [~Security](#module_Security..Security)
        * [new Security()](#new_module_Security..Security_new)
        * [.addTableOpCondition(tableName, op, condition)](#module_Security..Security+addTableOpCondition)
        * [.getTableOpConditions(tableName, op)](#module_Security..Security+getTableOpConditions) ⇒ <code>Array.&lt;ConditionRow&gt;</code>
        * [.getConditions(tableName, op, env)](#module_Security..Security+getConditions) ⇒ <code>Array.&lt;ConditionRow&gt;</code>
        * [.securityCondition(tableName, opKind, environment)](#module_Security..Security+securityCondition) ⇒ <code>sqlFun</code>
        * [.canPost(r, env)](#module_Security..Security+canPost)
    * [~SecurityProvider](#module_Security..SecurityProvider)
        * [new SecurityProvider(conn)](#new_module_Security..SecurityProvider_new)
    * [~ConditionRow](#module_Security..ConditionRow) : <code>Object</code>
    * [~Deferred](#module_Security..Deferred)

<a name="module_Security..Security"></a>

### Security~Security
Security

**Kind**: inner class of [<code>Security</code>](#module_Security)  

* [~Security](#module_Security..Security)
    * [new Security()](#new_module_Security..Security_new)
    * [.addTableOpCondition(tableName, op, condition)](#module_Security..Security+addTableOpCondition)
    * [.getTableOpConditions(tableName, op)](#module_Security..Security+getTableOpConditions) ⇒ <code>Array.&lt;ConditionRow&gt;</code>
    * [.getConditions(tableName, op, env)](#module_Security..Security+getConditions) ⇒ <code>Array.&lt;ConditionRow&gt;</code>
    * [.securityCondition(tableName, opKind, environment)](#module_Security..Security+securityCondition) ⇒ <code>sqlFun</code>
    * [.canPost(r, env)](#module_Security..Security+canPost)

<a name="new_module_Security..Security_new"></a>

#### new Security()
Class that manages a set of conditions

<a name="module_Security..Security+addTableOpCondition"></a>

#### security.addTableOpCondition(tableName, op, condition)
Adds condition for a specified table/operation combination, merging to existent.Every condition

**Kind**: instance method of [<code>Security</code>](#module_Security..Security)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| op | <code>string</code> | 
| condition | <code>ConditionRow</code> | 

<a name="module_Security..Security+getTableOpConditions"></a>

#### security.getTableOpConditions(tableName, op) ⇒ <code>Array.&lt;ConditionRow&gt;</code>
Get all table/operation conditions for any environment

**Kind**: instance method of [<code>Security</code>](#module_Security..Security)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| op | <code>string</code> | 

<a name="module_Security..Security+getConditions"></a>

#### security.getConditions(tableName, op, env) ⇒ <code>Array.&lt;ConditionRow&gt;</code>
Gets security conditions for an operation in the specified environment context.Those are filtered basing on usergrouplist of the environment, that has to include idcustomgroup property value of the ConditionRow. If environment does not contain idcustomgroup  field, then all matching table/op conditions are taken

**Kind**: instance method of [<code>Security</code>](#module_Security..Security)  

| Param | Type |
| --- | --- |
| tableName |  | 
| op | <code>string</code> | 
| env | <code>Environment</code> | 

<a name="module_Security..Security+securityCondition"></a>

#### security.securityCondition(tableName, opKind, environment) ⇒ <code>sqlFun</code>
Evaluates the SecurityCondition about a combination of tableName/opKind in the specified environmentRequires environment.sys("idcustomgroup") to have been already evaluated

**Kind**: instance method of [<code>Security</code>](#module_Security..Security)  

| Param | Type |
| --- | --- |
| tableName | <code>string</code> | 
| opKind | <code>string</code> | 
| environment | <code>Environment</code> | 

<a name="module_Security..Security+canPost"></a>

#### security.canPost(r, env)
**Kind**: instance method of [<code>Security</code>](#module_Security..Security)  

| Param | Type |
| --- | --- |
| r | <code>ObjectRow</code> | 
| env | <code>Environment</code> | 

<a name="module_Security..SecurityProvider"></a>

### Security~SecurityProvider
**Kind**: inner class of [<code>Security</code>](#module_Security)  
<a name="new_module_Security..SecurityProvider_new"></a>

#### new SecurityProvider(conn)
Reads all data from customgroupoperation and compiles expression strings into sqlFun.Creates ConditionRow items from rows stored on db, in order to create a Security object


| Param | Type |
| --- | --- |
| conn | <code>DataAccess</code> | 

<a name="module_Security..ConditionRow"></a>

### Security~ConditionRow : <code>Object</code>
if defaultIsDeny the meaning is allow and not deny. If deny is not set then the meaning is allowOtherwise the meaning is not deny or allow. If allow is not set then the meaning is not deny

**Kind**: inner typedef of [<code>Security</code>](#module_Security)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| idcustomgroup | <code>object</code> | id of the user group this condition belongs to |
| tablename | <code>string</code> |  |
| op | <code>string</code> | I/U/D/S/P |
| defaultIsDeny | <code>boolean</code> | if true default is deny all, otherwise is allow all |
| [denyCondition] | <code>sqlFun</code> |  |
| [allowCondition] | <code>sqlFun</code> |  |

<a name="module_Security..Deferred"></a>

### Security~Deferred
**Kind**: inner typedef of [<code>Security</code>](#module_Security)  
