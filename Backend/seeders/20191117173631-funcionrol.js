'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('funcionrols', [
            {
                "idFuncionRol": 1,
                "idFuncion": 1,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 2,
                "idFuncion": 2,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 3,
                "idFuncion": 3,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 4,
                "idFuncion": 4,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 5,
                "idFuncion": 5,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('funcionrols', null, {})
    }
};