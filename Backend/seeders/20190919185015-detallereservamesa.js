'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detallereservamesas', [
        {
            "idDetalleReservaMesa": 1, "idReserva": 1, "idMesa": 1, "createdAt": currentDate, "updatedAt": currentDate
        },
        {
            "idDetalleReservaMesa": 2, "idReserva": 1, "idMesa": 2, "createdAt": currentDate, "updatedAt": currentDate
        },
        {
            "idDetalleReservaMesa": 3, "idReserva": 1, "idMesa": 3, "createdAt": currentDate, "updatedAt": currentDate
        },
        {
            "idDetalleReservaMesa": 4, "idReserva": 2, "idMesa": 1, "createdAt": currentDate, "updatedAt": currentDate
        },
        {
            "idDetalleReservaMesa": 5, "idReserva": 2, "idMesa": 2, "createdAt": currentDate, "updatedAt": currentDate
        },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallereservamesas', null, {})
    }
};