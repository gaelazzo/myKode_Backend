/*globals expect  */
'use strict';


const DA = require('../../src/jsDataAccess');

const mSel = require('../../src/jsMultiSelect');
const Select = mSel.Select;
const MultiCompare = mSel.MultiCompare;
const _ = require('lodash');
const fs = require('fs');

/**
 * @property $dq
 * @private
 * @type jsDataQuery
 */
const $dq = require('./../../client/components/metadata/jsDataQuery');
const Deferred = require("JQDeferred");

/**
 * *****************************************************************************************
 * VERY IMPORTANT VERY IMPORTANT VERY IMPORTANT VERY IMPORTANT VERY IMPORTANT VERY IMPORTANT
 * *****************************************************************************************
 * It's necessary, before start running the test, to create a file templated like:
 *  { "server": "db server address",
 *    "dbName": "database name",  //this must be an EMPTY database
 *    "user": "db user",
 *    "pwd": "db password"
 *  }
 */
const path = require("path");
const {v4: uuidv4} = require("uuid");
const mySqlDriver = require("../../src/jsMySqlDriver");

const configName = path.join('test', 'dbMySql.json');
let dbConfig;
if (process.env.TRAVIS){
    dbConfig = { "server": "127.0.0.1",
        "database": "test",
        "user": "root",
        "pwd": ""
    };
}
else {
    dbConfig = JSON.parse(fs.readFileSync(configName).toString());
}


const dbInfo = {
    good: {
        server: dbConfig.server,
        useTrustedConnection: false,
        user: dbConfig.user,
        pwd: dbConfig.pwd,
        database: dbConfig.database,
        sqlModule: 'jsMySqlDriver'
    },
    bad: {
        server: dbConfig.server,
        useTrustedConnection: false,
        user: dbConfig.user,
        pwd: dbConfig.pwd + 'AA',
        database: dbConfig.database,
        sqlModule: 'jsMySqlDriver'
    }
};

let dbName;


function getConnection(dbCode) {
    const options = dbInfo[dbCode];
    //console.log("getConnection("+dbCode+")");
    if (options) {
        options.dbCode = dbCode;
        options.database = dbName;
        const sqlMod = require("../../src/"+options.sqlModule);

        //console.log("invoking  new sqlMod.Connection");
        return  new sqlMod.Connection(options);  //è di tipo Connection quindi non ha queryBatch
        //console.log("invoked  new sqlMod.Connection");
        //console.log(conn.edgeConnection.queryBatch);       //Function
        //return conn;
    }
    return undefined;
}

/**
 * Gets a promise to a DataAccess initizialized with dbInfo[dbCode] data
 * @private
 * @method getDataAccess
 * @param {string} dbCode
 * @returns {*}
 */
function getDataAccess(dbCode) {
    const q = Deferred(),
        sqlConn = getConnection(dbCode);    //Restituisce una Connection
    //console.log("getConnection result");
    //console.log(sqlConn.edgeConnection.queryBatch);       //Function

    let conn = new DA.DataAccess({
        sqlConn: sqlConn,
        errCallBack: function (err) {
            //console.log("errCallBack called")
            q.reject(err);
        },
        doneCallBack: function (d) {
            //console.log("doneCallBack called");
            //qui d.sqlConn.prototype dovrebbe essere valorizzato ma non lo è
            //console.log(d.sqlConn.edgeConnection.queryBatch); //Function
            q.resolve(d);
        }
    });
    return q.promise();
}



