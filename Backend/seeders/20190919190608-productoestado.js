'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productoestados', [
            { "idProductoEstado": 1, "idProducto": 1, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 2, "idProducto": 2, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 3, "idProducto": 3, "idEstadoProducto": 2, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 4, "idProducto": 4, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 5, "idProducto": 5, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 6, "idProducto": 6, "idEstadoProducto": 3, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 7, "idProducto": 7, "idEstadoProducto": 4, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 8, "idProducto": 8, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 9, "idProducto": 9, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 10, "idProducto": 10, "idEstadoProducto": 3, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 11, "idProducto": 11, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 12, "idProducto": 12, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 13, "idProducto": 13, "idEstadoProducto": 2, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 14, "idProducto": 14, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
            { "idProductoEstado": 15, "idProducto": 15, "idEstadoProducto": 1, "descripcionProductoEstado": "Bla bla...", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate},
        
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productoestados', null, {})
    }
};