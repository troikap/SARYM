'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('estadia', [
            { 
                "idEstadia": 1, "idReserva": 1, "idMozoEstadia": 1, "cantPersonas": 8, "fechaYHoraInicioEstadia": currentDate, "fechaYHoraFinEstadia": null, "tokenEstadia": "TOKEN123456", "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idEstadia": 2, "idReserva": null, "idMozoEstadia": 1, "cantPersonas": 9, "fechaYHoraInicioEstadia": currentDate, "fechaYHoraFinEstadia": null, "tokenEstadia": "TOKEN123456", "createdAt": currentDate, "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('estadia', null, {})
    }
};