## Classes

<dl>
<dt><a href="#Identity">Identity</a></dt>
<dd></dd>
<dt><a href="#Token">Token</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getIdentityFromRequest">getIdentityFromRequest(req)</a> ⇒ <code><a href="#Identity">Identity</a></code></dt>
<dd><p>If request has a token, it returns it&#39;s identity otherwise returns an anonymous identity</p>
</dd>
<dt><a href="#setMasterKey">setMasterKey(key)</a> ⇒</dt>
<dd></dd>
<dt><a href="#checkToken">checkToken(req, res, next)</a> ⇒ <code>*</code></dt>
<dd><p>Middleware that assures there is a syntactical valid token, eventually an anonymous one, attached
 to the request. Decodes the token into request.auth or whatever property specified in config</p>
</dd>
<dt><a href="#generateMasterKey">generateMasterKey()</a></dt>
<dd></dd>
<dt><a href="#assureMasterKey">assureMasterKey()</a></dt>
<dd><p>Assures there that a masterKey is set, creates it if does not already exists</p>
</dd>
</dl>

<a name="Identity"></a>

## Identity
**Kind**: global class  
<a name="new_Identity_new"></a>

### new Identity()
Creates an Identity, or an anonymous identity if options parameter is not givensee https://datatracker.ietf.org/doc/html/rfc7519#page-9


| Param | Type | Description |
| --- | --- | --- |
| options.title | <code>string</code> |  |
| options.idflowchart | <code>string</code> |  |
| options.ndetail | <code>string</code> |  |
| options.name | <code>string</code> | The subject value MUST either be scoped to be locally unique in the context of the issuer or be globally unique |
| options.title | <code>string</code> |  |
| options.sessionguid | <code>string</code> |  |
| options.email | <code>string</code> |  |
| options.roles | <code>Array.&lt;string&gt;</code> | // possible values: user, admin, default ["user"] |

<a name="Token"></a>

## Token
**Kind**: global class  

* [Token](#Token)
    * [new Token(req, [identity])](#new_Token_new)
    * [.getToken()](#Token+getToken) ⇒ <code>string</code>
    * [.setInRequest(req, token)](#Token+setInRequest)
    * [.getObjectToken()](#Token+getObjectToken) ⇒ <code>Object.&lt;sub:string, aud:Object, guidsession:Object, nDetail:string.roles:Array.&lt;string&gt;, IsAnonymous:boolean, title:string, idFlowChart:string, email:string&gt;</code>
    * [.decode(token)](#Token+decode) ⇒
    * [.encode(data)](#Token+encode) ⇒ <code>string</code>

<a name="new_Token_new"></a>

### new Token(req, [identity])
Creates a token from an identity , taking ip address from requestsee https://datatracker.ietf.org/doc/html/rfc7519#page-9


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Request</code> |  |
| [identity] | [<code>Identity</code>](#Identity) | if omitted an anonymous identity is created |

<a name="Token+getToken"></a>

### token.getToken() ⇒ <code>string</code>
Evaluates the encripted token to be used in response

**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+setInRequest"></a>

### token.setInRequest(req, token)
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| token | [<code>Token</code>](#Token) | 

<a name="Token+getObjectToken"></a>

### token.getObjectToken() ⇒ <code>Object.&lt;sub:string, aud:Object, guidsession:Object, nDetail:string.roles:Array.&lt;string&gt;, IsAnonymous:boolean, title:string, idFlowChart:string, email:string&gt;</code>
Returns the public token structure:sub is Identity.namenDetail is Identity.ndetailroles is Token.roles or Identity.rolesIsAnonymous is Token.IsAnonymoustitle is Token.title or Identity.titleidFlowChart is Identity.idflowchartemail is Identity.email

**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+decode"></a>

### token.decode(token) ⇒
Decodes a token into original data

**Kind**: instance method of [<code>Token</code>](#Token)  
**Returns**: object or null if errors  

| Param | Type |
| --- | --- |
| token | <code>string</code> | 

<a name="Token+encode"></a>

### token.encode(data) ⇒ <code>string</code>
Generates a token from a given set of data

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param |
| --- |
| data | 

<a name="getIdentityFromRequest"></a>

## getIdentityFromRequest(req) ⇒ [<code>Identity</code>](#Identity)
If request has a token, it returns it's identity otherwise returns an anonymous identity

**Kind**: global function  

| Param |
| --- |
| req | 

<a name="setMasterKey"></a>

## setMasterKey(key) ⇒
**Kind**: global function  
**Returns**: *  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="checkToken"></a>

## checkToken(req, res, next) ⇒ <code>\*</code>
Middleware that assures there is a syntactical valid token, eventually an anonymous one, attached to the request. Decodes the token into request.auth or whatever property specified in config

**Kind**: global function  

| Param |
| --- |
| req | 
| res | 
| next | 

<a name="generateMasterKey"></a>

## generateMasterKey()
**Kind**: global function  
<a name="assureMasterKey"></a>

## assureMasterKey()
Assures there that a masterKey is set, creates it if does not already exists

**Kind**: global function  
