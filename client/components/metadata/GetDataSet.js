const Path = require("path");
const jsDataSet = require("./jsDataSet");
const DataSet = jsDataSet.DataSet;
const fs = require('fs');
const {readFile} = require("fs/promises");
const path = require("path");
const metaModel = require("./../../../client/components/metadata/MetaModel");

/**
 * Retrieves dataset from repository
 */
function GetDataSet(){
    this.cache = {};
    this.dsPath = './client/dataset';
}



GetDataSet.prototype = {
    constructor: GetDataSet,

   /*
    /!**
     *
     * @param {string} path path for metadata inclusion
     *!/
    setPath: function (path){
        this.dsPath = path;
    },

    /!**
     *
     *!/
    getPath: function (){
        return this.dsPath;
    },*/

    /**
     * Creates a DataSet with a specified name
     * @param {string} tableName
     * @param {string} editType
     * @return {DataSet|null}
     */
    getDataSet: function (tableName, editType){
        let dsName= tableName+"_"+editType;
        let data;
        try {
            if (this.cache[dsName]) {
                data = this.cache[dsName];
            } else {
                data = fs.readFileSync(Path.join(this.dsPath, 'dsmeta_' + dsName + ".json"), 'utf8');
            }
        }
        catch {
            return null;
        }
        let dsData = JSON.parse(data);

        let ds= new DataSet(dsName);
        ds.deSerialize(dsData,true);
        return  ds;
    },

    /**
     * Creates a DataSet with a specified name with all entity tables properties
     * @param {Context} ctx
     * @param {string} tableName
     * @param {string} editType
     * @return {Promise<DataSet>}
     */
    createEmptyDataSet: async function (ctx, tableName, editType){
        let ds = this.getDataSet(tableName,editType);
        let primaryTable = ds.tables[tableName];
        let /*MetaData*/ meta = ctx.getMeta(tableName);
        meta.describeColumnsStructure(primaryTable);
        let scannedTable = new Set();
        let tableDescriptor = await ctx.dbDescriptor.table(tableName);
        tableDescriptor.describeTable(primaryTable);
        await GetDataSet.prototype.addSubEntityExtProperties(ctx,primaryTable,editType);
        return ds;
    },


    /**
     * Add properties to DataTable invoking meta.describeColumnsStructure and the
     *  method describeTable of the table descriptor
     * @param {Context} ctx
     * @param {DataTable} parent
     * @param {string} editType
     * @param {Set} scannedTable
     */
    addSubEntityExtProperties: async function(ctx,
                                              parent,
                                              editType,
                                              scannedTable=undefined) {
        if (scannedTable === undefined) {
            scannedTable = new Set([parent.tableForReading()]);
        }
        let /* DataSet */ ds = parent.dataset;
        ctx.getMeta(parent.name).setDefaults(parent);
        let allChildRel = parent.childRelations()
            .filter(async rel => metaModel.isSubEntityRelation(rel, ds.tables[rel.childTable], parent));

        await forEachAsync(allChildRel,async (rel) => {
            let childTable = ds.tables[rel.childTable];
            let meta = ctx.getMeta(childTable.tableForReading());
            meta.describeColumnsStructure(childTable);
            let tableDescriptor = await ctx.dbDescriptor.table(childTable.name);
            tableDescriptor.describeTable(childTable);
            await GetDataSet.prototype.addSubEntityExtProperties(ctx,childTable,editType, scannedTable);
        });

    }
};

async function forEachAsync(arr, fn) {
    for (let t of arr) { await fn(t); }
}


module.exports = new GetDataSet();
