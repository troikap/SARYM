"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadomenupromocions", [{
                    idEstadoMenuPromocion: 1,
                    codEstadoMenuPromocion: "AC",
                    nombreEstadoMenuPromocion: "Activo",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }, {
                    idEstadoMenuPromocion: 2,
                    codEstadoMenuPromocion: "EF",
                    nombreEstadoMenuPromocion: "En Falta",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }, {
                    idEstadoMenuPromocion: 3,
                    codEstadoMenuPromocion: "IN",
                    nombreEstadoMenuPromocion: "Inactivo",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }, {
                    idEstadoMenuPromocion: 4,
                    codEstadoMenuPromocion: "El",
                    nombreEstadoMenuPromocion: "Eliminado",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }

            ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadomenupromocions", null, {});
    }
};