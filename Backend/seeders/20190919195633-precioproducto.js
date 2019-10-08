'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('precioproductos', [
            {"idProducto": 1, "idTipoMoneda": 1, "importePrecioProducto": 99.98, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
            {"idProducto": 10, "idTipoMoneda": 1, "importePrecioProducto": 110, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
            {"idProducto": 11, "idTipoMoneda": 1, "importePrecioProducto": 90, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
            {"idProducto": 12, "idTipoMoneda": 1, "importePrecioProducto": 20, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
            {"idProducto": 13, "idTipoMoneda": 1, "importePrecioProducto": 40, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
            {"idProducto": 14, "idTipoMoneda": 1, "importePrecioProducto": 40, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
            {"idProducto": 15, "idTipoMoneda": 1, "importePrecioProducto": 70, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate},
        
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('precioproductos', null, {})
    }
};