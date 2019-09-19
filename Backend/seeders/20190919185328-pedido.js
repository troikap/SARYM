'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidos', [{
            "idPedido": 1,
            "idComensal": 1,
            "idEstadia": 1,
            "codPedido": "PEDIDO-1234",
            "fechaYHoraInicioPedido": currentDate,
            "fechaYHoraFinPedido": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidos', null, {})
    }
};