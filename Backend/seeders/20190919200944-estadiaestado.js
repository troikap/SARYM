'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('estadiaestados', [
        {
            "idEstadiaEstado": 1,
            "idEstadia": 1,
            "idEstadoEstadia": 2,
            "descripcionEstadiaEstado": "Bla bla...",
            "fechaYHoraAltaEstadiaEstado": currentDate,
            "fechaYHoraBajaEstadiaEstado": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idEstadiaEstado": 2,
            "idEstadia": 2,
            "idEstadoEstadia": 2,
            "descripcionEstadiaEstado": "Bla bla...",
            "fechaYHoraAltaEstadiaEstado": currentDate,
            "fechaYHoraBajaEstadiaEstado": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('estadiaestados', null, {})
    }
};