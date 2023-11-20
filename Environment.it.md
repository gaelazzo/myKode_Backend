[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/TempoSrl/myKode_Backend/tree/main/Environment.md)


# Environment

Environment è una classe atta a contenere le variabili di ambiente di un utente.

Queste sono accessibili tramite le funzioni sys(fieldName,value) e usr(fieldName,value), ove se manca il secondo 
 parametro si intende che si sta leggendo il valore, altrimenti lo si sta impostando (jQuery-style)

C'è anche il metodo field(fieldName), invocato nel processo di salvataggio dalla classe OptimisticLocking,
 e questo di default, per i campi "stamp" (lt,ct) restituisce la data corrente, altrimenti restituisce
 il valore impostato per quel campo (lu,cu), impostato di solito nell'applicazione, quando è creato l'environment.

La classe Environment è calcolata quando l'utente si autentica, mediante il metodo calcUserEnvironment. Tuttavia
 prima di invocare calcUserEnvironment, è necessario valorizzare i campi sys("idcustomuser) ed eventualmente
 sys("idflowchart") e sys("ndetail"). Questo metodo in sostanza invoca la stored procedure compute_environment
 e copia i valori restituiti (due tabelle) da essa nei dizionari sys e usr. 

I valori restituiti da calcUserEnvironment sono righe di tre colonne: mustquote (S/N), variablename, value.
mustquote è S se è necessario quotare con apici il valore in value, ma vale solo per la tabella usr.

E' da notare che nel calcolo dell'Environment, alle stringhe restituite dalla sp, ove queste contengano delle 
 sottostringhe di tipo <%sys[fieldName]%> o <%usr[fieldName]%> queste sono sostituite con i valori di sys(fieldName)
 o usr(fieldName) disponibili al momento, ricorsivamente sin quando non vi sono più sottostringhe del genere.



