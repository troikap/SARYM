'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pagos', [
            {
                "idPago": 1,
                "idMedioPago": 1,
                "idComensal": 1,
                "codPago": "PAGO-1234",
                "importeTotalAPagar": 199.99,
                "fechaYHoraAltaPago": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPago": 2,
                "idMedioPago": 1,
                "idComensal": 2,
                "codPago": "PAGO-12345",
                "importeTotalAPagar": 199.99,
                "fechaYHoraAltaPago": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            ,}
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pagos', null, {})
    }
};