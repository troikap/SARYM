'use strict';
var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('estadousuarios', [
      { idEstadoUsuario: 1, nombreEstadoUsuario: 'Activo',
      "createdAt": currentDate,
      "updatedAt": currentDate },
      { idEstadoUsuario: 2, nombreEstadoUsuario: 'Suspendido',
      "createdAt": currentDate,
      "updatedAt": currentDate },
      { idEstadoUsuario: 3, nombreEstadoUsuario: 'Eliminado',
      "createdAt": currentDate,
      "updatedAt": currentDate },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estadousuarios', null, {})
    .then(console.log("que "));
}
};
