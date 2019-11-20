'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mozoestadia', [
            {
                "idMozoEstadia": 1,
                "idUsuario": 1,
                "idEstadia": 1,
                "descripcionMozoEstadia": 'Se descompuso',
                "fechaYHoraInicioMozoEstadia": currentDate,
                "fechaYHoraFinMozoEstadia": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idMozoEstadia": 2,
                "idUsuario": 11,
                "idEstadia": 1,
                "descripcionMozoEstadia": null,
                "fechaYHoraInicioMozoEstadia": currentDate,
                "fechaYHoraFinMozoEstadia": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idMozoEstadia": 3,
                "idUsuario": 1,
                "idEstadia": 2,
                "descripcionMozoEstadia": null,
                "fechaYHoraInicioMozoEstadia": currentDate,
                "fechaYHoraFinMozoEstadia": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mozoestadia', null, {})
    }
};