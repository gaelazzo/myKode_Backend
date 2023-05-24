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

	const firstJan1900 = new Date(1900, 0, 1);
	const _6_6_2079= new Date(2079, 5, 6);
	function meta_registryaddress() {
        MetaData.apply(this, ["registryaddress"]);
    }

    meta_registryaddress.prototype = _.extend(
        new MetaData(),
        {
            constructor: meta_registryaddress,
			superClass: MetaData.prototype,

			describeColumns: function (T, listType) {
				var nPos=1;
				var objCalcFieldConfig = {};
				var self = this;
				_.forEach(table.columns, function (c) {
					self.describeAColumn(T, c.name, '', null, -1, null);
				});

                switch (listType) {
                    case "default": {
                            this.describeAColumn(table, '!clientpassword', 'Password', null, 0, null);(T, "stop", "data fine", nPos++);
                            this.describeAColumn(T, "recipientagency", "Ente di provenienza (per anagrafe prestazioni)", nPos++);
                            this.describeAColumn(T, "officename", "Nome ufficio", nPos++);
                            this.describeAColumn(T, "active", "attivo", nPos++);
                            this.describeAColumn(T, "address", "n. operazione", nPos++);
                            this.describeAColumn(T, "flagforeign", "Estero", nPos++);
                            this.describeAColumn(T, "!idcity_geo_city_title", "Comune", nPos++);
                            this.describeAColumn(T, "location", "ubicazione", nPos++);
                            this.describeAColumn(T, "cap", "Codice avv. postale", nPos++);
                            this.describeAColumn(T, "!idnation_geo_nation_title", "Nazione", nPos++);
                            this.describeAColumn(T, "annotations", "Annotazioni", nPos++);
                            break;
                        }
                    case "anagrafica": {
                            this.describeAColumn(T, "address", "Indirizzo", nPos++);
                            this.describeAColumn(T, "!idcity_geo_city_title", "Comune", nPos++);
                            this.describeAColumn(T, "location", "Località", nPos++);
                            this.describeAColumn(T, "cap", "CAP", nPos++);
                            break;
                        }
                    case "seg": {
                            this.describeAColumn(T, "!idaddresskind_address_description", "Tipologia", nPos++);
                            this.describeAColumn(T, "start", "Data inizio", nPos++);
                            this.describeAColumn(T, "stop", "Data fine", nPos++);
                            this.describeAColumn(T, "active", "Attivo", nPos++);
                            this.describeAColumn(T, "address", "Indirizzo", nPos++);
                            this.describeAColumn(T, "flagforeign", "Estero", nPos++);
                            this.describeAColumn(T, "!idcity_geo_city_title", "Comune", nPos++);
                            this.describeAColumn(T, "location", "Località", nPos++);
                            this.describeAColumn(T, "cap", "CAP", nPos++);
                            this.describeAColumn(T, "!idnation_geo_nation_title", "Nazione", nPos++);
                            this.describeAColumn(T, "annotations", "Annotazioni", nPos++);
                            break;
                        }
                    case "user": {
                            this.describeAColumn(T, "address", "Indirizzo", nPos++);
                            this.describeAColumn(T, "!idcity_geo_city_title", "Comune", nPos++);
                            this.describeAColumn(T, "location", "Località", nPos++);
                            this.describeAColumn(T, "cap", "CAP", nPos++);
                            break;
                        }
                        //$DescribeAColumn$
                }

                if (ListingType == "anagraficasingle") {
                    this.describeAColumn(T, "start", "Data inizio", nPos++);
                    this.describeAColumn(T, "stop", "Data fine", nPos++);
                    this.describeAColumn(T, "!descrtipoindirizzo", "Tipo", "address.description", nPos++);
                    this.describeAColumn(T, "officename", "Nome ufficio", nPos++);
                    this.describeAColumn(T, "address", "Indirizzo", nPos++);
                    this.describeAColumn(T, "cap", "CAP", nPos++);
                    //in questo campo memorizzo il valore di geo_comune.denominazione
                    this.describeAColumn(T, "!comune", "", "geo_city.title", nPos++);
                    //mentre il campoi !localita viene utilizzato a video tra comune nazionale/estero
                    this.describeAColumn(T, "!localita", "Località", nPos++);
                    this.describeAColumn(T, "!nazione", "Stato estero", "geo_nation.title", nPos++);
                    this.describeAColumn(T, "active", "Attivo", nPos++);
                    ComputeRowsAs(T, ListingType);
                }

                if (ListingType == "unione") {
                    this.describeAColumn(T, "!kk", ".aaaa", nPos++);
                    this.describeAColumn(T, "idreg", "#", nPos++);
                    this.describeAColumn(T, "start", "Data inizio", nPos++);
                    this.describeAColumn(T, "stop", "Data fine", nPos++);
                    this.describeAColumn(T, "!descrtipoindirizzo", "Tipo", "address.description", nPos++);
                    this.describeAColumn(T, "officename", "Nome ufficio", nPos++);
                    this.describeAColumn(T, "address", "Indirizzo", nPos++);
                    this.describeAColumn(T, "cap", "CAP", nPos++);
                    //in questo campo memorizzo il valore di geo_comune.denominazione
                    this.describeAColumn(T, "!comune", "Comune", "geo_city.title", nPos++);
                    //mentre il campoi !localita viene utilizzato a video tra comune nazionale/estero
                    this.describeAColumn(T, "!nazione", "Stato estero", "geo_nation.title", nPos++);
                    this.describeAColumn(T, "location", "Località", nPos++);
                    this.describeAColumn(T, "active", "Attivo", nPos++);
                    this.describeAColumn(T, "lt", "Data ultima mod.", nPos++);
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
						table.columns["idregistryaddress"].caption = "#";
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
               var def = Deferred("getNewRow-meta_registryaddress");

				//$getNewRowInside$

				dt.autoIncrement('idregistryaddress', { selector:["idreg"], minimum: 99990001 });

				// metto i default
				return this.superClass.getNewRow(parentRow, dt, editType)
					.then(function (dtRow) {
						//$getNewRowDefault$
						return def.resolve(dtRow);
					});
			},


			/**
			 *
			 * @param {DataTable} table
			 */
			setDefaults: function(table) {
			     if(table.columns["active"]){
                    table.defaults({"active":"S"});
                 }
                 if(table.columns["flagforeign"]){
                     table.defaults({"flagforeign":"N"});
                 }
                 if(table.columns["start"]){
                     table.defaults({"start": new Date(this.security.sys('esercizio',1,1))});
                 }

				if(table.columns["cu"]){
					table.defaults({"cu":this.security.sys('user')});
				}
				if(table.columns["ct"]){
					table.defaults({"ct":new Date()});
				}
				if(table.columns["lu"]){
					//table.defaults({"lu":this.security.sys('user')});
					table.defaults({"lu":"-"});//for test purposes
				}
				if(table.columns["lt"]){
					table.defaults({"lt":new Date()});
				}

			},


			//$isValidFunction$
			checkData: function(d){
				if (d < firstJan1900){
					return "Non è possibile immettere una data precedente all'1/1/1900";
				}
				if (d > _6_6_2079) {
					return  "Non è possibile immettere una data successiva al 6/6/2079";
				}
				return null;
			},

			isValid: function(r) {
				let that=this;
				let res = this.superClass.isValid(r);
				return res.then(res=>{
					if (res!==null) {
						return res;
					}
					let datainizio = r.current["start"];
					res=that.checkData(datainizio);
					if (res!==null) {
						errfield = "start";
						return that.superClass.createIsValidResult(res,"start","Data Inizio",r);
					}

					let  df = r.current["stop"];
					if (df) {
						res = this.checkData(df);
						if (res!==null) {
							errfield = "stop";
							return that.superClass.createIsValidResult(res,"start","Data Fine",r);
						}
						if (df<datainizio){
							return that.superClass.createIsValidResult("'Data fine validità' non può precedere 'Data inizio validità'",
								"stop","Data Fine",r);
						}
					}

					let idreg= r.current["idreg"];
					if (idreg===null || idreg===undefined || idreg<0) {
						return that.superClass.createIsValidResult( "Inserire il codice dell'anagrafica","idreg","Codice anagrafica",r);
					}

					if ((!r.current["address"]) || (r.current["address"].trim() === "")|| (r.current["address"].trim() === ".")) {
						return that.superClass.createIsValidResult( "Attenzione! Inserire l'indirizzo.","address","Indirizzo",r);
					}
					return null;
				});


			},

			//$getStaticFilter$

			getSorting: function (listType) {
				switch (listType) {
					case "user": {
						return "idregistryaddress asc ";
					}
					//$getSortingin$
				}
				return this.superClass.getSorting(listType);
			}

        });


		if (freeExports && freeModule) {
			if (moduleExports) { // Export for Node.js or RingoJS.
				(freeModule.exports = meta_registryaddress).meta_registry = meta_registryaddress;
			} else { // Export for Narwhal or Rhino -require.
				freeExports.meta_registryaddress = meta_registryaddress;
			}
		} else {
			// Export for a browser or Rhino.
			if (root.appMeta){
				appMeta.addMeta('registryaddress', new meta_registryaddress('registryaddress'));
			} else {
				root.meta_registryaddress = meta_registryaddress;
			}
		}

	}(  (typeof _ === 'undefined') ? require('lodash') : _,
		(typeof appMeta === 'undefined') ? require('../../components/metadata/MetaModel').metaModel : appMeta.metaModel,
		(typeof appMeta === 'undefined') ? require('../../components/metadata/MetaData').MetaData : appMeta.MetaData,
		(typeof appMeta === 'undefined') ? require('../../components/metadata/EventManager').Deferred : appMeta.Deferred,
	)
);
