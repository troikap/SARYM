'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('comensals', [
            { 
                "idComensal": 1, "idUsuario": 1, "idReserva": 1, "idEstadia": 1, "aliasComensal": "Pepito Honguito", "edadComensal": 45, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idComensal": 2, "idUsuario": null, "idReserva": 2, "idEstadia": 2, "aliasComensal": "Otro Pepito", "edadComensal": 20, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idComensal": 3, "idUsuario": 2, "idReserva": null, "idEstadia": 1, "aliasComensal": "Tercer Pepo", "edadComensal": 50, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idComensal": 4, "idUsuario": 17, "idReserva": 3, "idEstadia": null, "aliasComensal": "Pepito Honguito", "edadComensal": 45, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idComensal": 5, "idUsuario": 1, "idReserva": 3, "idEstadia": null, "aliasComensal": "Lucas Perez", "edadComensal": 26, "createdAt": currentDate, "updatedAt": currentDate
            },
            { 
                "idComensal": 6, "idUsuario": 2, "idReserva": 3, "idEstadia": null, "aliasComensal": "Mari Castillo", "edadComensal": 24, "createdAt": currentDate, "updatedAt": currentDate
            },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('comensals', null, {})
    }
};