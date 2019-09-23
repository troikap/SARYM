"use strict";
var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "estadoproductos", [{
                idEstadoProducto: 1,
                codEstadoProducto: "A1",
                nombreEstadoProducto: "Activo",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoProducto: 2,
                codEstadoProducto: "EF1",
                nombreEstadoProducto: "En Falta",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoProducto: 3,
                codEstadoProducto: "I1",
                nombreEstadoProducto: "Inactivo",
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idEstadoProducto: 4,
                codEstadoProducto: "E1",
                nombreEstadoProducto: "Eliminado",
                createdAt: currentDate,
                updatedAt: currentDate
            }], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("estadoproductos", null, {});
    }
};