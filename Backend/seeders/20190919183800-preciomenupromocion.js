'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('preciomenupromocions', [
            { "idPrecioMenuPromocion": 1, "idMenuPromocion": 1, "idTipoMoneda": 1, "importePrecioMenuPromocion": 99.99, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 2, "idMenuPromocion": 28, "idTipoMoneda": 1, "importePrecioMenuPromocion": 130, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idPrecioMenuPromocion": 3, "idMenuPromocion": 29, "idTipoMoneda": 1, "importePrecioMenuPromocion": 180, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            // {"idPrecioMenuPromocion": 4, "idMenuPromocion": 30, "idTipoMoneda": 1, "importePrecioMenuPromocion": 200, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idPrecioMenuPromocion": 5, "idMenuPromocion": 31, "idTipoMoneda": 1, "importePrecioMenuPromocion": 150, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 6, "idMenuPromocion": 32, "idTipoMoneda": 1, "importePrecioMenuPromocion": 100, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 7, "idMenuPromocion": 33, "idTipoMoneda": 1, "importePrecioMenuPromocion": 200, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 8, "idMenuPromocion": 34, "idTipoMoneda": 1, "importePrecioMenuPromocion": 280, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('preciomenupromocions', null, {})
    }
};