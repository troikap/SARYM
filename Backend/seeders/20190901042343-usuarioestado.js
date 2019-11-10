'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('usuarioestados', [{
                "idUsuarioEstado": 1,
                "idUsuario": 1,
                "idEstadoUsuario": 1,
                "descripcionUsuarioEstado": "",
                "fechaYHoraBajaUsuarioEstado": null,
                "fechaYHoraAltaUsuarioEstado": currentDate,
                "createdAt": currentDate,
                "updatedAt": currentDate
            }
            // , 
            // {
            //     "idUsuarioEstado": 2,  "idUsuario": 2, "idEstadoUsuario": 2, "descripcionUsuarioEstado": "Suspendido por Mala Conducta", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // }, 
            // {
            //     "idUsuarioEstado": 3, "idUsuario": 3, "idEstadoUsuario": 3, "descripcionUsuarioEstado": "Dejo de Trabajar", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // }, 
            // {
            //     "idUsuarioEstado": 4, "idUsuario": 4, "idEstadoUsuario": 1, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 5, "idUsuario": 5, "idEstadoUsuario": 1, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 6, "idUsuario": 6, "idEstadoUsuario": 2, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 7, "idUsuario": 7, "idEstadoUsuario": 3, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 8, "idUsuario": 8, "idEstadoUsuario": 1, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 9, "idUsuario": 9, "idEstadoUsuario": 2, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 10, "idUsuario": 10, "idEstadoUsuario": 3, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 11, "idUsuario": 11, "idEstadoUsuario": 1, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 12, "idUsuario": 12, "idEstadoUsuario": 2, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 13, "idUsuario": 13, "idEstadoUsuario": 3, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 14, "idUsuario": 14, "idEstadoUsuario": 1, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 15, "idUsuario": 15, "idEstadoUsuario": 2, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 16, "idUsuario": 16, "idEstadoUsuario": 3, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 17, "idUsuario": 17, "idEstadoUsuario": 1, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 18, "idUsuario": 18, "idEstadoUsuario": 2, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
            // {
            //     "idUsuarioEstado": 19, "idUsuario": 19, "idEstadoUsuario": 3, "descripcionUsuarioEstado": "Admin", "fechaYHoraBajaUsuarioEstado": null, "fechaYHoraAltaUsuarioEstado": currentDate, "createdAt": currentDate, "updatedAt": currentDate
            // },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('usuarioestados', null, {})
    }
};