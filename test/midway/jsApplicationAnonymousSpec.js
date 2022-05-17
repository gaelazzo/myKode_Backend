console.log("running ApplicationAnonymousSpec");
'use strict';

const path = require("path");
const FormData = require('form-data');
const fs = require("fs");
const q = require('jsDataQuery');
const jsDataSet = require("jsDataSet");
const configName = path.join('config', 'dbList.json');
const http = require("http");
let request = require('request');
const _ = require("lodash");
const tokenConfig = require("./../../config/tokenConfig");

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

const sqlServerDriver = require('../../src/jsSqlServerDriver'),
    IsolationLevel = {
        readUncommitted: 'READ_UNCOMMITTED',
        readCommitted: 'READ_COMMITTED',
        repeatableRead: 'REPEATABLE_READ',
        snapshot: 'SNAPSHOT',
        serializable: 'SERIALIZABLE'
    };

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
            sqlConn = getConnection('test_sqlServer_anonymous');
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

        // ANONYMOUS token

        it("getDataSet ws anonymous non permitted",
            function (done) {
            const tableName = "attach";
            const editType = "counter";
                request({
                    url: 'http://localhost:3000/testanonymous/data/getDataSet',
                    method: 'POST',
                    headers: {
                        'authorization': "Bearer " + tokenConfig.AnonymousToken,
                    },
                    form: {
                        tableName: tableName,
                        editType: editType
                    }
                }, function (error, response, body) {
                    if (error) {
                        console.log(error);
                        expect(true).toBe(false);
                        done();
                    }
                    expect(response).toBeDefined();
                    expect(response.statusCode).toBe(400);
                    expect(body).toBe("Anonymous not permitted, dataset " + tableName + " " + editType);
                    done();
                });
            }, timeout);

        it("getDataSet ws anonymous permitted",
            function (done) {
                const tableName = "attach";
                const editType = "anonymous";
                request({
                    url: 'http://localhost:3000/testanonymous/data/getDataSet',
                    method: 'POST',
                    headers: {
                        'authorization': "Bearer " + tokenConfig.AnonymousToken,
                    },
                    form: {
                        tableName: tableName,
                        editType: editType
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
                    expect(ds.name).toBe('attach_anonymous');
                    expect(ds.tables.attach).toBeDefined();
                    expect(Object.keys(ds.tables.attach.columns).length).toBeGreaterThan(1);
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

    });
