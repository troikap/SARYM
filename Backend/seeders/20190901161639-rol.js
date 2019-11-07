"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "rols", [{
                    idRol: 1,
                    nombreRol: "Administrador",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idRol: 2,
                    nombreRol: "Encargado",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idRol: 3,
                    nombreRol: "Mozo",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idRol: 4,
                    nombreRol: "Cocinero",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idRol: 5,
                    nombreRol: "Cliente",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }
            ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("rols", null, {});
    }
};