## Functions

<dl>
<dt><a href="#serializeMessage">serializeMessage(msg)</a> ⇒ <code><a href="#BusinessMessageData">BusinessMessageData</a></code></dt>
<dd></dd>
<dt><a href="#deserializeMessage">deserializeMessage(msg)</a> ⇒ <code>BusinessMessage</code></dt>
<dd><p>Deserialize a message</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BusinessMessageData">BusinessMessageData</a></dt>
<dd></dd>
</dl>

<a name="serializeMessage"></a>

## serializeMessage(msg) ⇒ [<code>BusinessMessageData</code>](#BusinessMessageData)
**Kind**: global function  

| Param | Type |
| --- | --- |
| msg | <code>BusinessMessage</code> | 

<a name="deserializeMessage"></a>

## deserializeMessage(msg) ⇒ <code>BusinessMessage</code>
Deserialize a message

**Kind**: global function  

| Param | Type |
| --- | --- |
| msg | [<code>BusinessMessageData</code>](#BusinessMessageData) | 

<a name="BusinessMessageData"></a>

## BusinessMessageData
**Kind**: global typedef  
**Properties**

| Name |
| --- |
| id:string | 
| description:string | 
| audit:string | 
| severity:string | 
| table:string | 
| canIgnore:bool | 

