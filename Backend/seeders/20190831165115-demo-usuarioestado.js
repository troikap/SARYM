'use strict';

var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarioestados', [
      { 
        "idUsuarioEstado": 1,
        "idUsuario": 1, 
        "idEstadoUsuario": 1, 
        "descripcionUsuarioEstado": "Perez", 
        "fechaYHoraBajaUsuarioEstado": null,
        "fechaYHoraAltaUsuarioEstado": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      } ,
      {
        "idUsuarioEstado": 2,
        "idUsuario": 1, 
        "idEstadoUsuario": 1, 
        "descripcionUsuarioEstado": "Perez", 
        "fechaYHoraBajaUsuarioEstado": null,   
        "fechaYHoraAltaUsuarioEstado": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      },
      {
        "idUsuarioEstado": 3,
        "idUsuario": 1, 
        "idEstadoUsuario": 1, 
        "descripcionUsuarioEstado": "Perez", 
        "fechaYHoraBajaUsuarioEstado": null,
        "fechaYHoraAltaUsuarioEstado": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarioestados', null, {})
    .then(console.log("que "));
  }
};
