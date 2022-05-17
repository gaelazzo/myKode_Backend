console.log("running ApplicationSpec");

/* globals describe, beforeEach,it,expect,jasmine,spyOn */
'use strict';


/*jshint -W069*/
/*jshint -W083*/

const path = require("path");
const FormData = require('form-data');
const fs = require("fs");
const q = require('jsDataQuery');
const jsDataSet = require("jsDataSet");
const configName = path.join('config', 'dbList.json');
const http = require("http");
let request = require('request');
const _ = require("lodash");
const {unlink, readdir} = require("fs/promises");

let dbConfig;
if (process.env.TRAVIS) {
    dbConfig = {
        "server": "127.0.0.1",
        "dbName": "test",
        "user": "sa",
        "pwd": "YourStrong!Passw0rd"
    };
} else {
    dbConfig = JSON.parse(fs.readFileSync(configName).toString());
}

const uploadPath = 'Uploads/';

const sqlServerDriver = require('../../src/jsSqlServerDriver'),
    IsolationLevel = {
        readUncommitted: 'READ_UNCOMMITTED',
        readCommitted: 'READ_COMMITTED',
        repeatableRead: 'REPEATABLE_READ',
        snapshot: 'SNAPSHOT',
        serializable: 'SERIALIZABLE'
    };

describe('js prerequisites', function () {
    it("checking method call", function (done) {
        let fn = function (N) {
            this.N = N;
        };
        fn.prototype = {
            constructor: fn,
            fun: function () {
                if (this === undefined) {
                    return undefined;
                }
                return this.N;
            }
        };

        let o = new fn(3);
        expect(o.fun()).toBe(3);
        let g = o.fun;
        expect(g()).toBe(undefined);
        let h = o.fun.bind(o);
        expect(h()).toBe(3);

        done();
    });
});

