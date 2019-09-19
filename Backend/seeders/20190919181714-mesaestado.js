'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mesaestados', [{
            "idMesaEstado": 1,
            "idMesa": 1,
            "idEstadoMesa": 1,
            "fechaYHoraAltaMesaEstado": currentDate,
            "fechaYHoraBajaMesaEstado": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mesaestados', null, {})
    }
};