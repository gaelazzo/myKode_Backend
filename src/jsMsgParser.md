<a name="MsgParser"></a>

## MsgParser
**Kind**: global class  

* [MsgParser](#MsgParser)
    * [new MsgParser(message, startToken, stopToken)](#new_MsgParser_new)
    * [.reset()](#MsgParser+reset)
    * [.getNext()](#MsgParser+getNext) ⇒ <code>Object</code>

<a name="new_MsgParser_new"></a>

### new MsgParser(message, startToken, stopToken)
Extracts subsequent strings delimited by startToken and stopToken


| Param | Type |
| --- | --- |
| message | <code>string</code> | 
| startToken | <code>string</code> | 
| stopToken | <code>string</code> | 

<a name="MsgParser+reset"></a>

### msgParser.reset()
Restarts parsing

**Kind**: instance method of [<code>MsgParser</code>](#MsgParser)  
<a name="MsgParser+getNext"></a>

### msgParser.getNext() ⇒ <code>Object</code>
**Kind**: instance method of [<code>MsgParser</code>](#MsgParser)  
**Access**: public  
