"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "unidadmedidas", [{
                idUnidadMedida: 1,
                codUnidadMedida: "2A345",
                nombreUnidadMedida: "Grs",
                descripcionUnidadMedida: "Gramos",
                caracterUnidadMedida: "Grs",
                createdAt: currentDate,
                updatedAt: currentDate
            }], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("unidadmedidas", null, {});
    }
};