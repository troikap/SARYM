"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "unidadmedidas", [
                {idUnidadMedida: 1, codUnidadMedida: "CM3", nombreUnidadMedida: "Cm3", descripcionUnidadMedida: "Centímetros cúbicos", caracterUnidadMedida: "Grs", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 2, codUnidadMedida: "GRS", nombreUnidadMedida: "Grs", descripcionUnidadMedida: "Gramos", caracterUnidadMedida: "Grs", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 3, codUnidadMedida: "ON", nombreUnidadMedida: "Onz", descripcionUnidadMedida: "Onza", caracterUnidadMedida: "Grs", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 4, codUnidadMedida: "UN", nombreUnidadMedida: "Uni", descripcionUnidadMedida: "Unidad", caracterUnidadMedida: "Grs", createdAt: currentDate, updatedAt: currentDate}            }], {}
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("unidadmedidas", null, {});
    }
};