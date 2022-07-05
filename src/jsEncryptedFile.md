## Classes

<dl>
<dt><a href="#EncryptedFile">EncryptedFile</a></dt>
<dd></dd>
<dt><a href="#EncryptedFile">EncryptedFile</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setDefaultSecret">setDefaultSecret(secret)</a></dt>
<dd><p>Set default secret for subsequent invocation of the constructor</p>
</dd>
<dt><a href="#read">read()</a> ⇒ <code>null</code> | <code>*</code></dt>
<dd><p>Read data from file</p>
</dd>
<dt><a href="#write">write()</a> ⇒ <code>null</code> | <code>*</code></dt>
<dd><p>Persist the data writing it in the linked file</p>
</dd>
</dl>

<a name="EncryptedFile"></a>

## EncryptedFile
**Kind**: global class  

* [EncryptedFile](#EncryptedFile)
    * [new EncryptedFile()](#new_EncryptedFile_new)
    * [new EncryptedFile(options)](#new_EncryptedFile_new)

<a name="new_EncryptedFile_new"></a>

### new EncryptedFile()
Encriptor/decriptor class

<a name="new_EncryptedFile_new"></a>

### new EncryptedFile(options)

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| [options.fileName] | <code>string</code> | Name of the clean file to encrypt |
| [options.encryptedFileName] | <code>string</code> | name of the encrypted file |
| options.encrypt | <code>boolean</code> | true if the file has to be encrypted |
| options.decrypt | <code>boolean</code> | true if the file has to be decrypted |
| [options.secret] | <code>object</code> | object containing key,iv,pwd to replace the config |

<a name="EncryptedFile"></a>

## EncryptedFile
**Kind**: global class  

* [EncryptedFile](#EncryptedFile)
    * [new EncryptedFile()](#new_EncryptedFile_new)
    * [new EncryptedFile(options)](#new_EncryptedFile_new)

<a name="new_EncryptedFile_new"></a>

### new EncryptedFile()
Encriptor/decriptor class

<a name="new_EncryptedFile_new"></a>

### new EncryptedFile(options)

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| [options.fileName] | <code>string</code> | Name of the clean file to encrypt |
| [options.encryptedFileName] | <code>string</code> | name of the encrypted file |
| options.encrypt | <code>boolean</code> | true if the file has to be encrypted |
| options.decrypt | <code>boolean</code> | true if the file has to be decrypted |
| [options.secret] | <code>object</code> | object containing key,iv,pwd to replace the config |

<a name="setDefaultSecret"></a>

## setDefaultSecret(secret)
Set default secret for subsequent invocation of the constructor

**Kind**: global function  

| Param |
| --- |
| secret | 

**Example**  
```js
setDefaultSecret({key: C.enc.Hex.parse('0001020304050607'),                  iv: C.enc.Hex.parse('08090a0b0c0d0e0f'),                  pwd: 'abs!sds28a'                 });
```
<a name="read"></a>

## read() ⇒ <code>null</code> \| <code>\*</code>
Read data from file

**Kind**: global function  
<a name="write"></a>

## write() ⇒ <code>null</code> \| <code>\*</code>
Persist the data writing it in the linked file

**Kind**: global function  
