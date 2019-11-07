'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pagopedidos', [
            {
                "idPagoPedido": 1,
                "idPago": 1,
                "idPedido": 1,
                "importePagoPedido": 199.99,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPagoPedido": 2,
                "idPago": 1,
                "idPedido": 1,
                "importePagoPedido": 199.99,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pagopedidos', null, {})
    }
};