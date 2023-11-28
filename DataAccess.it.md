[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/DataAccess.md)

# DataAccess

Il DataAccess è la classe usata per leggere dal DataBase singole tabelle o singole espressioni, mentre usiamo 
 [GetData](jsGetData.md) per leggere interi DataSet.
Sebbene sia virtualmente possibile farlo, non usiamo direttamente il DataAccess per salvare dati sul db ma usiamo 
 la classe  [PostData](PostData.md) a tale scopo, che si occupa anche della sicurezza, dei campi ad autoincremento etc.

## Persistenza
Distinguiamo, al momento della creazione di una connessione, due modalità di gestione: persistenti e non persistenti, in
 base al parametro (bool) persisting in input al costruttore.

Se la connessione è persistente sarà aperta con la prima open() e poi rimarrà aperta sin quando la connessione non sarà
 rilasciata.

Viceversa sarà aperta e chiusa ogni volta che ci sarà una open() o una close(), ma ovviamente se si cercherà di eseguire
 un'operazione sul db con la connessione chiusa ci sarà un errore, inoltre i tempi della open() sono molto lunghi se
 comparati ai tempi del processore.

Se la connessione è impostata come persistente, successive open() sono ammesse e incrementano solo un livello di annidamento
 ma non hanno alcun effetto sulla connessione fisica. Similmente le close().
Pertanto si può decidere a livello di applicazione se usare connessioni persistenti o meno, e nel codice di ogni metodo
 che accede direttamente al db racchiudere le istruzioni di accesso tra una open() ed una close(), e questi metodi
 funzioneranno qualsiasi sia l'impostazione stabilita globalmente:

Se persisting è true:


```js
  conn.open() //aumenta solo un livello di annidamento interno, non ha alcun effetto fisico

  /// operazioni sul db tramite conn
  
  conn.close() //diminuisce solo un livello di annidamento interno, non ha alcun effetto fisico

```


Se persisting è false:
```
  conn.open() //apre la connessione ove non sia già aperta, o aumenta un livello di annidamento se è già aperta

  /// operazioni sul db tramite conn
  
  conn.close() //diminuisce il livello di annidamento e chiude la connessione se questo è sceso a zero

```


Come si può vedere, il codice di un generico metodo che accede al db può essere scritto in modo identico a prescindere
 da come si intenda gestire la persistenza della connessione.



Segue un elenco sintetico dei metodi esposti dalla classe, per l'interfaccia completa, consultare il
<a href="https://temposrl.github.io/myKode_Backend/module-DataAccess.html" target ='_blank'>jsDoc</a>

## Aspetti comuni a tutte le funzioni 

Tutti i metodi che accedono al db restituiscono degli oggetti Deferred jQuery.
Ogni espressione o filtro in input ai metodi è di tipo sqlFun, ossia un'espressione generata con i metodi
di [jsDataQuery](jsDataQuery.md)

## Funzioni che leggono una singola espressione


- readSingleValue: legge un singolo valore da una tabella, prendendo il primo valore in base al filtro dato
- readLastValue : come  readSingleValue ma prende l'ultimo valore restituito dalla query
- runCmd: legge un singolo valore, ma accetta un comando Sql come input (non è portabile)


## Funzioni che leggono una tabella
Le funzioni che restituiscono tabelle hanno a volte l'opzione booleana raw, che stabilisce se il risultato debba essere
un array di oggetti in cui ogni oggetto rappresenta una riga letta dal database (se raw è false), oppure una coppia
{meta: string[], rows:object[]} ove meta è l'array dei nomi dei campi letti, e rows è un array in cui ogni 
elemento è a sua volta un array con i valori della riga. 
In questo caso il valore rows[i][j] rappresenta il campo meta[j] della riga i. 
Ove non si specifichi nulla, si assumerà raw = false e quindi si avrà in uscita un semplice array di oggetti.

- select: effettua una SELECT su una tabella   
- pagedSelect: effettua una SELECT su un range di righe di una tabella, ossia accetta il numero di riga iniziale
 e il numero di righe da leggere, ma richiede di specificare un ordinamento da applicare