describe('rest api',
    function () {

        const timeout = 500000;

        let sqlConn;

        function getConnection(dbCode) {
            let options = dbConfig[dbCode];
            if (options) {
                options.dbCode = dbCode;
                return new sqlServerDriver.Connection(options);
            }
            return undefined;
        }

        beforeEach(function (done) {
            sqlConn = getConnection('test_sqlServer');
            sqlConn.open().done(function () {
                done();
            }).fail(function (err) {
                console.log('Error failing ' + err);
                done();
            });
        }, timeout);

        afterEach(function () {
            if (sqlConn) {
                sqlConn.destroy();
            }
            sqlConn = null;
        });

        describe('setup dataBase', function () {
            it('should run the setup script', function (done) {
                sqlConn.run(fs.readFileSync('test/data/jsApplication/setup.sql').toString())
                    .done(function () {
                        expect(true).toBeTruthy();
                        done();
                    })
                    .fail(function (res) {
                        expect(res).toBeUndefined();
                        done();
                    });
            }, timeout);

        });

        it("select ws: query on customusergroup returns DataTable",
            function (done) {
                let filter = q.or(q.eq('idcustomuser', 'AZZURRO'), q.eq('idcustomuser', 'BIANCO'), q.eq('idcustomuser', 'NERO'));
                let objser = q.toObject(filter);
                let filterSerialized = JSON.stringify(objser);

                request({
                    url: 'http://localhost:3000/test/data/select',
                    method: 'POST',
                    form: {
                        tableName: 'customusergroup',
                        columnList: "idcustomgroup,idcustomuser",
                        top: 10,
                        filter: filterSerialized
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    const dtObj = JSON.parse(body);
                    const dt = new jsDataSet.DataTable(dtObj.name);
                    dt.deSerialize(dtObj, true);
                    expect(dt.name).toBe('customusergroup');
                    expect(dt.rows.length).toBe(3);
                    done();
                });
            }, timeout);

        it("selectCount ws: returns the number of record of table",
            function (done) {
                let filter = q.or(q.eq('idcustomuser', 'AZZURRO'), q.eq('idcustomuser', 'BIANCO'), q.eq('idcustomuser', 'NERO'));
                let objser = q.toObject(filter);
                let filterSerialized = JSON.stringify(objser);

                request({
                    url: 'http://localhost:3000/test/data/selectCount',
                    method: 'POST',
                    form: {
                        tableName: 'customusergroup',
                        filter: filterSerialized
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    // N.B respect to .net be, express send() funct not send numbers. So we have to manage the response in the client.
                    // --> client must expect string type not number type!
                    expect(response).toBeDefined();
                    expect(typeof body).toBe("string");
                    expect(body).toBe("3");
                    done();
                });
            }, timeout);

        it("multirunselect ws: multi queries on customusergroup + customuser returns DataTable",
            function (done) {
                const ds = new jsDataSet.DataSet("temp");
                const t1name = 'customuser';
                const t2name = 'customusergroup';
                const filter1 = q.or(q.eq('idcustomuser', 'AZZURRO'), q.eq('idcustomuser', 'BIANCO'));
                const filter2 = q.or(q.eq('idcustomuser', 'AZZURRO'), q.eq('idcustomuser', 'BIANCO'), q.eq('idcustomuser', 'NERO'));
                ds.newTable(t1name);
                ds.newTable(t2name);
                const selBuilderArray = [];
                selBuilderArray.push({filter: filter1, top: null, tableName: t1name, table: ds.tables[t1name]});
                selBuilderArray.push({filter: filter2, top: null, tableName: t2name, table: ds.tables[t2name]});

                const ar = selBuilderArray.map((sel) => {
                    let objser = q.toObject(sel.filter);
                    let filterSerialized = JSON.stringify(objser);
                    return {
                        table: sel.table.serialize(true),
                        top: sel.top,
                        tableName: sel.tableName,
                        filter: filterSerialized
                    };
                });
                const selBuilderArrPrm = JSON.stringify({arr: ar});

                request({
                    url: 'http://localhost:3000/test/data/multiRunSelect',
                    method: 'POST',
                    form: {
                        selBuilderArr: selBuilderArrPrm
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);
                    expect(ds.name).toBe('temp');
                    expect(ds.tables.customuser.rows.length).toBe(2);
                    expect(ds.tables.customusergroup.rows.length).toBe(3);
                    done();
                });
            }, timeout);

        it("getDataSet ws: dataset customuser_test returned",
            function (done) {
                request({
                    url: 'http://localhost:3000/test/data/getDataSet',
                    method: 'POST',
                    form: {
                        tableName: 'customuser',
                        editType: 'test'
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);
                    expect(ds.name).toBe('customuser_test');
                    expect(ds.tables.customuser).toBeDefined();
                    expect(ds.tables.customgroup).toBeDefined();
                    expect(ds.tables.customusergroup).toBeDefined();
                    expect(Object.keys(ds.tables).length).toBe(3);
                    expect(Object.keys(ds.tables.customuser.columns).length).toBeGreaterThan(1);
                    expect(Object.keys(ds.relations).length).toBe(1);
                    done();
                });
            }, timeout);

        it("getPagedTable ws: returns customusergroup paged datatable",
            function (done) {
                let filter = q.or(q.eq('idcustomuser', 'AZZURRO'), q.eq('idcustomuser', 'BIANCO'), q.eq('idcustomuser', 'NERO'));
                let objser = q.toObject(filter);
                let filterSerialized = JSON.stringify(objser);
                const tableName = 'customusergroup';
                const listType = 'default';
                request({
                    url: 'http://localhost:3000/test/data/getPagedTable',
                    method: 'POST',
                    form: {
                        tableName: tableName,
                        nPage: 1,
                        nRowPerPage: 5,
                        filter: filterSerialized,
                        listType: listType,
                        sortby: null
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    var objParsed = JSON.parse(body);
                    var totpage = objParsed.totpage;
                    var totrows = objParsed.totrows;
                    expect(totpage).toBe(1);
                    expect(totrows).toBe(3);
                    var dtObj = JSON.parse(objParsed.dt);
                    const dt = new jsDataSet.DataTable(dtObj.name);
                    dt.deSerialize(dtObj, true);
                    expect(dt.name).toBe('customusergroup');
                    expect(dt.rows.length).toBe(3);
                    done();
                });
            }, timeout);

        it("getDsByRowKey: return dataset populated based on row",
            function (done) {
                // 1. recupero dataset vuoto
                request({
                    url: 'http://localhost:3000/test/data/getDataSet',
                    method: 'POST',
                    form: {
                        tableName: 'customuser',
                        editType: 'test'
                    }
                }, function (error, response, body) {

                    expect(response).toBeDefined();
                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);

                    //
                    const idcustomuser = 'AZZURRO';
                    const objrow = {idcustomuser: idcustomuser};
                    ds.tables.customuser.add(objrow);
                    ds.tables.customuser.acceptChanges();

                    const filter = q.eq('idcustomuser', idcustomuser);
                    let objser = q.toObject(filter);
                    let filterSerialized = JSON.stringify(objser);
                    request({
                        url: 'http://localhost:3000/test/data/getDsByRowKey',
                        method: 'POST',
                        form: {
                            tableName: 'customuser',
                            editType: 'test',
                            filter: filterSerialized
                        }
                    }, function (error, response, body) {

                        if (error) {
                            console.log(error);
                            expect(true).toBe(false);
                            done();
                        }
                        expect(response).toBeDefined();
                        var objParsed = JSON.parse(body);
                        var ds = new jsDataSet.DataSet(objParsed.name);
                        ds.deSerialize(objParsed, true);
                        expect(ds.name).toBe('customuser_test');
                        expect(ds.tables.customuser.rows.length).toBe(1);
                        expect(ds.tables.customusergroup.rows.length).toBe(1);
                        expect(ds.tables.customuser.rows[0].idcustomuser).toBe(idcustomuser);
                        expect(ds.tables.customusergroup.rows[0].idcustomuser).toBe(idcustomuser);

                        done();
                    });
                });

            }, timeout);

        it("doGet empty ds AND onlyPeripherals: false",
            function (done) {

                const idcustomuser = 'AZZURRO';

                // recupera un dataset e poi lo popola a aprtire dalla riga principale
                request({
                    url: 'http://localhost:3000/test/data/getDataSet',
                    method: 'POST',
                    form: {
                        tableName: 'customuser',
                        editType: 'test'
                    }
                }, function (error, response, body) {

                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);

                    const objrow = {idcustomuser: idcustomuser};
                    ds.tables.customuser.add(objrow);
                    ds.tables.customuser.acceptChanges();
                    var objser = ds.serialize(true);
                    var dsSerialized = JSON.stringify(objser);

                    const filter = ds.tables.customuser.keyFilter(objrow);
                    let objserFilter = q.toObject(filter);
                    let filterSerialized = JSON.stringify(objserFilter);
                    request({
                        url: 'http://localhost:3000/test/data/doGet',
                        method: 'POST',
                        form: {
                            ds: dsSerialized,
                            primaryTableName: 'customuser',
                            filter: filterSerialized,
                            onlyPeripherals: false
                        }
                    }, function (error, response, body) {

                        if (error) {
                            console.log(error);
                            expect(true).toBe(false);
                            done();
                        }
                        var objParsed = JSON.parse(body);
                        var ds = new jsDataSet.DataSet(objParsed.name);
                        ds.deSerialize(objParsed, true);
                        expect(ds.name).toBe('customuser_test');
                        expect(ds.tables.customuser.rows.length).toBe(1);
                        expect(ds.tables.customusergroup.rows.length).toBe(1);
                        expect(ds.tables.customuser.rows[0].idcustomuser).toBe(idcustomuser);
                        expect(ds.tables.customusergroup.rows[0].idcustomuser).toBe(idcustomuser);
                        done();
                    });
                });

            }, timeout);

        it("doGet empty ds AND onlyPeripherals: true",
            function (done) {

                const idcustomuser = 'AZZURRO';

                // recupera un dataset e poi lo popola a aprtire dalla riga principale
                request({
                    url: 'http://localhost:3000/test/data/getDataSet',
                    method: 'POST',
                    form: {
                        tableName: 'customuser',
                        editType: 'test'
                    }
                }, function (error, response, body) {

                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);

                    const objrow = {idcustomuser: idcustomuser};
                    ds.tables.customuser.add(objrow);
                    ds.tables.customuser.acceptChanges();
                    var objser = ds.serialize(true);
                    var dsSerialized = JSON.stringify(objser);

                    const filter = ds.tables.customuser.keyFilter(objrow);
                    let objserFilter = q.toObject(filter);
                    let filterSerialized = JSON.stringify(objserFilter);
                    request({
                        url: 'http://localhost:3000/test/data/doGet',
                        method: 'POST',
                        form: {
                            ds: dsSerialized,
                            primaryTableName: 'customuser',
                            filter: filterSerialized,
                            onlyPeripherals: true
                        }
                    }, function (error, response, body) {

                        if (error) {
                            console.log(error);
                            expect(true).toBe(false);
                            done();
                        }
                        var objParsed = JSON.parse(body);
                        var ds = new jsDataSet.DataSet(objParsed.name);
                        ds.deSerialize(objParsed, true);
                        expect(ds.name).toBe('customuser_test');
                        // soloe le periferiche poichè  onlyPeripherals: true
                        expect(ds.tables.customuser.rows.length).toBe(1);
                        expect(ds.tables.customusergroup.rows.length).toBe(0);
                        done();
                    });
                });

            }, timeout);

        it("setUsrEnv ws: set usr-env test variable",
            function (done) {
                request({
                    url: 'http://localhost:3000/test/data/setUsrEnv',
                    method: 'POST',
                    form: {
                        key: 'test_key',
                        value: 'test_value'
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        console.log(bodyparsed.error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    expect(typeof body).toBe("string");
                    expect(body).toBe("test_value");
                    done();
                });
            }, timeout);

        it("doReadValue ws: read and get a value in a table",
            function (done) {
                let filter = q.eq('idcustomuser', 'AZZURRO');
                let objser = q.toObject(filter);
                let filterSerialized = JSON.stringify(objser);

                request({
                    url: 'http://localhost:3000/test/data/doReadValue',
                    method: 'POST',
                    form: {
                        table: 'customusergroup',
                        expr: 'idcustomgroup',
                        filter: filterSerialized,
                        orderby: null
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    expect(typeof body).toBe("string");
                    expect(body).toBe("ORGANIGRAMMA");
                    done();
                });
            }, timeout);

        it("changeRole ws: re-calculates environment",
            function (done) {
                const idflowchart = '210001';
                const ndetail = '1';
                request({
                    url: 'http://localhost:3000/test/data/changeRole',
                    method: 'POST',
                    form: {
                        idflowchart: idflowchart,
                        ndetail: ndetail,
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    var objParsed = JSON.parse(body);
                    expect(Object.keys(objParsed.sys).length).toBe(0);
                    expect(Object.keys(objParsed.usr).length).toBeGreaterThan(0);
                    expect(objParsed.usr.usergrouplist).toBe('ORGANIGRAMMA');
                    done();
                });
            }, timeout);

        it("createTableByName ws: create table, with * options, all columns",
            function (done) {
                const tableName = 'customuser';
                const columnList = '*';
                request({
                    url: `http://localhost:3000/test/data/createTableByName?tableName=${tableName}&columnList=${columnList}`,
                    method: 'GET'
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    const dtObj = JSON.parse(body);
                    const dt = new jsDataSet.DataTable(dtObj.name);
                    dt.deSerialize(dtObj, true);
                    expect(dt.name).toBe(tableName);
                    expect(Object.keys(dt.columns).length).toBe(8);
                    done();
                });
            }, timeout);

        it("createTableByName ws: create table with 2 column",
            function (done) {
                const tableName = 'customuser';
                const columnList = 'idcustomuser,username';
                request({
                    url: `http://localhost:3000/test/data/createTableByName?tableName=${tableName}&columnList=${columnList}`,
                    method: 'GET'
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    const dtObj = JSON.parse(body);
                    const dt = new jsDataSet.DataTable(dtObj.name);
                    dt.deSerialize(dtObj, true);
                    expect(dt.name).toBe(tableName);
                    expect(Object.keys(dt.columns).length).toBe(2);
                    done();
                });
            }, timeout);

        it("saveDataSet ws: save dataset table customusergroup without rules ok",
            function (done) {
                const tableName = 'customuser';
                const editType = 'test';
                const idcustomgroup = 'ORGANIGRAMMA';
                const idcustomuser = 'AZZURRO';

                // recupera un dataset e poi lo popola a aprtire dalla riga principale
                request({
                    url: 'http://localhost:3000/test/data/getDataSet',
                    method: 'POST',
                    form: {
                        tableName: tableName,
                        editType: editType
                    }
                }, function (error, response, body) {

                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);

                    const objrow = {idcustomgroup: idcustomgroup};
                    ds.tables.customusergroup.add(objrow);
                    ds.tables.customusergroup.acceptChanges();

                    const filter = q.eq('idcustomuser', idcustomuser);
                    let objser = q.toObject(filter);
                    let filterSerialized = JSON.stringify(objser);
                    request({
                        url: 'http://localhost:3000/test/data/getDsByRowKey',
                        method: 'POST',
                        form: {
                            tableName: tableName,
                            editType: editType,
                            filter: filterSerialized
                        }
                    }, function (error, response, body) {

                        var objParsed = JSON.parse(body);
                        var ds = new jsDataSet.DataSet(objParsed.name);
                        ds.deSerialize(objParsed, true);
                        // 3. modifico il dataset
                        var field = "lu";
                        var tcustomusergroup = ds.tables.customusergroup;
                        var rowTested = tcustomusergroup.rows[0];
                        var characterToAdd = "%";
                        // evito di aggiugneread ogni lancio dit est il "newValue", quindi se la stringa contiene come ultimo carattere "newValue"
                        // lo rimuovo, altrimenti lo concateno (la volta successiva così lo rimuovo)
                        var originalValue = rowTested[field];
                        var newValue = originalValue + characterToAdd;
                        tcustomusergroup.assignField(rowTested, field, newValue);
                        tcustomusergroup.rows[0].getRow().state = jsDataSet.dataRowState.modified;

                        var objser = ds.serialize(true);
                        var dsSerialized = JSON.stringify(objser);
                        request({
                            url: 'http://localhost:3000/test/data/saveDataSet',
                            method: 'POST',
                            form: {
                                tableName: tableName,
                                editType: editType,
                                filter: filterSerialized,
                                ds: dsSerialized
                            }
                        }, function (error, response, body) {

                            if (error) {
                                console.log(error);
                                expect(true).toBe(false);
                                done();
                            }
                            expect(response).toBeDefined();
                            var objParsed = JSON.parse(body);

                            var dsObj = objParsed.dataset;
                            var success = objParsed.success;
                            var canIgnore = objParsed.canIgnore;
                            var messages = objParsed.messages;

                            var ds = new jsDataSet.DataSet(dsObj.name);
                            ds.deSerialize(dsObj, true);
                            expect(ds.name).toBe('customuser_test');
                            expect(messages.length).toBe(0); //non ci sono messaggi
                            expect(success).toBe(true); // metodo esegue correttamente
                            expect(canIgnore).toBe(true); //

                            // verifico almeno 1 riga, altrimenti test non è attendibile
                            expect(tcustomusergroup.rows.length).toBeGreaterThan(0);

                            _.forEach(tcustomusergroup.rows, function (r) {
                                expect(r.idcustomgroup).toBe(idcustomgroup);
                            });
                            // mi aspetto che il valore sia cambiato
                            expect(tcustomusergroup.rows[0][field]).toBe(newValue);
                            done();
                        });
                    });
                });
            }, timeout);

        it("saveDataSet ws: save dataset table customuser unsucess. get 1 message POST rule",
            function (done) {
                const tableName = 'customuser';
                const editType = 'test';
                const idcustomuser = 'AZZURRO';

                // recupera un dataset e poi lo popola a aprtire dalla riga principale
                request({
                    url: 'http://localhost:3000/test/data/getDataSet',
                    method: 'POST',
                    form: {
                        tableName: tableName,
                        editType: editType
                    }
                }, function (error, response, body) {

                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);

                    const objrow = {idcustomuser: idcustomuser};
                    ds.tables.customuser.add(objrow);
                    ds.tables.customuser.acceptChanges();

                    const filter = q.eq('idcustomuser', idcustomuser);
                    let objser = q.toObject(filter);
                    let filterSerialized = JSON.stringify(objser);
                    request({
                        url: 'http://localhost:3000/test/data/getDsByRowKey',
                        method: 'POST',
                        form: {
                            tableName: tableName,
                            editType: editType,
                            filter: filterSerialized
                        }
                    }, function (error, response, body) {

                        var objParsed = JSON.parse(body);
                        var ds = new jsDataSet.DataSet(objParsed.name);
                        ds.deSerialize(objParsed, true);
                        // 3. modifico il dataset
                        var field = "username";
                        var tcustomuser = ds.tables.customuser;
                        var rowTested = tcustomuser.rows[0];
                        var characterToAdd = "%";
                        // evito di aggiugneread ogni lancio dit est il "newValue", quindi se la stringa contiene come ultimo carattere "newValue"
                        // lo rimuovo, altrimenti lo concateno (la volta successiva così lo rimuovo)
                        var originalValue = rowTested[field];
                        var newValue = originalValue + characterToAdd;
                        tcustomuser.assignField(rowTested, field, newValue);
                        tcustomuser.rows[0].getRow().state = jsDataSet.dataRowState.modified;

                        var objser = ds.serialize(true);
                        var dsSerialized = JSON.stringify(objser);
                        request({
                            url: 'http://localhost:3000/test/data/saveDataSet',
                            method: 'POST',
                            form: {
                                tableName: tableName,
                                editType: editType,
                                filter: filterSerialized,
                                ds: dsSerialized
                            }
                        }, function (error, response, body) {

                            if (error) {
                                console.log(error);
                                expect(true).toBe(false);
                                done();
                            }
                            expect(response).toBeDefined();
                            var objParsed = JSON.parse(body);

                            var dsObj = objParsed.dataset;
                            var success = objParsed.success;
                            var canIgnore = objParsed.canIgnore;
                            var messages = objParsed.messages;

                            var ds = new jsDataSet.DataSet(dsObj.name);
                            ds.deSerialize(dsObj, true);
                            expect(ds.name).toBe('customuser_test');
                            expect(messages.length).toBe(1); //non ci sono messaggi
                            expect(messages[0].description).toBe('operation not permitted msg');
                            expect(messages[0].id).toBe('post/undefined/U/1');
                            expect(messages[0].audit).toBe('TEST001');
                            expect(messages[0].severity).toBe('E');
                            expect(success).toBe(false);
                            expect(canIgnore).toBe(false); //

                            // verifico almeno 1 riga, altrimenti test non è attendibile
                            expect(tcustomuser.rows.length).toBeGreaterThan(0);

                            _.forEach(tcustomuser.rows, function (r) {
                                expect(r.idcustomuser).toBe(idcustomuser);
                            });
                            // mi aspetto che il valore sia cambiato
                            expect(tcustomuser.rows[0][field]).toBe(newValue);
                            done();
                        });
                    });
                });
            }, timeout);
        // ----> AUTH CONTROLLER

        it('login username and password not exists get Bad Credential',
            function (done) {
                const userName = 'AZZURRO';
                const password = '-------';
                request({
                    url: `http://localhost:3000/test/auth/login`,
                    method: 'POST',
                    form: {
                        userName: userName,
                        password: password,
                        datacontabile: (new Date()).toJSON(),
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(body).toBeDefined('Bad credentials');
                    expect(response.statusCode).toBeDefined(401);
                    done();
                });
            }, timeout);

        it('login username and wrong password get Bad Credential',
            function (done) {
                const userName = 'AZZURRO';
                const password = 'SEG_PSUMA';
                request({
                    url: `http://localhost:3000/test/auth/login`,
                    method: 'POST',
                    form: {
                        userName: userName,
                        password: password,
                        datacontabile: (new Date()).toJSON(),
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(body).toBeDefined('Bad credentials');
                    expect(response.statusCode).toBeDefined(401);
                    done();
                });
            }, timeout);

        // ----> FILE CONTROLLER
        it('upload file chunk less 1MB. ok',
            function (done) {

                // simulo nome file come atteso dal backend (CONVENZIONE!)
                const partCount = 1;
                const totalParts = 1;
                const fileName = 'fakeUploadTestUnder1MB.txt';
                const separatorFileName = '$__$';
                const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                const fname = guid + separatorFileName + fileName;
                const filePartName = fname + ".part_" + partCount + "." + totalParts;
                const path = 'test/data/jsApplication/' + fileName;

                const formData = {
                    file: {
                        value: fs.createReadStream(path),
                        options: {
                            fileName: filePartName
                        }
                    }
                };
                // lato server il fileName è "skyppato". utilizza il fileName orginale e quindi forzo il nome con la convenzione.
                formData.file.value.path = path.replace(fileName, filePartName);

                request({
                    url: `http://localhost:3000/test/file/uploadchunk`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData: formData
                }, async function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    var objParsed = JSON.parse(body);
                    var ds = new jsDataSet.DataSet(objParsed.name);
                    ds.deSerialize(objParsed, true);
                    expect(ds.name).toBe('attach_default');
                    expect(ds.tables.attach.rows.length).toBe(1);
                    expect(ds.tables.attach.rows[0].idattach).toBe(1);
                    expect(ds.tables.attach.rows[0].filename.indexOf(fileName)).toBeGreaterThan(0);
                    expect(ds.tables.attach.rows[0].size).toBe(56);

                    // verifico ci sia il file
                    let allFiles = await readdir(uploadPath);
                    let files = _.filter(allFiles, fname => fname.indexOf(fileName) > 0);
                    expect(files.length).toBe(1);
                    done();
                });
            }, timeout);

        it('upload file with 2 chunk. Chunk are merged in single file on backend',
          async function (done) {

              // simulo nome file come atteso dal backend (CONVENZIONE!)
              let partCount = 1;
              const totalParts = 2;
              const chunkName = 'fakeUploadTestChunk.txt';
              const chunk1 = 'fakeUploadTestChunk1.txt';
              const chunk2 = 'fakeUploadTestChunk2.txt';
              const separatorFileName = '$__$';
              const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                  let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                  return v.toString(16);
              });
              const fname = guid + separatorFileName + chunkName;
              let filePartName = fname + ".part_" + partCount + "." + totalParts;
              let path = 'test/data/jsApplication/' + chunk1;

              const formData = {
                  file: {
                      value: fs.createReadStream(path),
                      options: {
                          fileName: filePartName
                      }
                  }
              };
              // lato server il fileName è "skyppato". utilizza il fileName orginale e quindi forzo il nome con la convenzione.
              formData.file.value.path = path.replace(chunk1, filePartName);

              request({
                  url: `http://localhost:3000/test/file/uploadchunk`,
                  method: 'POST',
                  headers: {
                      "Content-Type": "multipart/form-data"
                  },
                  formData: formData
              }, async function (error, response, body) {

                  if (error) {
                      console.log(error);
                      expect(true).toBe(false);
                      done();
                  }
                  expect(body).toBe('');
                  expect(response.statusCode).toBe(200);
                  // INVIO 2o chunk
                  partCount++;
                  filePartName = fname + ".part_" + partCount + "." + totalParts;
                  path = 'test/data/jsApplication/' + chunk2;

                  const formData = {
                      file: {
                          value: fs.createReadStream(path),
                          options: {
                              fileName: filePartName
                          }
                      }
                  };
                  // lato server il fileName è "skyppato". utilizza il fileName orginale e quindi forzo il nome con la convenzione.
                  formData.file.value.path = path.replace(chunk2, filePartName);

                  request({
                      url: `http://localhost:3000/test/file/uploadchunk`,
                      method: 'POST',
                      headers: {
                          "Content-Type": "multipart/form-data"
                      },
                      formData: formData
                  }, async function (error, response, body) {

                      var objParsed = JSON.parse(body);
                      var ds = new jsDataSet.DataSet(objParsed.name);
                      ds.deSerialize(objParsed, true);
                      expect(ds.name).toBe('attach_default');
                      expect(ds.tables.attach.rows.length).toBe(1);
                      expect(ds.tables.attach.rows[0].idattach).toBe(2);
                      expect(ds.tables.attach.rows[0].filename.indexOf(chunkName)).toBeGreaterThan(0);
                      expect(ds.tables.attach.rows[0].size).toBe(111);

                      // verifico ci sia il file
                      let allFiles = await readdir(uploadPath);
                      let files = _.filter(allFiles, fname =>  {
                          return fname.indexOf(chunkName) > 0
                      });
                      // verifico ce ne sia solo uno e le _part_x_y siano state quindi eliminate
                      // dal be durante il merge
                      expect(files.length).toBe(1);

                      // verifico il contenuto . sia il merge dei 2 file.
                      const content = fs.readFileSync(uploadPath + files[0]);
                      const contentMerged =
                          '1 test file used to test upload api rest for node js.\r\n'+
                          '2. test file used to test upload api rest for node js.\r\n';
                      expect(content.toString()).toBe(contentMerged);
                      done();
                  });
              });
          }, timeout);

        it('download file (after test upload file chunk less 1MB. ok)',
            function (done) {
                request({
                    url: `http://localhost:3000/test/file/download?idattach=1`,
                    method: 'GET'
                }, async function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(body.indexOf('1. test file used to test upload api rest for node js.')).not.toBe(-1);
                    done();
                });
            }, timeout);

        describe('clear dataBase', function () {
            it('should run the destroy script', function (done) {
                sqlConn.run(fs.readFileSync('test/data/jsApplication/Destroy.sql').toString())
                    .done(function () {
                        expect(true).toBeTruthy();
                        done();
                    })
                    .fail(function (res) {
                        expect(res).toBeUndefined();
                        done();
                    });
            }, timeout);
        });

        describe('clear filesystem', function () {
            it('should delete uploaded files', async function (done) {
                let allFiles = await readdir(uploadPath);
                var totFileToClear = 2;
                // mi aspetto totFileToClear file caricati durante test. Uno per singolo chunk, il secondo con multipli chunk
                expect(allFiles.length).toBe(totFileToClear);
                // li elimino tutti
                for (let fname of allFiles) {
                    await unlink(uploadPath + fname);
                }
                allFiles = await readdir(uploadPath);
                expect(allFiles.length).toBe(0);
                done();
            }, timeout);
        });
    });