describe("DataAccess",function() {


    let masterConn;
    beforeAll(function(done){
        if (process.env.TRAVIS) return;

        masterConn= null;
        dbName = "jsDA_"+ uuidv4().replace(/\-/g, '_');
        let options =  _.extend({},dbInfo["good"]);
        if (options) {
            options.database = null;
            options.dbCode = "good";
            masterConn = new mySqlDriver.Connection(options);
            masterConn.open()
                .then(function () {
                    return masterConn.run("create database "+dbName);
                })
                .then(function () {
                    done();
                })
                .fail((err)=>{
                    console.log(err);
                });
        }

    },30000);

    afterAll(function (done){
        if (!masterConn) {
            done();
        }
        masterConn.run("drop database IF EXISTS "+dbName)
            .then(()=>{
                return masterConn.close();
            })
            .then(()=>{
                done();
            });

    });

    describe('setup dataBase', function () {
        let sqlConn;
        beforeEach(function (done) {
            sqlConn = getConnection('good');
            sqlConn.open().done(function () {
                done();
            });
        }, 10000);

        afterEach(function () {
            if (sqlConn) {
                sqlConn.destroy();
            }
            sqlConn = null;
        });


        it('should run the setup script', function (done) {
            sqlConn.run(fs.readFileSync('test/data/DataAccess/setup.sql').toString())
                .done(function () {
                    expect(true).toBeTruthy();
                    done();
                })
                .fail(function (res) {
                    expect(res).toBeUndefined();
                    done();
                });
        });

    });

    describe('dataAccess', function () {
        let DAC;
        beforeEach(function (done) {
            DAC = undefined;
            getDataAccess('good')
                .done(function (conn) {
                    //console.log('done getting DataAccess>>>>>>>>>>>>!!!!!>>>>>>>>>>>>>>>');
                    DAC = conn;
                    //console.log(DAC.sqlConn.edgeConnection.queryBatch); //ha come proprietà Connection e altre ma non ha prototype
                    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    done();
                })
                .fail(function (err) {
                    //console.log('failed getting DataAccess');
                    done.fail(err);
                });
        });

        afterEach(function () {
            if (DAC) {
                DAC.destroy();
            }
        });


        it('getDataAccess should return an instance of DataAccess', function (done) {
            expect(DAC.toString()).toEqual('DataAccess');
            expect(DAC instanceof DA.DataAccess).toBeTruthy();
            expect(DAC.constructor).toBe(DA.DataAccess);
            done();
        });

        it('readSingleValue should return a single value', function (done) {
            DAC.readSingleValue({tableName: 'customer', expr: $dq.max($dq.field('idcustomer'))})
                .then(function (o) {
                        expect(o).toBeGreaterThan(1);
                        done();
                    },
                    function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
        });

        it('readSingleValue should return a single value', function (done) {
            DAC.readSingleValue({tableName: 'customer', expr: $dq.field('idcustomer'), orderBy: 'idcustomer asc'})
                .then(function (o) {
                        expect(o).toBe(1);
                        done();
                    },
                    function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
        });


        it('runCmd should return a single value', function (done) {
            DAC.runCmd('select  2+2')
                .then(function (o) {
                        expect(o.toString()).toEqual('4');
                        done();
                    },
                    function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });

        });

        it('runCmd should return a single value', function (done) {
            DAC.runCmd('select 1;select 2; select 3')
                .then(function (o) {
                        expect(o).toEqual(1);
                        done();
                    },
                    function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
        });

        it('readLastValue should return last returned value', function (done) {
            DAC.readLastValue('select 1;select 2; select 3;select \'ciao\'')
                .then(function (o) {
                    expect(o).toEqual('ciao');
                    done();
                }, function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
        });

        it('runSql should return a table', function (done) {
            DAC.runSql('select * from seller limit 10;select * from seller limit 20;select  * from seller limit 30')
                .then(function (t) {
                    expect(t.length).toEqual(10);
                    expect(typeof (t[0].small_num)).toBe("number");
                    expect(typeof (t[0].big_num)).toBe("number");
                    done();
                }, function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
        });

        it('runSql with errors should intercept errors', function (done) {
            DAC.runSql('select * from seller_x limit 10')
                .then(function (t) {
                    expect(t).toBeUndefined();
                    done();
                }, function (err) {
                    expect(err).toContain("MySql.Data.MySqlClient.MySqlException");
                    done();
                });
        });


        it('doSingleInsert should have success', function (done) {
            const res = DAC.doSingleDelete({
                tableName: 'customer',
                filter: $dq.and($dq.eq('idcustomer', 13000))
            });
            res.always(function () {
                    DAC.doSingleInsert('customer',
                        ['idcustomer', 'name', 'age', 'birth', 'surname', 'stamp', 'random', 'curr', 'big_num', 'small_num'],
                        [13000, 'sampleCustomer', 12, new Date(1980, 11, 3), 'ciao', new Date(2012, 1, 30), 120, 122, 20000000, 30]
                    )
                        .done(function (result) {
                            expect(result.rowcount).toBe(1);
                            //expect(result.meta).toBe(null);
                            done();
                        })
                        .fail(function (err) {
                            expect(err).toBeUndefined();
                            done();
                        });
                }
            );
        });


//customer(idcustomer,name,age,birth,surname,stamp,random,curr)
        /*
         PROCEDURE testSP3
         @esercizio int = 0
         AS
         BEGIN
         select top 100 * from customer
         select top 100 * from seller
         select top 40 * from customerkind as c2
         select top 50 * from sellerkind as s2
         END
         */
        it('callSP should get multiple tables ', function (done) {
            let ntables = 0;
            const sizes = [100, 100, 40, 50];


            DAC.callSP('testSP3', [2013])
                .progress(function (res) {
                    expect(res.length).toBe(sizes[ntables]);
                    ntables += 1;
                })
                .done(function (res) { //res is an array of tables
                    expect(res[ntables].length).toBe(50);
                    ntables += 1;
                    expect(ntables).toBe(4);
                    done();
                })
                .fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
        });

        it('callSP with bad sp should intercept errors ', function (done) {
            let ntables = 0;
            const sizes = [100, 100, 40, 50];


            DAC.callSP('testSP3_XX', [2013])
                .progress(function (res) {
                    expect(res).toBeUndefined();
                    ntables += 1;
                })
                .done(function (res) {
                    expect(res).toBeUndefined();
                    expect(ntables).toBe(0);
                    done();
                })
                .fail(function (err) {
                    expect(err).toContain("MySql.Data.MySqlClient.MySqlException");
                    done();
                });
        });

        it('selectRows should give rows one at a time', function (done) {
            let nRows = 0;
            DAC.selectRows({
                tableName: 'customer',
                top: '10'
            })
                .progress(function (r) {
                    if (r.row) {
                        nRows += 1;
                        expect(r.row.idcustomer).toBeDefined();
                    }
                })
                .done(function () {
                    expect(nRows).toBe(10);
                    done();
                })
                .fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
        });


        it('selectRows should give rows one at a time (raw)', function (done) {
            let nRows = 0;
            DAC.selectRows({
                    tableName: 'customer',
                    top: '10'
                },
                true)
                .progress(function (r) {
                    if (r.row) {
                        nRows += 1;
                        expect(r.row.idcustomer).toBeUndefined();
                    }
                })
                .done(function () {
                    expect(nRows).toBe(10);
                    done();
                })
                .fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
        });

        describe('queryPackets', function () {
            it('queryPackets should give results', function (done) {
                let nPackets = 0,
                    nRows = 0;
                DAC.queryPackets({
                    tableName: 'customerkind',
                    top: '50'
                }, 6, false)
                    .progress(function (r) {
                        expect(r.meta).toBeUndefined();
                        expect(r.rows).toEqual(jasmine.any(Array));
                        nPackets += 1;
                        nRows += r.rows.length;
                    })
                    .done(function (res) {
                        expect(nPackets).toBe(9);
                        expect(nRows).toBe(50);
                        done();
                    })
                    .fail(function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
            });

            it('queryPackets should give results (raw)', function (done) {
                let nPackets = 0,
                    nRows = 0;
                DAC.queryPackets({
                    tableName: 'customerkind',
                    top: '50'
                }, 6, true)
                    .progress(function (r) {
                        expect(r.meta).toBeDefined();
                        expect(r.rows).toEqual(jasmine.any(Array));
                        nPackets += 1;
                        nRows += r.rows.length;
                    })
                    .done(function () {
                        expect(nPackets).toBe(9);
                        expect(nRows).toBe(50);
                        done();
                    })
                    .fail(function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
            });

            it('queryPackets should give results (big packet)', function (done) {
                let nPackets = 0,
                    nRows = 0;
                DAC.queryPackets({
                    tableName: 'customer',
                    top: '50'
                }, 100, false)
                    .progress(function (r) {
                        expect(r.meta).toBeUndefined();
                        expect(r.rows).toEqual(jasmine.any(Array));
                        nPackets += 1;
                        nRows += r.rows.length;
                    })
                    .done(function () {
                        expect(nPackets).toBe(1);
                        expect(nRows).toBe(50);
                        done();
                    })
                    .fail(function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
            });

            it('queryPackets should not give results (empty result)', function (done) {
                let nPackets = 0,
                    nRows = 0;
                DAC.queryPackets({
                    tableName: 'customer',
                    filter: $dq.eq('idcustomer', -12),
                    top: '50'
                }, 100, false)
                    .progress(function (r) {
                        nPackets += 1;
                        nRows += r.rows.length;
                    })
                    .done(function () {
                        expect(nPackets).toBe(0);
                        expect(nRows).toBe(0);
                        done();
                    })
                    .fail(function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
            });

            it('queryPackets should not give results (empty result) (raw)', function (done) {
                let nPackets = 0,
                    nRows = 0;
                DAC.queryPackets({
                    tableName: 'customer',
                    filter: $dq.eq('idcustomer', -12),
                    top: '50'
                }, 100, true)
                    .progress(function (r) {
                        nPackets += 1;
                        nRows += r.rows.length;
                    })
                    .done(function () {
                        expect(nPackets).toBe(0);
                        expect(nRows).toBe(0);
                        done();
                    })
                    .fail(function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
            });

        });

        it('objectify should transform raw data into objects', function (done) {
            DAC.runSql('select  * from customer where idcustomer<2000 limit 3;', false)
                .then(function (resObject) {
                        expect(resObject).toEqual(jasmine.any(Array));
                        expect(resObject.length).toBe(3);

                        DAC.runSql('select  * from customer where idcustomer<2000 limit 3', true)
                            .done(function (res) {
                                const obj = DA.objectify(res.meta, res.rows);
                                expect(res.rows.length).toBe(3);
                                expect(obj).toEqual(jasmine.any(Array));
                                expect(obj.length).toBe(3);
                                expect(obj).toEqual(resObject);
                                done();
                            })
                            .fail(function (err) {
                                expect(err).toBeUndefined();
                                done();
                            });
                    },
                    function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });

        }, 10000);


        it('raw data read should be quick', function (done) {
            DAC.runSql('select *  from customer limit 500', true)
                .then(function (resObject) {
                        DAC.runSql('select *  from customer limit 500', true)
                            .done(function (res) {
                                expect(res.rows).toEqual(resObject.rows);
                                expect(res.meta).toEqual(resObject.meta);
                                done();
                            })
                            .fail(function (err) {
                                expect(err).toBeUndefined();
                                done();
                            });
                    },
                    function (err) {
                        expect(err).toBeUndefined();
                        done();
                    });
        });

        it('select should give a table', function (done) {
            const sel = DAC.select({
                tableName: 'customer',
                columns: 'idcustomer,name',
                applySecurity: false
            });
            sel.done(function (result) {
                expect(result.tableName).toBe('customer');
                expect(result).toEqual(jasmine.any(Array));
                expect(result.length).toBeGreaterThan(0);
                expect(result[0].idcustomer).toBeDefined();
                expect(result[0].name).toBeDefined();
                done();
            });
        });

        describe('multiSelect', function () {
            it('multiSelect should give multiple tables', function (done) {
                const multiSel = [];
                let tableCount = 0;
                multiSel.push(new Select('*').from('customer').multiCompare(new MultiCompare(['idcustomer'], [2])));
                multiSel.push(new Select('*').from('customerkind').multiCompare(new MultiCompare(['idcustomerkind'], [3])));
                multiSel.push(new Select('*').from('sellerkind'));
                const mSel = DAC.multiSelect({selectList: multiSel});
                mSel.progress(function () {
                    tableCount += 1;
                });
                mSel.done(function (result) {
                    expect(result).toBeUndefined();
                    expect(tableCount).toBe(3);
                    done();
                });
                mSel.fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
            });

            it('multiSelect should give tables with alias', function (done) {
                const multiSel = [];
                let tableCount = 0;
                const tables = {};
                multiSel.push(new Select('*').from('customer')
                    .multiCompare(new MultiCompare(['cat'], [4])).intoTable('A').top('5'));
                multiSel.push(new Select('*').from('seller').multiCompare(new MultiCompare(['idseller'], [1])).intoTable('B'));
                multiSel.push(new Select('*').from('customerkind'));
                const mSel = DAC.multiSelect({selectList: multiSel});
                mSel.progress(function (r) {
                    tableCount += 1;
                    expect(r.rows).toEqual(jasmine.any(Array));
                    expect(r.meta).toBeUndefined();
                    expect(r.tableName).toEqual(jasmine.any(String));
                    tables[r.tableName] = r.rows;
                });
                mSel.done(function (result) {
                    expect(result).toBeUndefined();
                    expect(tables.A).toBeDefined();
                    expect(tables.A.length).toBe(5);
                    expect(tables.B).toBeDefined();
                    expect(tables.B.length).toBe(1);
                    expect(tables.customerkind).toBeDefined();
                    expect(tables.A[0].idcustomer).toBeDefined();
                    expect(tables.B[0].idseller).toBeDefined();
                    expect(tables.customerkind[0].idcustomerkind).toBeDefined();
                    expect(tableCount).toBe(3);
                    done();
                });
                mSel.fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
            });

            it('multiSelect should give tables with alias (raw)', function (done) {
                const multiSel = [];
                let tableCount = 0;
                const tables = {};
                multiSel.push(new Select('*').from('customer')
                    .multiCompare(new MultiCompare(['cat'], [2])).intoTable('A').top('5'));
                multiSel.push(new Select('*').from('seller').multiCompare(new MultiCompare(['idseller'], [3])).intoTable('B'));
                multiSel.push(new Select('*').from('customerkind'));
                const mSel = DAC.multiSelect({selectList: multiSel, raw: true});
                mSel.progress(function (r) {
                    //console.log("packet received");
                    //console.log(r);
                    tableCount += 1;
                    expect(r.rows).toEqual(jasmine.any(Array));
                    expect(r.meta).toEqual(jasmine.any(Array));
                    expect(r.tableName).toEqual(jasmine.any(String));
                    tables[r.tableName] = DA.objectify(r.meta, r.rows);

                });
                mSel.done(function (result) {
                    expect(result).toBeUndefined();
                    expect(tables.A).toBeDefined();
                    expect(tables.A.length).toBe(5);
                    expect(tables.B).toBeDefined();
                    expect(tables.B.length).toBe(1);
                    expect(tables.customerkind).toBeDefined();
                    expect(tableCount).toBe(3);
                    expect(tables.A[0].idcustomer).toBeDefined();
                    expect(tables.B[0].idseller).toBeDefined();
                    expect(tables.customerkind[0].idcustomerkind).toBeDefined();
                    done();
                });
                mSel.fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
            }, 10000);

            it('multiSelect should give tables with alias - packeting', function (done) {
                const multiSel = [];
                let tableCount = 0;
                const tables = {};
                multiSel.push(new Select('*').from('customer')
                    .multiCompare(new MultiCompare(['cat20'], [2])).intoTable('A'));
                multiSel.push(new Select('*').from('seller').multiCompare(new MultiCompare(['idseller'], [6])).intoTable('B'));
                multiSel.push(new Select('*').from('customerkind'));
                const mSel = DAC.multiSelect({selectList: multiSel, packetSize: 5});
                mSel.progress(function (r) {
                    if (!tables[r.tableName]) {
                        tableCount += 1;
                        tables[r.tableName] = [];
                    }
                    expect(r.rows.length).toBeLessThan(6);
                    expect(r.rows).toEqual(jasmine.any(Array));
                    expect(r.meta).toBeUndefined();
                    expect(r.tableName).toEqual(jasmine.any(String));
                    tables[r.tableName] = tables[r.tableName].concat(r.rows);
                });
                mSel.done(function (result) {
                    expect(result).toBeUndefined();
                    expect(tables.A).toBeDefined();
                    expect(tables.A.length).toBeGreaterThan(5);
                    expect(tables.B).toBeDefined();
                    expect(tables.B.length).toBe(1);
                    expect(tables.customerkind).toBeDefined();
                    expect(tableCount).toBe(3);
                    expect(tables.A[0].idcustomer).toBeDefined();
                    expect(tables.B[0].idseller).toBeDefined();
                    expect(tables.customerkind[0].idcustomerkind).toBeDefined();
                    done();
                });
                mSel.fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
            });


            it('multiSelect should give tables with alias - packeting raw', function (done) {
                const multiSel = [];
                let tableCount = 0;
                const tables = {};
                multiSel.push(new Select('*').from('customer')
                    .multiCompare(new MultiCompare(['cat20'], [2])).intoTable('A'));
                multiSel.push(new Select('*').from('seller').multiCompare(new MultiCompare(['idseller'], [6])).intoTable('B'));
                multiSel.push(new Select('*').from('customerkind'));
                const mSel = DAC.multiSelect({selectList: multiSel, packetSize: 5, raw: true});
                mSel.progress(function (r) {
                    if (!tables[r.tableName]) {
                        tableCount += 1;
                        tables[r.tableName] = [];
                    }
                    if (r.rows) expect(r.rows).toEqual(jasmine.any(Array));
                    if (r.meta) expect(r.meta).toEqual(jasmine.any(Array));
                    if (r.rows) expect(r.rows.length).toBeLessThan(6);
                    expect(r.tableName).toEqual(jasmine.any(String));
                    tables[r.tableName] = tables[r.tableName].concat(DA.objectify(r.meta, r.rows));
                });
                mSel.done(function (result) {
                    expect(result).toBeUndefined();
                    expect(tables.A).toBeDefined();
                    expect(tables.A.length).toBeGreaterThan(5);
                    expect(tables.B).toBeDefined();
                    expect(tables.B.length).toBe(1);
                    expect(tables.customerkind).toBeDefined();
                    expect(tableCount).toBe(3);
                    expect(tables.A[0].idcustomer).toBeDefined();
                    expect(tables.B[0].idseller).toBeDefined();
                    expect(tables.customerkind[0].idcustomerkind).toBeDefined();
                    done();
                });
                mSel.fail(function (err) {
                    expect(err).toBeUndefined();
                    done();
                });
            });
        });

    });


    describe('destroy dataBase', function () {
        let sqlConn;
        beforeEach(function (done) {
            sqlConn = getConnection('good');
            sqlConn.open().done(function () {
                done();
            });
        }, 10000);

        afterEach(function () {
            if (sqlConn) {
                sqlConn.destroy();
            }
            sqlConn = null;
        });


        it('should run the destroy script', function (done) {
            sqlConn.run(fs.readFileSync('test/data/DataAccess/destroy.sql').toString())
                .done(function () {
                    expect(true).toBeTruthy();
                    done();
                })
                .fail(function (res) {
                    expect(res).toBeUndefined();
                    done();
                });
        }, 30000);

    });

});