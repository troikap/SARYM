'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reservaestados', [{
                "idReservaEstado": 1,
                "idReserva": 1,
                "idEstadoReserva": 3,
                "descripcionReservaEstado": "PEDIDO ESTADO NO TIENE ESTE ATRIBUTO",
                "fechaYHoraAltaReservaEstado": currentDate,
                "fechaYHoraBajaReservaEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // ,
            // {
            //     "idReservaEstado": 2,
            //     "idReserva": 2,
            //     "idEstadoReserva": 1,
            //     "descripcionReservaEstado": "PEDIDO ESTADO NO TIENE ESTE ATRIBUTO",
            //     "fechaYHoraAltaReservaEstado": currentDate,
            //     "fechaYHoraBajaReservaEstado": null,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idReservaEstado": 3,
            //     "idReserva": 3,
            //     "idEstadoReserva": 1,
            //     "descripcionReservaEstado": "Para que pruebe el Emilio",
            //     "fechaYHoraAltaReservaEstado": currentDate,
            //     "fechaYHoraBajaReservaEstado": null,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reservaestados', null, {})
    }
};