

const Parser = require('../../src/jsMsgParser').MsgParser;

describe('MsgParser', function () {
    it("return same string if no pattern is found",function (){
        let s = "abcdabcdabc";
        let p = new Parser(s,"<",">");
        let found = p.getNext();
        expect(found).not.toBeNull();
        expect(found?.found).toBeNull();
        expect(found?.skipped).toBe(s);

        found = p.getNext();
        expect(found).toBe(null);

    });

    it("return same string if a partial pattern is found",function (){
        let s = "abcdabcd<abc";
        let p = new Parser(s,"<",">");
        let found = p.getNext();
        expect(found).not.toBeNull();
        expect(found?.found).toBeNull();
        expect(found?.skipped).toBe(s);

        found = p.getNext();
        expect(found).toBe(null);

    });



    it("find single occurrence between simple delimiters",function (){
        let s = "abcdabc<d>abc";
        let p = new Parser(s,"<",">");
        let found = p.getNext();
        expect(found).not.toBe(null);
        expect(found.found).toBe("d");
        expect(found?.skipped).toBe("abcdabc");

        found = p.getNext();
        expect(found).not.toBeNull();
        expect(found.found).toBeNull();
        expect(found?.skipped).toBe("abc");

        found = p.getNext();
        expect(found).toBe(null);

    });

    it("find multiple occurrences between simple delimiters",function (){
        let s = "abcdabc<d>abc<s>asa12";
        let p = new Parser(s,"<",">");
        let found = p.getNext();
        expect(found).not.toBe(null);
        expect(found.found).toBe("d");
        found = p.getNext();
        expect(found).not.toBe(null);
        expect(found.found).toBe("s");
        expect(found?.skipped).toBe("abc");

        found = p.getNext();
        expect(found).not.toBeNull();
        expect(found.found).toBeNull();
        expect(found?.skipped).toBe("asa12");

        found = p.getNext();
        expect(found).toBe(null);

    });



    it("find single occurrence between compound delimiters",function (){
        let s = "abcdabc%<d>%abc";
        let p = new Parser(s,"%<",">%");
        let found = p.getNext();
        expect(found).not.toBe(null);
        expect(found.found).toBe("d");
        expect(found?.skipped).toBe("abcdabc");

        found = p.getNext();
        expect(found).not.toBeNull();
        expect(found.found).toBeNull();
        expect(found?.skipped).toBe("abc");

        found = p.getNext();
        expect(found).toBe(null);

    });

    it("find multiple occurrences between compound delimiters",function (){
        let s = "abcdabc%<d>%abc%<s>%asa12";
        let p = new Parser(s,"%<",">%");
        let found = p.getNext();
        expect(found).not.toBe(null);
        expect(found.found).toBe("d");
        found = p.getNext();
        expect(found).not.toBe(null);
        expect(found.found).toBe("s");
        expect(found?.skipped).toBe("abc");

        found = p.getNext();
        expect(found).not.toBeNull();
        expect(found.found).toBeNull();
        expect(found?.skipped).toBe("asa12");

        found = p.getNext();
        expect(found).toBe(null);
    });
});
