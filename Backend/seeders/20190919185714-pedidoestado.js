'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidoestados', [{
            "idPedidoEstado": 1,
            "idPedido": 1,
            "idEstadoPedido": 1,
            "descripcionPedidoEstado": "Bla bla... ",
            "fechaYHoraAltaPedidoEstado": currentDate,
            "fechaYHoraBajaPedidoEstado": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidoestados', null, {})
    }
};