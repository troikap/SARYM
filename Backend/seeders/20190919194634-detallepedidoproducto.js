'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallepedidoproductos', [{
            "idDetallePedidoProducto": 1,
            "idPedido": 1,
            "idMenuPromocion": 1,
            "idProducto": 1,
            "cantidadPedidoProducto": 3,
            "fechaYHoraInicioPedidoProducto": currentDate,
            "fechaYHoraEntregaPedidoProducto": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallepedidoproductos', null, {})
    }
};