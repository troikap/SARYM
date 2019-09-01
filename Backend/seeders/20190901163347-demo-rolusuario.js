'use strict';

var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rolusuarios', [
      { 
        "idRolUsuario": 1,
        "idUsuario": 1, 
        "idRol": 1, 
        "fechaYHoraBajaRolUsuario": null,
        "fechaYHoraAltaRolUsuario": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      } ,
      {
        "idRolUsuario": 2,
        "idUsuario": 2, 
        "idRol": 2, 
        "fechaYHoraBajaRolUsuario": null,   
        "fechaYHoraAltaRolUsuario": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      },
      {
        "idRolUsuario": 3,
        "idUsuario": 3, 
        "idRol": 3, 
        "fechaYHoraBajaRolUsuario": null,
        "fechaYHoraAltaRolUsuario": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rolusuarios', null, {})
    .then(console.log("que "));
  }
};

