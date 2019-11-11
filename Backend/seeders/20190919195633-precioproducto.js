'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('precioproductos', [
            { "idProducto": 1, "idTipoMoneda": 1, "importePrecioProducto": 250, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 2, "idTipoMoneda": 1, "importePrecioProducto": 250, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 3, "idTipoMoneda": 1, "importePrecioProducto": 260, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 4, "idTipoMoneda": 1, "importePrecioProducto": 250, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idProducto": 5, "idTipoMoneda": 1, "importePrecioProducto": 280, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 6, "idTipoMoneda": 1, "importePrecioProducto": 80, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 7, "idTipoMoneda": 1, "importePrecioProducto": 80, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 8, "idTipoMoneda": 1, "importePrecioProducto": 80, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 9, "idTipoMoneda": 1, "importePrecioProducto": 80, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 10, "idTipoMoneda": 1, "importePrecioProducto": 35, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 11, "idTipoMoneda": 1, "importePrecioProducto": 180, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 12, "idTipoMoneda": 1, "importePrecioProducto": 40, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 13, "idTipoMoneda": 1, "importePrecioProducto": 50, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 14, "idTipoMoneda": 1, "importePrecioProducto": 80, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 15, "idTipoMoneda": 1, "importePrecioProducto": 150, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 16, "idTipoMoneda": 1, "importePrecioProducto": 180, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 17, "idTipoMoneda": 1, "importePrecioProducto": 80, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 18, "idTipoMoneda": 1, "importePrecioProducto": 140, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 19, "idTipoMoneda": 1, "importePrecioProducto": 480, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 20, "idTipoMoneda": 1, "importePrecioProducto": 130, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 21, "idTipoMoneda": 1, "importePrecioProducto": 120, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 22, "idTipoMoneda": 1, "importePrecioProducto": 120, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 23, "idTipoMoneda": 1, "importePrecioProducto": 120, "fechaYHoraDesdePrecioProducto": currentDate, "fechaYHoraHastaPrecioProducto": null, "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('precioproductos', null, {})
    }
};