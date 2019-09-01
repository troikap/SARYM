'use strict';

var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rols', [
      { idRol: 1, nombreRol: 'Administrador', "createdAt": currentDate, "updatedAt": currentDate },
      { idRol: 2, nombreRol: 'Encargado', "createdAt": currentDate, "updatedAt": currentDate },
      { idRol: 3, nombreRol: 'Mozo', "createdAt": currentDate, "updatedAt": currentDate },
      { idRol: 4, nombreRol: 'Cocina', "createdAt": currentDate, "updatedAt": currentDate },
      { idRol: 5, nombreRol: 'Cliente', "createdAt": currentDate, "updatedAt": currentDate },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rols', null, {})
    .then(console.log("que "));
  }
};
