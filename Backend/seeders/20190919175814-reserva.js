'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reservas', [{
                "idReserva": 1,
                "idUsuario": 1,
                "codReserva": "1-20368506886-2019-09-23/15:30",
                "cantPersonas": 4,
                "fechaReserva": '2019-09-23',
                "horaEntradaReserva": "15:30",
                "horaSalidaReserva": "17:30",
                "tokenReserva": "1-1-2019-09-23/23:39",
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // ,
            // { 
            //     "idReserva": 2, "idUsuario": 2, "codReserva": "2-20368506881-2019-10-23/12:30", "cantPersonas": 6, "fechaReserva": '2019-10-23', "horaEntradaReserva": "12:30", "horaSalidaReserva": "13:30", 
            //     "tokenReserva": "2-2-2019-10-23/23:39", "createdAt": currentDate, "updatedAt": currentDate
            // },
            // { 
            //     "idReserva": 3, "idUsuario": 17, "codReserva": "17-20555555551-2019-11-23/23:39", "cantPersonas": 6, "fechaReserva": '2019-11-23', "horaEntradaReserva": "23:39", "horaSalidaReserva": "23:59", 
            //     "tokenReserva": "3-17-2019-11-23/23:39", "createdAt": currentDate, "updatedAt": currentDate
            // },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reservas', null, {})
    }
};