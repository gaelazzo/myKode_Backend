/*globals describe, beforeEach,it,expect,jasmine,spyOn */
/*jshint -W069 */


console.log("running jsDataQueryParserSpec");



const qParser = require('../../src/jsDataQueryParser').JsDataQueryParser,
        EnvExpr = require('../../src/jsDataQueryParser').EnvironmentExpression,
        BuildingExpr =  require('../../src/jsDataQueryParser').BuildingExpression,
    Token = require('../../src/jsDataQueryParser').Token,
    TokenKind =  require('../../src/jsDataQueryParser').TokenKind,
    q = require('./../../client/components/metadata/jsDataQuery');


const Deferred = require("JQDeferred");
const Environment = require('../data/jsDataQueryParser/fakeEnvironment'),
    getContext  =  require('../data/jsDataQueryParser/fakeContext').getContext,
    _ = require('lodash');


describe('BuildingExpression', function () {

    it('should be defined', function () {
        expect(BuildingExpr).toBeDefined();
    });
});

describe('Token', function () {

    it('should be defined', function () {
        expect(Token).toBeDefined();
    });
});


describe('Token', function () {
    describe('getToken NOT1', function () {
        it ("Get Token ",function(){
            let s="NOT1";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.fieldName);
            expect(t.res.value).toBe("NOT1");
            expect(t.currPos).toBe(s.length);
        });

        it ("Get Token NOT132 12",function(){
            let s="NOT132 12";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.fieldName);
            expect(t.res.value).toBe("NOT132");
            expect(t.currPos).toBe(t.res.value.length);
        });

        it ("Get Token NO1T13A2 12 A",function(){
            let s="NO1T13A2 12 A";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.fieldName);
            expect(t.res.value).toBe("NO1T13A2");
            expect(t.currPos).toBe(t.res.value.length);
        });

        it ("Get Token NOT",function(){
            let s="NOT";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe("not");
            expect(t.currPos).toBe(s.length);
        });

        it ("Get Token IS NULL",function(){
            let s="IS NULL";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(s.toLowerCase());
            expect(t.currPos).toBe(s.length);
        });


        it ("Get Token IS NOT NULL",function(){
            let s="IS NOT NULL";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(s.toLowerCase());
            expect(t.currPos).toBe(s.length);
        });

        it ("Get Token IS NOT NULL2",function(){
            let s="IS NOT NULL2";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.fieldName);
            expect(t.res.value).toBe("IS");
            expect(t.currPos).toBe("IS".length);
        });

        it ("Get Token IS NULL XX",function(){
            let s="IS NULL XX";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe("is null");
            expect(t.currPos).toBe(t.res.value.length);
        });


        it ("Get Token IS    NULL XX",function(){
            let s="IS    NULL XX";
            let ss= "IS NULL";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(ss.toLowerCase());
            expect(t.currPos).toBe("IS    NULL".length);
        });

        it ("Get Token ISNULL XX",function(){
            let s="ISNULL XX";
            let ss= "ISNULL";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(ss.toLowerCase());
            expect(t.currPos).toBe(ss.length);
        });

        it ("Get Token ISNULLO XX",function(){
            let s="ISNULLO XX";
            let ss= "ISNULLO";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.fieldName);
            expect(t.res.value).toBe(ss);
            expect(t.currPos).toBe(ss.length);
        });

        it ("Get Token IS NULLL XX",function(){
            let s="IS NULLL XX";
            let ss= "IS";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.fieldName);
            expect(t.res.value).toBe(ss);
            expect(t.currPos).toBe(ss.length);
        });

        it ("Get Token <=",function(){
            let s="<=";
            let ss= "<=";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(ss);
            expect(t.currPos).toBe(ss.length);
        });

        it ("Get Token <>",function(){
            let s="<>";
            let ss= "<>";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(ss);
            expect(t.currPos).toBe(ss.length);
        });

        it ("Get Token =",function(){
            let s="=";
            let ss= "=";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(ss);
            expect(t.currPos).toBe(ss.length);
        });

        it ("Get Token isnull(1,2)",function(){
            let s="isnull(1,2)";
            let ss= "isnull";
            let t = Token.prototype.getToken(s, 0);
            expect(t.res.kind).toBe(TokenKind.operator);
            expect(t.res.value).toBe(ss);
            expect(t.currPos).toBe(ss.length);
        });


    });





});

