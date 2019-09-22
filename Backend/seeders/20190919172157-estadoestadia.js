"use strict";
var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadoestadia", [{
                    idEstadoEstadia: 1,
                    codEstadoEstadia: "G1",
                    nombreEstadoEstadia: "Generada",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idEstadoEstadia: 2,
                    codEstadoEstadia: "F1",
                    nombreEstadoEstadia: "Finalizada",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idEstadoEstadia: 3,
                    codEstadoEstadia: "A1",
                    nombreEstadoEstadia: "Anulada",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }
            ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadoestadia", null, {});
    }
};