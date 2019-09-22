'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('clienteestadia', [{
            "idClienteEstadia": 1,
            "idUsuario": 1,
            "idEstadia": 1,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('clienteestadia', null, {})
    }
};