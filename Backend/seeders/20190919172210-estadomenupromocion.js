"use strict";
var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadomenupromocions", [{
                    idEstadoMenuPromocion: 1,
                    codEstadoMenuPromocion: "A1",
                    nombreEstadoMenuPromocion: "Activo",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }, {
                    idEstadoMenuPromocion: 2,
                    codEstadoMenuPromocion: "E1",
                    nombreEstadoMenuPromocion: "En Falta",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }, {
                    idEstadoMenuPromocion: 3,
                    codEstadoMenuPromocion: "I1",
                    nombreEstadoMenuPromocion: "Inactivo",
                    createdAt: currentDate,
                    updatedAt: currentDate
                }, {
                    idEstadoMenuPromocion: 4,
                    codEstadoMenuPromocion: "E1",
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