'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pedidoestados', [{
                "idPedidoEstado": 1,
                "idPedido": 1,
                "idEstadoPedido": 6,
                "descripcionPedidoEstado": "Normal",
                "fechaYHoraAltaPedidoEstado": currentDate,
                "fechaYHoraBajaPedidoEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedidoEstado": 2,
                "idPedido": 2,
                "idEstadoPedido": 6,
                "descripcionPedidoEstado": "Normal",
                "fechaYHoraAltaPedidoEstado": currentDate,
                "fechaYHoraBajaPedidoEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idPedidoEstado": 3,
                "idPedido": 3,
                "idEstadoPedido": 6,
                "descripcionPedidoEstado": "Normal",
                "fechaYHoraAltaPedidoEstado": currentDate,
                "fechaYHoraBajaPedidoEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // ,
            // { 
            //     "idPedidoEstado": 4, "idPedido": 4, "idEstadoPedido": 4, "descripcionPedidoEstado": "Normal", "fechaYHoraAltaPedidoEstado": currentDate, "fechaYHoraBajaPedidoEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedidoEstado": 5, "idPedido": 5, "idEstadoPedido": 1, "descripcionPedidoEstado": "Normal", "fechaYHoraAltaPedidoEstado": currentDate, "fechaYHoraBajaPedidoEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedidoEstado": 6, "idPedido": 6, "idEstadoPedido": 1, "descripcionPedidoEstado": "Normal", "fechaYHoraAltaPedidoEstado": currentDate, "fechaYHoraBajaPedidoEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedidoEstado": 7, "idPedido": 7, "idEstadoPedido": 1, "descripcionPedidoEstado": "Normal", "fechaYHoraAltaPedidoEstado": currentDate, "fechaYHoraBajaPedidoEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedidoEstado": 8, "idPedido": 8, "idEstadoPedido": 1, "descripcionPedidoEstado": "Normal", "fechaYHoraAltaPedidoEstado": currentDate, "fechaYHoraBajaPedidoEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idPedidoEstado": 9, "idPedido": 9, "idEstadoPedido": 1, "descripcionPedidoEstado": "Normal", "fechaYHoraAltaPedidoEstado": currentDate, "fechaYHoraBajaPedidoEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            // },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pedidoestados', null, {})
    }
};