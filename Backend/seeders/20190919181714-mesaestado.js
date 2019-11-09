'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mesaestados', [
            { 
                "idMesaEstado": 1, "idMesa": 1, "idEstadoMesa": 1, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 2, "idMesa": 2, "idEstadoMesa": 2, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 3, "idMesa": 3, "idEstadoMesa": 3, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 4, "idMesa": 4, "idEstadoMesa": 1, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 5, "idMesa": 5, "idEstadoMesa": 2, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 6, "idMesa": 6, "idEstadoMesa": 3, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 7, "idMesa": 7, "idEstadoMesa": 4, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 8, "idMesa": 8, "idEstadoMesa": 5, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 9, "idMesa": 9, "idEstadoMesa": 3, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesaEstado": 10, "idMesa": 10, "idEstadoMesa": 3, "fechaYHoraAltaMesaEstado": currentDate, "fechaYHoraBajaMesaEstado": null, "createdAt": currentDate, "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mesaestados', null, {})
    }
};