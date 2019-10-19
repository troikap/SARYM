'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mesas', [
            {
                "idMesa": 1,
                "idSector": 1,
                "nroUbicacion": 1,
                "nroMesa": 1,
                "capacidadMesa": 4,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idMesa": 2,
                "idSector": 2,
                "nroUbicacion": 2,
                "nroMesa": 2,
                "capacidadMesa": 6,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idMesa": 3,
                "idSector": 3,
                "nroUbicacion": 3,
                "nroMesa": 3,
                "capacidadMesa": 8,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mesas', null, {})
    }
};