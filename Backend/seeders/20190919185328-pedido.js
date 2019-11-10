'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidos', [{
                "idPedido": 1,
                "idComensal": 1,
                "idEstadia": 1,
                "idReserva": 1,
                "codPedido": "PEDIDO_1-C1-R1",
                "fechaYHoraInicioPedido": currentDate,
                "fechaYHoraFinPedido": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedido": 2,
                "idComensal": 1,
                "idEstadia": 1,
                "idReserva": 1,
                "codPedido": "PEDIDO_2-C1-R1",
                "fechaYHoraInicioPedido": currentDate,
                "fechaYHoraFinPedido": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedido": 3,
                "idComensal": 1,
                "idEstadia": 1,
                "idReserva": 1,
                "codPedido": "PEDIDO_3-C1-R1",
                "fechaYHoraInicioPedido": currentDate,
                "fechaYHoraFinPedido": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // ,
            // { 
            //     "idPedido": 4, "idComensal": 2, "idEstadia": null, "idReserva": 2, "codPedido": "PEDIDO_4-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedido": 5, "idComensal": 3, "idEstadia": null, "idReserva": 2, "codPedido": "PEDIDO_5-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedido": 6, "idComensal": 4, "idEstadia": null, "idReserva": 2, "codPedido": "PEDIDO_6-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedido": 7, "idComensal": 5, "idEstadia": null, "idReserva": 3, "codPedido": "PEDIDO_7-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedido": 8, "idComensal": 6, "idEstadia": null, "idReserva": 3, "codPedido": "PEDIDO_8-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedido": 9, "idComensal": 6, "idEstadia": null, "idReserva": 3, "codPedido": "PEDIDO_9-C2-R2", "fechaYHoraInicioPedido": currentDate, "fechaYHoraFinPedido": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidos', null, {})
    }
};