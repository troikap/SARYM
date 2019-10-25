'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidoestados', [
            {
                "idPedidoEstado": 1,
                "idPedido": 1,
                "idEstadoPedido": 1,
                "descripcionPedidoEstado": "Bla bla... ",
                "fechaYHoraAltaPedidoEstado": currentDate,
                "fechaYHoraBajaPedidoEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedidoEstado": 2,
                "idPedido": 2,
                "idEstadoPedido": 2,
                "descripcionPedidoEstado": "Bla bla... ",
                "fechaYHoraAltaPedidoEstado": currentDate,
                "fechaYHoraBajaPedidoEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedidoEstado": 3,
                "idPedido": 3,
                "idEstadoPedido": 3,
                "descripcionPedidoEstado": "Bla bla... ",
                "fechaYHoraAltaPedidoEstado": currentDate,
                "fechaYHoraBajaPedidoEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidoestados', null, {})
    }
};