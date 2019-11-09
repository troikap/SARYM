'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('mesas', [
            { 
                "idMesa": 1, "idSector": 1, "nroUbicacion": 1, "nroMesa": 1, "capacidadMesa": 4, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 2, "idSector": 2, "nroUbicacion": 2, "nroMesa": 2, "capacidadMesa": 6, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 3, "idSector": 3, "nroUbicacion": 3, "nroMesa": 3, "capacidadMesa": 8, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 4, "idSector": 1, "nroUbicacion": 4, "nroMesa": 4, "capacidadMesa": 4, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 5, "idSector": 2, "nroUbicacion": 5, "nroMesa": 5, "capacidadMesa": 6, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 6, "idSector": 3, "nroUbicacion": 6, "nroMesa": 6, "capacidadMesa": 8, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 7, "idSector": 1, "nroUbicacion": 7, "nroMesa": 7, "capacidadMesa": 4, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 8, "idSector": 2, "nroUbicacion": 8, "nroMesa": 8, "capacidadMesa": 6, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 9, "idSector": 3, "nroUbicacion": 9, "nroMesa": 9, "capacidadMesa": 8, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idMesa": 10, "idSector": 3, "nroUbicacion": 10, "nroMesa": 10, "capacidadMesa": 8, "createdAt": currentDate, "updatedAt": currentDate
            }
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('mesas', null, {})
    }
};