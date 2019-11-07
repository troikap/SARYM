'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tipomenupromocions', [
            { idTipoMenuPromocion: 1, nombreTipoMenuPromocion: 'Menu', "createdAt": currentDate, "updatedAt": currentDate },
            { idTipoMenuPromocion: 2, nombreTipoMenuPromocion: 'Promocion', "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tipomenupromocions', null, {})
    }
};