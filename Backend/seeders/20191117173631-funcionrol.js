'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('funcionrols', [{
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
            {
                "idFuncionRol": 6,
                "idFuncion": 6,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 7,
                "idFuncion": 7,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 8,
                "idFuncion": 8,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 9,
                "idFuncion": 9,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 10,
                "idFuncion": 10,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 11,
                "idFuncion": 11,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 12,
                "idFuncion": 12,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 13,
                "idFuncion": 13,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 14,
                "idFuncion": 14,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 15,
                "idFuncion": 15,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 16,
                "idFuncion": 16,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 17,
                "idFuncion": 17,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 18,
                "idFuncion": 18,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 19,
                "idFuncion": 19,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 20,
                "idFuncion": 20,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 21,
                "idFuncion": 21,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 22,
                "idFuncion": 22,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 23,
                "idFuncion": 23,
                "idRol": 1,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 24,
                "idFuncion": 24,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 25,
                "idFuncion": 25,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 26,
                "idFuncion": 26,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 27,
                "idFuncion": 27,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 28,
                "idFuncion": 28,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 29,
                "idFuncion": 29,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 30,
                "idFuncion": 30,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 31,
                "idFuncion": 31,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 32,
                "idFuncion": 32,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 33,
                "idFuncion": 33,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 34,
                "idFuncion": 34,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 35,
                "idFuncion": 35,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 36,
                "idFuncion": 36,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 37,
                "idFuncion": 37,
                "idRol": 2,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 38,
                "idFuncion": 38,
                "idRol": 4,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 39,
                "idFuncion": 39,
                "idRol": 4,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idFuncionRol": 40,
                "idFuncion": 40,
                "idRol": 4,
                "fechaYHoraBajaFuncionRol": null,
                "fechaYHoraAltaFuncionRol": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('funcionrols', null, {})
    }
};