"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("ubicacions", [
            {
                idUbicacion: 1,
                nroUbicacion: 1,
                descripcionUbicacion: "Primera",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idUbicacion: 2,
                nroUbicacion: 2,
                descripcionUbicacion: "Segunda",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idUbicacion: 3,
                nroUbicacion: 3,
                descripcionUbicacion: "Tercera",
                createdAt: currentDate,
                updatedAt: currentDate
            },
        ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("ubicacions", null, {});
    }
};