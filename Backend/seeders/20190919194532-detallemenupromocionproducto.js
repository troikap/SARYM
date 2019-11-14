'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallemenupromocionproductos', [
            { "idDetalleMenuPromocionProducto": 1, "idProducto": 19, "idMenuPromocion": 1, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 2, "idProducto": 1, "idMenuPromocion": 1, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 3, "idProducto": 13, "idMenuPromocion": 32, "cantidadProductoMenuPromocion": 3, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 4, "idProducto": 10, "idMenuPromocion": 33, "cantidadProductoMenuPromocion": 8, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 5, "idProducto": 11, "idMenuPromocion": 34, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 6, "idProducto": 15, "idMenuPromocion": 34, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 7, "idProducto": 6, "idMenuPromocion": 34, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 8, "idProducto": 18, "idMenuPromocion": 28, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 9, "idProducto": 15, "idMenuPromocion": 28, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 10, "idProducto": 16, "idMenuPromocion": 35, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },
            { "idDetalleMenuPromocionProducto": 11, "idProducto": 17, "idMenuPromocion": 35, "cantidadProductoMenuPromocion": 1, "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallemenupromocionproductos', null, {})
    }
};