"use strict";
var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadoreservas", [{
                idEstadoReserva: 1,
                codEstadoReserva: "G1",
                nombreEstadoReserva: "Generada",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoReserva: 2,
                codEstadoReserva: "A1",
                nombreEstadoReserva: "Anulada",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoReserva: 3,
                codEstadoReserva: "C1",
                nombreEstadoReserva: "Confirmada",
                createdAt: currentDate,
                updatedAt: currentDate
            }, ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadoreservas", null, {});
    }
};