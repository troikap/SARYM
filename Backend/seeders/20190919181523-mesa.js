'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mesas', [{
            "idMesa": 1,
            "idSector": 1,
            "idUbicacion": 1,
            "nroMesa": 22,
            "capacidadMesa": 5,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mesas', null, {})
    }
};