# MetaData

La classe MetaData  è usata per centralizzare le informazioni relative alle tabelle del database, in particolare
 ogni classe derivata, che deve chiamarsi meta_[tablename] contiene le informazioni sulla tabella tablename.

È importante il nome della classe e del file per come questo viene poi caricato da disco quando richiesto, in modo lazy.

Le istanze delle classi derivanti da MetaData in questo documento sono chiamate metadati.

I metodi della classe MetaData sono perlopiù dei segnaposto dove inserire determinate informazioni su una tabella o 
 vista, che poi saranno eventualmente utilizzati dal framework e dal resto del proprio applicativo alla bisogna.

Sono pertanto un meccanismo per far si che esista un posto unico e noto a tutti gli sviluppatori e manutentori per
 descrivere i vari aspetti di ogni tabella, in modo che sia unico e accessibile ovunque.


## Uso trasversale 
La classe MetaData è gestita in modo tale da poter essere usata sia sul client che sul server.
Nel codice un metadato comune a client e server è quindi impossibile accedere a proprietà della classe AppMeta del 
 client.


### Retrieving di un metadato
Il metodo di istanziazione di un oggetto di tipo MetaData cambia a seconda di dove ci si trovi:

- nel codice di un metadato il metodo corretto per istanziare un metadato è invocare this.getMeta. Questo in modo 
  identico sia lato client che lato server, cosi da poter usare e manutenere un unico file per metadato.
- al di fuori del codice di un metadato:
    - nel client: invocare il metodo getMeta dell'oggetto appMeta,
      che è l'applicativo del frontend myKode_Frontend
    - lato server il metodo corretto per instanziare un metadato è invocare la funzione getMeta del Context

### Accesso ai dati
I metodi che intendono accedere ai dati lo fanno mediante la proprietà getData della classe, che a seconda del contesto
di esecuzione sarà una classe che si interfaccia ai web service del server (se eseguita lato client) oppure una
classe con identica interfaccia che invoca i metodi della classe [GetData](jsGetData.md).


La classe MetaData espone quindi una serie di metodi che descrivono specifiche proprietà delle tabelle:

#### {object} isValid({DataRow}r)
Stabilisce se una riga è valida o meno. Si intende contenere delle verifiche semplici, da eseguirsi sul client
 senza uso di web services, altrimenti potrebbe essere meglio implementato come logica di Business.

Restituisce un Deferred a un oggetto così strutturato:

        {  
           {string} warningMsg,  //messaggio di avviso se trattasi di messaggio ignorabile
           {string} errMsg,      //messaggio di errore se trattasi di messaggio non ignorabile
           {string} errField,    //campo che ha generato il problema 
           {object} row          //riga che ha generato il problema
        }

lato client, ove vi sia un messaggio ignorabile, di solito è mostrato per conferma. I messaggi non ignorabili invece
 determinano implicitamente una condizione di non validità.
Lato server è possibile inserire un'invocazione del metodo isValid ma di default non è implementato per non creare 
 una potenziale sovrapposizione con i controlli lato client. 

### {string[]} primaryKey
Restituisce l'elenco dei campi chiave della tabella o vista. Per le viste risulta a volte indispensabile poiché il
 DbDescriptor non è in grado in autonomia di ricavare la chiave di una vista. 

A ogni modo quando si disegna il DataSet è bene impostare la chiave primaria di ogni tabella/vista inserita in esso.


### describeAColumn()
Imposta le informazioni su una colonna, quali se ammette null, la caption etc.


### insertFilter
Deve restituire un filtro da usare quando una riga di questa tabella è ricercata nell'ambito di una riga 
 (di un'altra tabella) è in inserimento. Ossia come riferimento esterno di una riga in stato di inserimento.

Ad esempio, è possibile che solo le righe marcate come "attive" di una tabella siano attribuibili ad altre tabelle
 quando si creano in esse nuove righe.

### searchFilter
Deve restituire un filtro da usare quando una riga di questa tabella è ricercata nell'ambito di una riga
(di un'altra tabella) è in fase di ricerca.

Ossia come riferimento esterno in fase di ricerca sulle altre tabelle.




### {Promise<DataTable>} describeColumns({DataTable} table, {string} listType)
Descrive le proprietà di uno o più elenchi, ossia modi di visualizzazione di una tabella o vista.
Le proprietà sono descritte attraverso le proprietà delle colonne del DataTable.

### {jsDataQuery} getStaticFilter({string} listType)
Restituisce un filtro da applicare sempre quando c'è da effettuare la lettura di un elenco "listType" sulla tabella
 o vista relative al metadato.

È usata nei servizi esposti al client che restituiscono degli elenchi, ed eventualmente anche nel client.

### {string} getName
Restituisce il nome applicativo della tabella o vista, da usare ad esempio nei messaggi.

### setDefaults({DataTable} t)
Imposta i valori di default per le colonne quando sono create nuove righe della tabella.

Tali valori sono utilizzati quando si richiama il metodo newRow del [DataTable](jsDataSet.md)



