'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('cajas', [{
            "idCaja": 1,
            "nroCaja": 1,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idCaja": 2,
            "nroCaja": 2,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idCaja": 3,
            "nroCaja": 3,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('cajas', null, {})
    }
};