'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reservas', [{
            "idReserva": 1,
            "idUsuario": 1,
            "codReserva": "RESERVA-1",
            "cantPersonas": 4,
            "fechaReserva": currentDate,
            "horaEntradaReserva": currentDate,
            "horaSalidaReserva": currentDate,
            "tokenReserva": "token1234567890",
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reservas', null, {})
    }
};