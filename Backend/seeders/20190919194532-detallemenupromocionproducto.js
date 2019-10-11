'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallemenupromocionproductos', [
            {"idDetalleMenuPromocionProducto": 1, "idProducto": 1, "idMenuPromocion": 1, "cantidadProductoMenuPromocion": 4, "createdAt": currentDate, "updatedAt": currentDate},
            {"idDetalleMenuPromocionProducto": 2, "idProducto": 13, "idMenuPromocion": 32, "cantidadProductoMenuPromocion": 3, "createdAt": currentDate, "updatedAt": currentDate},
            {"idDetalleMenuPromocionProducto": 3, "idProducto": 10, "idMenuPromocion": 33, "cantidadProductoMenuPromocion": 2, "createdAt": currentDate, "updatedAt": currentDate},
            {"idDetalleMenuPromocionProducto": 4, "idProducto": 11, "idMenuPromocion": 34, "cantidadProductoMenuPromocion": 2, "createdAt": currentDate, "updatedAt": currentDate},
            {"idDetalleMenuPromocionProducto": 5, "idProducto": 15, "idMenuPromocion": 34, "cantidadProductoMenuPromocion": 2, "createdAt": currentDate, "updatedAt": currentDate},

    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallemenupromocionproductos', null, {})
    }
};