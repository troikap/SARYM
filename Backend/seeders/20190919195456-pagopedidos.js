'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pagopedidos', [{
            "idPagoPedido": 1,
            "idPago": 1,
            "idPedido": 1,
            "importePagoPedido": 199.99,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pagopedidos', null, {})
    }
};