let anonymousPermissions = require("../../config/anonymousPermissions");
let jsToken = require("../../src/jsToken");
let DataSet = require("jsDataSet");

/**
 * Checks if anonymmous policies are satisfied by the request
 * @param {Request} req
 * @param {string} tableName
 * @param {string} editType
 * @param {DataSet} ds
 * @return
 */
function  isAnonymousAllowed(req,tableName,editType,ds=null){
    let ctx = req.app.locals.context;
    let /*Identity*/ identity = ctx.identity;
    if (!identity.isAnonymous) return true; // request is not anonymous
    if (!anonymousPermissions[tableName]) return false;
    if (!anonymousPermissions[tableName][editType]) return false;
    return anonymousCustomCheck(tableName,editType,ds);
}

/**
 *
 * @param {DataTable} dt
 * @return {*}
 */
function countRowState(dt) {
    let rowStateCount = {
        deleted: 0,
        modified:0,
        added:0
    };
    dt.rows.forEach(r=>{
        if (r.getRow().state=== DataSet.dataRowState.deleted){
            rowStateCount.deleted++;
        }
        if (r.getRow().state=== DataSet.dataRowState.added){
            rowStateCount.added++;
        }
        if (r.getRow().state=== DataSet.dataRowState.modified){
            rowStateCount.modified++;
        }
    });
    return rowStateCount;
}

/**
 *
 * @param {string} tableName
 * @param {string} editType
 * @param {DataSet} ds
 * @return {boolean}
 */
function anonymousCustomCheck(tableName, editType, ds=null){
    if (!ds) return true;

    if (tableName === "registrationuser" && editType === "usr") {

            return ds.tables.every(t=> {
                let rowStateCount = countRowState(t);
                if (rowStateCount.deleted > 0) {
                    return false;
                }
                if (rowStateCount.modified > 0) {
                    return false;
                }
                if (t.name !== "registrationuser" &&
                    t.name !== "registrationuserflowchart" && rowStateCount.added > 0) {
                    return false;
                }
                if (t.name === "registrationuser" && rowStateCount.added > 1) {
                    return false;
                }
                // impossibile richiedere più di 10 profili
                if (t.name === "registrationuserflowchart" && rowStateCount.added > 10) {
                    return false;
                }
                return  true;
            });
    }
}

module.exports= isAnonymousAllowed;
