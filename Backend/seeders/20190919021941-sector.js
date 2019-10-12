"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "sectors", [{
                idSector: 1,
                codSector: "AA35",
                nombreSector: "Fumadores",
                fechaYHoraBajaSector: null,
                createdAt: currentDate,
                updatedAt: currentDate
            }, {
                idSector: 2,
                codSector: "B245",
                nombreSector: "No Fumadores",
                fechaYHoraBajaSector: currentDate,
                createdAt: currentDate,
                updatedAt: currentDate
            }], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("sectors", null, {});
    }
};