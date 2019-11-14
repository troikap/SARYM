'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('rolusuarios', [{
                "idRolUsuario": 1,
                "idUsuario": 1,
                "idRol": 1,
                "fechaYHoraBajaRolUsuario": null,
                "fechaYHoraAltaRolUsuario": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idRolUsuario": 20,
                "idUsuario": 20,
                "idRol": 1,
                "fechaYHoraBajaRolUsuario": null,
                "fechaYHoraAltaRolUsuario": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // ,
            // {
            //     "idRolUsuario": 2,
            //     "idUsuario": 2,
            //     "idRol": 5,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 3,
            //     "idUsuario": 3,
            //     "idRol": 5,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 4,
            //     "idUsuario": 4,
            //     "idRol": 1,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 5,
            //     "idUsuario": 5,
            //     "idRol": 1,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 6,
            //     "idUsuario": 6,
            //     "idRol": 1,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 7,
            //     "idUsuario": 7,
            //     "idRol": 1,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 8,
            //     "idUsuario": 8,
            //     "idRol": 2,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 9,
            //     "idUsuario": 9,
            //     "idRol": 2,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 10,
            //     "idUsuario": 9,
            //     "idRol": 2,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 11,
            //     "idUsuario": 11,
            //     "idRol": 3,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 12,
            //     "idUsuario": 12,
            //     "idRol": 3,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 13,
            //     "idUsuario": 13,
            //     "idRol": 3,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 14,
            //     "idUsuario": 14,
            //     "idRol": 4,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 15,
            //     "idUsuario": 15,
            //     "idRol": 4,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 16,
            //     "idUsuario": 16,
            //     "idRol": 4,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 17,
            //     "idUsuario": 17,
            //     "idRol": 5,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 18,
            //     "idUsuario": 18,
            //     "idRol": 5,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idRolUsuario": 19,
            //     "idUsuario": 19,
            //     "idRol": 5,
            //     "fechaYHoraBajaRolUsuario": null,
            //     "fechaYHoraAltaRolUsuario": currentDate,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // }
            ,
            {
                "idRolUsuario": 21,
                "idUsuario": 21,
                "idRol": 3,
                "fechaYHoraBajaRolUsuario": null,
                "fechaYHoraAltaRolUsuario": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idRolUsuario": 22,
                "idUsuario": 22,
                "idRol": 3,
                "fechaYHoraBajaRolUsuario": null,
                "fechaYHoraAltaRolUsuario": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('rolusuarios', null, {})
    }
};