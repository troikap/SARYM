'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('detalleestadiamesas', [{
            "idDetalleEstadiaMesa": 1,
            "idEstadia": 1,
            "idMesa": 1,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('detalleestadiamesas', null, {})
    }
};