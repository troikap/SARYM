'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallepedidoproductos', [
            { 
                "idDetallePedidoProducto": 1, "idPedido": 1, "idMenuPromocion": null, "idProducto": 10, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 2, "idPedido": 1, "idMenuPromocion": 28, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 3, "idPedido": 2, "idMenuPromocion": 29, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 4, "idPedido": 2, "idMenuPromocion": null, "idProducto": 11, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 5, "idPedido": 3, "idMenuPromocion": null, "idProducto": 12, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 6, "idPedido": 3, "idMenuPromocion": 30, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 7, "idPedido": 4, "idMenuPromocion": 31, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 8, "idPedido": 4, "idMenuPromocion": null, "idProducto": 13, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 9, "idPedido": 5, "idMenuPromocion": null, "idProducto": 14, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 10, "idPedido": 5, "idMenuPromocion": 32, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 11, "idPedido": 6, "idMenuPromocion": 33, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 12, "idPedido": 6, "idMenuPromocion": null, "idProducto": 15, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 13, "idPedido": 7, "idMenuPromocion": 31, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 14, "idPedido": 7, "idMenuPromocion": null, "idProducto": 13, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 15, "idPedido": 8, "idMenuPromocion": null, "idProducto": 14, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 16, "idPedido": 8, "idMenuPromocion": 32, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 17, "idPedido": 9, "idMenuPromocion": 33, "idProducto": null, "cantidadPedidoProducto": 3, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idDetallePedidoProducto": 18, "idPedido": 9, "idMenuPromocion": null, "idProducto": 15, "cantidadPedidoProducto": 5, "fechaYHoraInicioPedidoProducto": currentDate, "fechaYHoraEntregaPedidoProducto": null, "createdAt": currentDate, "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallepedidoproductos', null, {})
    }
};