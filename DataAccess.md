# DataAccess

Il DataAccess è la classe usata per leggere dal DataBase singole tabelle o singole espressioni, mentre usiamo 
 [GetData](GetData.md) per leggere interi DataSet.
Sebbene sia virtualmente possibile farlo, non usiamo direttamente il DataAccess per salvare dati sul db ma usiamo 
 la classe  [PostData](PostData.md) a tale scopo, che si occupa anche della sicurezza, dei campi ad autoincremento etc.

## Persistenza
Distinguiamo, al momento della creazione di una connessione, due modalità di gestione: Persistenti e non persistenti, in
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
```
  conn.open() //aumenta solo un livello di annidamento interno, non ha alcun effetto fisico

  /// operazioni su conn
  
  conn.close() //diminuisce solo un livello di annidamento interno, non ha alcun effetto fisico

```


Se persisting è false:
```
  conn.open() //apre la connessione ove non sia già apera, o aumenta un livello di annidamento se è già aperta

  /// operazioni su conn
  
  conn.close() //diminuisce il livello di annidamento e chiude la connessione se questo è sceso a zero

```


Come si può vedere, il codice di un generico metodo che accede al db può essere scritto in modo identico a prescindere
 da come si intenda gestire la persistenza della connessione.


## Funzioni che leggono una singola espressione

Per i parametri esatti, consultare il jsDoc
- readSingleValue



