"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "mediopagos", [{
                idMedioPago: 1,
                nombreMedioPago: "Efectivo",
                createdAt: currentDate,
                updatedAt: currentDate
            }], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("mediopagos", null, {});
    }
};