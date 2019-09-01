'use strict';

var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
    {
      "idUsuario": 1,
      "cuitUsuario": 2036850688, 
      "nombreUsuario": "Lucas", 
      "apellidoUsuario": "Perez", 
      "contrasenaUsuario": "65412294",   
      "dniUsuario": 36850688,
      "domicilioUsuario": "Villa Mercedes 1235",
      "emailUsuario": "lucaz_pato@gmail.com",
      "idDepartamento": null, 
      "nroCelularUsuario": 4318023,
      "nroTelefonoUsuario": 261387547,
      "createdAt": currentDate,
      "updatedAt": currentDate
    } ,
    {
      "idUsuario": 2,
      "cuitUsuario": 2036850688, 
      "nombreUsuario": "Roberto", 
      "apellidoUsuario": "Carlos", 
      "contrasenaUsuario": "65412294",   
      "dniUsuario": 36850688,
      "domicilioUsuario": "Villa Mercedes 1235",
      "emailUsuario": "lucaz_pato@gmail.com",
      "idDepartamento": null, 
      "nroCelularUsuario": 4318023,
      "nroTelefonoUsuario": 261387547,
      "createdAt": currentDate,
      "updatedAt": currentDate
  },
    {
      "idUsuario": 3,
      "cuitUsuario": 2036850688, 
      "nombreUsuario": "Lucas", 
      "apellidoUsuario": "Perez", 
      "contrasenaUsuario": "65412294",   
      "dniUsuario": 36850688,
      "domicilioUsuario": "Villa Mercedes 1235",
      "emailUsuario": "lucaz_pato@gmail.com",
      "idDepartamento": null, 
      "nroCelularUsuario": 4318023,
      "nroTelefonoUsuario": 261387547,
      "createdAt": currentDate,
      "updatedAt": currentDate
    
  }], {});
},

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('usuarios', null, {})
      .then(console.log("que onda!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1"));
  }
};
