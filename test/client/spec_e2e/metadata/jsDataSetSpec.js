/*jslint  nomen:true*/
/*jslint  nomen:true*/
/*globals _ ,  jasmine, beforeEach, expect, module, it,  describe, spyOn, afterEach  */

'use strict';
// const helper = require ("jasmine-uti");


//require('jasmine-collection-matchers')

const jsDataSet = require('../../client/components/metadata/jsDataSet');
const jsDataQuery = require('../../client/components/metadata/jsDataQuery');

const    _ = require('lodash');
const Deferred = require("JQDeferred");

beforeEach(function() {
  jasmine.addMatchers({
    toHaveSameItems: function (util, customEqualityTesters) {
      function isObject(obj) {
        return Object.prototype.toString.apply(obj) === '[object Object]';
      }

      function craftMessage(actual, expected, mismatches) {
        if (mismatches.length === 0) {
          return 'The collections do not match in length or objects. \n Expected collection:' + JSON.stringify(actual)
                + ' is not equal to ' + JSON.stringify(expected);
        }
        return ['The collections have equal length, but do not match.'].concat(mismatches.map(function (m) {
          return 'At ' + m.index + ': expected ' + JSON.stringify(m.expected) +
              ', actual ' + JSON.stringify(m.actual);
        })).join('\n    ');
      }

      function compareArraysSorted(actual, expected) {
        var mismatches = [];
        actual.forEach(function (item, i) {
          if (!util.equals(item, expected[i], customEqualityTesters)) {
            mismatches.push({index: i, actual: item, expected: expected[i]});
          }
        });
        return mismatches;
      }

      function compareArraysIgnoreSort(actual, expected) {
        expected = expected.slice(0);
        var mismatches = [];
        actual.forEach(function (item, i) {
          var foundIndex = -1;
          expected.some(function (expectedItem, i) {
            if (util.equals(item, expectedItem, customEqualityTesters)) {
              foundIndex = i;
              return true;
            }
          });
          if (foundIndex > -1) {
            expected.splice(foundIndex, 1)
          }
          else {
            mismatches.push({index: i, actual: item, expected: null});
          }
        });
        mismatches = mismatches.concat(expected.map(function (val, i) {
          return {index: actual.length + i, actual: null, expected: val};
        }));
        return mismatches;
      }

      function compareHashes(actual, expected) {
        var mismatches = {};
        Object.keys(actual).forEach(function (key) {
          if (!util.equals(actual[key], expected[key], customEqualityTesters)) {
            mismatches[key] = {index: key, actual: actual[key], expected: expected[key]};
          }
        });
        Object.keys(expected).forEach(function (key) {
          if (!util.equals(actual[key], expected[key], customEqualityTesters) && !mismatches[key]) {
            mismatches[key] = {index: key, actual: actual[key], expected: expected[key]};
          }
        });
        return Object.keys(mismatches).map(function (key) {
          return mismatches[key];
        });
      }

      return {
        compare: function (actual, expected, ignoreOrder) {
          if (!Array.isArray(actual) && !isObject(actual)) {
            throw new Error('Actual must be an Array or Object. Is type: ' + typeof actual);
          }
          if (!Array.isArray(expected) && !isObject(expected)) {
            throw new Error('Expectation must be an Array or Object. Is type: ' + typeof expected);
          }
          var mismatches;
          if (Array.isArray(actual) && Array.isArray(expected)) {
            if (actual.length !== expected.length) {
              return {
                pass: false,
                message: 'Array length differs! Actual length: ' + actual.length + ', expected length: ' + expected.length
              };
            }
            if (ignoreOrder) {
              mismatches = compareArraysIgnoreSort(actual, expected);
            }
            else {
              mismatches = compareArraysSorted(actual, expected);
            }
          }
          else {
            mismatches = compareHashes(actual, expected);
          }
          return {
            pass: mismatches.length === 0,
            message: craftMessage(actual, expected, mismatches)
          };
        }
      };
    }
  });

});
describe("jsDataSet", function () {
    beforeAll(function (){
        //console.log("jsDataSet");
    });

    describe('System status', function () {
        const dsSpace = jsDataSet,
            $q = jsDataQuery;
        let ds;


        beforeEach(function () {
            ds = new dsSpace.DataSet('temp');
        });

        it('dsSpace should be defined', function () {
            expect(dsSpace).not.toBeNull();
        });
        it('$q should be defined', function () {
            expect($q).not.toBeNull();
        });
        it('_ should be defined', function () {
            expect(_).not.toBeNull();
        });

        function def(g) {
            let d = Deferred();
            try {
                g().then((res) => d.resolve(res),
                    (err) => d.reject(err));
            }
            catch (e) {
                d.reject("divide by zero");
            }
            return d;
        }


        it("Throwing exceptions through def generates a rejected promise ", function (done) {
            let DefHelp = function () {
                return Deferred().resolve(null.ciao());
            };


            let intermediate = 0;

            let res = def(DefHelp)
                .fail((err) => {
                    //console.log(err);
                    expect(err).toBe("divide by zero");
                    intermediate = 12;
                })
                .always((res) => {
                    expect(intermediate).toBe(12);
                    done();
                });
        });

    });


    describe('DataSet',
        function () {
            const dsSpace = jsDataSet,
                $q = jsDataQuery;
            let ds;


            beforeEach(function () {
                ds = new dsSpace.DataSet('temp');
            });
            afterEach(function () {
                ds = null;
            });

            it('dsSpace should be defined', function () {
                expect(dsSpace).toBeDefined();
            });


            describe('DataSet Structure', function () {
                it('ds should be defined', function () {
                    expect(ds).toBeDefined();
                });

                it('ds.tables should be defined', function () {
                    expect(ds.tables).toBeDefined();
                });

                it('ds.relations  should be defined', function () {
                    expect(ds.relations).toBeDefined();
                });

                it('ds should have a field name', function () {
                    expect(ds.name).toBeDefined();
                });

                it('ds name should be not null', function () {
                    expect(ds.name).not.toBeNull();
                });


                it('ds should have a string field name', function () {
                    expect(ds.name).toEqual(jasmine.any(String));
                });

                it('dsSpace.DataRow should be a function', function () {
                    expect(dsSpace.DataRow).toEqual(jasmine.any(Function));
                });

            });

            describe('DataSet Functions', function () {
                it('ds.name should be writeable', function () {
                    ds.name = 'D';
                    expect(ds.name).toMatch('D');
                });
                it('ds should have a clone function', function () {
                    expect(ds.clone).toEqual(jasmine.any(Function));
                });

                it('ds.clone should return a DataSet', function () {
                    expect(ds.clone() instanceof dsSpace.DataSet).toBeTruthy();
                });

                it('ds.clone should create tables', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('a_b', 'a', ['x'], 'b', ['y']);
                    expect(ds.clone().tables.a).toBeDefined();
                    expect(ds.clone().tables.b).toBeDefined();
                });

                it('ds.clone should fill tables with DataTables', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('a_b', 'a', ['x'], 'b', ['y']);
                    expect(ds.clone().tables.a.toString()).toEqual('DataTable a');
                });

                it('ds.clone should create relations', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('ab', 'a', ['x'], 'b', ['y']);
                    expect(ds.clone().relations.ab).toBeDefined();
                });


                it('ds.copy should return something', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('ab', 'a', ['x'], 'b', ['y']);
                    expect(ds.copy()).not.toBeNull();
                });


                it('ds.copy should return a dataset', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('ab', 'a', ['x'], 'b', ['y']);
                    expect(ds.copy() instanceof dsSpace.DataSet).toBeTruthy();
                });

                it('spyOn(ds, \'clone\') should return something ', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('ab', 'a', ['x'], 'b', ['y']);
                    expect(spyOn(ds, 'clone')).toBeDefined();
                });

                it('spyOn(ds, \'clone\').andCallThrough should return something ', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('a_b', 'a', ['x'], 'b', ['y']);
                    expect(spyOn(ds, 'clone').and.callThrough).toBeDefined();
                });


                it('ds.copy should call ds.clone', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    ds.newRelation('a_b', 'a', ['x'], 'b', ['y']);
                    spyOn(ds, 'clone').and.callThrough();
                    ds.copy();
                    expect(ds.clone).toHaveBeenCalled();
                });


                it('ds.copy should copy rows', function () {
                    let tA = ds.newTable('a'),
                        newDs,
                        newTa;
                    tA.add({ a: 1 });
                    tA.add({ a: 2 });
                    ds.newTable('b');
                    ds.newRelation('a_b', 'a', ['x'], 'b', ['y']);
                    newDs = ds.copy();
                    newTa = newDs.tables.a;
                    expect(newTa.rows.length).toEqual(2);
                    expect(newTa.select($q.eq('a', 1)).length).toBe(1);
                });


            });


            describe('DataRelation functions', function () {

                it('ds.relations should exists', function () {
                    expect(ds.relations).toBeDefined();
                });

                it('ds.newRelation should be a function', function () {
                    expect(ds.newRelation).toEqual(jasmine.any(Function));
                });

                it('calling ds.newRelation adds a relation to ds.relations', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('ab', 'a', ['field1'], 'b', ['field2']);
                    expect(ds.relations.ab).toBe(rel);
                });


                it('newRelation adds a relation to ds.relations', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('ab', 'a', ['field1'], 'b', ['field2']);
                    expect(ds.relations.ab).toBe(rel);
                });

                it('newRelation  adds a relation to ds.relations (case with comma separated field list)', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('ab', 'a', 'field1,field2', 'b', 'field3,field4');
                    expect(ds.relations.ab).toBe(rel);
                    expect(rel.parentCols.length).toBe(2);
                    expect(rel.childCols.length).toBe(2);
                });


                it('relation.getChildsFilter should be a function', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['field1'], 'b', ['field2']);
                    expect(rel.getChildFilter).toEqual(jasmine.any(Function));
                });

                it('relation.getChildsFilter should return a function', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['field1'], 'b', ['field2']),
                        r = { a: 1 };
                    expect(rel.getChildFilter(r)).toEqual(jasmine.any(Function));
                });

                it('relation.getChildsFilter().toSql should be a function', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        r = { A0: 3, A1: null, A2: 'nino', A3: 'arance' };
                    expect(rel.getChildFilter(r).toSql).toEqual(jasmine.any(Function));
                });

                it('relation.getChildsFilter() should return false on non matching objects', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 6, A1: 12, A2: 'nino', A3: 'arance' },
                        rB = { B0: 6, B1: 12, B2: 'anna', B3: 'arance' };
                    expect(rel.getChildFilter(rA)(rB)).toBeFalsy();
                });

                it('relation.getChildsFilter() should return true on matching objects', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 10, A1: 12, A2: 'nino', A3: 'arance' },
                        rB = { B0: 10, B1: 12, B2: 'nino', B3: 'pere' };
                    expect(rel.getChildFilter(rA)(rB)).toBeTruthy();
                });

                it('relation.getChildsFilter() should return false on (with null)-matching objects', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 10, A1: null, A2: 'nino', A3: 'arance' },
                        rB = { B0: 10, B1: null, B2: 'nino', B3: 'pere' };
                    expect(rel.getChildFilter(rA)(rB)).toBeFalsy();
                });
                it('relation.getParentsFilter() should return false on non matching objects', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 6, A1: 13, A2: 'nino', A3: 'arance' },
                        rB = { B0: 6, B1: 13, B2: 'anna', B3: 'arance' };
                    expect(rel.getParentsFilter(rB)(rA)).toBeFalsy();
                });

                it('relation.getParentsFilter() should return true on matching objects', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 10, A1: 13, A2: 'nino', A3: 'arance' },
                        rB = { B0: 10, B1: 13, B2: 'nino', B3: 'pere' };
                    expect(rel.getParentsFilter(rB)(rA)).toBeTruthy();
                });

                it('relation.getParentsFilter() should return false on (with null)-matching objects', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 10, A1: null, A2: 'nino', A3: 'arance' },
                        rB = { B0: 10, B1: null, B2: 'nino', B3: 'pere' };
                    expect(rel.getParentsFilter(rB)(rA)).toBeFalsy();
                });

                it('getting a relation function should call _.map', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    spyOn(dsSpace.myLoDash, 'map').and.callThrough();
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 3, A1: null, A2: 'nino', A3: 'arance' };

                    rel.getChildFilter(rA, 'qq');
                    expect(dsSpace.myLoDash.map).toHaveBeenCalled();
                });

                it('getting a getChildFilter function should call _.map with  parentCols as first argument ', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 4, A1: null, A2: 'nino', A3: 'arance' };
                    spyOn(dsSpace.myLoDash, 'map').and.callThrough();
                    rel.getChildFilter(rA);
                    expect(dsSpace.myLoDash.map.calls.argsFor(0)[0]).toBe(rel.parentCols);
                });

                it('getting a getParentsFilter function should call _.map with  childCols as first argument ', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rB = { B0: 3, B1: null, B2: 'nino', B3: 'pere' };
                    spyOn(dsSpace.myLoDash, 'map').and.callThrough();
                    rel.getParentsFilter(rB);
                    expect(dsSpace.myLoDash.map.calls.argsFor(0)[0]).toBe(rel.childCols);
                });


                it('calling a relation function should not call _.map', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        rA = { A0: 8, A1: null, A2: 'nino', A3: 'arance' },
                        rB = { B0: 9, B1: null, B2: 'nino', B3: 'pere' },
                        f = rel.getChildFilter(rA, 'qq');
                    spyOn(dsSpace.myLoDash, 'map').and.callThrough();
                    f(rB);
                    expect(dsSpace.myLoDash.map).not.toHaveBeenCalled();
                });


                it('dataSet.relationsByParent and should be set relationsByChild after calling newRelation', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']);
                    expect(ds.relationsByParent.a).toEqual([rel]);
                    expect(ds.relationsByChild.b).toEqual([rel]);
                    expect(ds.relationsByParent.b).toEqual([]);
                    expect(ds.relationsByChild.a).toEqual([]);
                });

                it('dataSet.relationsByParent and should be set relationsByChild after calling newRelation', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']);
                    expect(ds.getParentChildRelation('b', 'a')).toEqual([]);
                    expect(ds.getParentChildRelation('a', 'c')).toEqual([]);
                    expect(ds.getParentChildRelation('a', 'b')).toEqual([rel]);
                });



                it('clone should preserve relationsByParent relationsByChild and ', function () {
                    ds.newTable('a');
                    ds.newTable('b');
                    const rel = ds.newRelation('a_b', 'a', ['A1', 'A2'], 'b', ['B1', 'B2']),
                        d2 = ds.clone();

                    expect(_.map(d2.relationsByParent.a, function (r) {
                        return _.pick(r, ['parentTable', 'parentCols', 'childTable', 'childCols']);
                    }))
                        .toEqual([_.pick(rel, ['parentTable', 'parentCols', 'childTable', 'childCols'])]);
                    expect(_.map(d2.relationsByChild.b, function (r) {
                        return _.pick(r, ['parentTable', 'parentCols', 'childTable', 'childCols']);
                    }))
                        .toEqual([_.pick(rel, ['parentTable', 'parentCols', 'childTable', 'childCols'])]);
                    expect(d2.relationsByParent.b).toEqual([]);
                    expect(d2.relationsByChild.a).toEqual([]);
                });
            });

            describe('OptimisticLocking functions', function () {
                let $ol, stubEnv;
                beforeEach(function () {
                    $ol = dsSpace.OptimisticLocking;
                    stubEnv = {
                        sys: function (field) { return 'sys_' + field; },
                        usr: function (field) { return 'usr_' + field; },
                        field: function (field) { return 'field_' + field; }
                    };
                });

                it('OptimisticLocking should be defined', function () {
                    expect($ol).toBeDefined();
                });

                it('OptimisticLocking should be a constructor', function () {
                    expect($ol).toEqual(jasmine.any(Function));
                    expect($ol.prototype.constructor).toEqual($ol);
                });

                it('OptimisticLocking should return an object with a method prepareForPosting ', function () {
                    const o = new $ol(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']);
                    expect(o.prepareForPosting).toEqual(jasmine.any(Function));

                });

                it('OptimisticLocking should return an object with a method getOptimisticLock ', function () {
                    const o = new $ol(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']);
                    expect(o.getOptimisticLock).toEqual(jasmine.any(Function));
                });

                it('prepareForPosting should fill update fields for modified rows', function () {
                    const t = ds.newTable('a'),
                        r = t.newRow({ a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' }),
                        p = r.getRow().current,
                        o = new $ol(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']);
                    t.acceptChanges();
                    p.a = 10;
                    o.prepareForPosting(r, stubEnv);
                    expect(r).toEqual({ a: 10, b: 2, ct: 'ct', cu: 'cu', lt: 'field_lt', lu: 'field_lu' });
                });

                it('prepareForPosting should fill create fields for added rows', function () {
                    const t = ds.newTable('a'),
                        r = t.newRow({ a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' }),
                        o = new $ol(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']);
                    o.prepareForPosting(r, stubEnv);
                    expect(r).toEqual({ a: 1, b: 2, ct: 'field_ct', cu: 'field_cu', lt: 'field_lt', lu: 'field_lu' });
                });

                it('getOptimisticLock should return a function that matches the original row', function () {
                    const t = ds.newTable('a'),
                        r = t.newRow({ id: 10, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' }),
                        o = new $ol(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']);
                    t.key(['id']);
                    const filter = o.getOptimisticLock(r);
                    expect(t.select(filter)).toEqual([r]);
                    //check filter is comparing lt
                    r.lt = 'no';
                    expect(t.select(filter)).toEqual([]);
                    r.lt = 'lt';

                    //check filter is comparing lu
                    r.lu = 'no';
                    expect(t.select(filter)).toEqual([]);

                    //check again filter is doing something
                    r.lu = 'lu';
                    expect(t.select(filter)).toEqual([r]);

                    //check filter is not comparing ct, cu
                    r.ct = 'no';
                    r.cu = 'no';
                    expect(t.select(filter)).toEqual([r]);

                    //check filter is comparing key
                    r.id = 13;
                    expect(t.select(filter)).toEqual([]);

                    //again we test in the original condition
                    r.id = 10;
                    expect(t.select(filter)).toEqual([r]);
                });

                it('getOptimisticLock should return a function that matches the original row (no primary key)', function () {
                    const t = ds.newTable('a'),
                        r = t.newRow({ id: 10, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' }),
                        o = new $ol(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu']);

                    //t.key(['id']); no key here

                    const filter = o.getOptimisticLock(r);
                    expect(t.select(filter)).toEqual([r]);
                    //check filter is comparing lt
                    r.lt = 'no';
                    expect(t.select(filter)).toEqual([]);
                    r.lt = 'lt';

                    //check filter is comparing lu
                    r.lu = 'no';
                    expect(t.select(filter)).toEqual([]);

                    //check again filter is doing something
                    r.lu = 'lu';
                    expect(t.select(filter)).toEqual([r]);

                    //check filter IS comparing ct, cu
                    r.ct = 'no';
                    r.cu = 'no';
                    expect(t.select(filter)).toEqual([]);

                    //check filter IS comparing also b
                    r.ct = 'ct';
                    r.cu = 'cu';
                    r.b = 3;
                    expect(t.select(filter)).toEqual([]);

                    r.b = 2;

                    //check filter is comparing key
                    r.id = 13;
                    expect(t.select(filter)).toEqual([]);

                    //again we test in the original condition
                    r.id = 10;
                    expect(t.select(filter)).toEqual([r]);
                });
            });

            describe('serialize/deserialize', function () {
                let t, t2, r, r1, r2, s, s1, s2, s3, s4;
                beforeEach(function () {
                    t = ds.newTable('a');
                    r = t.newRow({ id: 10, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    r1 = t.newRow({ id: 11, a: 123, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    r2 = t.newRow({ id: 12, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    t2 = ds.newTable('b');
                    s = t2.newRow({ id: 13, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    s1 = t2.newRow({ id: 14, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    s2 = t2.newRow({ id: 15, a: 1, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    s3 = t2.newRow({ id: 16, a: 2, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });
                    s4 = t2.newRow({ id: 17, a: 21, b: 2, ct: 'ct', lt: 'lt', cu: 'cu', lu: 'lu' });

                    s2.getRow().acceptChanges();
                    s2.getRow().del();
                    r1.getRow().acceptChanges();
                    r1.a = 21;
                    s4.getRow().acceptChanges();
                });
                it('should preserve tables', function () {
                    const sData = JSON.parse(JSON.stringify(ds.serialize()));
                    const ds2 = new dsSpace.DataSet('dd');
                    ds2.deSerialize(sData);
                    expect(_.keys(ds2.tables).length).toBe(2);
                });

                it('should preserve row count', function () {
                    const sData = JSON.parse(JSON.stringify(ds.serialize()));
                    const ds2 = new dsSpace.DataSet('dd');
                    ds2.deSerialize(sData);
                    expect(ds2.tables.a.rows.length).toBe(3);
                    expect(ds2.tables.b.rows.length).toBe(5);
                });

                it('should preserve row values', function () {
                    const sData = JSON.parse(JSON.stringify(ds.serialize()));
                    const ds2 = new dsSpace.DataSet('dd');
                    ds2.deSerialize(sData);
                    expect(ds2.tables.a.rows).toEqual(ds.tables.a.rows);
                    expect(ds2.tables.b.rows).toEqual(ds.tables.b.rows);
                });

                it('should preserve original values', function () {
                    const sData = JSON.parse(JSON.stringify(ds.serialize()));
                    const ds2 = new dsSpace.DataSet('dd');
                    ds2.deSerialize(sData);
                    let r = ds2.tables.a.select($q.eq('id', 11))[0];
                    expect(r.getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(123);
                    expect(r.getRow().state).toBe(dsSpace.dataRowState.modified);

                    let s4 = ds2.tables.b.select($q.eq('id', 17))[0];
                    expect(s4.getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(21);
                    expect(s4.getRow().state).toBe(dsSpace.dataRowState.unchanged);
                    s4.a = 99;

                    expect(s4.getRow().state).toBe(dsSpace.dataRowState.modified);
                });

                it('should preserve current values', function () {
                    const sData = JSON.parse(JSON.stringify(ds.serialize()));
                    const ds2 = new dsSpace.DataSet('dd');
                    ds2.deSerialize(sData);
                    expect(ds2.tables.a.select($q.eq('id', 11))[0]['a']).toBe(21);
                });


            });


            // describe('merge functions', function(){
            //   //TODO all those
            // });

        });



    describe('DataTable module test', function () {
        const dsSpace = jsDataSet,
            DataTable = dsSpace.DataTable,
            $q = jsDataQuery;
        let ds, ds2;

        beforeEach(function () {
            ds = new dsSpace.DataSet('temp');
            ds2 = new dsSpace.DataSet('temp2');
        });

        afterEach(function () {
            ds = null;
            ds2 = null;
        });


        describe('DataTable functions', function () {
            let t;

            beforeEach(function () {
                t = ds.newTable('customer');

            });

            afterEach(function () {
                t = null;
            });

            it('dataTable should be defined', function () {
                expect(t).toBeDefined();
            });

            it('dataTable should have a string name', function () {
                expect(t.name).toEqual(jasmine.any(String));
            });

            it('dataTable should have an object collection (rows)', function () {
                expect(t.rows).toEqual(jasmine.any(Array));
            });

            it('adding object to table should modify collection size', function () {
                t.add({ a: 1, b: 2 });
                t.add({ a: 2, b: 3 });
                t.add({ a: 2, b: 3 });
                expect(t.rows.length).toBe(3);
            });

            it('detaching object to table should modify collection size', function () {
                t.add({ a: 1, b: 2 });
                t.add({ a: 2, b: 3 });
                const c = { a: 2, b: 4 };
                t.add(c);
                c.getRow().detach();
                expect(t.rows.length).toBe(2);
            });

            it('adding and detaching object does not change object values', function () {
                const c = { a: 2, b: 4 };
                t.add(c);
                c.getRow().detach();
                expect(c).toEqual({ a: 2, b: 4 });
            });

            it('detaching object does not change object values ', function () {
                const c = { a: 2, b: 4 };
                t.add(c);
                c.q = 'n';
                c.getRow().detach();
                expect(c).toEqual({ a: 2, b: 4, q: 'n' });
            });

            it('detached objects are not linked toDataRow anymore', function () {
                t.add({ a: 1, b: 2 });
                t.add({ a: 2, b: 3 });
                const c = { a: 2, b: 4 };
                t.add(c);
                c.getRow().detach();
                expect(c.getRow).toBeUndefined();
            });


            it('adding object are given a state of added', function () {
                const o1 = { a: 1, b: 2 },
                    o2 = { a: 2, b: 3 };
                t.add(o1);
                t.load(o2);
                t.add({ a: 2, b: 4 });
                t.add({ a: 2, b: 3 });
                expect(o1.getRow().state).toBe(dsSpace.dataRowState.added);
            });

            it('loaded object are given a state of unchanged', function () {
                const o1 = { a: 1, b: 2 },
                    o2 = { a: 2, b: 3 };
                t.add(o1);
                t.load(o2);
                t.add({ a: 2, b: 4 });
                t.add({ a: 2, b: 3 });
                expect(o2.getRow().state).toBe(dsSpace.dataRowState.unchanged);
            });


            it('deleting objects should not modify collection size', function () {
                const o1 = { a: 1, b: 2 };
                t.add(o1);
                t.add({ a: 2, b: 3 });
                t.add({ a: 2, b: 3 });
                t.acceptChanges();
                o1.getRow().del();
                expect(t.rows.length).toBe(3);
            });

            it('deleting objects should modify collection size after acceptChanges', function () {
                const o1 = { a: 1, b: 2 };
                t.add(o1);
                t.load({ a: 2, b: 3 });
                t.add({ a: 2, b: 3 });
                t.acceptChanges();
                o1.getRow().del();
                t.acceptChanges();
                expect(t.rows.length).toBe(2);
            });

            it('deleted rows becomes detached after acceptChanges', function () {
                const o1 = { a: 1, b: 2 };
                t.add(o1);
                t.load({ a: 2, b: 3 });
                t.add({ a: 2, b: 3 });
                t.acceptChanges();
                const dr = o1.getRow();
                dr.del();
                t.acceptChanges();
                expect(dr.state).toBe(dsSpace.dataRowState.detached);
            });

            it('objects are no longer linked to datarow when those have been detached', function () {
                const o1 = { a: 1, b: 2 };
                t.add(o1);
                t.load({ a: 2, b: 3 });
                t.add({ a: 2, b: 3 });
                t.acceptChanges();
                const dr = o1.getRow();
                dr.del();
                t.acceptChanges();
                expect(o1.getRow).toBeUndefined();
            });

            it('datarows haven\'t any getRow method  when  detached', function () {
                const o1 = { a: 1, b: 2 };
                t.add(o1);
                t.load({ a: 2, b: 3 });
                t.add({ a: 2, b: 3 });
                t.acceptChanges();
                let gr = o1.getRow;
                expect(gr).toBeDefined();

                let dr = o1.getRow();
                expect(dr).toBeDefined();

                dr.del();
                t.acceptChanges();
                expect(dr.getRow).toBeUndefined();
            });


            it('multiple addition of same object should be ignored', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                t.add(o1);
                t.add(o1);
                expect(t.rows.length).toBe(3);
            });


            it('after acceptChanges no modification are left (update-rejectChanges)', function () {
                const o3 = { a: 1, b: 3 };
                t.add(o3);
                t.acceptChanges();
                o3.a = 2;
                t.rejectChanges();
                expect(t.hasChanges()).toBeFalsy();
                expect(o3.getRow().state).toBe(dsSpace.dataRowState.unchanged);
            });

            it('after rejectChanges no modification are left (add-acceptChanges)', function () {
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o2);
                t.add(o3);
                t.acceptChanges();
                t.add({ a: 3, c: 5 });
                t.rejectChanges();
                expect(t.hasChanges()).toBeFalsy();
            });

            it('after rejectChanges no modification are left (del-acceptChanges)', function () {
                const o1 = { a: 1, b: 2 };
                t.add(o1);
                t.acceptChanges();
                o1.getRow().del();
                t.add({ a: 3, c: 5 });
                t.rejectChanges();
                expect(t.hasChanges()).toBeFalsy();
            });


            it('rejectChanges should undo deletions', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                t.acceptChanges();
                o1.getRow().del();
                t.rejectChanges();
                expect(o1.getRow().state).toBe(dsSpace.dataRowState.unchanged);
                expect(t.rows.length).toBe(3);
            });

            it('rejectChanges should undo additions', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                t.acceptChanges();
                const o4 = { k: 1 };
                t.add(o4);
                t.rejectChanges();
                expect(o4.getRow).toBeUndefined();
                expect(t.rows.length).toBe(3);
            });

            it('getChanges should contain added rows', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                t.acceptChanges();
                const o4 = { k: 1 };
                const p4 = t.add(o4).current;
                expect(t.getChanges().indexOf(p4)).toBeGreaterThan(-1);
            });

            it('getChanges should contain deleted rows', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o1);
                t.add(o2);
                const p3 = t.add(o3).current;
                t.acceptChanges();
                //o3.getRow().del();
                p3.$del();
                expect(t.getChanges().indexOf(p3)).toBeGreaterThan(-1);
            });

            it('getChanges should contain modified rows', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                const p1 = t.add(o1).current;
                const p2 = t.add(o2).current;
                const p3 = t.add(o3).current;
                t.acceptChanges();
                p3.c = 'a';
                p2.a = 2;
                const qq1 = t.getChanges();
                expect(t.getChanges().indexOf(p3)).toBeGreaterThan(-1);
                expect(t.getChanges().indexOf(p2)).toBeGreaterThan(-1);
            });

            it('getChanges should not contain false updates', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3 };
                const o3 = { a: 1, b: 3 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                t.acceptChanges();
                o2.a = 1;
                o1.a = 2;
                o1.a = 1;
                o1.a1 = 0;
                delete o1.a1;
                expect(t.getChanges().indexOf(o2)).toBe(-1);
                expect(t.getChanges().indexOf(o1)).toBe(-1);
            });

            it('key should be a function', function () {
                expect(t.key).toEqual(jasmine.any(Function));
            });

            it('key() should return an array', function () {
                expect(t.key()).toEqual(jasmine.any(Array));
            });


            it('key(args) should set Table key', function () {
                t.key(['a', 'b', 'c']);
                expect(t.key()).toEqual(['a', 'b', 'c']);
            });

            it('select with null as filter should return all rows', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3, c: 4 };
                const o3 = { a: 1, b: 3, c: 2 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                expect(t.select(null)).toEqual([o1, o2, o3]);

            });

            it('select should return matching rows', function () {
                const o1 = { a: 1, b: 2 };
                const o2 = { a: 1, b: 3, c: 4 };
                const o3 = { a: 1, b: 3, c: 2 };
                t.add(o1);
                t.add(o2);
                t.add(o3);
                expect(t.select($q.eq('b', 3)).length).toBe(2);
                expect(t.select($q.eq('c', 2)).length).toBe(1);
            });

            it('defaults should be a function', function () {
                expect(t.defaults).toEqual(jasmine.any(Function));
            });


            it('newRow should be a function', function () {
                expect(t.newRow).toEqual(jasmine.any(Function));
            });
            it('newRow should return an object', function () {
                expect(t.newRow()).toEqual(jasmine.any(Object));
            });

            it('The object returned by newRow should have a dataRow', function () {
                expect(t.newRow().getRow()).toEqual(jasmine.any(dsSpace.DataRow));
            });


            it('after calling defaults(values), new Row has defaults', function () {
                t.defaults({ L: 1, a: 'john' });
                const n = t.newRow();
                expect(n.L).toBe(1);
                expect(n.a).toBe('john');
            });

            it('successive defaults(values) merge their values', function () {
                t.defaults({ L: 1, a: 'john' });
                t.defaults({ L: 2, b: 'mary' });
                const n = t.newRow();
                expect(n.L).toBe(2);
                expect(n.a).toBe('john');
                expect(n.b).toBe('mary');
            });

            it('after calling clearDefaults, new Row has NO defaults', function () {
                t.defaults({ L: 1, a: 'john' });
                t.newRow();
                t.clearDefaults({});
                const n1 = t.newRow();
                expect(n1.L).toBeUndefined();
                expect(n1.a).toBeUndefined();
                expect(n1.b).toBeUndefined();

            });
            it('newRow(o) should have o values where o is given', function () {
                const o = { L: 1, a: 'hi' };
                const n = t.newRow(o);
                expect(n).toEqual(o);
            });

            it('newRow(o) should have default  values where not overridden by o ', function () {
                const o = { L: 1, a: 'hi' };
                t.defaults({ B: 1, a: 'no' });
                const n = t.newRow(o);
                const c = { L: 1, B: 1, a: 'hi' };
                expect(n).toEqual(c);
            });

            it('DataRow modification created with newRow does not affect original object', function () {
                const o = { a: 1 };
                const p = t.newRow(o);
                p.a = 2;
                expect(o.a).toBe(1);
            });

            it('changing defaults does not change rows', function () {
                const o = { L: 1, a: 'hi' };
                t.defaults({ B: 1, a: 'no' });
                const n = t.newRow(o);
                t.defaults({ B: 2, a: 'yes' });
                const c = { L: 1, B: 1, a: 'hi' };
                expect(n).toEqual(c);
            });

            it('loaded rows should be in unchanged state', function () {
                const o = { L: 1, a: 'hi' };
                const r = t.load(o);
                expect(r.state).toBe(dsSpace.dataRowState.unchanged);
            });

            it('false changes should leave state unchanged', function () {
                const o = { L: 1, a: 'hi' };
                const r = t.load(o);
                o.L = 2;
                o.L = 1;
                expect(r.state).toBe(dsSpace.dataRowState.unchanged);
            });

            it('loaded array of rows should be in unchanged state', function () {
                t.acceptChanges();
                const a = [
                    { L: 1, a: 'hi' },
                    { L: 2, a: 'ho' }
                ];
                t.loadArray(a);
                expect(t.hasChanges()).toBeFalsy();
            });

            it('default value of tableForReading should be table name', function () {
                expect(t.tableForReading()).toBe('customer');
            });

            it('default value of tableForWriting should be table name', function () {
                expect(t.tableForWriting()).toBe('customer');
            });

            it('setting  tableForReading does not change table name', function () {
                t.tableForReading('customer2');
                expect(t.tableForReading()).toBe('customer2');
                expect(t.name).toBe('customer');
            });

            it('setting  tableForWriting does not change table name', function () {
                t.tableForWriting('customer2');
                expect(t.tableForWriting()).toBe('customer2');
                expect(t.name).toBe('customer');
            });

            it('cloning should preserve tableForReading, tableForWriting, autoIncrementColumns', function () {
                t.tableForWriting('customer2');
                t.tableForReading('customer3');
                t.autoIncrement('idoperatore', {});
                const t2 = t.clone();
                expect(t2.tableForWriting()).toBe('customer2');
                expect(t2.tableForReading()).toBe('customer3');
                expect(t2.autoIncrement('idoperatore').columnName).toEqual('idoperatore');
                expect(t2.name).toBe('customer');
            });

            it("sortRows should return a sorted copy of given rows", function () {
                let rows = [{ a: 1, b: 1, c: 1 }, { a: 2, b: 10, c: 3 }, { a: 2, b: 2, c: 1 }, { a: 3, b: 2, c: 4 }];
                let t = new DataTable();
                let s1 = t.sortRows(rows, "a");
                expect(s1.length).toBe(4);
                expect(s1[0].a).toBe(1);
                expect(s1[1].a).toBe(2);
                expect(s1[2].a).toBe(2);
                expect(s1[3].a).toBe(3);

                s1 = t.sortRows(rows, "a desc");
                expect(s1.length).toBe(4);
                expect(s1[0].a).toBe(3);
                expect(s1[1].a).toBe(2);
                expect(s1[2].a).toBe(2);
                expect(s1[3].a).toBe(1);

                s1 = t.sortRows(rows, "b desc, a");
                expect(s1.length).toBe(4);
                expect(s1[0].b).toBe(10);
                expect(s1[0].a).toBe(2);

                expect(s1[1].b).toBe(2);
                expect(s1[1].a).toBe(2);

                expect(s1[2].b).toBe(2);
                expect(s1[2].a).toBe(3);

                expect(s1[3].b).toBe(1);
                expect(s1[3].a).toBe(1);


            });

        });

        describe('autoIncrement functions', function () {
            let t;

            beforeEach(function () {
                t = ds.newTable('customer');

            });

            afterEach(function () {
                t = null;
            });


            it('should define setOptimized', function () {
                expect(t.setOptimized).toEqual(jasmine.any(Function));
            });

            it('should define isOptimized', function () {
                expect(t.isOptimized).toEqual(jasmine.any(Function));
            });

            it('should define clearMaxCache', function () {
                expect(t.clearMaxCache).toEqual(jasmine.any(Function));
            });

            it('should define setMaxExpr', function () {
                expect(t.setMaxExpr).toEqual(jasmine.any(Function));
            });

            it('should define minimumTempValue', function () {
                expect(t.minimumTempValue).toEqual(jasmine.any(Function));
            });

            it('should define getMaxExpr', function () {
                expect(t.getMaxExpr).toEqual(jasmine.any(Function));
            });

            it('isOptimized should describe the state of Optimized', function () {
                expect(t.isOptimized()).toBeFalsy();
                t.setOptimized(false);
                expect(t.isOptimized()).toBeFalsy();
                t.setOptimized(true);
                expect(t.isOptimized()).toBeTruthy();
                t.setOptimized(false);
                expect(t.isOptimized()).toBeFalsy();
            });

            it('clearMaxCache should not change the state of Optimized', function () {
                expect(t.isOptimized()).toBeFalsy();
                t.clearMaxCache();
                expect(t.isOptimized()).toBeFalsy();
                t.setOptimized(true);
                expect(t.isOptimized()).toBeTruthy();
                t.clearMaxCache();
                expect(t.isOptimized()).toBeTruthy();
                t.setOptimized(false);
                expect(t.isOptimized()).toBeFalsy();
                t.clearMaxCache();
                expect(t.isOptimized()).toBeFalsy();
            });

            it('minimumTempValue should get/set minimum value admitted for a field', function () {
                expect(t.minimumTempValue('a')).toBe(0);
                t.minimumTempValue('a', 2);
                expect(t.minimumTempValue('a')).toBe(2);
                t.minimumTempValue('a', null);
                expect(t.minimumTempValue('a')).toBe(0);
                t.minimumTempValue('a', 3);
                expect(t.minimumTempValue('a')).toBe(3);
            });

            it('getMaxExpr should throw  when table is not optimized', function () {
                const f = function () {
                    t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014));
                };
                expect(f).toThrow();
            });

            it('getMaxExpr should give values when set by setMaxExpr, 0 otherwise', function () {
                t.setOptimized(true);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(0);
                t.setMaxExpr('a', $q.max('id'), $q.eq('year', 2014), 12);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(12);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2012))).toBe(0);
                t.setMaxExpr('a', $q.max('id'), $q.eq('year', 2012), 11);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2012))).toBe(11);
                expect(t.getMaxExpr('a', $q.max('ID'), $q.eq('year', 2014))).toBe(0);
                expect(t.getMaxExpr('A', $q.max('id'), $q.eq('year', 2014))).toBe(0);
                t.setMaxExpr('a', $q.max('id'), $q.eq('year', 2014), 12);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(12);
                t.setMaxExpr('a', $q.max('id'), $q.eq('year', 2014), 99);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(99);
            });

            it('clearMaxCache should clear cached values', function () {
                t.setOptimized(true);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(0);
                t.setMaxExpr('a', $q.max('id'), $q.eq('year', 2014), 12);
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(12);
                t.clearMaxCache();
                expect(t.getMaxExpr('a', $q.max('id'), $q.eq('year', 2014))).toBe(0);
            });

            it('should define unCachedMaxSubstring', function () {
                expect(t.unCachedMaxSubstring).toEqual(jasmine.any(Function));
            });

            it('should define cachedMaxSubstring', function () {
                expect(t.cachedMaxSubstring).toEqual(jasmine.any(Function));
            });

            it('unCachedMaxSubstring should give max of column when start and len are zero', function () {
                t.newRow({ a: 1 });
                t.newRow({ a: 10 });
                t.newRow({ a: 5 });
                t.newRow({ a: 4 });
                expect(t.unCachedMaxSubstring('a', 0, 0, null)).toBe(10);
            });

            it('unCachedMaxSubstring should give max of column when start and len are zero', function () {
                t.newRow({ a: 1 });
                t.newRow({ b: 10 });
                t.newRow({ a: 5 });
                t.newRow({ a: 4 });
                expect(t.unCachedMaxSubstring('a', 0, 0, null)).toBe(5);
            });

            it('unCachedMaxSubstring should give filtered max of column when start and len are zero', function () {
                t.newRow({ a: 1, b: 1 });
                t.newRow({ a: 2, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(5);
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(2);
            });

            it('unCachedMaxSubstring should consider deleted rows', function () {
                const o1 = t.newRow({ a: 100, b: 0 }),
                    o2 = t.newRow({ a: 20, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                t.acceptChanges();
                o1.getRow().del();
                o2.getRow().del();
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(100);
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(20);
            });

            it('unCachedMaxSubstring should take substring when start,len are given', function () {
                const o1 = t.newRow({ a: '000100', b: 0 }),
                    o2 = t.newRow({ a: '001101', b: 10 });
                t.newRow({ a: '001302', b: 0 });
                t.newRow({ a: '401212' });
                t.newRow({ a: '172182', b: 0 });
                t.newRow({ a: '123456', b: 10 });
                t.newRow({ a: '654321', b: 2 });
                t.acceptChanges();
                o1.getRow().del();
                o2.getRow().del();
                expect(t.unCachedMaxSubstring('a', 3, 2, $q.eq('b', 0))).toBe(21);
                expect(t.unCachedMaxSubstring('a', 3, 2, $q.eq('b', 10))).toBe(34);
            });

            it('unCachedMaxSubstring should take substring from start where len is greater than string length', function () {
                const o1 = t.newRow({ a: '000100', b: 0 }),
                    o2 = t.newRow({ a: '001101', b: 10 });
                t.newRow({ a: '001302', b: 0 });
                t.newRow({ a: '401212' });
                t.newRow({ a: '172182', b: 0 });
                t.newRow({ a: '123456', b: 10 });
                t.newRow({ a: '654321', b: 2 });
                t.acceptChanges();
                o1.getRow().del();
                o2.getRow().del();
                expect(t.unCachedMaxSubstring('a', 3, 10, $q.eq('b', 0))).toBe(2182);
                expect(t.unCachedMaxSubstring('a', 3, 10, $q.eq('b', 10))).toBe(3456);
            });

            it('unCachedMaxSubstring should give null/undefined if start or len are null/undefined', function () {
                const o1 = t.newRow({ a: '000100', b: 0 }),
                    o2 = t.newRow({ a: '001101', b: 10 });
                t.newRow({ a: '001302', b: 0 });
                t.newRow({ a: '401212' });
                t.newRow({ a: '172182', b: 0 });
                t.newRow({ a: '123456', b: 10 });
                t.newRow({ a: '654321', b: 2 });
                t.acceptChanges();
                o1.getRow().del();
                o2.getRow().del();
                expect(t.unCachedMaxSubstring('a', 3, null, $q.eq('b', 0))).toBe(null);
                expect(t.unCachedMaxSubstring('a', 3, undefined, $q.eq('b', 10))).toBe(undefined);
            });

            it('unCachedMaxSubstring should give 0 when no row matches filter', function () {
                const o1 = t.newRow({ a: '000100', b: 0 }),
                    o2 = t.newRow({ a: '001101', b: 10 });
                t.newRow({ a: '001302', b: 0 });
                t.newRow({ a: '401212' });
                t.newRow({ a: '172182', b: 0 });
                t.newRow({ a: '123456', b: 10 });
                t.newRow({ a: '654321', b: 2 });
                t.acceptChanges();
                o1.getRow().del();
                o2.getRow().del();
                expect(t.unCachedMaxSubstring('a', 3, 10, $q.eq('b', 99))).toBe(0);
            });

            it('unCachedMaxSubstring should give values greater than minimumValue set', function () {
                t.newRow({ a: 1, b: 1 });
                t.newRow({ a: 2, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                t.minimumTempValue('a', 100);
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(100);
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(100);
                expect(t.unCachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(100);
            });

            it('cachedMaxSubstring should give values greater than minimumValue set', function () {
                t.newRow({ a: 1, b: 1 });
                t.newRow({ a: 2, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                t.minimumTempValue('a', 100);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(100);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(100);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(100);
            });

            it('cachedMaxSubstring should call unCachedMaxSubstring when not optimized', function () {
                t.newRow({ a: 1, b: 1 });
                t.newRow({ a: 2, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                t.minimumTempValue('a', 100);
                spyOn(t, 'unCachedMaxSubstring').and.callThrough();
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(1);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(2);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(3);
            });

            it('cachedMaxSubstring should never call unCachedMaxSubstring when is optimized', function () {
                t.setOptimized(true);
                t.newRow({ a: 1, b: 1 });
                t.newRow({ a: 2, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                t.minimumTempValue('a', 100);
                spyOn(t, 'unCachedMaxSubstring').and.callThrough();
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(101);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(102);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);

                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(101);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);

                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(101);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
            });

            it('cachedMaxSubstring should never call unCachedMaxSubstring when is optimized', function () {
                t.setOptimized(true);
                t.newRow({ a: 1, b: 1 });
                t.newRow({ a: 2, b: 10 });
                t.newRow({ a: 5, b: 0 });
                t.newRow({ a: 40 });
                t.newRow({ a: 4, b: 0 });
                t.newRow({ a: -30, b: 10 });
                t.newRow({ a: 10, b: 2 });
                t.minimumTempValue('a', 100);
                spyOn(t, 'unCachedMaxSubstring').and.callThrough();
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(101);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 0))).toBe(102);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);

                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 10))).toBe(101);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);

                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(100);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
                expect(t.cachedMaxSubstring('a', 0, 0, $q.eq('b', 999))).toBe(101);
                expect(t.unCachedMaxSubstring.calls.count()).toBe(0);
            });



        });

        describe('newRow', function () {
            beforeEach(function () {
                const tableA = ds.newTable('a'),
                    tableB = ds.newTable('b'),
                    tableC = ds.newTable('c'),
                    tableD = ds.newTable('d');
                tableA.key('idA');
                tableB.key('idA', 'idB');
                tableC.key('idA', 'idB', 'idC');
                tableD.key('idD');
                tableA.defaults({ g0: 0, g1: 1, g2: 2 });
                tableA.autoIncrement('idA', {});
                tableB.autoIncrement('idB', { selector: ['idA'], idLen: 5 });
                tableC.autoIncrement('idC', { selector: ['idA', 'idB'] });
                ds.newRelation('ab', 'a', 'idA', 'b', 'idA');
                ds.newRelation('bc', 'b', 'idA,idB', 'c', 'idA,idB');
            });

            it('should assign defaults when those are present', function () {
                const rA = ds.tables.a.newRow();
                expect(rA.g0).toBe(0);
                expect(rA.g1).toBe(1);
                expect(rA.g2).toBe(2);
            });

            it('should call calcTemporaryId ', function () {
                spyOn(ds.tables.a, 'calcTemporaryId').and.callThrough();
                const rA = ds.tables.a.newRow();
                expect(ds.tables.a.calcTemporaryId).toHaveBeenCalled();
            });
            it('should call makeChild ', function () {
                spyOn(ds.tables.b, 'makeChild').and.callThrough();
                const rA = ds.tables.a.newRow(),
                    rB = ds.tables.b.newRow({}, rA);
                expect(ds.tables.b.makeChild).toHaveBeenCalled();
                expect(rB.idB).toBe('00001');

            });

            it('should evaluate autoincrement fields on simple case', function () {
                const rA = ds.tables.a.newRow();
                expect(rA.idA).toBe(1);
                const rB = ds.tables.b.newRow();
                expect(rB.idA).toBeUndefined();
                expect(rB.idB).toBe('00001');
                const rB2 = ds.tables.b.newRow({}, rA);
                expect(rB2.idA).toBe(1);
                expect(rB2.idB).toBe('00001');
                const rB3 = ds.tables.b.newRow({}, rA);
                expect(rB3.idA).toBe(1);
                expect(rB3.idB).toBe('00002');
                const rB4 = ds.tables.b.newRow({}, rA);
                expect(rB4.idA).toBe(1);
                expect(rB4.idB).toBe('00003');
                const rC1 = ds.tables.c.newRow({}, rB4);
                expect(rC1.idA).toBe(1);
                expect(rC1.idB).toBe('00003');
                expect(rC1.idC).toBe(1);
                const rC2 = ds.tables.c.newRow({}, rB4);
                expect(rC2.idA).toBe(1);
                expect(rC2.idB).toBe('00003');
                expect(rC2.idC).toBe(2);
                const rC3 = ds.tables.c.newRow({}, rB3);
                expect(rC3.idA).toBe(1);
                expect(rC3.idB).toBe('00002');
                expect(rC3.idC).toBe(1);
            });

            it('should evaluate autoincrement fields on complex case (prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['idE'], 'e', 'parIdE');
                tableE.key('idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6 });
                const rE1 = tableE.newRow({});
                expect(rE1.idE).toBe('14000001');
                const rE2 = tableE.newRow({}, rE1);
                expect(rE2.parIdE).toBe('14000001');
                expect(rE2.idE).toBe('1400000114000001');
                const rE3 = tableE.newRow({}, rE1);
                expect(rE3.parIdE).toBe('14000001');
                expect(rE3.idE).toBe('1400000114000002');
                const rE4 = tableE.newRow({}, rE1);
                expect(rE4.parIdE).toBe('14000001');
                expect(rE4.idE).toBe('1400000114000003');
                const rE5 = tableE.newRow({}, rE2);
                expect(rE5.parIdE).toBe('1400000114000001');
                expect(rE5.idE).toBe('140000011400000114000001');
                const rE6 = tableE.newRow({}, rE2);
                expect(rE6.parIdE).toBe('1400000114000001');
                expect(rE6.idE).toBe('140000011400000114000002');
            });

            it('should evaluate autoincrement fields on more complex case (selectors, prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['idE'], 'e', 'parIdE');
                tableE.key('ayear', 'idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6, selector: ['ayear'] });
                tableE.defaults({ ayear: 2014 });
                const rE1 = tableE.newRow({});
                expect(rE1.idE).toBe('14000001');
                expect(rE1.ayear).toBe(2014);

                const rE1bis = tableE.newRow({ ayear: 2015 });
                expect(rE1bis.idE).toBe('14000001');
                expect(rE1bis.ayear).toBe(2015);

                const rE2 = tableE.newRow({}, rE1);
                expect(rE2.parIdE).toBe('14000001');
                expect(rE2.idE).toBe('1400000114000001');

                const rE2bis = tableE.newRow({ ayear: 2015 }, rE1bis);
                expect(rE2bis.parIdE).toBe('14000001');
                expect(rE2bis.idE).toBe('1400000114000001');

                const rE2ter = tableE.newRow({ ayear: 2014 }, rE1bis);
                expect(rE2ter.ayear).toBe(2014);
                expect(rE2ter.parIdE).toBe('14000001');
                expect(rE2ter.idE).toBe('1400000114000002');

                const rE2quater = tableE.newRow({ ayear: 2014 }, rE1bis);
                expect(rE2quater.ayear).toBe(2014);
                expect(rE2quater.parIdE).toBe('14000001');
                expect(rE2quater.idE).toBe('1400000114000003');


                const rE3 = tableE.newRow({}, rE1);
                expect(rE3.parIdE).toBe('14000001');
                expect(rE3.idE).toBe('1400000114000004');
                const rE4 = tableE.newRow({}, rE1);
                expect(rE4.parIdE).toBe('14000001');
                expect(rE4.idE).toBe('1400000114000005');
                const rE5 = tableE.newRow({}, rE2);
                expect(rE5.parIdE).toBe('1400000114000001');
                expect(rE5.idE).toBe('140000011400000114000001');
                const rE6 = tableE.newRow({}, rE2);
                expect(rE6.parIdE).toBe('1400000114000001');
                expect(rE6.idE).toBe('140000011400000114000002');
            });
        });

        describe('assignField', function () {
            beforeEach(function () {
                const tableA = ds.newTable('a'),
                    tableB = ds.newTable('b'),
                    tableC = ds.newTable('c'),
                    tableD = ds.newTable('d');
                tableA.key('idA');
                tableB.key('idA', 'idB');
                tableC.key('idA', 'idB', 'idC');
                tableD.key('idD');
                tableA.defaults({ g0: 0, g1: 1, g2: 2 });
                tableA.autoIncrement('idA', {});
                tableB.autoIncrement('idB', { selector: ['idA'], idLen: 5 });
                tableC.autoIncrement('idC', { selector: ['idA', 'idB'] });
                ds.newRelation('ab', 'a', 'idA', 'b', 'idA');
                ds.newRelation('bc', 'b', 'idA,idB', 'c', 'idA,idB');
            });

            it('should assign simple fields', function () {
                const rowD = ds.tables.d.newRow({ x: 10, y: 20 }),
                    rowA = ds.tables.d.newRow({ x: 20, y: 30 });
                ds.tables.d.assignField(rowD, 'idD', 5);
                expect(rowD.idD).toBe(5);
                ds.tables.d.assignField(rowA, 'idA', 1);
                expect(rowA.idA).toBe(1);
            });

            it('should call cascadeAssignField', function () {
                spyOn(ds.tables.d, 'cascadeAssignField').and.callThrough();
                const rowD = ds.tables.d.newRow({ x: 10, y: 20 }),
                    rowA = ds.tables.d.newRow({ x: 20, y: 30 });
                ds.tables.d.assignField(rowD, 'idD', 5);
                expect(rowD.idD).toBe(5);
                expect(ds.tables.d.cascadeAssignField.calls.count()).toEqual(1);
                ds.tables.d.assignField(rowA, 'idA', 1);
                expect(rowA.idA).toBe(1);
                expect(ds.tables.d.cascadeAssignField.calls.count()).toEqual(2);
            });


            it('should cascade assign fields (simple case)', function () {
                const rA = ds.tables.a.newRow();  //idA = 1

                const rB = ds.tables.b.newRow(); //idA undefined idB 00001

                const rB2 = ds.tables.b.newRow({}, rA);//idA 1  idB 00001
                const rB3 = ds.tables.b.newRow({}, rA);//idA 1  idB 00002
                const rB4 = ds.tables.b.newRow({}, rA);//idA 1  idB 00003
                const rC1 = ds.tables.c.newRow({}, rB4);//idA 1 idB 00003 idC 1
                const rC2 = ds.tables.c.newRow({}, rB4);//idA 1 idB 00003 idC 2
                const rC3 = ds.tables.c.newRow({}, rB3);//idA 1 idB 00002 idC 1
                expect(rC3.idB).toBe('00002');
                ds.tables.b.assignField(rB3, 'idB', '00005');
                expect(rB3.idB).toBe('00005');
                expect(rC3.idB).toBe('00005');

                ds.tables.b.assignField(rB4, 'idB', '00006');
                expect(rB4.idB).toBe('00006');
                expect(rC1.idB).toBe('00006');
                expect(rC2.idB).toBe('00006');
            });

            it('should cascade assign fields on complex case (prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['idE'], 'e', 'parIdE');
                tableE.key('idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6 });
                const rE1 = tableE.newRow({});       //idE 14000001
                const rE2 = tableE.newRow({}, rE1);  //idE 1400000114000001 parIdE 14000001
                const rE3 = tableE.newRow({}, rE1);  //idE 1400000114000002 parIdE 14000001
                const rE4 = tableE.newRow({}, rE1);  //idE 1400000114000003 parIdE 14000001
                const rE5 = tableE.newRow({}, rE2);  //idE 140000011400000114000001  parIdE 1400000114000001
                const rE6 = tableE.newRow({}, rE2);  //idE 140000011400000114000002  parIdE 1400000114000001

                expect(rE2.idE).toBe('1400000114000001');
                tableE.assignField(rE1, 'idE', '14000104');
                expect(rE2.idE).toBe('1400010414000001');
                expect(rE3.idE).toBe('1400010414000002');
                expect(rE4.idE).toBe('1400010414000003');
                expect(rE5.idE).toBe('140001041400000114000001');
                expect(rE6.idE).toBe('140001041400000114000002');
            });

            it('should cascade assign fields on complex case (linear) (prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['idE'], 'e', 'parIdE');
                tableE.key('idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6, linearField: true });
                const rE1 = tableE.newRow({});       //idE 14000001
                const rE2 = tableE.newRow({}, rE1);  //idE 1400000114000001 parIdE 14000001
                const rE3 = tableE.newRow({}, rE1);  //idE 1400000114000002 parIdE 14000001
                const rE4 = tableE.newRow({}, rE1);  //idE 1400000114000003 parIdE 14000001
                const rE5 = tableE.newRow({}, rE2);  //idE 140000011400000114000001  parIdE 1400000114000001
                const rE6 = tableE.newRow({}, rE2);  //idE 140000011400000114000002  parIdE 1400000114000001

                expect(rE2.idE).toBe('1400000114000001');
                tableE.assignField(rE1, 'idE', '14000104');
                expect(rE2.idE).toBe('1400010414000004');
                expect(rE3.idE).toBe('1400010414000005');
                expect(rE4.idE).toBe('1400010414000006');
                expect(rE5.idE).toBe('140001041400000414000003');
                expect(rE6.idE).toBe('140001041400000414000004');
            });


            it('should evaluate autoincrement fields on more complex case (selectors, prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['ayear', 'idE'], 'e', ['ayear', 'parIdE']);
                tableE.key('ayear', 'idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6, selector: ['ayear'] });
                tableE.defaults({ ayear: 2014 });
                const rE1 = tableE.newRow({});                         //ayear 2014 idE 14000001
                const rE1bis = tableE.newRow({ ayear: 2015 });           //ayear 2015 idE 14000001
                const rE2 = tableE.newRow({}, rE1);                    //ayear 2014 idE 1400000114000001  parIdE  14000001
                const rE2bis = tableE.newRow({ ayear: 2015 }, rE1bis);   //ayear 2015 idE 1400000114000001  parIdE  14000001
                const rE2ter = tableE.newRow({ ayear: 2014 }, rE1bis);   //ayear 2015 idE 1400000114000002  parIdE  14000001
                const rE2quater = tableE.newRow({ ayear: 2014 }, rE1bis);//ayear 2015 idE 1400000114000003  parIdE  14000001
                const rE3 = tableE.newRow({}, rE1);                    //ayear 2014 idE 1400000114000002  parIdE  14000001
                const rE4 = tableE.newRow({}, rE1);                    //ayear 2014 idE 1400000114000003  parIdE  14000001
                const rE5 = tableE.newRow({}, rE2);     //ayear 2014 idE 140000011400000114000001  parIdE  1400000114000001
                const rE6 = tableE.newRow({}, rE2);     //ayear 2014 idE 140000011400000114000002  parIdE  1400000114000001
                expect(rE2ter.ayear).toBe(2015);
                expect(rE2quater.ayear).toBe(2015);
                expect(rE2quater.idE).toBe('1400000114000003');
                expect(rE3.idE).toBe('1400000114000002');
                expect(rE4.idE).toBe('1400000114000003');
                expect(rE5.idE).toBe('140000011400000114000001');
                expect(rE6.idE).toBe('140000011400000114000002');
                tableE.assignField(rE1, 'idE', '14000999'); //ayear 2014 idE 14000999
                expect(rE1bis.idE).toBe('14000001'); //should not change cause is not a child
                expect(rE2.idE).toBe('1400099914000001');
                expect(rE2bis.idE).toBe('1400000114000001'); //should not change cause has a different selector
                expect(rE2ter.idE).toBe('1400000114000002'); //should change cause parent is changed
                expect(rE2quater.idE).toBe('1400000114000003'); //should change cause parent is changed
                expect(rE3.idE).toBe('1400099914000002'); //should change cause parent is changed
                expect(rE4.idE).toBe('1400099914000003'); //should change cause parent is changed
                expect(rE5.idE).toBe('140009991400000114000001'); //should change cause parent is changed
                expect(rE6.idE).toBe('140009991400000114000002'); //should change cause parent is changed

            });
        });

        describe('getSelector', function () {
            let t, auto, auto2, auto3;
            beforeEach(function () {
                t = ds.newTable('a');
                t.autoIncrement('id', { selector: ['y', 'n'] });
                t.autoIncrement('id2', { selector: [] });
                t.autoIncrement('id3', { selector: ['y', 'n'], selectorMask: [0xff, 0x0F] });
                auto = t.autoIncrement('id');
                auto2 = t.autoIncrement('id2');
                auto3 = t.autoIncrement('id3');
            });

            it('should return a function', function () {
                expect(auto.getSelector({ y: 2010, n: 1 })).toEqual(jasmine.any(Function));
            });

            it('returned function should compare all fields in autoIncrementProperty.selector', function () {
                const r1 = t.newRow({ a: 1, b: 2, y: 2014, n: 1 }),
                    r2 = t.newRow({ a: 2, b: 2, y: 2014, n: 1 }),
                    r3 = t.newRow({ a: 3, b: 2, y: 2014, n: 2 }),
                    r4 = t.newRow({ a: 4, b: 2, y: 2014, n: 3 }),
                    r5 = t.newRow({ a: 5, b: 2, y: 2014, n: 3 }),
                    r6 = t.newRow({ a: 6, b: 2, y: 2014, n: 4 }),
                    r7 = t.newRow({ a: 2, b: 2, y: 2015, n: 1 }),
                    r8 = t.newRow({ a: 3, b: 2, y: 2015, n: 2 }),
                    r9 = t.newRow({ a: 4, b: 2, y: 2015, n: 3 });
                const f = auto.getSelector({ a: 12, b: 15, y: 2014, n: 3 });
                expect(t.select(f)).toEqual([r4, r5]);
                const f2 = auto.getSelector({ a: 13, b: 20, y: 2014, n: 1 });
                expect(t.select(f2)).toEqual([r1, r2]);
                const f3 = auto.getSelector({ a: 13, b: 20, y: 2014 }, auto);
                expect(t.select(f3)).toEqual([]);
                const f4 = auto.getSelector({ a: 13, b: 20 });
                expect(t.select(f4)).toEqual([]);
                const f6 = auto3.getSelector({ a: 13, b: 20, y: 2014, n: 1 });
                expect(t.select(f6)).toEqual([r1, r2]);

            });

            it('empty selector means no filter', function () {
                const r1 = t.newRow({ a: 1, b: 2, y: 2014, n: 1 }),
                    r2 = t.newRow({ a: 2, b: 2, y: 2014, n: 1 }),
                    r3 = t.newRow({ a: 3, b: 2, y: 2014, n: 2 }),
                    r4 = t.newRow({ a: 4, b: 2, y: 2014, n: 3 }),
                    r5 = t.newRow({ a: 5, b: 2, y: 2014, n: 3 }),
                    r6 = t.newRow({ a: 6, b: 2, y: 2014, n: 4 }),
                    r7 = t.newRow({ a: 2, b: 2, y: 2015, n: 1 }),
                    r8 = t.newRow({ a: 3, b: 2, y: 2015, n: 2 }),
                    r9 = t.newRow({ a: 4, b: 2, y: 2015, n: 3 }),
                    f5 = auto2.getSelector({ a: 13, b: 20, y: 2014, n: 1 });
                expect(t.select(f5)).toEqual([r1, r2, r3, r4, r5, r6, r7, r8, r9]);
            });

            it('should use mask when given', function () {
                const r1 = t.newRow({ a: 1, b: 2, y: 2014, n: 1 }),
                    r2 = t.newRow({ a: 2, b: 2, y: 2014, n: 1 }),
                    r3 = t.newRow({ a: 3, b: 2, y: 2014, n: 2 }),
                    r4 = t.newRow({ a: 4, b: 2, y: 2014, n: 3 }),
                    r5 = t.newRow({ a: 5, b: 2, y: 2014, n: 3 }),
                    r6 = t.newRow({ a: 6, b: 2, y: 2014, n: 4 }),
                    r7 = t.newRow({ a: 2, b: 2, y: 2015, n: 1 }),
                    r8 = t.newRow({ a: 3, b: 2, y: 2015, n: 2 }),
                    r9 = t.newRow({ a: 4, b: 2, y: 2015, n: 3 }),
                    f6 = auto3.getSelector({ a: 13, b: 20, y: 2014, n: 257 }),
                    f7 = auto3.getSelector({ a: 13, b: 20, y: 2270, n: 1 }),
                    f8 = auto3.getSelector({ a: 13, b: 20, y: 2014, n: 17 }),
                    f9 = auto3.getSelector({ a: 13, b: 20, y: 2015 + 0xFFF00, n: 1 + 0xFFF0 });
                expect(t.select(f6)).toEqual([r1, r2]);
                expect(t.select(f7)).toEqual([r1, r2]);
                expect(t.select(f8)).toEqual([r1, r2]);
                expect(t.select(f9)).toEqual([r7]);
            });

        });

        describe('avoidCollisions', function () {
            beforeEach(function () {
                const tableA = ds.newTable('a'),
                    tableB = ds.newTable('b'),
                    tableC = ds.newTable('c'),
                    tableD = ds.newTable('d');
                tableA.key('idA');
                tableB.key('idA', 'idB');
                tableC.key('idA', 'idB', 'idC');
                tableD.key('idD');
                tableA.defaults({ g0: 0, g1: 1, g2: 2 });
                tableA.autoIncrement('idA', {});
                tableB.autoIncrement('idB', { selector: ['idA'], idLen: 5 });
                tableC.autoIncrement('idC', { selector: ['idA', 'idB'] });
                ds.newRelation('ab', 'a', 'idA', 'b', 'idA');
                ds.newRelation('bc', 'b', 'idA,idB', 'c', 'idA,idB');
            });



            it('should avoid collision - simple case', function () {
                const rA = ds.tables.a.newRow();  //idA = 1
                const rA2 = ds.tables.a.newRow();  //idA = 2
                const rA3 = ds.tables.a.newRow();  //idA = 3

                const rB = ds.tables.b.newRow(); //idA undefined idB 00001
                const rB2 = ds.tables.b.newRow({}, rA);//idA 1  idB 00001
                const rB3 = ds.tables.b.newRow({}, rA);//idA 1  idB 00002
                const rB4 = ds.tables.b.newRow({}, rA);//idA 1  idB 00003
                const rC1 = ds.tables.c.newRow({}, rB4);//idA 1 idB 00003 idC 1
                const rC2 = ds.tables.c.newRow({}, rB4);//idA 1 idB 00003 idC 2
                const rC3 = ds.tables.c.newRow({}, rB3);//idA 1 idB 00002 idC 1

                expect(rA2.idA).toBe(2);
                expect(rA3.idA).toBe(3);

                spyOn(ds.tables.a, 'calcTemporaryId').and.callThrough();
                ds.tables.a.avoidCollisions(rA, 'idA', 2);
                expect(ds.tables.a.calcTemporaryId).toHaveBeenCalledWith(rA2, 'idA');
                expect(ds.tables.a.calcTemporaryId.calls.count()).toBe(1);
                expect(rA.idA).toBe(1);
                expect(rA2.idA).toBe(4);

                ds.tables.a.avoidCollisions(rA, 'idA', 3);
                expect(ds.tables.a.calcTemporaryId.calls.argsFor(1)).toEqual([rA3, 'idA']);
                expect(ds.tables.a.calcTemporaryId.calls.count()).toBe(2);
                expect(rA.idA).toBe(1);
                expect(rA3.idA).toBe(5);

                ds.tables.a.avoidCollisions(rA3, 'idA', 1);
                expect(rA.idA).toBe(6);
                expect(rB2.idA).toBe(6);
                expect(rB3.idA).toBe(6);
                expect(rB4.idA).toBe(6);
                expect(rC2.idA).toBe(6);
                expect(rC3.idA).toBe(6);

                ds.tables.b.avoidCollisions(rB3, 'idB', '00003');
                expect(rB4.idB).toBe('00004');
                expect(rC1.idB).toBe('00004');
                expect(rC2.idB).toBe('00004');
                expect(rC3.idB).toBe('00004');


                ds.tables.b.avoidCollisions(rB2, 'idA', 1);



            });

            it('should avoid collision on complex case (prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['idE'], 'e', 'parIdE');
                tableE.key('idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6 });
                const rE1 = tableE.newRow({});       //idE 14000001
                const rE2 = tableE.newRow({}, rE1);  //idE 1400000114000001 parIdE 14000001
                const rE3 = tableE.newRow({}, rE1);  //idE 1400000114000002 parIdE 14000001
                const rE4 = tableE.newRow({}, rE1);  //idE 1400000114000003 parIdE 14000001
                const rE5 = tableE.newRow({}, rE2);  //idE 140000011400000114000001  parIdE 1400000114000001
                const rE6 = tableE.newRow({}, rE2);  //idE 140000011400000114000002  parIdE 1400000114000001
                const rE1Bis = tableE.newRow({});       //idE 14000002

                tableE.avoidCollisions(rE1Bis, 'idE', '14000001');
                expect(rE2.idE).toBe('1400000314000001');
                expect(rE2.idE).toBe('1400000314000001');
                expect(rE3.idE).toBe('1400000314000002');
                expect(rE4.idE).toBe('1400000314000003');
                expect(rE5.idE).toBe('140000031400000114000001');
                expect(rE6.idE).toBe('140000031400000114000002');

            });


            it('should avoid collisions on more complex case (selectors, prefix field, middle field)', function () {
                const tableE = ds.newTable('e');
                ds.newRelation('e-e', 'e', ['ayear', 'idE'], 'e', ['ayear', 'parIdE']);
                tableE.key('ayear', 'idE');
                tableE.autoIncrement('idE', { middleConst: '14', prefixField: 'parIdE', idLen: 6, selector: ['ayear'] });
                tableE.defaults({ ayear: 2014 });
                const rE1 = tableE.newRow({});                         //ayear 2014 idE 14000001
                const rE1bis = tableE.newRow({ ayear: 2015 });           //ayear 2015 idE 14000001

                const rE2 = tableE.newRow({}, rE1);                    //ayear 2014 idE 1400000114000001  parIdE  14000001
                const rE2bis = tableE.newRow({ ayear: 2015 }, rE1bis);   //ayear 2015 idE 1400000114000001  parIdE  14000001
                const rE2ter = tableE.newRow({ ayear: 2014 }, rE1bis);   //ayear 2015 idE 1400000114000002  parIdE  14000001
                const rE2quater = tableE.newRow({ ayear: 2014 }, rE1bis);//ayear 2015 idE 1400000114000003  parIdE  14000001
                const rE3 = tableE.newRow({}, rE1);                    //ayear 2014 idE 1400000114000002  parIdE  14000001
                const rE4 = tableE.newRow({}, rE1);                    //ayear 2014 idE 1400000114000003  parIdE  14000001
                const rE5 = tableE.newRow({}, rE2);     //ayear 2014 idE 140000011400000114000001  parIdE  1400000114000001
                const rE6 = tableE.newRow({}, rE2);     //ayear 2014 idE 140000011400000114000002  parIdE  1400000114000001

                expect(rE2ter.idE).toBe('1400000114000002');
                expect(rE2quater.idE).toBe('1400000114000003');
                expect(rE3.idE).toBe('1400000114000002');
                expect(rE4.idE).toBe('1400000114000003');
                expect(rE5.idE).toBe('140000011400000114000001');
                expect(rE6.idE).toBe('140000011400000114000002');

                tableE.avoidCollisions(rE1, 'ayear', 2015); //should change idE and leave ayear unchanged
                expect(rE1.ayear).toBe(2014);
                expect(rE1.idE).toBe('14000001');
                expect(rE1bis.ayear).toBe(2015);
                expect(rE1bis.idE).toBe('14000002');
                expect(rE2bis.idE).toBe('1400000214000001');
                expect(rE2ter.idE).toBe('1400000214000002');
                expect(rE2quater.idE).toBe('1400000214000003');
                expect(rE3.idE).toBe('1400000114000002');  //unchanged cause 2014
                expect(rE4.idE).toBe('1400000114000003');  //unchanged cause 2014
                expect(rE5.idE).toBe('140000011400000114000001'); //unchanged cause 2014
                expect(rE6.idE).toBe('140000011400000114000002'); //unchanged cause 2014

            });
        });

        describe('serialize', function () {
            it('should be a function', function () {
                const t = ds.newTable('a');
                expect(t.serialize).toEqual(jasmine.any(Function));
            });

            it('should preserve row number', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 });
                expect(t.serialize().rows.length).toBe(3);
            });
        });

        describe('deSerialize', function () {
            it('should be a function', function () {
                const t = ds.newTable('a');
                expect(t.deSerialize).toEqual(jasmine.any(Function));
            });

            it('should preserve row number', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 }),
                    t2 = ds2.newTable('a'), sData = JSON.parse(JSON.stringify(t.serialize()));

                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows.length).toBe(3);
            });

            it('should preserve state and value for added rows', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 }),
                    t2 = ds2.newTable('a'),
                    sData = JSON.parse(JSON.stringify(t.serialize()));
                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows[0].getRow().state).toBe(dsSpace.dataRowState.added);
                expect(t2.rows[1].getRow().state).toBe(dsSpace.dataRowState.added);
                expect(t2.rows[2].getRow().state).toBe(dsSpace.dataRowState.added);
                expect(t2.rows[0].a).toBe(1);
                expect(t2.rows[1].a).toBe(2);
                expect(t2.rows[2].a).toBe(3);
            });

            it('should preserve state and value for unchanged rows', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 }),
                    t2 = ds2.newTable('a');
                let sData;
                t.acceptChanges();
                sData = JSON.parse(JSON.stringify(t.serialize()));
                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows[0].getRow().state).toBe(dsSpace.dataRowState.unchanged);
                expect(t2.rows[1].getRow().state).toBe(dsSpace.dataRowState.unchanged);
                expect(t2.rows[2].getRow().state).toBe(dsSpace.dataRowState.unchanged);
                expect(t2.rows[0].a).toBe(1);
                expect(t2.rows[1].a).toBe(2);
                expect(t2.rows[2].a).toBe(3);
            });

            it('should preserve state and value for deleted rows', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 }),
                    t2 = ds2.newTable('a');
                let sData;
                t.acceptChanges();
                r1.getRow().del();
                r2.getRow().del();
                r3.getRow().del();
                sData = JSON.parse(JSON.stringify(t.serialize()));
                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows[0].getRow().state).toBe(dsSpace.dataRowState.deleted);
                expect(t2.rows[1].getRow().state).toBe(dsSpace.dataRowState.deleted);
                expect(t2.rows[2].getRow().state).toBe(dsSpace.dataRowState.deleted);
                expect(t2.rows[0].a).toBe(1);
                expect(t2.rows[1].a).toBe(2);
                expect(t2.rows[2].a).toBe(3);
            });

            it('should preserve state and value for modified rows', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 }),
                    t2 = ds2.newTable('a');
                let sData;
                t.acceptChanges();
                r1.a = 4;
                r2.a = 5;
                r3.a = 6;
                sData = JSON.parse(JSON.stringify(t.serialize()));
                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows[0].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[1].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[2].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[0].a).toBe(4);
                expect(t2.rows[1].a).toBe(5);
                expect(t2.rows[2].a).toBe(6);
                expect(t2.rows[0].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(1);
                expect(t2.rows[1].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(2);
                expect(t2.rows[2].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(3);
            });

            it('should preserve field addition for modified rows', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1 }),
                    r2 = t.newRow({ a: 2 }),
                    r3 = t.newRow({ a: 3 }),
                    t2 = ds2.newTable('a');
                let sData;
                t.acceptChanges();
                r1.a = 4; //r1: modifying an existing property
                r2.b = 5; //r2: adding a new property
                r3.c = 6; //r3: adding a new property
                sData = JSON.parse(JSON.stringify(t.serialize()));
                expect(r1.getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(r2.getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(r3.getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows[0].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[1].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[2].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[0].a).toBe(4);
                expect(t2.rows[1].b).toBe(5);
                expect(t2.rows[2].c).toBe(6);
                expect(t2.rows[0].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(1);
                expect(t2.rows[1].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(2);
                expect(t2.rows[2].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(3);
                expect(t2.rows[0].getRow().getValue('b', dsSpace.dataRowVersion.original)).toBeNull();
                //if we change value previous is assumed null
                expect(t2.rows[1].getRow().getValue('b', dsSpace.dataRowVersion.original)).toBeNull();
                expect(t2.rows[2].getRow().getValue('b', dsSpace.dataRowVersion.original)).toBeNull();
                expect(t2.rows[0].getRow().getValue('c', dsSpace.dataRowVersion.original)).toBeNull();
                expect(t2.rows[1].getRow().getValue('c', dsSpace.dataRowVersion.original)).toBeNull();
                //if we change value previous is assumed null
                expect(t2.rows[2].getRow().getValue('c', dsSpace.dataRowVersion.original)).toBeNull();
            });

            it('should preserve field deletion for modified rows', function () {
                const t = ds.newTable('a'),
                    r1 = t.newRow({ a: 1, b: 4 }),
                    r2 = t.newRow({ a: 2, b: 5 }),
                    r3 = t.newRow({ a: 3, b: 6 }),
                    t2 = ds2.newTable('a');
                let sData;
                t.acceptChanges();
                r1.a = 4;
                r2.b = 5;
                r3.c = 6;
                delete r1.a;
                delete r2.b;
                delete r3.b;
                sData = JSON.parse(JSON.stringify(t.serialize()));
                expect(sData.rows.length).toBe(3);
                t2.deSerialize(sData);
                expect(t2.rows[0].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[1].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[2].getRow().state).toBe(dsSpace.dataRowState.modified);
                expect(t2.rows[0].a).toBeUndefined();
                expect(t2.rows[0].b).toBe(4);
                expect(t2.rows[0].a).toBeUndefined();
                expect(t2.rows[1].a).toBe(2);
                expect(t2.rows[1].b).toBeUndefined();
                expect(t2.rows[2].a).toBe(3);
                expect(t2.rows[2].b).toBeUndefined();
                expect(t2.rows[2].c).toBe(6);
                expect(t2.rows[0].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(1);
                expect(t2.rows[1].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(2);
                expect(t2.rows[2].getRow().getValue('a', dsSpace.dataRowVersion.original)).toBe(3);
                expect(t2.rows[0].getRow().getValue('b', dsSpace.dataRowVersion.original)).toBe(4);
                expect(t2.rows[1].getRow().getValue('b', dsSpace.dataRowVersion.original)).toBe(5);
                expect(t2.rows[2].getRow().getValue('b', dsSpace.dataRowVersion.original)).toBe(6);
                expect(t2.rows[0].getRow().getValue('c', dsSpace.dataRowVersion.original)).toBeNull();
                expect(t2.rows[1].getRow().getValue('c', dsSpace.dataRowVersion.original)).toBeNull();
                //if we change value previous is assumed null
                expect(t2.rows[2].getRow().getValue('c', dsSpace.dataRowVersion.original)).toBeNull();
            });


        });
    });


    describe('DataRow module test', function () {
        var dsNameSpace = jsDataSet,
            DataRow = dsNameSpace.DataRow,
            $rowState = dsNameSpace.dataRowState,
            ds;



        beforeEach(function () {
            ds = new dsNameSpace.DataSet('temp');
        });

        afterEach(function () {
            ds = null;
        });

        //
        // it('Prerequisite: ObjectObserver should be defined', function () {
        //   expect(ObjectObserver).toBeDefined();
        // });

        describe('DataRow functions', function () {
            var t, o, o2, o3, o4, p, p2, p3, p4;


            beforeEach(function () {
                t = ds.newTable('tt');
                o = { a: 1, b: 2, c: 'a' };           //o,o2,o3,o4 are plain object  (objectRow)
                o2 = { a: 1, b: 2, c: 'a' };
                o3 = { a: 2, b: 3, c: 'b' };
                o4 = { a: 3, b: 4, c: 'c' };
                p = t.load(o);                  //p,p2,p3,p4 are linked DataRow
                p2 = t.load(o2);
                p3 = t.load(o3);
                p4 = t.load(o4);
                o = p.current;
                o2 = p2.current;
                o3 = p3.current;
                o4 = p4.current;


            });
            afterEach(function () {
                o = o2 = o3 = o4 = null;
                p = p2 = p3 = p4 = null;
            });

            it('new DataRow should return an object', function () {
                var p = new DataRow({ a: 1 });
                expect(p).toEqual(jasmine.any(Object));
            });

            it('new DataRow should return a DataRow', function () {
                var p = new DataRow({ a: 1 });
                expect(p).toEqual(jasmine.any(DataRow));
            });


            it('new DataRow called with a DataRow object should throw exception', function () {
                var p = new DataRow({ a: 1 }),
                    createDr = function () {
                        var q = new DataRow(p);
                        q.b = 1;
                    };
                expect(createDr).toThrow();
            });

            it('new DataRow called with an  object already linked to a DataRow should not throw exception', function () {
                var a = { Q: 1 },
                    q = new DataRow(a),
                    createDr = function () {
                        var q2 = new DataRow(a);
                        q2.b = 1;
                    };
                q.b = 1;
                expect(createDr).not.toThrow();
            });
            it('new DataRow called with an  object already linked to a DataRow should create an independent DataRow', function () {
                var a = { Q: 1 },
                    q = new DataRow(a),
                    createDr = function () {
                        var q2 = new DataRow(a);
                        q2.b = 1;
                    };
                q.b = 1;
                q.Q = 2;
                expect(a.Q).toBe(1);
            });

            it(' DataRow called with an  object already linked to a DataRow should return the linked DataRow',
                function () {
                    var call = DataRow,
                        a = { Q: 1 },
                        p = new DataRow(a),
                        q = call(a);
                    expect(p).toBe(q);
                });


            it('Initial value should be the same', function () {
                expect(o.a).toEqual(1);
            });

            it('Value should be changeable', function () {
                o.a = 2;
                expect(o.a).toEqual(2);
            });

            it('Initial rowstate is unchanged', function () {
                expect(o.getRow().state).toBe($rowState.unchanged);
            });

            it('Changes does modify rowstate to modified', function () {
                o.a = 2;
                expect(p.state).toBe($rowState.modified);
                p.acceptChanges();
                expect(o.getRow().state).toBe($rowState.unchanged);
                o.a = 3;
                expect(o.getRow().state).toBe($rowState.modified);
            });

            it('Reverting changes restores rowstate to unchanged', function () {
                o.a = 2;
                expect(o.getRow().state).toBe($rowState.modified);
                o.a = 1;
                expect(o.getRow().state).toBe($rowState.unchanged);
            });


            it('Deletes does modify rowstate to deleted', function () {

                o.getRow().del();
                expect(o.getRow().state).toBe($rowState.deleted);
            });


            it('acceptChanges should not modify current value', function () {
                o.a = 2;
                o2.a = 3;
                o.getRow().acceptChanges();
                o2.getRow().acceptChanges();
                expect(o.a).toBe(2);
            });

            it('DataRow.rejectChanges should revert modifications', function () {
                var oldA = o.a,
                    oldC = o.c;
                o.a = 2;
                o.a = 1;
                o.c = 'q';
                o.a = 3;

                expect(o.getRow().originalRow().a).toBe(oldA);

                o.getRow().rejectChanges();
                expect(o.a).toBe(oldA);
                expect(o.c).toBe(oldC);
            });

            it('dataRow.rejectChanges should revert field additions', function () {
                expect(o.d).toBeUndefined();
                o.d = 2;
                expect(o.d).toBeDefined();
                o.getRow().rejectChanges();
                expect(o.d).toBeNull(); //if we revert value setting, current value becomes null
            });


            it('dataRow.rejectChanges should revert field deletions', function () {
                o.a = 2;
                o.getRow().acceptChanges();
                delete o.a;
                expect(o.a).toBeUndefined();
                o.getRow().rejectChanges();
                expect(o.a).toBeDefined();
            });

            it('adding and deleting fields results in unchanged datarowversion', function () {
                expect(o.d).toBeUndefined();
                o.d = 2;
                expect(o.getRow().state).toBe($rowState.modified);
                o.d = 3;
                expect(o.getRow().state).toBe($rowState.modified);
                delete o.d;
                expect(o.d).toBeUndefined();
                expect(o.getRow().state).toBe($rowState.unchanged);

            });

            it('adding and deleting fields results in unchanged datarowversion', function () {
                expect(o.d).toBeUndefined();
                o.d = 2;
                expect(o.getRow().state).toBe($rowState.modified);
                delete o.d;
                expect(o.d).toBeUndefined();
                expect(o.getRow().state).toBe($rowState.unchanged);

            });

            it('deleting and adding fields results in unchanged datarowversion', function () {
                expect(o.qq2).toBeUndefined();
                o.qq2 = 2;
                expect(o.getRow().state).toBe($rowState.modified);
                o.getRow().acceptChanges();
                expect(o.getRow().state).toBe($rowState.unchanged);
                delete o.qq2;
                expect(o.qq2).toBeUndefined();
                expect(o.getRow().state).toBe($rowState.modified);
                o.qq2 = 2;
                expect(o.getRow().state).toBe($rowState.unchanged);

            });

            it('deleting and adding fields results in unchanged datarowversion', function () {
                expect(o.qq2).toBeUndefined();
                o.qq2 = 2;
                expect(o.getRow().state).toBe($rowState.modified);
                o.getRow().acceptChanges();
                expect(o.getRow().state).toBe($rowState.unchanged);
                delete o.qq2;
                expect(o.qq2).toBeUndefined();
                expect(o.getRow().state).toBe($rowState.modified);
                o.qq2 = 3;
                expect(o.getRow().state).toBe($rowState.modified);
                o.qq2 = 2;
                expect(o.getRow().state).toBe($rowState.unchanged);

            });
        });

        describe('DataRow relations', function () {
            var t, o, o2, o3, o4, p, p2, p3, p4,
                q, o5, o6, o7, o8, o9, p5, p6, p7, p8, p9,
                s, o10, o11, o12, o13, o14, o15, p10, p11, p12, p13, p14, p15,
                u, o16, o17, o18, o19, p16, p17, p18, p19,
                d;


            beforeEach(function () {
                d = new jsDataSet.DataSet("dummy name");

                t = d.newTable('par1');
                o = { a: 1, b: 2, c: 'a' };
                o2 = { a: 1, b: 2, c: 'b' };
                o3 = { a: 2, b: 3, c: '1a' };
                o4 = { a: 3, b: 4, c: 'c' };
                p = t.load(o); p2 = t.load(o2); p3 = t.load(o3); p4 = t.load(o4);

                q = d.newTable('par2');
                o5 = { a: 11, b: 2, c: 'a' };
                o6 = { a: 1, b: 12, c: 'aa' };
                o7 = { a: 2, b: 13, c: 'b2' };
                o8 = { a: 3, b: 4, c: 'c1' };
                o9 = { a: 3, b: 4, c: 'c11' };
                p5 = q.load(o5); p6 = q.load(o6); p7 = q.load(o7); p8 = q.load(o8); p9 = q.load(o9);

                s = d.newTable('child1');
                o10 = { a: 1, b: 12, c: '1a' };
                o11 = { a: 2, b: 2, c: 'a' };
                o12 = { a: 23, b: 4, c: 'b2' };
                o13 = { a: 4, b: 8, c: 'c1' };
                o14 = { a: 7, b: 3, c: 'c12' };
                p10 = s.load(o10); p11 = s.load(o11); p12 = s.load(o12); p13 = s.load(o13); p14 = s.load(o14);

                u = d.newTable('child2');
                o15 = { a: 3, b: 3, c: '1a' };
                o16 = { a: 3, b: 4, c: '2a' };
                o17 = { a: 4, b: 5, c: 'b' };
                o18 = { a: 5, b: 6, c: 'c1' };
                o19 = { a: 6, b: 7, c: 'c' };
                p15 = u.load(o15); p16 = u.load(o16); p17 = u.load(o17); p18 = u.load(o18); p19 = u.load(o19);


                d.newRelation('r1', 'par1', ['a'], 'child1', ['a']); //par1 to child1 through a->a
                d.newRelation('r3', 'par2', ['a'], 'child1', ['b']); //par2 to child1 through a->b
                d.newRelation('r5', 'par1', ['c'], 'child1', ['c']); //par1 to child1 through c->c
                d.newRelation('r2', 'par1', ['b'], 'child2', ['b']); //par1 to child2 through b->b
                d.newRelation('r4', 'par2', ['b'], 'child2', ['a']); //par2 to child2 through b->a
                d.newRelation('r6', 'par2', ['c'], 'child2', ['c']); //par2 to child2 through c->c

            });
            afterEach(function () {
                d = t = q = s = u = null;
                o = o2 = o3 = o4 = o5 = o6 = o7 = o8 = o9 = o10 = o11 = o12 = o13 = o14 = o15 = o16 = o17 = o18 = o19 = null;
                p = p2 = p3 = p4 = p5 = p6 = p7 = p8 = p9 = p10 = p11 = p12 = p13 = p14 = p15 = p16 = p17 = p18 = p19 = null;
            });

            it('getParentRows should give parent of a row through a specified relation', function () {
                expect(p10.getParentRows('r1')).toEqual([o, o2]);
                expect(p11.getParentRows('r1')).toEqual([o3]);
                expect(p12.getParentRows('r1')).toEqual([]);
                expect(p13.getParentRows('r1')).toEqual([]);
                expect(p14.getParentRows('r1')).toEqual([]);

                expect(p10.getParentRows('r3')).toEqual([]);
                expect(p11.getParentRows('r3')).toEqual([o7]);
                expect(p12.getParentRows('r3')).toEqual([]);
                expect(p13.getParentRows('r3')).toEqual([]);
                expect(p14.getParentRows('r3')).toEqual([o8, o9]);

                expect(p10.getParentRows('r5')).toEqual([o3]);
                expect(p11.getParentRows('r5')).toEqual([o]);
                expect(p12.getParentRows('r5')).toEqual([]);
                expect(p13.getParentRows('r5')).toEqual([]);
                expect(p14.getParentRows('r5')).toEqual([]);



            });


            it('getParentsInTable should give parent of a row in a specified table', function () {
                expect(p10.getParentsInTable('par1')).toHaveSameItems([o, o2, o3], true);
                expect(p11.getParentsInTable('par1')).toHaveSameItems([o3, o], true);
                expect(p12.getParentsInTable('par1')).toHaveSameItems([]);
                expect(p13.getParentsInTable('par1')).toHaveSameItems([]);
                expect(p14.getParentsInTable('par1')).toHaveSameItems([]);

                expect(p10.getParentsInTable('par2')).toEqual([]);
                expect(p11.getParentsInTable('par2')).toHaveSameItems([o7], true);
                expect(p12.getParentsInTable('par2')).toEqual([]);
                expect(p13.getParentsInTable('par2')).toEqual([]);
                expect(p14.getParentsInTable('par2')).toHaveSameItems([o8, o9], true);
            });

            it('getAllParentRows should give all parent of a row', function () {
                expect(p10.getAllParentRows()).toHaveSameItems([o, o2, o3], true);
                expect(p11.getAllParentRows()).toHaveSameItems([o, o3, o7], true);
                expect(p12.getAllParentRows()).toEqual([]);
                expect(p13.getAllParentRows()).toEqual([]);
                expect(p14.getAllParentRows()).toHaveSameItems([o8, o9], true);
            });



            it('getChildRows should give childs of a row through a specified relation', function () {
                expect(p.getChildRows('r1')).toEqual([o10]);
                expect(p2.getChildRows('r1')).toEqual([o10]);
                expect(p3.getChildRows('r1')).toEqual([o11]);
                expect(p4.getChildRows('r1')).toEqual([]);

                expect(p.getChildRows('r2')).toEqual([]);
                expect(p2.getChildRows('r2')).toEqual([]);
                expect(p3.getChildRows('r2')).toEqual([o15]);
                expect(p4.getChildRows('r2')).toEqual([o16]);

                expect(p.getChildRows('r3')).toEqual([]);
                expect(p2.getChildRows('r3')).toEqual([]);
                expect(p3.getChildRows('r3')).toEqual([o11]);
                expect(p4.getChildRows('r3')).toEqual([o14]);

                expect(p.getChildRows('r4')).toEqual([]);
                expect(p2.getChildRows('r4')).toEqual([]);
                expect(p3.getChildRows('r4')).toHaveSameItems([o15, o16], true);
                expect(p4.getChildRows('r4')).toEqual([o17]);


                expect(p.getChildRows('r5')).toEqual([o11]);
                expect(p2.getChildRows('r5')).toEqual([]);
                expect(p3.getChildRows('r5')).toEqual([o10]);
                expect(p4.getChildRows('r5')).toEqual([]);



                expect(p5.getChildRows('r3')).toEqual([]);
                expect(p6.getChildRows('r3')).toEqual([]);
                expect(p7.getChildRows('r3')).toEqual([o11]);
                expect(p8.getChildRows('r3')).toEqual([o14]);
                expect(p9.getChildRows('r3')).toEqual([o14]);

                expect(p5.getChildRows('r4')).toEqual([]);
                expect(p6.getChildRows('r4')).toEqual([]);
                expect(p7.getChildRows('r4')).toEqual([]);
                expect(p8.getChildRows('r4')).toEqual([o17]);
                expect(p9.getChildRows('r4')).toEqual([o17]);

                expect(p5.getChildRows('r6')).toEqual([]);
                expect(p6.getChildRows('r6')).toEqual([]);
                expect(p7.getChildRows('r6')).toEqual([]);
                expect(p8.getChildRows('r6')).toEqual([o18]);
                expect(p9.getChildRows('r6')).toEqual([]);


            });

            it('getAllChildRows should give all childs of a row in all tables', function () {
                expect(p.getAllChildRows()).toHaveSameItems([o10, o11], true);
                expect(p2.getAllChildRows()).toEqual([o10]);
                expect(p3.getAllChildRows()).toHaveSameItems([o10, o11, o15], true);
                expect(p4.getAllChildRows()).toEqual([o16]);
            });


            it('getChildRows should give childs of a row in a specified table', function () {
                expect(p.getChildInTable('child1')).toHaveSameItems([o10, o11], true);
                expect(p2.getChildInTable('child1')).toEqual([o10]);
                expect(p3.getChildInTable('child1')).toHaveSameItems([o10, o11], true);
                expect(p4.getChildInTable('child1')).toEqual([]);

                expect(p.getChildInTable('child2')).toEqual([]);
                expect(p2.getChildInTable('child2')).toEqual([]);
                expect(p3.getChildInTable('child2')).toEqual([o15]);
                expect(p4.getChildInTable('child2')).toEqual([o16]);


            });
        });



    });

})