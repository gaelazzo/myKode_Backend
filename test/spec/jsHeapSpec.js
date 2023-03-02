
const Heap = require('../../src/jsHeap');
const {MsgParser: Parser} = require("../../src/jsMsgParser");


describe('Heap', function () {

    it("should return a class",function (){
        expect(Heap).toBeDefined();
        expect(Heap.prototype).toBeDefined();
        expect(Heap.prototype.constructor).toBeDefined();
        expect(Heap.prototype.constructor).toEqual(Heap);
    });


    it("Add ordered sequence",function () {
        let h = new Heap();
        for (let i=0;i<=100; i++) h.push(i);
        let m = h.peekMax();
        expect(m).toEqual(100);
        //console.log(h.A);
    });

    it("Add unordered sequence",function () {
        let h = new Heap();
        h.push(3);
        h.push(1);
        h.push(2);
        let m = h.peekMax();
        expect(m).toEqual(3);
    });

    it("Add ordered sequence",function () {
        let h = new Heap();
        for (let i=0;i<=2000000; i++) h.push(i);
        let expected = 1000000;
        for (let i = 0;i<=1000000; i++){
            let m = h.popMax();
            //console.log(h.A);
            expect(m).toEqual(2000000-i);
        }
        expect(h.A.length).toBe(1000000);
    });

    it("Heapify an array",function () {
       let a =[10,11,4,12,3];
       let h = a.heapify();
       let max = h.popMax();
       expect(max).toBe(12);

    });
});