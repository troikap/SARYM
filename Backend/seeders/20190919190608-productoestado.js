'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productoestados', [
            { "idProductoEstado": 1, "idProducto": 1, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 2, "idProducto": 2, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 3, "idProducto": 3, "idEstadoProducto": 2, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 4, "idProducto": 4, "idEstadoProducto": 2, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            // { "idProductoEstado": 5, "idProducto": 5, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 6, "idProducto": 6, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 7, "idProducto": 7, "idEstadoProducto": 4, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 8, "idProducto": 8, "idEstadoProducto": 3, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 9, "idProducto": 9, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 10, "idProducto": 10, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 11, "idProducto": 11, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 12, "idProducto": 12, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 13, "idProducto": 13, "idEstadoProducto": 2, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 14, "idProducto": 14, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 15, "idProducto": 15, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 16, "idProducto": 16, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 17, "idProducto": 17, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 18, "idProducto": 18, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 19, "idProducto": 19, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 20, "idProducto": 20, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 21, "idProducto": 21, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 22, "idProducto": 22, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProductoEstado": 23, "idProducto": 23, "idEstadoProducto": 1, "descripcionProductoEstado": "", "fechaYHoraAltaProductoEstado": currentDate, "fechaYHoraBajaProductoEstado": null, "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productoestados', null, {})
    }
};