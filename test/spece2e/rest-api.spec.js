const path = require("path");
const fs = require("fs");
const q = require('../../client/components/metadata/jsDataQuery');
const jsDataSet = require("../../client/components/metadata/jsDataSet");


const configName = path.join('config',  'dbList.json');

let dbConfig;
if (process.env.TRAVIS){
    dbConfig = { "server": "127.0.0.1",
        "dbName": "test",
        "user": "sa",
        "pwd": "YourStrong!Passw0rd"
    };
}
else {
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
    function() {

        const timeout = 100000;


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
            sqlConn = getConnection('good');
            sqlConn.open().done(function () {
                done();
            }).fail(function (err) {
                console.log('Error failing '+err);
                done();
            });
        }, 30000);

        afterEach(function () {
            if (sqlConn) {
                sqlConn.destroy();
            }
            sqlConn = null;
        });

        describe('setup dataBase', function () {
            it('should run the setup script', function (done) {
                sqlConn.run(fs.readFileSync('test/data/sqlServer/Setup.sql').toString())
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

        it("select ws: query on registry returns DataTable",
            function (done) {
                //var q = jsDataQuery;
                var filter = q.or(q.eq('idreg',1) ,q.eq('idreg',2), q.eq('idreg',3));
                var objser = q.toObject(filter);
                var filterSerialized =  JSON.stringify(objser);
                var options   = {
                    url: 'http://localhost:3000/main/data/select',
                    type: 'POST',
                    data: {
                        tableName: 'registry',
                        columnList: "idreg,cf",
                        top: 10,
                        filter: filterSerialized
                    },
                    timeout : 20000,
                    success: (res) => {
                        expect(res).toBeDefined();
                        const dtObj = JSON.parse(res);
                        const dt = new jsDataSet.DataTable(dtObj.name);
                        dt.deSerialize(dtObj, true);
                        expect(dt.name).toBe('registry');
                        expect(dt.rows.length).toBe(3);
                        done();
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.log(xhr);
                        expect(true).toBe(false);
                        done();
                    }
                };
                jQuery.ajax(options);

            }, timeout);

        it("getDataSet ws: dataset returned",
            function (done) {
                var options   = {
                    url: 'http://localhost:3000/main/data/getDataSet',
                    type: 'POST',
                    data: {
                        tableName: 'registry',
                        editType: 'anagrafica'
                    },
                    timeout : 20000,
                    success: (res) => {
                        console.log(res);
                        expect(res).toBeDefined();
                        var objParsed = JSON.parse(res);
                        var ds = new jsDataSet.DataSet(objParsed.name);
                        ds.deSerialize(objParsed, true);
                        expect(ds.name).toBe('registry_anagrafica');
                        expect(ds.tables.registry).toBeDefined();
                        expect(Object.keys(ds.relations).length).toBeGreaterThan(0);
                        done();
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.log(xhr);
                        expect(true).toBe(false);
                        done();
                    }
                };
                jQuery.ajax(options)

            }, timeout);

        describe('clear dataBase', function () {
            it('should run the destroy script', function (done) {
                sqlConn.run(fs.readFileSync('test/data/sqlServer/Destroy.sql').toString())
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
