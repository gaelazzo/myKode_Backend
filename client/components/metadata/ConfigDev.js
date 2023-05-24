/**
 * @module ConfigDev
 * @description
 * Contains global variables used in test environment
 */
(function () {

    var configDev = {

        //userName: "vis_psuma",
        //password: "vis_psuma",
        userName: "seg_fcaprilli",
		password: "seg_fcaprilli",
        email : 'info@tempo.it',
        codiceFiscale : 'cf',
        partitaIva :  '08586690961',
        cognome :  'xyzCognome',
        nome: 'xyzNome',
        dataNascita:  '02/10/1980',

        // dati per login e utente per reset passoword
        userNameResetPassword: 'riccardo2',
        passwordResetPassword: 'riccardo2',
        emailResetPassword: 'riccardo@treagles.it',


        userName2: "riccardotest",
        password2:"riccardotest",
        email2 : 'info@treagles.it',
        codiceFiscale2 : 'cf',
        partitaIva2 :  '08586690961',
        cognome2 :  'riccardotestProietti',
        nome2: 'riccardotestNome',
        dataNascita2:  '02/10/1980',

        datacontabile : new Date()

    };

    appMeta.configDev = configDev;
}());


