'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('precioproductos', [{
            "idProducto": 1,
            "idTipoMoneda": 1,
            "importePrecioProducto": 99.98,
            "fechaYHoraDesdePrecioProducto": currentDate,
            "fechaYHoraHastaPrecioProducto": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('precioproductos', null, {})
    }
};