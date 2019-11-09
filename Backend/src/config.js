
// Vencimiento
// 60 segundo
// 60 minutos
// 24 horas
// 30 dias

//TOKEN 1 DIA:
process.env.CADUCIDAD_TOKEN = 1000 * 60 * 60 * 24;

//TOKEN PRUEBA 1 MINUTO
//process.env.CADUCIDAD_TOKEN = 1000 * 60;

// Semilla Token
process.env.SEED = process.env.SEED || "LucasPerez";


module.export = {
    port: process.env.PORT || 3000,
    // db
    SECRET_TOKEN: 'LucasTroikaPPerez'
}