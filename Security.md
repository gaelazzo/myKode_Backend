# Security

[Security](src/jsSecurity.md) è una classe che si occupa di raccogliere e fornire le condizioni 
di sicurezza sulle operazioni possibili sulle tabelle.
Per ogni combinazione tabella/operazione è possibile avere più condizioni, che complessivamente determinano
se l'utente ha o meno il diritto di effettuare una operazione.

La classe [SecurityProvider](src/jsSecurity.md#securitysecurityprovider) legge le righe della tabella
customgroupoperation del database e decodifica il suo contenuto nella classe Security.
In particolare, i campi testuali allow e deny sono convertiti in una [sqlFun](jsDataQuery.md), ossia una
funzione che data una riga calcola un valore, che sarà true o false a seconda che l'operazione richiesta sia
ammissibile o meno.

La tabella customgroupoperation ha 3 campi, che descrivono una condizione di sicurezza:
- defaultIsDeny: può valore S o N, se S il default è "vieta tutto", altrimenti è "consenti tutto"
- allowcondition: condizione di l'abilitazione
- denycondition: condizione di divieto
I tre campi di una riga si combinano in questo modo:
- se defaultIsDeny è "S" e c'è solo allowcondition, saranno abilitate solo le righe individuate dalla allowcondition. 
 Se è specificata anche la denycondition, le righe individuate dalla denycondition saranno comunque vietate
- se defaultIsDeny è "N" e c'è solo la denycondition, saranno vietate solo le righe individuate dalla denycondition. 
 Se è specificata anche la allowcondition, saranno anche consentite le righe individuate dalla allowcondition

In sintesi, se defaultIsDeny = 'S' il significato della terna è  allow and not deny, altrimenti è not deny or allow.

Tutte le righe che si riferiscono alla stessa combinazione tabella/operazione sono messe in un or logico, per cui basta 
 che una di esse autorizzi l'operazione ai fini della valutazione complessiva.

Ogni condizione denycondition e allowcondition è un'espressione pseudo-sql in cui è possibile utilizzare:
- nomi di campi dell'oggetto dell'autorizzazione
- costanti numeriche o stringhe 
- operatori sql come like, between, in, not in
- "list" per creare una lista con quello che segue tra parentesi tonde
- operatori aritmetici e di confronto 
- operatori booleani and or not
- operatori bitwise ~ & |

Il risultato dell'espressione deve essere un valore booleano.

Per dettagli sulle potenzialità delle sqlFun leggere [jsDataQuery]()


