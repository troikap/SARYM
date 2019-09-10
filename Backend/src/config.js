
// Vencimiento
// 60 segundo
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// Semilla Token
process.env.SEED = process.env.SEED || "LucasPerez";


module.export = {
    port: process.env.PORT || 3000,
    // db
    SECRET_TOKEN: 'LucasTroikaPPerez'
}