'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('estadia', [{
            "idEstadia": 1,
            "idReserva": 1,
            "idMozoEstadia": 1,
            "cantPersonas": 8,
            "fechaYHoraInicioEstadia": currentDate,
            "fechaYHoraFinEstadia": currentDate,
            "tokenEstadia": "TOKEN123456",
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('estadia', null, {})
    }
};