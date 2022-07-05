const Path = require("path");

/**
 */
function GetMeta(){

}



GetMeta.prototype = {
    constructor: GetMeta,
    /**
     *
     * @param {string} path path for metadata inclusion
     */
    setPath: function (path){
        this.metaPath = path;
    },

    /**
     * Creates a metadata with a specified name
     * @param {string}name
     * @param {Request} req
     * @return {MetaData}
     */
    getMeta: function (name, req){
        try {
			// todo metti cache
            let mPath = Path.join(this.metaPath,"meta_"+name);
            let Meta = require(mPath).prototype;
            let meta = new Meta.constructor();
            meta.setRequest(req);
            return meta;
        }
        catch (e) {
            //Crea un metadato generico
            let Meta= require('./MetaData');
            let meta = new Meta.MetaData();
            meta.setRequest(req);
            return  meta;
        }
    }
};

module.exports = new GetMeta();
