<a name="module_Password"></a>

## Password
Manages password hashing


* [Password](#module_Password)
    * [~verify(password, salt, secureHash, iterations)](#module_Password..verify) ⇒ <code>boolean</code>
    * [~generateHash(password, salt, iterations)](#module_Password..generateHash) ⇒ <code>Buffer</code>
    * [~generateRandomBytes(len)](#module_Password..generateRandomBytes) ⇒ <code>Buffer</code>
    * [~generateSalt()](#module_Password..generateSalt) ⇒ <code>Buffer</code>
    * [~generatePassword()](#module_Password..generatePassword) ⇒ <code>string</code>
    * [~generateCode()](#module_Password..generateCode) ⇒ <code>string</code>

<a name="module_Password..verify"></a>

### Password~verify(password, salt, secureHash, iterations) ⇒ <code>boolean</code>
Verifies the hash for a password

**Kind**: inner method of [<code>Password</code>](#module_Password)  

| Param | Type |
| --- | --- |
| password | <code>string</code> | 
| salt | <code>Buffer</code> | 
| secureHash | <code>Buffer</code> | 
| iterations | <code>int</code> | 

<a name="module_Password..generateHash"></a>

### Password~generateHash(password, salt, iterations) ⇒ <code>Buffer</code>
Generates an hash for a password

**Kind**: inner method of [<code>Password</code>](#module_Password)  

| Param | Type |
| --- | --- |
| password | <code>string</code> | 
| salt | <code>Buffer</code> | 
| iterations | <code>int</code> | 

<a name="module_Password..generateRandomBytes"></a>

### Password~generateRandomBytes(len) ⇒ <code>Buffer</code>
Generates an array of random bytes of the specified size

**Kind**: inner method of [<code>Password</code>](#module_Password)  

| Param | Type |
| --- | --- |
| len | <code>int</code> | 

<a name="module_Password..generateSalt"></a>

### Password~generateSalt() ⇒ <code>Buffer</code>
**Kind**: inner method of [<code>Password</code>](#module_Password)  
<a name="module_Password..generatePassword"></a>

### Password~generatePassword() ⇒ <code>string</code>
**Kind**: inner method of [<code>Password</code>](#module_Password)  
**Generates**: a random password  
<a name="module_Password..generateCode"></a>

### Password~generateCode() ⇒ <code>string</code>
Generates a random activation code

**Kind**: inner method of [<code>Password</code>](#module_Password)  
