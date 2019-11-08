'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidos', [
            { 
                "idPedido": 1, "idComensal": 1, "idEstadia": null, "idReserva": 1, "codPedido": "PEDIDO_1-C1-R1", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idPedido": 2, "idComensal": 1, "idEstadia": null, "idReserva": 1, "codPedido": "PEDIDO_2-C1-R1", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idPedido": 3, "idComensal": 1, "idEstadia": null, "idReserva": 1, "codPedido": "PEDIDO_3-C1-R1", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idPedido": 4, "idComensal": 2, "idEstadia": null, "idReserva": 2, "codPedido": "PEDIDO_4-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idPedido": 5, "idComensal": 2, "idEstadia": null, "idReserva": 2, "codPedido": "PEDIDO_5-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idPedido": 6, "idComensal": 2, "idEstadia": null, "idReserva": 2, "codPedido": "PEDIDO_6-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidos', null, {})
    }
};