'use strict'
// emilio
// var mysql = require('mysql'),
var conf = require('./db-conf'),
    dbOptions = {
        host: conf.mysql.host,
        port: conf.mysql.port,
        user: conf.mysql.user,
        password: conf.mysql.pass,
        database: conf.mysql.db
    };

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbOptions.database, dbOptions.user, dbOptions.password, {
    host: dbOptions.host,
    dialect: 'mysql',
    logging: true // si es false no muestra nada / si es true muestra el log de las creaciones de la bd
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize