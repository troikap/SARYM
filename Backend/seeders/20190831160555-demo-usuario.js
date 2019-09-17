

'use strict';

var currentDate = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
<<<<<<< HEAD
      {
        "idUsuario": 1,
        "cuitUsuario": 20368506886,
        "nombreUsuario": "Lucas",
        "apellidoUsuario": "Perez",
        "contrasenaUsuario": "123456789",
        "dniUsuario": 36850688,
        "domicilioUsuario": "Villa Mercedes 1235",
        "emailUsuario": "lucaz_pato@gmail.com",
        "idDepartamento": 1,
        "nroCelularUsuario": 4318023,
        "nroTelefonoUsuario": 261387547,
        "createdAt": currentDate,
        "updatedAt": currentDate
      },
      {
        "idUsuario": 2,
        "cuitUsuario": 20374128575,
        "nombreUsuario": "Roberto",
        "apellidoUsuario": "Carlos",
        "contrasenaUsuario": "12345",
        "dniUsuario": 36850688,
        "domicilioUsuario": "Villa Mercedes 1235",
        "emailUsuario": "lucaz_pato@gmail.com",
        "idDepartamento": 2,
        "nroCelularUsuario": 4318023,
        "nroTelefonoUsuario": 261387547,
        "createdAt": currentDate,
        "updatedAt": currentDate
      },
      {
        "idUsuario": 3,
        "cuitUsuario": 20123456786,
        "nombreUsuario": "Julian",
        "apellidoUsuario": "Lopez",
        "contrasenaUsuario": "4321",
        "dniUsuario": 36850688,
        "domicilioUsuario": "Villa Mercedes 1235",
        "emailUsuario": "lucaz_pato@gmail.com",
        "idDepartamento": 3,
        "nroCelularUsuario": 4318023,
        "nroTelefonoUsuario": 261387547,
        "createdAt": currentDate,
        "updatedAt": currentDate

      }], {});
  },
=======
    {
      "idUsuario": 1,
      "cuitUsuario": 20368506886, 
      "nombreUsuario": "Lucas", 
      "apellidoUsuario": "Perez", 
      "contrasenaUsuario": "$2b$10$vq0ekBcXJw.Z5Rw8cAFCdO1ibSLM93NoP8L2DWG5cxxIkCHj8SiYy",   
      "dniUsuario": 36850688,
      "domicilioUsuario": "Villa Mercedes 1235",
      "emailUsuario": "lucaz_pato@gmail.com",
      "idDepartamento": 1, 
      "nroCelularUsuario": 2614318023,
      "nroTelefonoUsuario": 2613875478,
      "createdAt": currentDate,
      "updatedAt": currentDate
    } ,
    {
      "idUsuario": 2,
      "cuitUsuario": 20368506881, 
      "nombreUsuario": "Mari", 
      "apellidoUsuario": "Castillo", 
      "contrasenaUsuario": "$2b$10$vq0ekBcXJw.Z5Rw8cAFCdO1ibSLM93NoP8L2DWG5cxxIkCHj8SiYy",   
      "dniUsuario": 36850688,
      "domicilioUsuario": "Villa Mercedes 1235",
      "emailUsuario": "lucaz_pato@gmail.com",
      "idDepartamento": 2, 
      "nroCelularUsuario": 2614318023,
      "nroTelefonoUsuario": 2613875472,
      "createdAt": currentDate,
      "updatedAt": currentDate
  },
    {
      "idUsuario": 3,
      "cuitUsuario": 20368506882, 
      "nombreUsuario": "Andres", 
      "apellidoUsuario": "Tonelli", 
      "contrasenaUsuario": "$2b$10$vq0ekBcXJw.Z5Rw8cAFCdO1ibSLM93NoP8L2DWG5cxxIkCHj8SiYy",   
      "dniUsuario": 36850688,
      "domicilioUsuario": "Villa Mercedes 1235",
      "emailUsuario": "lucaz_pato@gmail.com",
      "idDepartamento": 3, 
      "nroCelularUsuario": 2614318023,
      "nroTelefonoUsuario": 2613875477,
      "createdAt": currentDate,
      "updatedAt": currentDate
    
  }], {});
},
>>>>>>> master

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {})
      .then(console.log("que onda!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1"));
  }
};

