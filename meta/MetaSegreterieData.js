/**
 * @module MetaData
 * @description
 * Contains all the information for a MetaData
 */
(function(_,MetaEasyData,jsDataSet) {
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


	// deriva da MetaData

	var dataRowState = jsDataSet.dataRowState;

	function MetaSegreterieData() {
		MetaEasyData.apply(this, arguments);
	}

	MetaSegreterieData.prototype = _.extend(
		new MetaEasyData(),
		{
			constructor: MetaSegreterieData,
			superClass: MetaEasyData.prototype,

            /**
             * Calculates calculated fields on the row r. based on some info.
             * @param {ObjectRow} r.  r is the row where to insert the calculated values
             * @param {string} listtype
             * @param {string} stopNavigation  if true non perform calulateField on childs
             */
			calculateFields: function (r, listtype, stopNavigation) {
				var tableToFill = r.getRow().table;

				var includeAll = function (cols, columnKeys) {
					var arrayKey = _.split(columnKeys, '-');
					return _.every(arrayKey, function (columnKey) {
						return _.includes(cols, columnKey);
					});
				};

				// prendo customObjCalculateFields linkato durante la describeColumns sul meta js
				var customObjCalculateFields = tableToFill.customObjCalculateFields;
                /**
                 * Finds the rows related to row "r" with parent or child relations, and search in those row a value for the column relatedColumnName
                 * It excludes the table tNameToExclude finding the table related with the row
                 * @param {ObjectRow} r the row to insert the calculated value
                 * @param {string} relatedTableName name of table related
                 * @param {string} relatedColumnName name of related column
                 * @param {string} columnKey key on relation to check. parent or child
                 * @param {array} arrNameToExclude array with the names of tables already scanned and so they are to exclude in the search of the "relatedTableName"
                 * @returns {object | null} is the calculated value to return and attach to the r[key]
                 */
				var getValueRelatedRow = function (r, relatedTableName, relatedColumnName, columnKey, arrNameToExclude) {
					var t = r.getRow().table;

					var relatedTable = r.getRow().table.dataset.tables[relatedTableName];
					var related = null;
					var relatedTemp = null;
					var foundValue = null;

					if (!relatedTable) {
						logger.log(logType.ERROR, 'calculateFields(): grid for ' + tableToFill.name + ', table ' + relatedTableName + ' not in the dataset');
						return null;
					}

					// se la colonna non appartiene alla tabella in cui la devo cercare esco subito
					if (!relatedTable.columns[relatedColumnName]) {
						logger.log(logType.ERROR, 'calculateFields(): grid for ' + tableToFill.name + ', column ' + relatedColumnName + ' not in the table ' + relatedTableName);
						return null;
					}

					// cerco su relazioni parent
					_.forEach(
						// all'inizio si parte dalla columnKey di partenza, nei salti successivi si considerano tutte le foreign key possibili
						_.filter(t.parentRelations(), function (relInt) {
							return !columnKey || includeAll(relInt.childCols, columnKey);
						}), function (rel) {
							if (foundValue !== null) return false; // trovato esco dal ciclo
							if (_.includes(arrNameToExclude, rel.parentTable)) return true; // non risalgo sulla tab da cui provengo
							var conditionFound = columnKey ? (rel.parentTable === relatedTableName && includeAll(rel.childCols, columnKey)) : rel.parentTable === relatedTableName;
							if (conditionFound) {
								related = r.getRow().getParentRows(rel.name);
								if (related.length === 0) return false; // non trovate righe nella tabella in cui mi aspetto il valore e quindi esco dal ciclo
								foundValue = related[0][relatedColumnName];
								return false; // trovato esco dal ciclo
							} else {
								// se non è relazione diretta vado in ricorsione
								relatedTemp = r.getRow().getParentRows(rel.name);
								_.forEach(relatedTemp, function (row) {
									arrNameToExclude.push(rel.parentTable);
									// passo nullnella ricorsione perchè columnkey potrebbe cambaire di nome, ma la relazione è quella che comanda quindi è un check superfluo
									foundValue = getValueRelatedRow(row, relatedTableName, relatedColumnName, null, arrNameToExclude);
									if (foundValue !== null) return false; // trovato esco dal ciclo
								});
							}
						});

					// cerco su relazioni child
					_.forEach(
						// all'inizio si parte dalla columnKey di partenza, nei salti successivi si considerano tutte le foreign key possibili
						_.filter(t.childRelations(), function (relInt) {
							return !columnKey || includeAll(relInt.parentCols, columnKey);
						}), function (rel) {
							if (foundValue !== null) return false;
							if (_.includes(arrNameToExclude, rel.childTable)) return true;
							var conditionFound = columnKey ? (rel.childTable === relatedTableName && includeAll(rel.parentCols, columnKey)) : rel.childTable === relatedTableName;
							if (conditionFound) {
								related = r.getRow().getChildRows(rel.name);
								if (related.length === 0) return false;
								foundValue = related[0][relatedColumnName];
								return false;
							} else {
								// se non è relazione diretta vado in ricorsione
								relatedTemp = r.getRow().getChildRows(rel.name);
								_.forEach(relatedTemp, function (row) {
									arrNameToExclude.push(rel.childTable);
									foundValue = getValueRelatedRow(row, relatedTableName, relatedColumnName, null, arrNameToExclude);
									if (foundValue !== null) return false;
								});
							}
						});

					return foundValue;
				};

				// ogni oggetto in customObjCalculateFields è del tipo {tableNameLookup:valore, columnNameLookup:valore, columnNamekey:valore };
				_.forOwn(customObjCalculateFields, function (value, key) {
					var toMark = (r.getRow().state === dataRowState.unchanged);
					// chiama la funzione locale al metodo, definita sopra, la quale calcola in base alla relazione quale campo deve prendere
					r[key] = getValueRelatedRow(r, value.tableNameLookup, value.columnNameLookup, value.columnNamekey, [tableToFill.name]);
					if (toMark) r.getRow().acceptChanges();
				});


				if (stopNavigation) return;

				// ciclo sulle child della prima tabella
				_.forEach(tableToFill.childRelations(), function (rel) {
					var currChild = tableToFill.dataset.tables[rel.childTable];
					_.forEach(currChild.rows,
						function (rChild) {
							var dRow = rChild.getRow();
							if (dRow.state === dataRowState.deleted) return;
							var toMark = (dRow.state === dataRowState.unchanged);
							MetaSegreterieData.prototype.calculateFields(rChild, listtype, true);
							if (toMark) dRow.acceptChanges();
						});
				});

			},

		});


		// Some AMD build optimizers like r.js check for condition patterns like the following:
		//noinspection JSUnresolvedVariable
		if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
			// Expose lodash to the global object when an AMD loader is present to avoid
			// errors in cases where lodash is loaded by a script tag and not intended
			// as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
			// more details.
			root.MetaSegreterieData = MetaSegreterieData;

			// Define as an anonymous module so, through path mapping, it can be
			// referenced as the "underscore" module.
			//noinspection JSUnresolvedFunction
			define(function () {
				return MetaSegreterieData;
			});
		}
		// Check for `exports` after `define` in case a build optimizer adds an `exports` object.
		else if (freeExports && freeModule) {
			if (moduleExports) { // Export for Node.js or RingoJS.
				(freeModule.exports = MetaSegreterieData).MetaSegreterieData = MetaSegreterieData;
			}
			else { // Export for Narwhal or Rhino -require.
				freeExports.MetaSegreterieData = MetaSegreterieData;
			}
		}
		else {
			// Export for a browser or Rhino.
			if (root.appMeta){
				root.appMeta.MetaSegreterieData = MetaSegreterieData;
			}
			else {
				root.MetaSegreterieData = MetaSegreterieData;
			}
		}

	}(  (typeof _ === 'undefined') ? require('lodash') : _,
		(typeof appMeta === 'undefined') ? require('./MetaEasyData').MetaEasyData : appMeta.MetaEasyData,
		(typeof jsDataSet === 'undefined') ? require('./../client/components/metadata/jsDataSet') : jsDataSet,
	)
);

