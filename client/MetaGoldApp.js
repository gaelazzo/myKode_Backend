/* globals window,BaseMetaApp,_,appMeta */

(function () {

    // Deriva da MetaApp
    const MetaApp =  appMeta.MetaApp;

    function MetaGoldApp() {
        MetaApp.apply(this, arguments);
    }

    MetaGoldApp.prototype = _.extend(
        new MetaApp(),
        {
            constructor: MetaGoldApp,
            superClass: MetaApp.prototype,

        });
    appMeta.currApp = new MetaGoldApp();

    //We save the original getMetaDataPath function
    let baseGetPageDataPath = appMeta.getMetaPagePath;

    appMeta.getMetaPagePath = function (tableName) {
        if (appMeta.config.env === appMeta.config.envEnum.PROD) {
            return this.basePathMetadata ? this.basePathMetadata : this.basePath;
        }
        //We invoke the original function
        return baseGetPageDataPath.call(this, tableName);
    }

    appMeta.callWebService = function (method, prms) {
        return appMeta.currApp.callWebService(method,prms);
    }


}());
