"use strict";
var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadopedidos", [{
                idEstadoPedido: 1,
                codEstadoPedido: "R1",
                nombreEstadoPedido: "Reservado",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoPedido: 2,
                codEstadoPedido: "A1",
                nombreEstadoPedido: "Anulado",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoPedido: 3,
                codEstadoPedido: "EP1",
                nombreEstadoPedido: "En Preparación",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoPedido: 4,
                codEstadoPedido: "AE1",
                nombreEstadoPedido: "A Entregar",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoPedido: 5,
                codEstadoPedido: "PP1",
                nombreEstadoPedido: "Pendiente de Pago",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoPedido: 6,
                codEstadoPedido: "F1",
                nombreEstadoPedido: "Finalizado",
                createdAt: currentDate,
                updatedAt: currentDate
            }, ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadopedidos", null, {});
    }
};