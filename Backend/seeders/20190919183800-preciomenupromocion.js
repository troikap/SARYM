'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('preciomenupromocions', [{
            "idPrecioMenuPromocion": 1,
            "idMenuPromocion": 1,
            "idTipoMoneda": 1,
            "importePrecioMenuPromocion": 99.99,
            "fechaYHoraDesdePrecioMenuPromocion": currentDate,
            "fechaYHoraHastaPrecioMenuPromocion": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('preciomenupromocions', null, {})
    }
};