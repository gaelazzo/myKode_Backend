/*globals Context,sqlFun,DataRelation,ObjectRow  */


const dsSpace = require('../client/components/metadata/jsDataSet'),
    dataRowState = dsSpace.dataRowState,
    _ = require('lodash'),
    dq = require('../client/components/metadata/jsDataQuery'),
    dbList = require('./jsDbList'),
    multiSelect = require('./jsMultiSelect'),
    Model= require('./../client/components/metadata/MetaModel');



/**
 * @typedef function Deferred
 */
const    Deferred = require("JQDeferred");


/**
 * Utility class with methods to fill a DataSet starting from a set of rows
 * @class getData
 */
function GetDataSpace() {
}

GetDataSpace.prototype = {
    constructor: GetDataSpace,
    fillDataSetByKey: fillDataSetByKey,
    fillDataSetByFilter: fillDataSetByFilter,
    getFilterByExample: getFilterByExample,
    doGet:doGet,
    getStartingFrom: getStartingFrom,
    getFilterKey: getFilterKey, //for testing purposes
    scanTables: scanTables, //for testing purposes
    getParentRows: getParentRows, //for testing purposes
    getChildRows: getChildRows, //for testing purposes
    getAllChildRows: getAllChildRows, //for testing purposes
    getRowsByFilter: getRowsByFilter, //for testing purposes
    getByKey: getByKey,//for testing purposes
    getByFilter: getByFilter //for testing purposes
};

/**
 * Evaluates a Filter basing on the key of a table and an object
 * Assumes key = object with all key necessary fields
 * @method getFilterKey
 * @private
 * @param {Context} context
 * @param {string} tableName
 * @param {object[]|object} keyValues
 * @returns {sqlFun}
 */
function getFilterKey(context, tableName, keyValues) {
    const def = Deferred();
    context.dbDescriptor.table(tableName)
        .then(function (tableDescr) {
            def.resolve(dq.mcmp(tableDescr.getKey(), keyValues));
        })
        .fail(function (err) {
            def.reject(err);
        });
    return def.promise();
}

/**
 * Gets a a filter comparing all example fields
 * @method getFilterByExample
 * @param {Context} context
 * @param {string} tableName
 * @param {object} example
 * @param {boolean}  [useLike=false]  --if true, uses 'like' for any string comparisons, otherwise uses equal comparison
 * @return {sqlFun} DataRow obtained with the given filter
 */
function getFilterByExample(context, tableName, example, useLike) {
    const def = Deferred();
    if (useLike) {
        def.resolve(dq.mcmpLike(example));
    }
    else {
        const fields = _.keys(example);
        if (fields.length > 0) {
            def.resolve(dq.mcmp(fields, example));
        }
        else {
            def.resolve(dq.constant(true));
        }
    }
    return def.promise();
}
/**
 * Gets an array of datarow given a filter
 * @method getByFilter
 * @param {Context} ctx
 * @param {DataTable} table
 * @param {sqlFun} filter
 * @param {string} [orderBy]
 * @return {DataRow[]} DataRow obtained with the given filter
 */
function getByFilter(ctx,  table, filter, orderBy) {
    const def = Deferred();
    let result;
    ctx.dataAccess.selectIntoTable(
        { table: table, filter: filter,  environment: ctx.environment, orderBy:orderBy})
        .then(function () {
            result = table.select(filter);
            // if (result.length === 0) {
            //     def.reject('jsGetData.getByFilter: there was no row in table ' + table.name + ' filtering with ' + filter.toString());
            //     return;
            // }
            def.resolve(result);
        })
        .fail(function (err) {
            def.reject(err);
        });
    return def.promise();
}


/**
 * Gets a single row given its key, that must be contained in key
 * @method getByKey
 * @private
 * @param {Context} ctx
 * @param {DataTable} table
 * @param {object[]} keyValues
 * @return {DataRow}  DataRow obtained with the given key
 */
function getByKey(ctx, table, keyValues) {
    const def = Deferred(),
        that = this;
    getFilterKey(ctx, table.name, keyValues)
        .then(function (sqlFilter) {
            return that.getByFilter(ctx, table, sqlFilter);
        })
        .done(function (r) {
            def.resolve(r[0]);
        })
        .fail(function (err) {
            def.reject(err);
        });
    return def.promise();
}

