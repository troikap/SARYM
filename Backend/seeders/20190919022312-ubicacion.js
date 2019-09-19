"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "ubicacions", [{
                idUbicacion: 1,
                nroUbicacion: 3,
                descripcionUbicacion: "Ubicacion Random",
                createdAt: currentDate,
                updatedAt: currentDate
            }], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ubicacions", null, {});
    }
};