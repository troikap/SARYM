'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productoestados', [{
            "idProductoEstado": 1,
            "idProducto": 1,
            "idEstadoProducto": 1,
            "descripcionProductoEstado": "Bla bla...",
            "fechaYHoraAltaProductoEstado": currentDate,
            "fechaYHoraBajaProductoEstado": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productoestados', null, {})
    }
};