'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('comensals', [{
            "idComensal": 1,
            "idUsuario": 1,
            "idReserva": 1,
            "idEstadia": 1,
            "aliasComensal": "Pepito Honguito",
            "edadComensal": 45,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('comensals', null, {})
    }
};