# jsDataQuery
Query functions convertable into sql expressions

jsDoc documents available [here](client/components/metadata/jsDataQuery.md)

jsDataQuery allow building generic expression {*sqlFun*} that can be applied to javascript objects. 
Then it is possible to convert that expression into a sql-readable string, simply invoking the toSql method of the object.

Representing an expression, a sqlFun is a tree-like composition of other sqlFun, where the leaves are constant expressions.

A sqlFun, as a whole, is essentially a function f(o) that takes an object and applies an expression involving the properties of
the object o. So in the expression we can access o's properties by the function field(fieldName), where field is 
a sqlFun itself.

Some sqlFun examples:


    f = q.const(3) //a constant function with value 3, so f(x)=3 for any x 
    f = q.eq("a",3) //a function that compares the field named "a" with 3 and returns true if they are equal. So
    f(x) is true if x.a==3
    f = q.and( q.ge("b",2), q.le("b",4)); // f(x) true when x.b>= 2 & x.b<=4
    f = q.or (q.eq("a",2), q.gt("b",3)) // f(x) true if x.a===2 | x.b>3

Search a value in an array:

      let x = [{a:1,b:2}, {a:2,b:2}, {a:3,b:1}]
      let el = x.find(q.and(q.eq(a,2)); // el = {a:2,b:2}

so a sqlFun acts like any other expression, with the benefit that it is composable and that can be passed as a parameter
 as any other object.

So a sqlFun can be:

- applied to other object in order to evaluate the expression it represents
- converted into a string to visualize it 
- converted into a string in order to use that as a database expression
- serialized and deserialized in order to be transferred to remote client or services
 
As a further bonus, there is also a [facility class](src/jsDataQueryParser.js) capable to convert strings into sqlFunc.


**toSql** method is not specific to a single database provider, infact it uses a formatter that is external to the class.<br/>
So it's possible to query any kind of database with the same {*sqlFun*}, provided that when the function will be applied 
 to a specific database, the formatter for it will be provided.<br/>
So you don't have to care of specific sql-dialect when building  query. 
More, the same query will be also applicable to javascript objects.

For example,

    it('comparing values through field not equal', function () {
      var 	x = {a: 1, b: 2, c: 3},
    		f = $q.eq($q.field('a'), 2);
      expect(f(x)).toBeFalsy();
      x.a=2;
      expect(f(x)).toBeTruthy();
    });
    

sqlFun are also highly optimized so that if the engine detects they are simplifiable, they will be treated as constant 
 and not submitted in their original form:

    it('and of false function with other function should be the always false function', 	function(){
      		var xx = {a: 'AABBCC', q: '1'},
    			cond1 = $q.like('a', 'AAB_CC'),
    			cond2 = $q.eq('q', 1),
    			cond3 = $q.constant(false),
    		f = $q.and(cond1, cond2, cond3);
      		expect(f.isFalse).toBe(true);
    	});
Notice that f.isFalse is a property of the function, not the result of applying the function to a particolar argument. 
The engine has detected that f is a constant function.    

If some parts of an expression are undefined, the expression may still be successfully evaluated:

     it('and of a series of function including one undefined and one dinamically-false gives false', function () {
      	var xx = {a: 'AABBCC', q: '1'},
    		f = $q.and($q.like('a', 'AAB_CC'), $q.eq('q', 2), undefined);
      		expect(f(xx)).toBe(false);
    });

In this case f(xx) is false because xx['q']!== 2 so and-ing the value qith the the other function will be false, no matter if some of them are undefined.

For easy of using, many operator are "auto-fielded" in the first operand.
For example, without other specific indications, if you write

 `$q.eq('a',2)` 

it would mean "give me the function that compares the character constant 'a' whith 2".
But the first operand is actually "auto-fielded" so it is assumed by default, when it is a string constant,
to be the name of an identifier.

So it will be actually interpreted as:
"give me the function that compares the field named 'a' with 2"

In other words it is threated as the equivalent of

 `$q.eq($q.field('a'),2)`

  
where $q.field(x) is the function that applied to an object will return the field of that object named x:

     it('comparing values through field equal', function () {
      var 	x = {a: 1, b: 2, c: 3},
    		f = $q.eq($q.field('a'), 1);
			g = $q.eq('a', 1);
      	expect(f(x)).toBeTruthy();
      	expect(g(x)).toBeTruthy();
      	x.a=2;
      	expect(f(x)).toBeFalsy();
      	expect(g(x)).toBeFalsy();
    });

Here f and g are the function that compare the field named 'a' of the argument with the constant 1.

A sqlFun is requested in order to use many methods of [GetData](jsGetData.md), [DataAccess](DataAccess.md),
 [PostData](PostData.md). In other words, sqlFun are used in the framework wherever a filter or an expression
 is requested.



![](https://travis-ci.org/gaelazzo/jsDataQuery.svg?branch=master)     
