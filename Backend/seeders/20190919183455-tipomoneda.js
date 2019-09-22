'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tipomonedas', [{
            "idTipoMoneda": 1,
            "nombreTipoMoneda": "Peso Argentino",
            "simboloTipoMoneda": "$",
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tipomonedas', null, {})
    }
};