describe('JsDataQueryParser', function () {

    it('should be defined', function () {
        expect(qParser).toBeDefined();
    });
    it('null compiles to null', function () {
        let expr = qParser.prototype.from(null);
        expect(expr).toBeNull();
    });
    it('empty string compiles to null', function () {
        let expr = qParser.prototype.from("");
        expect(expr).toBeNull();
    });
    it('Truthy compiles to null', function () {
        let expr= qParser.prototype.from("(1=1)");
        expect(expr).toBeNull();
    });
    it('Falsy does not  compile to null', function () {
        let expr= qParser.prototype.from("(1=2)");
        expect(expr).not.toBeNull();
    });


    it('Compiling (1+a)=2', function () {
        let expr= qParser.prototype.from("(1+a)=2");
        expect(expr.toString()).toBe("(1+a)==2");
    });
    it('Compiling an expression with + and * 3*4*3+2*3+5', function () {
        let expr= qParser.prototype.from("3*4*3+2*3+5");
        expect(expr.toString()).toBe("47");
    });
    it('Compiling an expression with +,*,/ 3*4*3+2*3+5*2/2', function () {
        let expr= qParser.prototype.from("3*4*3+2*3+5*2/2");
        expect(expr.toString()).toBe("47");
    });
    it('Compiling an expression with a sequence of / 12/2/3', function () {
        let expr= qParser.prototype.from("12/2/3");
        expect(expr.toString()).toBe("2");
    });
    it('Compiling an expression with field +,*,/ 3*4*3+a*2*3+5*2/2', function () {
        let expr= qParser.prototype.from("3*4*3+a*2*3+5*2/2");
        expect(expr.toString()).toBe("36+a*2*3+5");
    });
    it('Compiling an expression with field +,*,/ 3*a +2 = 5 and b is not null', function () {
        let expr= qParser.prototype.from("3*a+2 = 5 and b is not null");
        expect(expr.toString()).toBe("3*a+2==5 AND b is not null");
    });
    it('Compiling an expression with field +,*,/ 5*3 = 2*5+5', function () {
        let expr= qParser.prototype.from("5*3 = 2*5+5");
        expect(expr).toBe(null);
    });
    it('Compiling an expression with field +,*,/ 5*3 = 2*5+4', function () {
        let expr= qParser.prototype.from("5*3 = 2*5+4");
        expect(expr.isFalse).toBe(true);
    });
    it('Compiling a in (1,2,3,4)', function () {
        let expr= qParser.prototype.from("a in (1,2,3,4)");
        expect(expr.toString()).toBe("a in (1,2,3,4)");
        let r = {a:4};
        expect(expr(r)).toBe(true);
        r = {a:8};
        expect(expr(r)).toBe(false);
        r = {c:8};
        expect(expr(r)).toBe(false);
        r = {c:8};
        expect(expr(r)).toBe(false);

    });



    it('Compiling an expression with field +,*,/ a is not null and b=5 and c>2 and d=\'a\'', function () {
        let expr= qParser.prototype.from("a is not null and b=5 and c>2 and d=\'a\'");
        expect(expr.toString()).toBe("a is not null AND b==5 AND c>2 AND d=='a'");
    });


    it('Compiling an expression with field +,*,/ a is not null and b=5 and c>2 and d=\'a\'\'b\'', function () {
        let expr= qParser.prototype.from("a is not null and b=5 and c>2 and d=\'a\'\'b");
        expect(expr.toString()).toBe("a is not null AND b==5 AND c>2 AND d=='a\'\'b'");
    });

    it('Compiling 12', function () {
        let expr= qParser.prototype.from("12");
        expect(expr.toString()).toBe("12");
    });
    it('Compiling 12.23', function () {
        let expr= qParser.prototype.from("12.23");
        expect(expr.toString()).toBe("12.23");
    });



    it('Compiling 12.123456', function () {
        let expr= qParser.prototype.from("12.123456");
        expect(expr.toString()).toBe("12.123456");
    });

    it('Compiling \'abcde 1\'2 and similar', function () {
        let expr= qParser.prototype.from("'abcde 1''2'");
        expect(expr.toString()).toBe("'abcde 1''2'");

        let s=  "\'abcde \'\' \'\'n asjkaj 292 1\'";
        let t= qParser.prototype.from( s);
        expect(t.toString()).toBe("\'abcde \'\' \'\'n asjkaj 292 1\'");
    });

    it('Compiling NOT1', function () {
        let expr= qParser.prototype.from("NOT1");
        expect(expr.myName).toBe("field");
        expect(expr.fieldName).toBe("NOT1");
    });

    it('Compiling an expression with field +,*,/ a is null ', function () {
        let expr= qParser.prototype.from("a is null");
        expect(expr.toString()).toBe("a is null");
    });

    it('Compiling an expression with field +,*,/ a is not null ', function () {
        let expr= qParser.prototype.from("a is null");
        expect(expr.toString()).toBe("a is null");
    });

    it('Compiling (a is not null)', function () {
        let expr= qParser.prototype.from("(a is not null)");
        expect(expr.toString()).toBe("(a is not null)");
    });

    it('Compiling (a is not null) and (b is null)', function () {
        let expr= qParser.prototype.from("(a is not null) and (b is null)");
        expect(expr.toString()).toBe("(a is not null) AND (b is null)");
    });

    it('Compiling a  is not  null and b is null and c=1 or z=\'a\'', function () {
        let s="a  is not  null and b is null and c=1 or z=\'a\'";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a is not null AND b is null AND c==1 OR z==\'a\'");
    });

    it('Compiling a  is not  null and b is null and c=1 or z=\'a\'', function () {
        let s="a  is not  null and b is null and c=1 or z='a' and q is null";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a is not null AND b is null AND c==1 OR z=='a' AND q is null");
        expect(expr.myName).toBe("or");
    });

    it('Compiling (a  is not  null and b is null and c=1 or z=\'a\') and q is null', function () {
        let s="(a  is not  null and b is null and c=1 or z='a') and q is null";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("(a is not null AND b is null AND c==1 OR z=='a') AND q is null");
        expect(expr.myName).toBe("and");
    });


    it('Compiling (a  is not  null or b is null) and q is null', function () {
        let s="(a  is not  null or b is null) and q is null";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("(a is not null OR b is null) AND q is null");
        expect(expr.myName).toBe("and");
    });

    it('Compiling q is null and (a  is not  null or b is null)', function () {
        let s="q is null and (a  is not  null or b is null)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("q is null AND (a is not null OR b is null)");
        expect(expr.myName).toBe("and");
    });

    it('Compiling q is null and (a  is not  null or b is null)', function () {
        let s="q is null and (a  is not  null or b is null)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("q is null AND (a is not null OR b is null)");
        expect(expr.myName).toBe("and");
    });

    it('Compiling  q is null and a  is not  null or b is null or c is null', function () {
        let s="q is null and a  is not  null or b is null or c is null";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("q is null AND a is not null OR b is null OR c is null");
        expect(expr.myName).toBe("or");
    });


    it('Compiling  q is null or a  is not  null and b is null and c is null', function () {
        let s="q is null or a  is not  null and b is null and c is null";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("q is null OR a is not null AND b is null AND c is null");
        expect(expr.myName).toBe("or");
    });

    it('Compiling q is null or a  is not  null and (b is null and c is null)', function () {
        let s="q is null or a  is not  null and (b is null and c is null)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("q is null OR a is not null AND (b is null AND c is null)");
        expect(expr.myName).toBe("or");
    });

    it('Compiling (a in (2,3,4,5))', function () {
        let s="(a in (2,3,4,5))";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("(a in (2,3,4,5))");
        expect(expr.myName).toBe("doPar");
    });

    it('Compiling a in (2,3,4,5)', function () {
        let s="a in (2,3,4,5)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a in (2,3,4,5)");
        expect(expr.myName).toBe("isIn");
    });

    it('Compiling a not in (2,3,4,5)', function () {
        let s="a not in (2,3,4,5)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a not in (2,3,4,5)");
        expect(expr.myName).toBe("isNotIn");
    });

    it('Compiling a not in (2,3,4,5) or c==1', function () {
        let s="a not in (2,3,4,5) or c=1";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a not in (2,3,4,5) OR c==1");
        expect(expr.myName).toBe("or");
    });

    it('Compiling isnull(a,1)', function () {
        let s="isnull(a,1)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("isnull(a,1)");
        expect(expr.myName).toBe("coalesce");
    });

    it('Compiling isnull(isnull(a,1),2)', function () {
        let s="isnull(isnull(a,1),2)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("isnull(isnull(a,1),2)");
        expect(expr.myName).toBe("coalesce");
    });
    it('Compiling a or b', function () {
        let s="a or b";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a OR b");
        expect(expr.myName).toBe("or");
    });

    it('Compiling a or isnull(a,1)', function () {
        let s="a or isnull(a,1)";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a OR isnull(a,1)");
        expect(expr.myName).toBe("or");
    });

    it('Compiling isnull(a,isnull(b,c))', function () {
        let s="isnull(a,isnull(b,c))";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("isnull(a,isnull(b,c))");
        expect(expr.myName).toBe("coalesce");
    });

    it('Compiling isnull(q,isnull(a,isnull(c,3)))', function () {
        let s="isnull(q,isnull(a,isnull(c,3)))";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("isnull(q,isnull(a,isnull(c,3)))");
        expect(expr.myName).toBe("coalesce");
    });

    it('Compiling <%sys[alfa]%>', function () {
        let s="<%sys[alfa]%>";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("context.sys[alfa]");
        expect(expr.myName).toBe("context.sys");
    });

    it('Compiling <%usr[beta]%>', function () {
        let s="<%usr[beta]%>";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("context.usr[beta]");
        expect(expr.myName).toBe("context.usr");
    });

    it('Compiling <%variable_Name%>', function () {
        let s="<%variable_Name%>";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("context(variable_Name)");
        expect(expr.myName).toBe("context");
    });

    it('Compiling <%variable_Name%>=3 and <%usr[beta]%>=\'S\'', function () {
        let s="<%variable_Name%>=3 and <%usr[beta]%>='S'";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("context(variable_Name)==3 AND context.usr[beta]=='S'");
        expect(expr.myName).toBe("and");
    });

    it('Compiling a+b', function () {
        let s="a+b";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a+b");
        expect(expr.myName).toBe("add");
    });


    it('Compiling a like b', function () {
        let s="a like b";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a LIKE b");
        expect(expr.myName).toBe("like");
    });

    it('Compiling a like b+\'%\'', function () {
        let s="a like b+'%'";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a LIKE b+'%'");
        expect(expr.myName).toBe("like");
    });

    it('Compiling a between 1 and 2', function () {
        let s="a between 1 and 2";
        let expr= qParser.prototype.from(s);
        expect(expr.toString()).toBe("a BETWEEN 1 AND 2");
        expect(expr.myName).toBe("between");
    });



});
