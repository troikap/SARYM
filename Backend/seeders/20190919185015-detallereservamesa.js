'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

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
        {
            "idDetalleReservaMesa": 6, "idReserva": 3, "idMesa": 4, "createdAt": currentDate, "updatedAt": currentDate
        },
        {
            "idDetalleReservaMesa": 7, "idReserva": 3, "idMesa": 5, "createdAt": currentDate, "updatedAt": currentDate
        },
        {
            "idDetalleReservaMesa": 8, "idReserva": 3, "idMesa": 6, "createdAt": currentDate, "updatedAt": currentDate
        },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detallereservamesas', null, {})
    }
};