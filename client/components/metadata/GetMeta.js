const Path = require("path");

/**
 */
function GetMeta(){

}



GetMeta.prototype = {
    cache : {},
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
        let metaPathToUse= this.metaPath;
        if (req){
            let ctx = req.app.locals.context;
            if (ctx && ctx.metaPath){
                metaPathToUse = ctx.metaPath;
            }
        }

        try {
			// todo metti cache
            let mPath = Path.join(metaPathToUse,"meta_"+name);
            let Meta;
            if (GetMeta.prototype.cache[name]){
                Meta = GetMeta.prototype.cache[name];
            }
            else {
                Meta = require(mPath).prototype;
                GetMeta.prototype.cache[name] = Meta;
            }

            let meta = new Meta.constructor();
            meta.setRequest(req);
            return meta;
        }
        catch (e) {
            //Crea un metadato generico
            //console.log("metadata not found:",name);
            let Meta= require('./MetaData');
            GetMeta.prototype.cache[name] = Meta;
            let meta = new Meta(name);

            meta.setRequest(req);
            return  meta;
        }
    }
};

module.exports = new GetMeta();
