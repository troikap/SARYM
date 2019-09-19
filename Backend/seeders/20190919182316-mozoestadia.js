'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mozoestadia', [{
            "idMozoEstadia": 1,
            "idUsuario": 1,
            "fechaYHoraInicioMozoEstadia": currentDate,
            "fechaYHoraFinMozoEstadia": null,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mozoestadia', null, {})
    }
};