'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reservas', [
            {
                "idReserva": 1,
                "idUsuario": 1,
                "codReserva": "RESERVA-1",
                "cantPersonas": 4,
                "fechaReserva": '1980-06-17',
                "horaEntradaReserva": "15:30",
                "horaSalidaReserva": "17:30",
                "tokenReserva": "token1234567890",
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idReserva": 2,
                "idUsuario": 1,
                "codReserva": "RESERVA-2",
                "cantPersonas": 6,
                "fechaReserva": '1980-06-17',
                "horaEntradaReserva": "12:30",
                "horaSalidaReserva": "13:30",
                "tokenReserva": "token1234567890",
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reservas', null, {})
    }
};