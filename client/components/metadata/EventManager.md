<a name="module_EventManger"></a>

## EventManger
Manages the events communication


* [EventManger](#module_EventManger)
    * [~Delegate](#module_EventManger..Delegate)
        * [new Delegate(callBack, context)](#new_module_EventManger..Delegate_new)
    * [~Event](#module_EventManger..Event)
        * [new Event()](#new_module_EventManger..Event_new)
    * [~EventManager](#module_EventManger..EventManager)
        * [new EventManager()](#new_module_EventManger..EventManager_new)
    * [~Stabilizer](#module_EventManger..Stabilizer)
        * [new Stabilizer()](#new_module_EventManger..Stabilizer_new)
    * [~invoke(sender, [args])](#module_EventManger..invoke)
    * [~register(callBack, context)](#module_EventManger..register)
    * [~register(callBack, context)](#module_EventManger..register)
    * [~trigger(sender, [args])](#module_EventManger..trigger)
    * [~subscribe(eventType, callback, context)](#module_EventManger..subscribe)
    * [~subscribe(typeEvent, callback, context)](#module_EventManger..subscribe)
    * [~trigger(type, sender)](#module_EventManger..trigger)
    * [~increaseNesting([eventName])](#module_EventManger..increaseNesting)
    * [~decreaseNesting([eventName])](#module_EventManger..decreaseNesting)

<a name="module_EventManger..Delegate"></a>

### EventManger~Delegate
**Kind**: inner class of [<code>EventManger</code>](#module_EventManger)  
<a name="new_module_EventManger..Delegate_new"></a>

#### new Delegate(callBack, context)
Handler for calling methods of objects


| Param | Type |
| --- | --- |
| callBack | <code>function</code> | 
| context | <code>object</code> | 

<a name="module_EventManger..Event"></a>

### EventManger~Event
**Kind**: inner class of [<code>EventManger</code>](#module_EventManger)  
<a name="new_module_EventManger..Event_new"></a>

#### new Event()
Manages a set of delegates

<a name="module_EventManger..EventManager"></a>

### EventManger~EventManager
**Kind**: inner class of [<code>EventManger</code>](#module_EventManger)  
<a name="new_module_EventManger..EventManager_new"></a>

#### new EventManager()
Creates a new instance of an EventManager. Adds or removes event form the event collection

<a name="module_EventManger..Stabilizer"></a>

### EventManger~Stabilizer
**Kind**: inner class of [<code>EventManger</code>](#module_EventManger)  
<a name="new_module_EventManger..Stabilizer_new"></a>

#### new Stabilizer()
Class that helps waiting for events stabilization after some action, especially used in tests

<a name="module_EventManger..invoke"></a>

### EventManger~invoke(sender, [args])
Calls the function "callBack" with "this" the context and as parameters the sender plus other args

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sender | <code>object</code> | specifies the origin of the event |
| [args] | <code>\*</code> | optional parameters |

<a name="module_EventManger..register"></a>

### EventManger~register(callBack, context)
SYNCAdds a listener to the event. Id adds ea new Delegate object to the subscribers collection

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type |
| --- | --- |
| callBack | <code>function</code> | 
| context | <code>object</code> | 

<a name="module_EventManger..register"></a>

### EventManger~register(callBack, context)
SYNCRemoves a listener to the event

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type |
| --- | --- |
| callBack | <code>type</code> | 
| context | <code>type</code> | 

<a name="module_EventManger..trigger"></a>

### EventManger~trigger(sender, [args])
ASYNCInvokes all delegates linked to the event

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type |
| --- | --- |
| sender | <code>object</code> | 
| [args] | <code>Array.&lt;object&gt;</code> | 

<a name="module_EventManger..subscribe"></a>

### EventManger~subscribe(eventType, callback, context)
SYNCAttaches a listener "callback" to an event

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| eventType | <code>String</code> |  |
| callback | <code>function</code> |  |
| context | <code>Object</code> | this of the subscriber |

<a name="module_EventManger..subscribe"></a>

### EventManger~subscribe(typeEvent, callback, context)
SYNCDetaches a listener "callback" from an event

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type |
| --- | --- |
| typeEvent | <code>object</code> | 
| callback | <code>function</code> | 
| context | <code>object</code> | 

<a name="module_EventManger..trigger"></a>

### EventManger~trigger(type, sender)
SYNCInvokes all listener's delegates, this is ASYNC

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  
**Paran**: <code>object</code> params  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 
| sender | <code>object</code> | 

<a name="module_EventManger..increaseNesting"></a>

### EventManger~increaseNesting([eventName])
Increase number of open Deferred

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type |
| --- | --- |
| [eventName] | <code>string</code> | 

<a name="module_EventManger..decreaseNesting"></a>

### EventManger~decreaseNesting([eventName])
Decrease number of open Deferred

**Kind**: inner method of [<code>EventManger</code>](#module_EventManger)  
**Access**: public  

| Param | Type |
| --- | --- |
| [eventName] | <code>string</code> | 

