# Select

Select è una classe che serve a comporre in modo molto leggibile delle query da usare.

E' implementata nel modulo jsMultiSelect.


La classe DataAccess espone un metodo, multiSelect, che consente di specificare una lista di Select che devono
 essere inviate al database in un unico batch, risparmiando cosi i tempi di roundtrip.

Il costruttore di Select prevede la specifica di un elenco di campi da leggere, o in alternativa "*" ad indicare
 tutti i campi della tabella o vista.

Vi sono poi una serie di metodi ognuno dei quali restituisce l'oggetto stesso, in modo da consentire 
 una scrittura concatenata e fluente:

### from({string} tableName)
Specifica da quale tabella leggere i dati

### top({string} N)
Specifica di leggere solo le prime N righe

### where({sqlFun} filter)
Specifica un filtro per la lettura dei dati

### intoTable({string} alias)
Specifica un nome per la tabella in cui inserire i dati, ossia per il risultato della lettura, che può differire
 dalla tabella da cui si stanno fisicamente leggendo i dati dal database.

### orderBy({string} sorting)
specifica una clausola di ordinamento per la lettura. Può essere utile nell'uso congiunto con top().


### multiCompare({MultiCompare} comp)
Specifica un oggetto di tipo MultiCompare invece di un filtro SqlFun generico come fa la where.
Un oggetto MultiCompare è un filtro che semplicemente confronta un elenco di campi con dei valori, ossia non è
 un filtro generico come un SqlFun, che può contenere qualsiasi combinazione di espressioni logiche sui campi.

Questo consente l'esecuzione della query con delle ottimizzazioni molto spinte qualora in uno stesso batch
 siano richiesti più lotti di righe di una certa tabella. Tutto ciò avviene in modo trasparente all'utilizzatore.


## MultiCompare
La classe MultiCompare è una semplice struttura contenente una serie di nomi di campi ed una serie di valori da
 confrontare con tali campi.

