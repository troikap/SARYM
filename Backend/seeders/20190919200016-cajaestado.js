'use strict';

var currentDate = new Date();

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
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('cajaestados', null, {})
    }
};