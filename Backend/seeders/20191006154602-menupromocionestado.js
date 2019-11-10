'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('menupromocionestados', [
            { "idMenuPromocionEstado": 1, "idMenuPromocion": 1, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 2, "idMenuPromocion": 2, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 3, "idMenuPromocion": 3, "idEstadoMenuPromocion": 2, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 4, "idMenuPromocion": 4, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 5, "idMenuPromocion": 5, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 6, "idMenuPromocion": 6, "idEstadoMenuPromocion": 3, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 7, "idMenuPromocion": 7, "idEstadoMenuPromocion": 4, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 8, "idMenuPromocion": 8, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 9, "idMenuPromocion": 9, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 10, "idMenuPromocion": 10, "idEstadoMenuPromocion": 3, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 11, "idMenuPromocion": 11, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 12, "idMenuPromocion": 12, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 13, "idMenuPromocion": 13, "idEstadoMenuPromocion": 2, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 14, "idMenuPromocion": 14, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 15, "idMenuPromocion": 15, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 16, "idMenuPromocion": 16, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 17, "idMenuPromocion": 17, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 18, "idMenuPromocion": 18, "idEstadoMenuPromocion": 2, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 19, "idMenuPromocion": 19, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 20, "idMenuPromocion": 20, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 21, "idMenuPromocion": 21, "idEstadoMenuPromocion": 3, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 22, "idMenuPromocion": 22, "idEstadoMenuPromocion": 4, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 23, "idMenuPromocion": 23, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 24, "idMenuPromocion": 24, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 25, "idMenuPromocion": 25, "idEstadoMenuPromocion": 3, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 26, "idMenuPromocion": 26, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 27, "idMenuPromocion": 27, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 28, "idMenuPromocion": 28, "idEstadoMenuPromocion": 2, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idMenuPromocionEstado": 29, "idMenuPromocion": 29, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idMenuPromocionEstado": 30, "idMenuPromocion": 30, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idMenuPromocionEstado": 31, "idMenuPromocion": 31, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 32, "idMenuPromocion": 32, "idEstadoMenuPromocion": 2, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 33, "idMenuPromocion": 33, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idMenuPromocionEstado": 34, "idMenuPromocion": 34, "idEstadoMenuPromocion": 1, "descripcionMenuPromocionEstado": "", "fechaYHoraAltaMenuPromocionEstado": currentDate, "fechaYHoraBajaMenuPromocionEstado": null, "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('menupromocionestados', null, {})
    }
};