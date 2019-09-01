'use strict';
var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('departamentos', [
      { idDepartamento: 1, nombreDepartamento: 'Guaymallén', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 2, nombreDepartamento: 'Maipu', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 3, nombreDepartamento: 'Capital', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 4, nombreDepartamento: 'Godoy Cruz', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 5, nombreDepartamento: 'Junin', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 6, nombreDepartamento: 'Rivadavia', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 7, nombreDepartamento: 'Las Heras', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 8, nombreDepartamento: 'Lavalle', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 9, nombreDepartamento: 'Lujan de Cuyo', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 10, nombreDepartamento: 'San Martin', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 11, nombreDepartamento: 'Tupungato', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 12, nombreDepartamento: 'Santa Rosa', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 13, nombreDepartamento: 'La Paz', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 14, nombreDepartamento: 'San Carlos', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 15, nombreDepartamento: 'San Rafael', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 16, nombreDepartamento: 'General Alvear', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 17, nombreDepartamento: 'Malargüe', "createdAt": currentDate, "updatedAt": currentDate },
      { idDepartamento: 18, nombreDepartamento: 'Tunuyán', "createdAt": currentDate, "updatedAt": currentDate },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('departamentos', null, {})
    .then(console.log("--AAAA--"));
  }
};

