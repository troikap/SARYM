'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallepedidoproductos', [
            {
                "idDetallePedidoProducto": 1,
                "idPedido": 1,
                "idMenuPromocion": null,
                "idProducto": 1,
                "cantidadPedidoProducto": 5,
                "fechaYHoraInicioPedidoProducto": currentDate,
                "fechaYHoraEntregaPedidoProducto": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idDetallePedidoProducto": 2,
                "idPedido": 1,
                "idMenuPromocion": 2,
                "idProducto": null,
                "cantidadPedidoProducto": 3,
                "fechaYHoraInicioPedidoProducto": currentDate,
                "fechaYHoraEntregaPedidoProducto": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idDetallePedidoProducto": 3,
                "idPedido": 2,
                "idMenuPromocion": 2,
                "idProducto": null,
                "cantidadPedidoProducto": 3,
                "fechaYHoraInicioPedidoProducto": currentDate,
                "fechaYHoraEntregaPedidoProducto": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idDetallePedidoProducto": 4,
                "idPedido": 3,
                "idMenuPromocion": null,
                "idProducto": 2,
                "cantidadPedidoProducto": 5,
                "fechaYHoraInicioPedidoProducto": currentDate,
                "fechaYHoraEntregaPedidoProducto": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallepedidoproductos', null, {})
    }
};