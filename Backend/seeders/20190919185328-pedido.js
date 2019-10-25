'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidos', [
            {
                "idPedido": 1,
                "idComensal": 1,
                "idEstadia": 1,
                "idReserva": null,
                "codPedido": "PEDIDO-1234",
                "fechaYHoraInicioPedido": currentDate,
                "fechaYHoraFinPedido": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedido": 2,
                "idComensal": 1,
                "idEstadia": null,
                "idReserva": 1,
                "codPedido": "PEDIDO-12345",
                "fechaYHoraInicioPedido": currentDate,
                "fechaYHoraFinPedido": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedido": 3,
                "idComensal": 1,
                "idEstadia": 1,
                "idReserva": null,
                "codPedido": "PEDIDO-123456",
                "fechaYHoraInicioPedido": currentDate,
                "fechaYHoraFinPedido": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidos', null, {})
    }
};