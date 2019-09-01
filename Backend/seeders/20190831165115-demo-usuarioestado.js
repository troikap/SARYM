'use strict';

var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarioestados', [
      { 
        "idUsuarioEstado": 1,
        "idUsuario": 1, 
        "idEstadoUsuario": 1, 
        "descripcionUsuarioEstado": "", 
        "fechaYHoraBajaUsuarioEstado": null,
        "fechaYHoraAltaUsuarioEstado": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      } ,
      {
        "idUsuarioEstado": 2,
        "idUsuario": 2, 
        "idEstadoUsuario": 2, 
        "descripcionUsuarioEstado": "Suspendido por Mala Conducta", 
        "fechaYHoraBajaUsuarioEstado": null,   
        "fechaYHoraAltaUsuarioEstado": currentDate,
        "createdAt": currentDate,
        "updatedAt": currentDate
      },
      {
        "idUsuarioEstado": 3,
        "idUsuario": 3, 
        "idEstadoUsuario": 3, 
        "descripcionUsuarioEstado": "Dejo de Trabajar", 
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