- runSql: esegue un comando sql e restituisce un DataTable
- selectRows: effettua una SELECT e restituisce le righe a una attraverso la funzione notify del Deferred
- selectIntoTable: effettua una SELECT ed inserisce le righe lette in un DataTable esistente, senza cancellare
 quelle preesistenti

## Funzioni che leggono una o più tabelle 

#### queryPackets
legge una o più tabelle restituendo le righe tutte insieme o a blocchi. Questa funzione è usata  dalla classe GetData 
per accedere al db, si consiglia l'uso della classe GetData.
L'output è diverso a seconda che si desideri il risultato tutto insieme o a pacchetti, e che sia raw o meno.

Se raw e a pacchetti è inviata, tramite la notify del Deferred, una sequenza di 

    {string[] meta} {object[][] rows} ... {rows} ... {meta} {rows} ... {rows} ...

dove {meta} è l'array dell'elenco dei nomi delle colonne, e vi sono tanti {meta} quante le tabelle lette,
{rows} è l'array degli array di valori delle righe come descritto prima
l'ultimo pacchetto è un oggetto {resolve:1}

Se raw e non a pacchetti è inviata, tramite la notify, una sequenza di:

    {string [] meta, object [][] rows} {meta,rows} ... 

Se non raw e a pacchetti, è inviata una sequenza di:
  
    {object[] rows, int set},.. {object[] rows, int set} ...

dove set indica il numero di tabella letta (parte da 0), però potrebbero esserci più pacchetti relativi alla stessa
 tabella, visto che si sta specificando la dimensione massima del pacchetto

Se non raw e non a pacchetti, è inviata una sequenza di:

    {object[] rows, int set},.. {object[] rows, int set}...

con tanti blocchi dati per quante sono le tabelle lette.


Se non raw e non a pacchetti, è inviata una sequenza di:

    {object[] rows, int set},.. {object[] rows, int set}...

#### multiSelect

ha in input una lista di [Select](Select.md) e le esegue in un unico batch, restituendo il risultato in modo diverso a seconda 
che raw sia true o false e se l'output desiderato è o meno a pacchetti:

se raw :

    {string[] meta, string tableName, object [][]rows}, ...

dove tableName è l'alias attribuito alla tabella nella chiamata al metodo

se non raw:

    {object[] rows, int set, string tablename},.. {object[] rows, int set, string tablename} 


Esempio d'uso (presente negli unit test)

    const multiSel = [];
    multiSel.push(new Select('*').from('customer').multiCompare(new MultiCompare(['cat20'], [2])).intoTable('A'));
    multiSel.push(new Select('*').from('seller').multiCompare(new MultiCompare(['idseller'], [6])).intoTable('B'));
    multiSel.push(new Select('*').from('customerkind'));
    const mSel = DAC.multiSelect({selectList: multiSel, packetSize: 5});

    mSel.progress(function (r) {
      tableCount += 1;
      expect(r.rows).toEqual(jasmine.any(Array));
      expect(r.meta).toEqual(jasmine.any(Array));
      expect(r.tableName).toEqual(jasmine.any(String));
      tables[r.tableName] = DA.objectify(r.meta, r.rows);
    });

#### mergeMultiSelect
E' simile a multiSelect, ma invece di restituire una serie di notifiche per ogni tabella o pacchetto letto, effettua
 il merge di tutti i dati letti nel DataSet che ha input



### Funzioni che eseguono singoli comandi sql
Di solito è preferibile usare le funzioni della classe PostData per effettuare operazioni di scrittura sul db.
Le funzioni del DataAccess sono da usarsi per casi estremamente particolari, ad esempio se per qualche motivo non si
desidera effettuare una transazione, che nella classe PostData è automatica. 

- doSingleDelete: effettua la cancellazione di una riga da una tabella in base al filtro passato.
- doSingleInsert: effettua l'inserimento di una riga in una tabella
- doSingleUpdate: effettua l'update di una riga di una tabella



### Funzioni che invocano stored procedure

- callSP: invoca una sp passando un elenco ordinato di parametri e restituisce una o più tabelle
- callSPWithNamedParams: invoca una sp utilizzando i parametri per nome, ove il db lo consenta


Vedere [jsDataAccessSpec](test/spec/jsDataAccessSpec.js) per vari esempi d'uso della classe