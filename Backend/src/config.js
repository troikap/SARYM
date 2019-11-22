var moment = require('moment-timezone');
moment().tz('America/Argentine').format();
console.log("MOMENTO", moment())

// Vencimiento
// 1000 milisegundos = 1 segundo
// 60 segundo
// 60 minutos
// 24 horas
// 30 dias


let currentDate = moment().format('YYYY-MM-DD')
console.log("currentDate ", currentDate)

let currentTime = moment().format('hh:mm:ss')
console.log("currentTime ", currentTime)


//TOKEN 1 DIA:
process.env.CADUCIDAD_TOKEN = 1000 * 60 * 60 * 24;
process.env.CADUCIDAD_TOKENRECUPERACION = 1000 * 60;
process.env.TZ = 'UTC+2';

//TOKEN PRUEBA 1 MINUTO
//process.env.CADUCIDAD_TOKEN = 1000 * 60;

// Semilla Token
process.env.SEED = process.env.SEED || "LucasPerez";


module.export = {
    port: process.env.PORT || 3000,
    // db
    SECRET_TOKEN: 'LucasTroikaPPerez'
}