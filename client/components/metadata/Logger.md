<a name="module_Logger"></a>

## Logger
Contains the method to log the messages on user javascript console


* [Logger](#module_Logger)
    * [~Logger](#module_Logger..Logger)
        * [new Logger()](#new_module_Logger..Logger_new)
    * [~logTypeEnum](#module_Logger..logTypeEnum) : <code>Object</code>
    * [~log(type)](#module_Logger..log)
    * [~getTime()](#module_Logger..getTime) ⇒ <code>string</code>
    * [~getTimeMs()](#module_Logger..getTimeMs) ⇒ <code>string</code>

<a name="module_Logger..Logger"></a>

### Logger~Logger
**Kind**: inner class of [<code>Logger</code>](#module_Logger)  
<a name="new_module_Logger..Logger_new"></a>

#### new Logger()
Initializes the level of the log (it depends on logTypeEnum values)

<a name="module_Logger..logTypeEnum"></a>

### Logger~logTypeEnum : <code>Object</code>
**Kind**: inner constant of [<code>Logger</code>](#module_Logger)  
<a name="module_Logger..log"></a>

### Logger~log(type)
SYNCDepending on the "type" it prints on the console some information.There several type of information (see enum logTypeEnum)

**Kind**: inner method of [<code>Logger</code>](#module_Logger)  
**Access**: public  

| Param | Type |
| --- | --- |
| type | <code>logTypeEnum</code> | 

<a name="module_Logger..getTime"></a>

### Logger~getTime() ⇒ <code>string</code>
SYNCReturns the string that represent the actual date. The format is: hh:mm:ss

**Kind**: inner method of [<code>Logger</code>](#module_Logger)  
**Access**: public  
<a name="module_Logger..getTimeMs"></a>

### Logger~getTimeMs() ⇒ <code>string</code>
SYNCReturns the string that represent the actual date. The format is: hh:mm:ss

**Kind**: inner method of [<code>Logger</code>](#module_Logger)  
**Access**: public  
