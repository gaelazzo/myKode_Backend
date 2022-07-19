# jsApplication

jsApplication è il prototipo generale dell'applicazione al suo livello più alto.

Esaminiamo alcuni metodi che possono essere usati per la personalizzazione.

## createConnectionPool

E' una classe il cui unico metodo è getDataAccess() che restituisce un'istanza di jsConnectionPool, una semplice classe che crea un DataAccess invocando un
metodo di [jsDbList](jsDbList.md) e la aggiunge ad un pool, che nella fattispecie è un semplice elenco di connessioni.

Quando una connessione (jsPooledConnection) è rilasciata (con il metodo release), questa si rende disponibile ad essere
 restituita da chiamate successive a getDataAccess().

Se si volesse implementare una logica più sofisticata, quale ad esempio tenere sempre aperte un numero prefissato di 
 connessioni o rilasciare definitivamente le connessioni non in uso dopo un certo periodo di tempo, si può creare una
 classe derivata da JsConnectionPool e far si che createConnectionPool ne restituisca una istanza


## getNoTokenFolders

Restituisce un oggetto che ha tante proprietà quante sono le cartelle a cui consentire l'accesso
 ai client anonimi, non ancora autenticati, è usato per aggiungere la il middleware di autenticazione a tutte
 le route che lo necessitano


## error

Questa è una route a cui sono redirezionati tutti gli errori. Eventuali funzionalità di logging vanno inserite qui.


## releaseConnection

Questa route aggiunge alla richiesta corrente gli eventi di close e finish in modo che questi possano, quando richiamati,
 rilasciare la connessione del connectionPool invocandone il metodo release


## createEnvironment

Crea un jsEnvironment a partire da un'istanza di Identity, una classe dichiarata in [jsToken](src/jsToken.md).
E' compito del processo di autenticazione creare un'Identity valida, un Token e comunicarlo al client in modo che 
 esso possa effettuare le successive richieste nello stato di autenticato.

Un environment contiene le variabili di sessione di un determinato utente ed è messo in cache quando è 
 creata la sessione,  per velocizzare le sue interazioni successive.


## createPostData

Crea una classe [PostData](PostData.md) (o sua derivata), da usare per salvare un DataSet. 
La classe creata va poi inizializzata con il metodo init. 

Questo metodo di default crea una classe BusinessPostData, però è possibile modificarlo, ad esempio per non gestire 
la logica di business e salvare di dati senza alcun controllo, perché magari si sono già controllati i dati altrove.

createPostData imposta anche la classe di default per l'optimistic locking, come 

```js
    new OptimisticLocking(['lt', 'lu'], ['ct', 'cu', 'lt', 'lu'])
```
ossia i campi usati per l'optimistic locking saranno rispettivamente:

- per la modifica: lt, lu
- per la creazione: ct, cu, lt, lu

I campi stamp dell' environment sono ct e lt, e quando l'environment li calcola

Il metodo prepareForPosting della classe OptimisticLocking è usata per calcolare i campi di locking ogni volta che
 si deve salvare un DataRow sul database.
Il metodo prepareForPosting a sua volta invoca il metodo field(fieldName) della classe [Environment](Environment.md) 
 per ogni campo indicato in configurazione rispettivamente in inserimento o modifica a seconda dello stato della riga
 da salvare.

Di default la classe Environment usa ct e lt come campi stamp, mentre i valori dei campi cu e lu sono impostati nel
 metodo createEnvironment di jsApplication, uguali al valore identity.name. E' possibile personalizzare tale valore.



## getDataSet

Crea un determinato DataSet identificato da tableName ed editType. Di default legge un file json
 dalla cartella ./client/dataset e lo deserializza in un jsDataSet


## getAnonymousEnvironment

Crea un ambiente anonimo avendo in input una Identity, di default  crea semplicemente un nuovo 
 environment tramite il costruttore


## getOrCreateContext

Crea un contesto in base al token, anonimo se il token non c'è o è un token anonimo.

Il contesto ([Context](Context.md)) è sempre creato come anonimo, poi in fase di autenticazione si provvede a 
ricalcolare l'environment, e a marcare il contesto come non più anonimo. Per fare questo è possibile 
richiamare il metodo _doLogin del modulo
 routes/_authUtils



