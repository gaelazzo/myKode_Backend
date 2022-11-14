(function(_, metaModel,MetaSegreterieData, Deferred) {

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

    function meta_attach() {
		MetaSegreterieData.apply(this, ["attach"]);
        this.name = 'meta_attach';
    }

    meta_attach.prototype = _.extend(
        new MetaSegreterieData(),
        {
            constructor: meta_attach,
			superClass: MetaSegreterieData.prototype,

			getNewRow: function (parentRow, dt, editType){
				var def = Deferred("getNewRow-meta_registry");
				var realParentObjectRow = parentRow ? parentRow.current : undefined;

				//$getNewRowInside$

				dt.autoIncrement('idattach', { minimum: 99990001 });

			/*	// metto i default
				var objRow = dt.newRow({
					//$getNewRowDefault$
				}, realParentObjectRow);*/

				// torno la dataRow creata
				this.superClass.getNewRow(parentRow, dt, editType)
					.then(function (dtRow) {
						//$getNewRowDefault$
						 def.resolve(dtRow);
					});
				return def.promise();
			},
			

			getSorting: function (listType) {
				switch (listType) {
					case "default": {
						return "title asc ";
					}
					//$getSortingin$
				}
				return this.superClass.getSorting(listType);
			}

        });


		if (freeExports && freeModule) {
			if (moduleExports) { // Export for Node.js or RingoJS.
				(freeModule.exports = meta_attach).meta_attach = meta_attach;
			} else { // Export for Narwhal or Rhino -require.
				freeExports.meta_attach = meta_attach;
			}
		} else {
			// Export for a browser or Rhino.
			if (root.appMeta){
				//root.appMeta.meta = meta_attach;
				appMeta.addMeta('attach', new meta_attach('attach'));
			} else {
				root.meta_attach = meta_attach;
			}
		}

	}(  (typeof _ === 'undefined') ? require('lodash') : _,
		(typeof appMeta === 'undefined') ? require('../components/metadata/MetaModel').metaModel : appMeta.metaModel,
		(typeof appMeta === 'undefined') ? require('./MetaSegreterieData').MetaSegreterieData : appMeta.MetaSegreterieData,
		(typeof appMeta === 'undefined') ? require('../components/metadata/EventManager').Deferred : appMeta.Deferred,
	)
);
