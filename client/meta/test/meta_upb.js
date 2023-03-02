(function(_,metaModel,localResource,Deferred,
          getDataUtils,logger,logType,getMeta,
          getDataExt,/*{CType}*/ CType,securityExt,MetaData,jsDataQuery) {


    /** Detect free variable `global` from Node.js. */
    let freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
    /** Detect free variable `self`. */
    let freeSelf = typeof self === 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */
    let root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free variable `exports`. */
    let freeExports = typeof exports === 'object' && exports && !exports.nodeType && exports;
    /** Detect free variable `module`. */
    let freeModule = freeExports && typeof module === 'object' && module && !module.nodeType && module;

    //noinspection JSUnresolvedVariable
    /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. (thanks lodash)*/
    let moduleExports = freeModule && freeModule.exports === freeExports;

   function Meta_upb() {
       MetaData.apply(this, ["upb"]);
       this.name = 'meta_upb';
   }



    Meta_upb.prototype = _.extend(
        new MetaData(),
        {
            constructor: Meta_upb,

            superClass: MetaData.prototype,

            /**
             * @method describeColumns
             * @public
             * @description SYNC
             * Describes a listing type (captions, column order, formulas, column formats and so on)
             * @param {DataTable} table
             * @param {string} listType
             * @returns {Deferred}
             */
            describeTree: function (table, listType) {

                let treeDescr = null;
                if ( listType === "tree") {
                    var maxDepth = 9;
                    // recupero il meta della tabella
                    let rootCondition = q.isNull("paridupb");

                    // Torno il dt popolato solo con i dati che mi aspetto
                    treeDescr = {
                        "withdescr": false,
                        "rootCondition": rootCondition,
                        "maxDepth": maxDepth
                        };
                }

                // lato server torna rootcondition e poi vedremo cosa altro
                let res = treeDescr;
                // N.B: ----> quando ritorno al treeview chiamante, torno le proprietà custom che si aspetta.
                // il default si aspetta solo "rootCondition"

                let maxDepth = res.maxDepth;
                let withdescr = res.withdescr;
                let rootCondition = res.rootCondition;

                // instanzio il dispatcher giusto
                let nodedispatcher = new appMeta.Upb_TreeNode_Dispatcher("title", "codeupb");

                // torno al treeviewManger che ha invocato la resove con i prm attesi, che sono tutti e solo quelli che utilizza
                return Deferred().resolve({
                    rootCondition:rootCondition,
                    nodeDispatcher: nodedispatcher
                }).promise();
            }

        });

        if (freeExports && freeModule) {
            if (moduleExports) { // Export for Node.js or RingoJS.
                (freeModule.exports = Meta_upb).Meta_upb = Meta_upb;
            } else { // Export for Narwhal or Rhino -require.
                freeExports.Meta_upb = Meta_upb;
            }
        } else {
            // Export for a browser or Rhino.
            if (root.appMeta){
                //root.appMeta.meta = metaRegistry;
                appMeta.addMeta('upb', new Meta_upb('upb'));
            } else {
                root.Meta_upb = Meta_upb;
            }
        }

    }(  (typeof _ === 'undefined') ? require('lodash') : _,
        (typeof appMeta === 'undefined') ? require('../../components/metadata/MetaModel').metaModel : appMeta.metaModel,
        (typeof appMeta === 'undefined') ? require('../../components/metadata/MetaData').MetaData : appMeta.MetaGoldData,
        (typeof appMeta === 'undefined') ? require('../../components/metadata/EventManager').Deferred : appMeta.Deferred,
    )
);
