'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallereservamesas', [{
            "idDetalleReservaMesa": 1,
            "idReserva": 1,
            "idMesa": 1,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallereservamesas', null, {})
    }
};