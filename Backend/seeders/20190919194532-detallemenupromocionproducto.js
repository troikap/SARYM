'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallemenupromocionproductos', [{
            "idDetalleMenuPromocionProducto": 1,
            "idProducto": 1,
            "idMenuPromocion": 1,
            "cantidadProductoMenuPromocion": 4,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallemenupromocionproductos', null, {})
    }
};