/**
 * Fills a DataSet given the key of a row
 * @method fillDataSetByKey
 * @param {Context} ctx
 * @param {DataSet} ds
 * @param {DataTable} table
 * @param {object[]|object} keyValues
 * @returns {*}
 */
function fillDataSetByKey(ctx, ds, table, keyValues) {
    const def = Deferred(),
        that = this;
    let result;
    that.getByKey(ctx, table, keyValues)
        .then(function (r) {
            result = r;
            return that.getStartingFrom(ctx, table);
        })
        .then(function () {
            def.resolve(result);
        })
        .fail(function (err) {
            def.reject(err);
        });
    return def.promise();
}

/**
 * Fill a dataset starting with a set of filtered rows in a table
 * @method fillDataSetByFilter
 * @param {Context} ctx
 * @param {DataTable} table  main table
 * @param {sqlFun} filter
 * @return {DataRow[]} DataRow obtained with the given filter
 */
function fillDataSetByFilter(ctx,  table, filter) {
    const def = Deferred(),
        that = this;
    let result;
    that.getByFilter(ctx, table, filter)
        .then(function (arr) {
            result = arr;
            return that.getStartingFrom(ctx, table);
        })
        .then(function () {
            def.resolve(result);
        })
        .fail(function (err) {
            def.reject(err);
        });
    return def.promise();
}

/**
 *
 * @param {DataTable} table
 * @param {{DataTable}} visited
 * @param {{DataTable}} toVisit
 */
function recursivelyMarkSubEntityAsVisited(table, visited, toVisit){
    let ds = table.dataset;
    _.forEach(table.childRelations(),
        /**
         *
         * @param {DataRelation} rel
         */
            rel=>{
                let childTable = ds.tables[rel.childTable];
                if ( visited[rel.childTable] ||
                    (!Model.isSubEntityRelation(rel,childTable,table) && Model.allowClear(childTable))
                        ){
                    return;
                }
                visited[rel.childTable]= childTable;
                toVisit[rel.childTable]= childTable;
                recursivelyMarkSubEntityAsVisited(childTable,visited,toVisit);
        });
}

/**
 * Gets all data of the DataSet cascate-related to the primary table.
 * The first relations considered are child of primary, then
 *  proper child / parent relations are called in cascade style.
 * @param {Context} ctx
 * @param {DataTable} primaryTable
 * @param {boolean} onlyPeripherals if true, only peripheral (not primary or secondary) tables are refilled
 * @param {DataRow} [oneRow] The (eventually) only primary table row on which get the entire sub-graph.
 *  Can be null if PrimaryDataTable already contains rows.  R is not required to belong to PrimaryDataTable.
 */
function doGet(ctx, primaryTable, onlyPeripherals, oneRow){

    const /*{{DataTable}}*/ visited = {};
    const /*{{DataTable}}*/ toVisit = {};
    let /*DataSet*/ ds = primaryTable.dataset;
    //Set Fully-Visited and Cached tables as Visited
    _.forIn(ds.tables, (t,tableName)=>{
        if (Model.cachedTable(t)||Model.visitedFully(t)|| Model.temporaryTable(t)) {
            visited[tableName] = t;
        }
    });
    toVisit[primaryTable.name]=primaryTable;
    visited[primaryTable.name]=primaryTable;

    if (onlyPeripherals){
        //Marks child tables as ToVisit+Visited
        recursivelyMarkSubEntityAsVisited(primaryTable, visited,toVisit);
        _.forIn(ds.tables,(t,tableName)=>{
           if (!Model.allowClear(t)){
               visited[tableName]=t;
               toVisit[tableName]=t;
           }
        });
    }

    //Clears all other tables
    _.forIn (ds.tables,
        (t,tableName)=>{
            if (visited[tableName]) return;
            if (Model.temporaryTable(t)) return;
            let realTable= t.realTable();
            if(realTable){
                if (visited[realTable]) return;
            }
            t.clear();
        });

    //Set as Visited all child tables linked by autoincrement fields
    if (oneRow && oneRow.state === dataRowState.added){
        _.forEach(primaryTable.childRelations(), //relation where primaryTable table is the parent
            /**
             * @param {DataRelation} rel
             */
            rel=>{
                let toSkip = rel.parentCols.some(c=>primaryTable.autoIncrement(c));
                if (toSkip){
                    visited[rel.childTable]= ds.tables[rel.childTable];
                }
            });
    }

    return this.scanTables(ctx, ds, toVisit, visited, oneRow)
        .then(()=>{
            if (onlyPeripherals){
                _.forEach(primaryTable.childRelations(),
                    rel=>{
                        let /*DataTable*/ childTable = ds.tables[rel.childTable];
                        if (Model.allowClear(childTable) &&
                            !Model.isSubEntityRelation(rel,childTable,primaryTable)
                        ){
                            return;
                        }
                       Model.getTemporaryValues(childTable);
                    });

                if (oneRow){
                    Model.getRowTemporaryValues(oneRow);
                }
                else {
                    Model.getTemporaryValues(primaryTable);
                }
            }
        });

}

