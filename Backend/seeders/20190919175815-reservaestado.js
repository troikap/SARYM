'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reservaestados', [
        {
            "idReservaEstado": 1,
            "idReserva": 1,
            "idEstadoReserva": 1,
            "descripcionReservaEstado": "Bla bla... PEDIDO ESTADO NO TIENE ESTE ATRIBUTO",
            "fechaYHoraAltaReservaEstado": currentDate,
            "fechaYHoraBajaReservaEstado": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idReservaEstado": 2,
            "idReserva": 2,
            "idEstadoReserva": 2,
            "descripcionReservaEstado": "Bla bla... PEDIDO ESTADO NO TIENE ESTE ATRIBUTO",
            "fechaYHoraAltaReservaEstado": currentDate,
            "fechaYHoraBajaReservaEstado": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reservaestados', null, {})
    }
};