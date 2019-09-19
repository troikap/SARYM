'use strict';
var currentDate = new Date();

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