/**
 * Assuming that primaryTable has ALREADY been filled with data, read all childs and parents starting from
 *  rows present in primaryTable.
 * @method getStartingFrom
 * @param {Context} ctx
 * @param {DataTable} primaryTable
 * @return {promise}
 */
function getStartingFrom(ctx, primaryTable) {
    const visited = {},
        that = this,
        ds = primaryTable.dataset,
        toVisit = {};
    let opened = false;
    const def = Deferred();
    visited[primaryTable.name] = primaryTable;
    toVisit[primaryTable.name] = primaryTable;
    ctx.dataAccess.open()
        .then(function () {
            opened = true;
            return that.scanTables(ctx, ds, toVisit, visited);
        })
        .then(function () {
            if (opened) {
                return ctx.dataAccess.close().then(()=>def.resolve());
            }
            def.resolve();
            return def;
        })
        .fail(function (err) {
            if (opened) {
                return ctx.dataAccess.close().then(()=>def.reject(err));
            }
            def.reject(err);
            return def;
        });


    return def.promise();


}

/**
 * @method scanTables
 * @private
 * @param {Context} ctx
 * @param {DataSet} ds
 * @param {hash} toVisit
 * @param {hash} visited
 * @param {DataRow} oneRow
 */
function scanTables(ctx, ds, toVisit, visited, oneRow) {
    const def = Deferred(),
        that = this,
        /*{{DataTable}}*/ nextVisit = {},//table to visit in the next step, i.e. this will be passed recursively as toVisit
        selList = []; //{Select[]}
    if (_.keys(toVisit).length === 0) {
        def.resolve();
        return;
    }

    //Every child and parent tables of toVisit that aren't yet visited or toVisit become visited and nextVisit
    _.forIn(toVisit, function (table, tableName) {
        if (Model.temporaryTable(table)) {
            return;
        }

        //searches child tables of T & pre-set them to visited
        _.forEach(ds.relationsByParent[tableName],
            /**
             * @param {DataRelation} rel
             */
            function (rel) {
                if (visited[rel.childTable] || toVisit[rel.childTable]) {
                    return;
                }
                const /*DataTable*/ childTable = ds.tables[rel.childTable];
                visited[rel.childTable] = childTable;
                nextVisit[rel.childTable] = childTable;
            });

        //searches parent tables of T & pre-set them to visited + NextVisit
        _.forEach(ds.relationsByChild[tableName],
            /**
             * @param {DataRelation} rel
             */
            function (rel) {
                if (visited[rel.parentTable] || toVisit[rel.parentTable]) {
                    return;
                }
                const /*DataTable*/ parentTable = ds.tables[rel.parentTable];
                visited[rel.parentTable] = parentTable;
                nextVisit[rel.parentTable] = parentTable;
            });
    });

    //load all rows in nextVisit
    _.forIn(toVisit,
        /**
         * @param {DataTable }table
         */
        function (table) {
            if (table.rows.length === 0) {
                return;
            }
            //get parents of table row
            if (!oneRow || oneRow.table.name !== table.name) {
                _.forEach(table.rows, function (r) {
                    that.getParentRows(ds, r, nextVisit, selList);
                });

                that.getAllChildRows(
                    ds,
                    table,
                    nextVisit,
                    selList);
                return;
            }
            //(OneRow!=null) && (OneRow.Table == T)
            if (oneRow.state=== dataRowState.deleted){
                return;
            }
            that.getParentRows(ds, oneRow.current,nextVisit,selList);
            that.getChildRows(ds, oneRow.current, nextVisit,selList);
        });

    if (selList.length === 0) {
        def.resolve();
    }
    else {
        ctx.dataAccess.multiSelect({
                selectList: selList,
                environment: ctx.environment
            })
            .progress(function (data) { //data.tableName and data.rows are the read data
                if (data.rows) {
                    ds.tables[data.tableName].mergeArray(data.rows, true);
                }
            })
            .done(function () {
                //Recursion with new parameters
                that.scanTables(ctx, ds, nextVisit, visited)
                    .done(function () {
                        _.forIn(toVisit, function (table) {
                            Model.getTemporaryValues(table);
                        });
                        def.resolve();
                    })
                    .fail(function (err) {
                        def.reject(err);
                    });
                }
            )
            .fail(function (err) {
                def.reject(err);
            });


    }
    return def.promise();
}

