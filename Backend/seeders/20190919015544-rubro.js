'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('rubros', [
            { idRubro: 1, codRubro: '2A345', nombreRubro: 'Pescaderia', descripcionRubro: 'Pescados frescos', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 2, codRubro: 'B3455', nombreRubro: 'Panificados', descripcionRubro: 'Panificados del dia', "createdAt": currentDate, "updatedAt": currentDate },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('rubros', null, {})
    }
};