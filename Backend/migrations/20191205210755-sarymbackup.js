'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //console.log("entro al up");

    var express = require('express');
    // traer lo global
    require('../config');

    //sincronizador
    require('../database/sincronizar-bd');



    return queryInterface.createDatabase("sarym");




  },

  down: (queryInterface, Sequelize) => {
    console.log("entro al down");
    return queryInterface.dropDatabase("sarym");
  }
};
