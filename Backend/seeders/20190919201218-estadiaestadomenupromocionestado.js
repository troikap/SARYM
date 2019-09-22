'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('menupromocionestados', [{
            "idMenuPromocionEstado": 1,
            "idMenuPromocion": 1,
            "idEstadoMenuPromocion": 1,
            "descripcionMenuPromocionEstado": "Bla bla...",
            "fechaYHoraAltaMenuPromocionEstado": currentDate,
            "fechaYHoraBajaMenuPromocionEstado": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('menupromocionestados', null, {})
    }
};