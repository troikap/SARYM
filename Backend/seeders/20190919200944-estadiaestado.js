'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('estadiaestados', [{
            "idEstadiaEstado": 1,
            "idEstadia": 1,
            "idEstadoEstadia": 1,
            "descripcionEstadiaEstado": "Bla bla...",
            "fechaYHoraAltaEstadiaEstado": currentDate,
            "fechaYHoraBajaEstadiaEstado": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('estadiaestados', null, {})
    }
};