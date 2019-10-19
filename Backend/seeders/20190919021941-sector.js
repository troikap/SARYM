"use strict";

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("sectors", [
            {
                idSector: 1,
                codSector: "SF",
                nombreSector: "Fumadores",
                fechaYHoraBajaSector: null,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idSector: 2,
                codSector: "SNF",
                nombreSector: "No Fumadores",
                fechaYHoraBajaSector: null,
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idSector: 3,
                codSector: "SL",
                nombreSector: "Libre",
                fechaYHoraBajaSector: null,
                createdAt: currentDate,
                updatedAt: currentDate
            },
        ], {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("sectors", null, {});
    }
};