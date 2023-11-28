[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/Context.md)

# Context
Context è una classe, esposta dal modulo jsDbList,che contiene tutte le informazioni raccolte in fase di analisi
della richiesta, e che possono essere usate durante l'elaborazione della risposta.

Le informazioni sono:

- dbCode (string) codice del database utilizzato 
- dbDescriptor ([DbDescriptor](DbDescriptor.md)) descrittore del database
- createPostData (function): metodo che crea una classe PostData con l'ambiente necessario
- formatter ([SqlFormatter](src/jsSqlServerFormatter.md)) SqlFormatter associato al db
- sqlConn ([Connection](src/jsSqlServerDriver.md) connessione fisica al database
- environment ([Environment](Environment.md)) Environment dell'utente collegato
- dataAccess ([DataAccess](DataAccess.md)) connessione generica al database
- externalUser (string) è uno shortcut per la variabile d'ambiente usr["externalUser"]
- security  ([Security](Security.md))
- getDataInvoke ([GetDataInvoke](client/components/metadata/GetDataInvoke.md)): classe con cui si possono leggere dati dal db con
 un'interfaccia omogenea, sia che si stia eseguendo le istruzioni lato server che lato client
- getDataSet ([GetDataSet](client/components/metadata/GetDataSet.md)): classe che espone dei metodi per creare un dataset (da usare solo lato server)
- getMeta ([GetMeta](client/components/metadata/GetMeta.md)): classe tramite la quale si può istanziare un metadato
 relativo ad una certa tabella

Nelle routes è possibile accedere al Context tramite:

```js

let ctx = req.app.locals.context;

```

ove req è la client request. Questa informazione è associata da jsApplication ad ogni richiesta, prima di 
 inviarla alle routes successive.
La deallocazione è effettuata automaticamente tramite un'apposita route aggiunta da jsApplication,
pertanto non è necessario preoccuparsene.

