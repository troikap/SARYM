"use strict";
var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadomesas", [{
                idEstadoMesa: 1,
                codEstadoMesa: "O1",
                nombreEstadoMesa: "Ocupada",
                colorEstadoMesa: "Rojo",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoMesa: 2,
                codEstadoMesa: "D1",
                nombreEstadoMesa: "Disponible",
                colorEstadoMesa: "Verde",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoMesa: 3,
                codEstadoMesa: "R1",
                nombreEstadoMesa: "Reservada",
                colorEstadoMesa: "Amarillo",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoMesa: 4,
                codEstadoMesa: "PP1",
                nombreEstadoMesa: "Pendiente de Pago",
                colorEstadoMesa: "Azul",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoMesa: 5,
                codEstadoMesa: "I1",
                nombreEstadoMesa: "Inhabilitada",
                colorEstadoMesa: "----",
                createdAt: currentDate,
                updatedAt: currentDate
            }, ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadomesas", null, {});
    }
};