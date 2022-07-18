# GetData

È la classe che si occupa di leggere interi DataSet in un modo ottimizzato.

Non ha un costruttore ma un certo numero di metodi statici, ognuno dei quali ha 
 l'effetto di riempire un [DataSet](jsDataSet.md) con le righe presenti nel DataBase
 in base a determinati criteri.

Tutti i filtri usati in questa classe, così come quelli dell'intero framework,
 sono di tipo [SqlFun](jsDataQuery.md)

I metodi di GetData presuppongono un DataSet in cui siano presenti vari DataTable, relazionati
 con delle DataRelation in modo tale che sia possibile navigare tra i dati logicamente correlati.

E' quindi indispensabile aggiungere al DataSet sia le DataTable che le DataRelation, e da queste
 informazioni dipenderà quali righe i metodi leggeranno dal DataBase, unitamente ai filtri
 eventualmente specificati.

La lettura dei DataSet avviene a spirale, a partire dalle tabelle relazionate con la tabella 
 indicata, e poi nei passi successivi sono lette le altre tabelle con dei filtri che dipendono
 dalle righe lette nei passi precedenti.

Il filtri dipendono dalla DataRelation presenti nel DataSet, ed è per questo che è essenziale
 che siano inserite correttamente e con bene in mente questo obiettivo.

Questo meccanismo, basato su queste convenzioni, consente di non dover scrivere codice per
 leggere set di dati collegati a web form o funzionalità varie, ma richiamare semplicemente 
 una delle funzioni adibite alla lettura o aggiornamento dei DataSet della classe GetData.


Vediamo i diversi metodi che espone, per i dettagli si veda il 
[jsdoc](https://temposrl.github.io/myKode_Backend/getData.html) o la  [conversione in markdown](src/jsGetData.md)

# Calcolo di filtri

## getFilterByExample
Calcola un filtro confrontando tutti i campi di un oggetto. 
Se è fornito il parametro useLike, i campi stringa sono confrontati con dei like, altrimenti
 sono confrontati per uguaglianza. 



# Lettura di una Tabella

A volte può essere utile leggere dati in una singola tabella, ad esempio come step 
 preparativo di una chiamata a doGet, che a sua volta legge tutto un DataSet a partire
 dalle righe contenute in una tabella specificata.

## getByFilter
Legge delle righe dal DataBase in un DataTable specificato ed in base ad un 
 criterio ([SqlFun](jsDataQuery.md)) specificato

## getByKey
Come getByFilter, ma ottiene il filtro in base ai valori di un oggetto, considerando 
 i campi chiave della tabella. Ovviamente l'oggetto dovrà avere dei campi 
 con gli stessi nomi della chiave della tabella.


# Lettura di un DataSet

## fillDataSetByKey
A partire da un certo filtro riempie prima la tabella specificata del DataSet,
 e poi a partire dalle righe trovate, legge a spirale tutte le righe delle
 tabelle nel DataSet relazionate con le righe già lette, sino ad esaurimento 
 delle relazioni con ulteriori tabelle.

Questo e altri metodi funzionano solo a patto che nel DataSet i DataTable
 siano relazionati con delle DataRelation in modo corretto.

## fillDataSetByFilter
Come fillDataSetByKey, ma richiede un filtro già formato e non un oggetto da cui 
 ricavarlo.

## doGet
Dato un DataSet, ed eventualmente una riga da cui partire, legge le tabelle del 
 DataSet preoccupandosi di

- leggere preventivamente le tabelle marcate come "cached" 
- non modificare le righe di tabelle delle entità e subentità già presenti 
 nel DataSet
- se richiesto (parametro onlyPeripherals), leggere solamente le tabelle secondarie
  e non le subentità
- Se è specificata una riga (parametro oneRow), è letta quella riga e le sue figlie (solamente)
- Se non è specificato oneRow, si assume che nella tabella specificata ci siano 
 già delle righe da cui partire per la lettura a spirale
- Tutte le tabelle non cached, sono azzerate prima di iniziare la lettura dei dati, 
 a meno che non si specifichi onlyPeriperals, nel qual caso solo le tabelle
 secondarie sono inizialmente azzerate.

doGet dovrebbe essere usata la prima volta con onlyPeripherals=false, 
 ma le volte successive con onlyPeripherals=true se si intende solo aggiornare
 le tabelle satellite, altrimenti saranno rilette anche la tabella principale 
 e le subentità, che sono eventualmente state oggetto di modifiche nell'interazione
 dell'utente con la maschera

Si ricorda che per subentità si intendono tabelle child relazionate, con proprio campi chiave,
 con tutta la chiave primaria della tabella parent dove la tabella padre è la tabella principale o un'altra subentità 
(la relazione di subentità è transitiva).



