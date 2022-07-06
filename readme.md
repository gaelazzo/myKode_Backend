# myKode Backend

myKode Backend è un insieme di classi node.js, corredate da un backend minimale 
progettate per minimizzare i tempi di scrittura di un'applicazione node.

Le classi del framework sono progettate per poter accedere a vari database relazionali in modo intercambiabile.
La struttura scelta per gestire in memoria i set di dati è [jsDataSet](jsDataSet.md), una classe simile ai DataSet di
.NET, in cui i DataRow sono molto simili a plain object, però conservano lo stato originale della riga, 
ossia lo stato successivo all'ultimo acceptChanges (metodo che rende le modifiche permanenti) o revertChanges (metodo 
che annulla le modifiche alla riga).

La classe [jsDataQuery](jsDataQuery.md) è usata per rappresentare filtri ed espressioni e le sue istanze possono essere 
indifferentemente applicate a tabelle del database o a qualsiasi collezione di oggetti javascript, 
in particolar modo ai DataRow dei DataTable di un DataSet.

Sono previste classi per la gestione di diverse applicazioni e diversi database.




## jsApplication

[jsApplication](jsApplication.md) è il prototipo generale dell'applicazione al suo livello più alto.

È possibile integrarne o modificarne i vari metodi per personalizzarli in base alle proprie esigenze.

### Autenticazione
L'autenticazione è gestita mediante token [jwt](https://jwt.io/introduction). A ogni utente è associata una sessione
identificata da un codice che il client deve inviare in ogni richiesta, nel token jws criptato.

La jsApplication si occupa di creare un contesto([Context](Context.md)) per ogni richiesta
e distruggerlo quando la richiesta è soddisfatta, di creare l'environment dell'utente connesso con informazioni quali,
ad esempio, il suo ruolo e le sue autorizzazioni.

Si occupa anche di creare le routes e di garantirne l'accesso solo ai client che forniscono un token adeguato nell'header
della richiesta, a meno che la route non sia stata appositamente configurata con la funzione getNoTokenFolders.
getNoTokenFolders è infatti un metodo di jsApplication definito semplicemente come:

    getNoTokenFolders: function(){
        return {
            "auth":true
        };
    }

che consente di accedere (solo) alla cartella auth senza bisogno di un token valido.
Premesso che anche le richieste non autenticate devono fornire un token fittizio, "anonimo", il cui valore si configura
nel file config/tokenConfig nella proprietà AnonymousToken, definiamo token "valido" un token jwt regolare, non quello
anonimo.
La cartella auth configurata in questo modo sarà accessibile quindi anche ai token "anonimi", ed infatti è usata solo
per le routes che servono ad autenticarsi.

Volendo dare accesso ad altre cartelle alle richieste prive di un token valido sarà sufficiente aggiungere

Anche le richieste non autenticate devono fornire un token fittizio, "anonimo", basterà aggiungere alla struttura 
restituita altri nomi di cartella, esempio:

    getNoTokenFolders: function(){
        return {
            "auth":true,
            "public": true
         };
    }

Per quanto detto nell'header http di ogni richiesta del client dovrà esserci in ogni caso una riga del tipo

    Authorization: Bearer <token>

Dove <token> è o il token "anonimo" oppure un token rilasciato dall'applicazione all'atto dell'autenticazione. 

jsApplication provvede a decodificare il token di ogni richiesta e impostare i dati ricavati nella proprietà 
**req.headers.authorization** della request req. In questo modo tutte le route possono accedervi.

Il token è verificato e decodificato nel campo request.**auth**, (volendo è configurabile in 
tokenConfig.options.requestProperty). Dunque in generale in request.auth ci sarà un oggetto di tipo [Token](src/jsToken.js)
Un semplice esempio di route di autenticazione si può trovare nel module [login](routes/auth/login.md)

Una jsApplication al suo avvio crea una ExpressApplication e un Express.Router.
Per ogni sotto cartella presente nella cartella routes/, legge i file al suo interno e ad ognuno di essi
associa un router che risponde alla richiesta /folder/nomeFile, a patto che il file in questione 
    sia un node module il cui nome file non inizi con underscore, ed esponga un router come unica proprietà 
    esportata del node module.
In questo modo per aggiungere una nuova route basta esporla in un node module all'interno di una sotto cartella di routes,
indipendentemente dal tipo di servizio get/post e dai suoi parametri.

Si occupa anche di autenticare l'utente e fornirgli un contesto anonimo ove non sia ancora autenticato.
Per ogni utente collegato stabilisce una sessione identificata con un sessionID

Ogni database è identificato da un dbCode, e jsApplication è associata a un database e ne crea un pool di connessioni
per renderne più efficiente l'accesso. Quando arriva una richiesta infatti, è presa una connessione dal pool ove ve ne
sia una disponibile.


## Accesso ai dati

Per leggere/scrivere dati sul database, invocare stored procedure o qualsiasi altra operazione, ci sono tre principali
classi: [DataAccess](DataAccess.md), [GetData](GetData.md) e [PostData](PostData.md)

- [DataAccess](DataAccess.md) è usata per operazioni di basso livello, come inviare semplici comandi di lettura 
 o scrittura
- [GetData](GetData.md) è usata per leggere interi DataSet o parti di esso
- [PostData](PostData.md) è usata per scrivere interi DataSet

## Logica di Business

[jsBusinessLogic](jsBusinessLogic.md) è la classe che si occupa dell'invocazione delle regole di business. 
Queste regole sono in pratica controlli SQL che vengono applicati ad ogni singola riga che viene scritta sul database.
Il testo dei controlli è memorizzato in alcune tabelle di configurazione. 
Le regole sono "compilate" da un tool esterno in stored procedures del database, e invocate al momento del
salvataggio dei dati. 
Ove le tabelle di configurazione non contengano righe, non sarà applicato alcun controllo.

## Sicurezza

La classe [jsSecurity](jsSecurity.md)