/**
 * Adds select to parent rows
 * @private
 * @method getParentRows
 * @param {DataSet} ds
 * @param {ObjectRow} row
 * @param {object} allowed
 * @param {Array.<Select>} selList
 */
function getParentRows(ds, row, allowed, selList) {
    const childTable = row.getRow().table,
        that = this;
    if (row.getRow().state === dataRowState.deleted) {
        return;
    }
    _.forEach(ds.relationsByChild[childTable.name],
        /**
         * @param {DataRelation} parentRel
         */
        function (parentRel) {
            if (!allowed[parentRel.parentTable]) {
                return;
            }
            let parentTable = ds.tables[parentRel.parentTable];

            let parentFilter = parentRel.getParentsFilter(row);
            if (parentFilter.isFalse) {
                return;
            }
            const multiComp = new multiSelect.MultiCompare(parentRel.parentCols,
                _.map(parentRel.childCols, function (field) {
                    return row[field];
                })
            );

            that.getRowsByFilter(multiComp, parentTable, selList);

        });

}



/**
 * Adds select to child rows
 * @private
 * @method getChildRows
 * @param {DataSet} ds
 * @param {ObjectRow} row
 * @param {object} allowed
 * @param {Array<Select>} selList
 */
function getChildRows(ds, row, allowed, selList) {
    const parentTable = row.getRow().table,
        that = this;
    if (row.getRow().state === dataRowState.deleted) {
        return;
    }
    _.forEach(ds.relationsByParent[parentTable.name],
        /**
         * @param {DataRelation} childRel
         */
        function (childRel) {
            if (!allowed[childRel.childTable]) {
                return;
            }
            let childTable = ds.tables[childRel.childTable];
            let childFilter = childRel.getChildFilter(row);
            if (childFilter.isFalse) {
                return;
            }
            const multiComp = new multiSelect.MultiCompare(childRel.childCols,
                _.map(childRel.parentCols, function (field) {
                    return row[field];
                })
            );
            that.getRowsByFilter(multiComp, childTable, selList);

        });

}

/**
 * Adds select to parent rows
 * @method getAllChildRows
 * @private
 * @param {DataSet} ds
 * @param {DataTable} parentTable
 * @param {object} allowed
 * @param {Arrray.<Select>} selList
 */
function getAllChildRows(ds, parentTable, allowed, selList) {
    const that = this;
    _.forEach(ds.relationsByParent[parentTable.name],
        /**
         * @param {DataRelation} rel
         */
        function (rel) {
            if (!allowed[rel.childTable]) {
                return;
            }
            const childTable = ds.tables[rel.childTable];

            _.forEach(parentTable.select(rel.activationFilter()),
                /**
                 * @param {ObjectRow} r
                 */
                function (r) {
                    // if (r.getRow().state === dataRowState.added) {
                    //     return;
                    // }
                    const childFilter = rel.getChildFilter(r);
                    if (childFilter.isFalse) {
                        return;
                    }
                    const multiComp = new multiSelect.MultiCompare(rel.childCols,
                        _.map(rel.parentCols, function (field) {
                            return r[field];
                        })
                    );
                    that.getRowsByFilter(multiComp, childTable, selList);
                });

        });
}

/**
 * Adds a select command to the given SelectList
 * @method getRowsByFilter
 * @private
 * @param {MultiCompare} multiComp
 * @param {DataTable} table
 * @param {Select[]} selectList
 */
function getRowsByFilter(multiComp, table, selectList) {
    //var mergedFilter = dq.and(filter, table.staticFilter());
    selectList.push(new multiSelect.Select(table.columnList())
        .from(table.tableForReading())
        .intoTable(table.name)
        .staticFilter(table.staticFilter())
        .multiCompare(multiComp)
        .orderBy(table.orderBy()));
}


// exported as an object in order to do unit tests
module.exports = new GetDataSpace();
