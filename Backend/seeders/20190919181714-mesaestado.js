'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mesaestados', [
            {
                "idMesaEstado": 1,
                "idMesa": 1,
                "idEstadoMesa": 1,
                "fechaYHoraAltaMesaEstado": currentDate,
                "fechaYHoraBajaMesaEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idMesaEstado": 2,
                "idMesa": 2,
                "idEstadoMesa": 2,
                "fechaYHoraAltaMesaEstado": currentDate,
                "fechaYHoraBajaMesaEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            },
            {
                "idMesaEstado": 3,
                "idMesa": 3,
                "idEstadoMesa": 3,
                "fechaYHoraAltaMesaEstado": currentDate,
                "fechaYHoraBajaMesaEstado": null,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mesaestados', null, {})
    }
};