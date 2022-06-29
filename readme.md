# myKode Backend

myKode Backend è un insieme di classi node.js, corredate da un backend minimale
minimale progettate per minimizzare i tempi di scrittura di un'applicazione
node.

Le classi sono progettate per poter accedere a vari database relazionali in modo intercambiabile.
La struttura scelta per gestire in memoria i set di dati è jsDataSet, una classe simile ai DataSet di
.Net, in cui i DataRow sono molto simili a plain object, però conservano lo stato originale della riga, 
ossia lo stato successivo all'ultimo acceptChanges o revertChanges
La classe jsDataQuery è usata per rappresentare filtri ed espressioni e le sue istanze possono essere 
indifferentemente applicate a tabelle del database o a qualsiasi collezione di oggetti javascript, 
in particolar modo ai DataRow dei DataTable di un DataSet.

Sono previste classi per la gestione di diverse applicazioni e diversi database.

## jsApplication

jsApplication è il prototipo generale dell'applicazione al suo livello più alto.


Si occupa di gestire le sessioni utente, di creare un contesto([Context](Context.md)) per ogni richiesta
e distruggerlo quando la richiesta è sodisfatta, di creare l'environment dell'utente connesso,
ad esempio il suo ruolo, le sue autorizzazioni.

Si occupa di creare le routes e di garantirne l'accesso solo se si fornisce un token adeguato nell'header
della richiesta, a meno che la route non è stata appositamente configurata con la funzione getNoTokenFolders.
Tutte le richieste devono comunque essere corredate con un token, che sia quello configurato come "anonimo" nella
configurazione o quello fornito dall'applicazione all'atto dell'autenticazione.

Una jsApplication al suo avvio crea una ExpressApplication ed un Express.Router.
Per ogni sottocartella presente nella cartella routes, legge i file al suo interno e per ognuno di essi
è associa un router un handler che risponde alla richiesta /folder/nomeFile, a patto che il file in questione sia un node module
il cui nome file non inizi con underscore, ed esponga un router come unica proprietà esportata del node module.
In questo modo per aggiungere una nuova route basta esporla in un node module all'interno di una sottocartella di routes,
indipendentemente dal tipo di servizio get/post e dai suoi parametri.


Si occupa anche di autenticare l'utente e fornirgli un contesto anonimo ove non sia ancora autenticato.
Per ogni utente collegato stabilisce una sessione identificata con un sessionID

Ogni database è identificato da un dbCode, e jsApplication è associato ad un database e ne crea un pool di connessioni
per renderne più efficiente l'accesso. Quando arriva una richiesta infatti, è presa una connessione dal pool ove ve ne
sia una disponibile.
I dettagli in [jsApplication](jsApplication.md).

## jsBusinessLogic

jsBusinessLogic è una classe che si occupa dell'invocazione delle regole di business.
Queste sono calcolate a partire da un elenco di righe modificate e da alcune tabelle di configurazione. 
Le regole sono "compilate" da un tool esterno in stored procedures del database, e invocate al momento del
salvataggio dei dati.
I dettagli in [jsBusinessLogic](jsBusinessLogic.md).
