"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tipomovimientocajas", [
            {
                idTipoMovimientoCaja: 1,
                nombreTipoMovimientoCaja: "Ingreso",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idTipoMovimientoCaja: 2,
                nombreTipoMovimientoCaja: "Egreso",
                createdAt: currentDate,
                updatedAt: currentDate
            },
        ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tipomovimientocajas", null, {});
    }
};