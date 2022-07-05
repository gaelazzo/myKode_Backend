## Classes

<dl>
<dt><a href="#OperatorDescriptor">OperatorDescriptor</a></dt>
<dd></dd>
<dt><a href="#BuildingExpression">BuildingExpression</a></dt>
<dd></dd>
<dt><a href="#EnvironmentExpression">EnvironmentExpression</a></dt>
<dd></dd>
<dt><a href="#ConstantExpression">ConstantExpression</a></dt>
<dd></dd>
<dt><a href="#FieldExpression">FieldExpression</a></dt>
<dd></dd>
<dt><a href="#Token">Token</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#build">build()</a> ⇒ <code>sqlFun</code></dt>
<dd></dd>
<dt><a href="#JsDataQueryParser">JsDataQueryParser()</a></dt>
<dd><p>Class able to transform a string into a jsDataQuery</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#stringPos">stringPos</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="OperatorDescriptor"></a>

## OperatorDescriptor
**Kind**: global class  

* [OperatorDescriptor](#OperatorDescriptor)
    * [new OperatorDescriptor()](#new_OperatorDescriptor_new)
    * [.unaryPrefixed](#OperatorDescriptor+unaryPrefixed) : <code>boolean</code>
    * [.unaryPostfixed](#OperatorDescriptor+unaryPostfixed) : <code>boolean</code>
    * [.binary](#OperatorDescriptor+binary) : <code>boolean</code>
    * [.nary](#OperatorDescriptor+nary) : <code>boolean</code>
    * [.evaluationOrder](#OperatorDescriptor+evaluationOrder) : <code>number</code>
    * [.precedesList](#OperatorDescriptor+precedesList) : <code>boolean</code>

<a name="new_OperatorDescriptor_new"></a>

### new OperatorDescriptor()
Information on an operator

<a name="OperatorDescriptor+unaryPrefixed"></a>

### operatorDescriptor.unaryPrefixed : <code>boolean</code>
Operator is unary prefixed

**Kind**: instance property of [<code>OperatorDescriptor</code>](#OperatorDescriptor)  
<a name="OperatorDescriptor+unaryPostfixed"></a>

### operatorDescriptor.unaryPostfixed : <code>boolean</code>
Operator  is unary postfixed

**Kind**: instance property of [<code>OperatorDescriptor</code>](#OperatorDescriptor)  
<a name="OperatorDescriptor+binary"></a>

### operatorDescriptor.binary : <code>boolean</code>
Operator is unary binary

**Kind**: instance property of [<code>OperatorDescriptor</code>](#OperatorDescriptor)  
<a name="OperatorDescriptor+nary"></a>

### operatorDescriptor.nary : <code>boolean</code>
Operator is n-ary

**Kind**: instance property of [<code>OperatorDescriptor</code>](#OperatorDescriptor)  
<a name="OperatorDescriptor+evaluationOrder"></a>

### operatorDescriptor.evaluationOrder : <code>number</code>
Evaluation order of operator

**Kind**: instance property of [<code>OperatorDescriptor</code>](#OperatorDescriptor)  
<a name="OperatorDescriptor+precedesList"></a>

### operatorDescriptor.precedesList : <code>boolean</code>
Operator precededs a list

**Kind**: instance property of [<code>OperatorDescriptor</code>](#OperatorDescriptor)  
<a name="BuildingExpression"></a>

## BuildingExpression
**Kind**: global class  

* [BuildingExpression](#BuildingExpression)
    * [new BuildingExpression(parent)](#new_BuildingExpression_new)
    * [.addOperand(expr)](#BuildingExpression+addOperand)
    * [.createChildExpression()](#BuildingExpression+createChildExpression)
    * [.outerExpression()](#BuildingExpression+outerExpression) ⇒ [<code>BuildingExpression</code>](#BuildingExpression)
    * [.build()](#BuildingExpression+build) ⇒ <code>sqlFun</code> \| <code>null</code>
    * [.createParentesizedExpression(child)](#BuildingExpression+createParentesizedExpression)
    * [.createList(parent)](#BuildingExpression+createList)
    * [.appendExpression(op)](#BuildingExpression+appendExpression) ⇒ [<code>BuildingExpression</code>](#BuildingExpression)
    * [.nextParentList()](#BuildingExpression+nextParentList)

<a name="new_BuildingExpression_new"></a>

### new BuildingExpression(parent)
Helper class to build jsDataQuery


| Param | Type |
| --- | --- |
| parent | [<code>BuildingExpression</code>](#BuildingExpression) | 

<a name="BuildingExpression+addOperand"></a>

### buildingExpression.addOperand(expr)
**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  

| Param | Type |
| --- | --- |
| expr | [<code>BuildingExpression</code>](#BuildingExpression) | 

<a name="BuildingExpression+createChildExpression"></a>

### buildingExpression.createChildExpression()
creates a new expression as a child of this one, so that the new expression is an operand of the current one. Useful if operator is we have  a+b+c+d   and then comes *, or we have a &lt; b   and then comes + i.e. if evaluation order of new operator is less than the current one The new expression has last operand as first operand, so the result is (a+b+c+(d*... Returns the new created child expression, in this example d*

**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  
<a name="BuildingExpression+outerExpression"></a>

### buildingExpression.outerExpression() ⇒ [<code>BuildingExpression</code>](#BuildingExpression)
**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  
<a name="BuildingExpression+build"></a>

### buildingExpression.build() ⇒ <code>sqlFun</code> \| <code>null</code>
**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  
<a name="BuildingExpression+createParentesizedExpression"></a>

### buildingExpression.createParentesizedExpression(child)
Creates an operation in parentheses into a parent expression

**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  

| Param | Type |
| --- | --- |
| child | [<code>BuildingExpression</code>](#BuildingExpression) | 

<a name="BuildingExpression+createList"></a>

### buildingExpression.createList(parent)
Creates an operation into a parent expression

**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  

| Param | Type |
| --- | --- |
| parent | [<code>BuildingExpression</code>](#BuildingExpression) | 

<a name="BuildingExpression+appendExpression"></a>

### buildingExpression.appendExpression(op) ⇒ [<code>BuildingExpression</code>](#BuildingExpression)
**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  

| Param | Type |
| --- | --- |
| op | [<code>OperatorDescriptor</code>](#OperatorDescriptor) | 

<a name="BuildingExpression+nextParentList"></a>

### buildingExpression.nextParentList()
Gets the root expression

**Kind**: instance method of [<code>BuildingExpression</code>](#BuildingExpression)  
<a name="EnvironmentExpression"></a>

## EnvironmentExpression
**Kind**: global class  

* [EnvironmentExpression](#EnvironmentExpression)
    * [new EnvironmentExpression(parent, value)](#new_EnvironmentExpression_new)
    * [.build()](#EnvironmentExpression+build) ⇒ <code>sqlFun</code>

<a name="new_EnvironmentExpression_new"></a>

### new EnvironmentExpression(parent, value)

| Param | Type |
| --- | --- |
| parent | [<code>BuildingExpression</code>](#BuildingExpression) | 
| value | <code>string</code> | 

<a name="EnvironmentExpression+build"></a>

### environmentExpression.build() ⇒ <code>sqlFun</code>
**Kind**: instance method of [<code>EnvironmentExpression</code>](#EnvironmentExpression)  
<a name="ConstantExpression"></a>

## ConstantExpression
**Kind**: global class  
<a name="new_ConstantExpression_new"></a>

### new ConstantExpression(parent, value)

| Param | Type |
| --- | --- |
| parent | [<code>BuildingExpression</code>](#BuildingExpression) | 
| value | <code>string</code> | 

<a name="FieldExpression"></a>

## FieldExpression
**Kind**: global class  
<a name="new_FieldExpression_new"></a>

### new FieldExpression(parent, fieldName)

| Param | Type |
| --- | --- |
| parent | [<code>BuildingExpression</code>](#BuildingExpression) | 
| fieldName | <code>string</code> | 

<a name="Token"></a>

## Token
**Kind**: global class  

* [Token](#Token)
    * [new Token(kind, value)](#new_Token_new)
    * [.anyKeyStartsWith(prefix, descriptors)](#Token+anyKeyStartsWith) ⇒ <code>boolean</code>
    * [.isOperator(c)](#Token+isOperator)
    * [.isAlfaNum(c)](#Token+isAlfaNum)
    * [.isAlfa(c)](#Token+isAlfa)
    * [.normalize(sqlCmd)](#Token+normalize) ⇒ <code>string</code>
    * [.isSpace(c)](#Token+isSpace) ⇒ <code>boolean</code>
    * [.skipSpaces(s, currPos)](#Token+skipSpaces) ⇒ <code>int</code>
    * [.getDescriptorOf()](#Token+getDescriptorOf) ⇒ <code>null</code> \| [<code>OperatorDescriptor</code>](#OperatorDescriptor)
    * [.getAlfaSequence(s, currPos)](#Token+getAlfaSequence) ⇒ [<code>stringPos</code>](#stringPos)
    * [.getOperator(s, currPos)](#Token+getOperator) ⇒ <code>Object</code>
    * [.getAlfaToken(s, currPos)](#Token+getAlfaToken) ⇒ <code>Object</code>
    * [.getTokenOfClass(s, currPos, classElements, testFun)](#Token+getTokenOfClass) ⇒ <code>Object</code>
    * [.getConstantNumeric(s, currPos)](#Token+getConstantNumeric) ⇒ <code>Object</code>
    * [.getConstantString(s, currPos)](#Token+getConstantString) ⇒ <code>Object</code>
    * [.getToken(s, currPos)](#Token+getToken) ⇒ <code>Object</code>

<a name="new_Token_new"></a>

### new Token(kind, value)

| Param | Type |
| --- | --- |
| kind | [<code>TokenKind</code>](#TokenKind) | 
| value | <code>object</code> | 

<a name="Token+anyKeyStartsWith"></a>

### token.anyKeyStartsWith(prefix, descriptors) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| prefix | <code>string</code> | 
| descriptors | <code>Object</code> | 

<a name="Token+isOperator"></a>

### token.isOperator(c)
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| c | <code>char</code> | 

<a name="Token+isAlfaNum"></a>

### token.isAlfaNum(c)
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| c | <code>char</code> | 

<a name="Token+isAlfa"></a>

### token.isAlfa(c)
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| c | <code>char</code> | 

<a name="Token+normalize"></a>

### token.normalize(sqlCmd) ⇒ <code>string</code>
Rimuove tutti i spazi consecutivi tranne che nelle stringhe

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param |
| --- |
| sqlCmd | 

<a name="Token+isSpace"></a>

### token.isSpace(c) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param |
| --- |
| c | 

<a name="Token+skipSpaces"></a>

### token.skipSpaces(s, currPos) ⇒ <code>int</code>
Salta tutti gli spazi a partire dalla posizione corrente

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="Token+getDescriptorOf"></a>

### token.getDescriptorOf() ⇒ <code>null</code> \| [<code>OperatorDescriptor</code>](#OperatorDescriptor)
**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+getAlfaSequence"></a>

### token.getAlfaSequence(s, currPos) ⇒ [<code>stringPos</code>](#stringPos)
get next alfanumeric sequene

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="Token+getOperator"></a>

### token.getOperator(s, currPos) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="Token+getAlfaToken"></a>

### token.getAlfaToken(s, currPos) ⇒ <code>Object</code>
Gets an alfa operator or a field name. Note that an alfa operator may contain spaces, while an identifier does not.

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="Token+getTokenOfClass"></a>

### token.getTokenOfClass(s, currPos, classElements, testFun) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 
| classElements | <code>Object</code> | 
| testFun | <code>function</code> | 

<a name="Token+getConstantNumeric"></a>

### token.getConstantNumeric(s, currPos) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="Token+getConstantString"></a>

### token.getConstantString(s, currPos) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="Token+getToken"></a>

### token.getToken(s, currPos) ⇒ <code>Object</code>
Read a token from a string

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 

<a name="TokenKind"></a>

## TokenKind
notFound|constant|fieldName|operator|openPar|closedPar|endOfString|comma|openEnvironment|closeEnvironment

**Kind**: global enum  
**Properties**

| Name | Default | Description |
| --- | --- | --- |
| notFound | <code>0</code> | unknown token |
| constant | <code>1</code> | numeric or string, for now we ignore date constants |
| fieldName | <code>2</code> | Field name |
| operator | <code>3</code> | Operator |
| openPar | <code>4</code> |  |
| closedPar | <code>5</code> |  |
| endOfString | <code>6</code> |  |
| comma | <code>7</code> |  |
| openEnvironment | <code>8</code> |  |
| closeEnvironment | <code>9</code> |  |

<a name="build"></a>

## build() ⇒ <code>sqlFun</code>
**Kind**: global function  
<a name="JsDataQueryParser"></a>

## JsDataQueryParser()
Class able to transform a string into a jsDataQuery

**Kind**: global function  

* [JsDataQueryParser()](#JsDataQueryParser)
    * [.from](#JsDataQueryParser+from)
        * [new from(s)](#new_JsDataQueryParser+from_new)
    * [.getExpression(s, currPos, wantsList)](#JsDataQueryParser+getExpression) ⇒ <code>Object</code>

<a name="JsDataQueryParser+from"></a>

### jsDataQueryParser.from
**Kind**: instance class of [<code>JsDataQueryParser</code>](#JsDataQueryParser)  
<a name="new_JsDataQueryParser+from_new"></a>

#### new from(s)

| Param | Type |
| --- | --- |
| s | <code>string</code> \| <code>null</code> | 

<a name="JsDataQueryParser+getExpression"></a>

### jsDataQueryParser.getExpression(s, currPos, wantsList) ⇒ <code>Object</code>
**Kind**: instance method of [<code>JsDataQueryParser</code>](#JsDataQueryParser)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 
| currPos | <code>int</code> | 
| wantsList | <code>boolean</code> | 

<a name="stringPos"></a>

## stringPos : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| res | <code>string</code> \| <code>null</code> | 
| currPos | <code>int</code> | 

