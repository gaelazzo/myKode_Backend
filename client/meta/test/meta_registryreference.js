(function(_, metaModel,MetaData, Deferred) {

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


		function meta_registryreference() {
        MetaData.apply(this, ["registryreference"]);
        this.name = 'meta_registryreference';
    }

    meta_registryreference.prototype = _.extend(
        new MetaData(),
        {
            constructor: meta_registryreference,
			superClass: MetaData.prototype,

			describeColumns: function (table, listType) {
				var nPos=1;
				var objCalcFieldConfig = {};
				var self = this;
				_.forEach(table.columns, function (c) {
					self.describeAColumn(table, c.name, '', null, -1, null);
				});
				switch (listType) {
					default:
						return this.superClass.describeColumns(table, listType);
					case 'user':
						this.describeAColumn(table, '!clientpassword', 'Password', null, 0, null);
						this.describeAColumn(table, '!confirmpassword', 'Conferma password', null, 0, null);
						this.describeAColumn(table, 'referencename', 'Nome Contatto', null, 10, 50);
						this.describeAColumn(table, 'email', 'E-Mail', null, 40, 200);
						this.describeAColumn(table, 'phonenumber', 'Numero di telefono', null, 80, 50);
						this.describeAColumn(table, 'faxnumber', 'Numero Fax', null, 90, 50);
						this.describeAColumn(table, 'mobilenumber', 'Numero di cellulare', null, 100, 20);
						this.describeAColumn(table, 'pec', 'Pec', null, 110, 200);
						this.describeAColumn(table, 'userweb', 'Nome utente', null, 110, 40);
						this.describeAColumn(table, 'passwordweb', 'Password', null, 120, 40);
						this.describeAColumn(table, 'website', 'Web page', null, 200, 512);
//$objCalcFieldConfig_user$
						break;
					case 'persone':
						this.describeAColumn(table, 'referencename', 'Nome Contatto', null, 10, 50);
						this.describeAColumn(table, 'flagdefault', 'Contatto predefinito', null, 30, null);
						this.describeAColumn(table, 'email', 'Email', null, 40, 200);
						this.describeAColumn(table, 'skypenumber', 'Skype No.', null, 60, 50);
						this.describeAColumn(table, 'msnnumber', 'MSN No.', null, 70, 50);
						this.describeAColumn(table, 'phonenumber', 'Numero tel.', null, 80, 50);
						this.describeAColumn(table, 'faxnumber', 'Numero fax.', null, 90, 50);
						this.describeAColumn(table, 'mobilenumber', 'Num. cellulare', null, 100, 20);
						this.describeAColumn(table, 'pec', 'Pec', null, 110, 200);
						this.describeAColumn(table, 'userweb', 'login web', null, 110, 40);
						this.describeAColumn(table, 'passwordweb', 'password per accesso web', null, 120, 40);
						this.describeAColumn(table, 'registryreferencerole', 'Funzione contatto', null, 130, 50);
						this.describeAColumn(table, 'website', 'Website', null, 200, 512);
//$objCalcFieldConfig_persone$
						break;
					case 'seg':
						this.describeAColumn(table, 'referencename', 'Nome Contatto', null, 10, 50);
						this.describeAColumn(table, 'flagdefault', 'Contatto predefinito', null, 30, null);
						this.describeAColumn(table, 'email', 'Email', null, 40, 200);
						this.describeAColumn(table, 'skypenumber', 'Skype No.', null, 60, 50);
						this.describeAColumn(table, 'msnnumber', 'MSN No.', null, 70, 50);
						this.describeAColumn(table, 'phonenumber', 'Numero tel.', null, 80, 50);
						this.describeAColumn(table, 'faxnumber', 'Numero fax.', null, 90, 50);
						this.describeAColumn(table, 'mobilenumber', 'Num. cellulare', null, 100, 20);
						this.describeAColumn(table, 'pec', 'Pec', null, 110, 200);
						this.describeAColumn(table, 'website', 'Website', null, 200, 512);
//$objCalcFieldConfig_seg$
						break;
//$objCalcFieldConfig$
				}
				table['customObjCalculateFields'] = objCalcFieldConfig;
				metaModel.computeRowsAs(table, listType, this.superClass.calculateFields);
				return Deferred("describeColumns").resolve();
			},


			setCaption: function (table, edittype) {
				switch (edittype) {
					case 'user':
						table.columns["!clientpassword"].caption = "Password";
						table.columns["!confirmpassword"].caption = "Conferma password";
						table.columns["email"].caption = "E-Mail";
						table.columns["faxnumber"].caption = "Numero Fax";
						table.columns["mobilenumber"].caption = "Numero di cellulare";
						table.columns["passwordweb"].caption = "Password";
						table.columns["phonenumber"].caption = "Numero di telefono";
						table.columns["userweb"].caption = "Nome utente";
						table.columns["website"].caption = "Web page";
//$innerSetCaptionConfig_user$
						break;
					case 'persone':
						table.columns["activeweb"].caption = "accesso web attivato?";
						table.columns["ct"].caption = "data creazione";
						table.columns["cu"].caption = "nome utente creazione";
						table.columns["email"].caption = "Email";
						table.columns["faxnumber"].caption = "Numero fax.";
						table.columns["flagdefault"].caption = "Contatto predefinito";
						table.columns["idreg"].caption = "id anagrafica (tabella registry)";
						table.columns["idregistryreference"].caption = "#";
						table.columns["iterweb"].caption = "iterazioni algoritmo di hashing";
						table.columns["lt"].caption = "data ultima modifica";
						table.columns["lu"].caption = "nome ultimo utente modifica";
						table.columns["mobilenumber"].caption = "Num. cellulare";
						table.columns["msnnumber"].caption = "MSN No.";
						table.columns["passwordweb"].caption = "password per accesso web";
						table.columns["phonenumber"].caption = "Numero tel.";
						table.columns["referencename"].caption = "Nome Contatto";
						table.columns["registryreferencerole"].caption = "Funzione contatto";
						table.columns["rtf"].caption = "allegati";
						table.columns["saltweb"].caption = "sale per la codifica della password";
						table.columns["skypenumber"].caption = "Skype No.";
						table.columns["txt"].caption = "note testuali";
						table.columns["userweb"].caption = "login web";
//$innerSetCaptionConfig_persone$
						break;
//$innerSetCaptionConfig$
				}
			},


			getNewRow: function (parentRow, dt, editType){
               var def = Deferred("getNewRow-meta_registryreference");

				//$getNewRowInside$

				dt.autoIncrement('idregistryreference', { minimum: 99990001 });

				// metto i default
				return this.superClass.getNewRow(parentRow, dt, editType)
					.then(function (dtRow) {
						//$getNewRowDefault$
						return def.resolve(dtRow);
					});
			},



			//$isValidFunction$

			//$getStaticFilter$

			getSorting: function (listType) {
				switch (listType) {
					case "user": {
						return "idregistryreference asc ";
					}
					//$getSortingin$
				}
				return this.superClass.getSorting(listType);
			}

        });


		if (freeExports && freeModule) {
			if (moduleExports) { // Export for Node.js or RingoJS.
				(freeModule.exports = meta_registryreference).meta_registry = meta_registryreference;
			} else { // Export for Narwhal or Rhino -require.
				freeExports.meta_registryreference = meta_registryreference;
			}
		} else {
			// Export for a browser or Rhino.
			if (root.appMeta){
				appMeta.addMeta('registryreference', new meta_registryreference('registryreference'));
			} else {
				root.meta_registry = meta_registryreference;
			}
		}

	}(  (typeof _ === 'undefined') ? require('lodash') : _,
		(typeof appMeta === 'undefined') ? require('../../components/metadata/MetaModel').metaModel : appMeta.metaModel,
		(typeof appMeta === 'undefined') ? require('../../components/metadata/MetaData').MetaData : appMeta.MetaData,
		(typeof appMeta === 'undefined') ? require('../../components/metadata/EventManager').Deferred : appMeta.Deferred,
	)
);
