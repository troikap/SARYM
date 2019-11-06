"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadocajas", [{
                    idEstadoCaja: 1,
                    codEstadoCaja: "C1",
                    nombreEstadoCaja: "Creada",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idEstadoCaja: 2,
                    codEstadoCaja: "A1",
                    nombreEstadoCaja: "Abierta",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idEstadoCaja: 3,
                    codEstadoCaja: "C2",
                    nombreEstadoCaja: "Cerrada",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idEstadoCaja: 4,
                    codEstadoCaja: "E1",
                    nombreEstadoCaja: "Eliminada",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }
            ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadocajas", null, {});
    }
};