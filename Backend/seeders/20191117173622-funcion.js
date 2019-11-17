"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert( "funcions", 
            [
                {
                    idFuncion: 1,
                    nombreFuncion: "Consulta Usuario",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idFuncion: 2,
                    nombreFuncion: "ABM Usuario",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idFuncion: 3,
                    nombreFuncion: "Consulta Unidad Medida",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idFuncion: 4,
                    nombreFuncion: "ABM Unidad Medida",
                    createdAt: currentDate,
                    updatedAt: currentDate
                },
                {
                    idFuncion: 5,
                    nombreFuncion: "Consulta Caja",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }
            ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("funcions", null, {});
    }
};