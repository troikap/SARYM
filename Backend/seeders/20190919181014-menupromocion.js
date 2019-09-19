'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('menupromocions', [{
            "idMenuPromocion": 1,
            "idTipoMenuPromocion": 1,
            "codMenuPromocion": "PAPAS-123",
            "nombreMenuPromocion": "Papas fritas",
            "descripcionMenuPromocion": "Papas fritas de 180gr para compartir entre 2",
            "pathImagenMenuPromocion": "http://algunaurl.com",
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('menupromocions', null, {})
    }
};