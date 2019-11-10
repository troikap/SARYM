'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('cajaestados', [{
                "idCajaEstado": 1,
                "idCaja": 1,
                "idEstadoCaja": 1,
                "idUsuario": 1,
                "descripcionCajaEstado": "Bla bla...",
                "montoAperturaCajaEstado": 400.50,
                "montoCierreCajaEstado": 1500.99,
                "fechaYHoraAltaCajaEstado": currentDate,
                "fechaYHoraBajaCajaEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // ,
            // {
            //     "idCajaEstado": 2,
            //     "idCaja": 2,
            //     "idEstadoCaja": 2,
            //     "idUsuario": 2,
            //     "descripcionCajaEstado": "Bla bla...",
            //     "montoAperturaCajaEstado": 500,
            //     "montoCierreCajaEstado": 750,
            //     "fechaYHoraAltaCajaEstado": currentDate,
            //     "fechaYHoraBajaCajaEstado": null,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // },
            // {
            //     "idCajaEstado": 3,
            //     "idCaja": 3,
            //     "idEstadoCaja": 3,
            //     "idUsuario": 3,
            //     "descripcionCajaEstado": "Bla bla...",
            //     "montoAperturaCajaEstado": 800,
            //     "montoCierreCajaEstado": 1100,
            //     "fechaYHoraAltaCajaEstado": currentDate,
            //     "fechaYHoraBajaCajaEstado": null,
            //     "createdAt": currentDate,
            //     "updatedAt": currentDate
            // }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('cajaestados', null, {})
    }
};