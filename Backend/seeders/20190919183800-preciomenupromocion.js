'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('preciomenupromocions', [
            { "idPrecioMenuPromocion": 1, "idMenuPromocion": 1, "idTipoMoneda": 1, "importePrecioMenuPromocion": 530, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 2, "idMenuPromocion": 28, "idTipoMoneda": 1, "importePrecioMenuPromocion": 250, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idPrecioMenuPromocion": 3, "idMenuPromocion": 29, "idTipoMoneda": 1, "importePrecioMenuPromocion": 180, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            // {"idPrecioMenuPromocion": 4, "idMenuPromocion": 30, "idTipoMoneda": 1, "importePrecioMenuPromocion": 200, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idPrecioMenuPromocion": 5, "idMenuPromocion": 31, "idTipoMoneda": 1, "importePrecioMenuPromocion": 150, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 6, "idMenuPromocion": 32, "idTipoMoneda": 1, "importePrecioMenuPromocion": 120, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 7, "idMenuPromocion": 33, "idTipoMoneda": 1, "importePrecioMenuPromocion": 250, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 8, "idMenuPromocion": 34, "idTipoMoneda": 1, "importePrecioMenuPromocion": 370, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idPrecioMenuPromocion": 35, "idMenuPromocion": 35, "idTipoMoneda": 1, "importePrecioMenuPromocion": 230, "fechaYHoraDesdePrecioMenuPromocion": currentDate, "fechaYHoraHastaPrecioMenuPromocion": null, "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('preciomenupromocions', null, {})
    }
};