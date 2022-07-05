# jsSecurity

jsSecurity è una classe che tiene traccia delle regole di sicurezza sulle operazioni.
Ogni regola si applica ad una coppia tabella/operazione dove operazione è una di I/U/D/S/P 
Ove le iniziali stanno per Insert/Update/Delete/Select/Print.
Ogni regola contiene delle espressioni di tipo jsDataQuery che saranno applicate in fase di salvataggio dei dati