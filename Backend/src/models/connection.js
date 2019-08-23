'use strict'

var mysql = require('mysql'),
	conf = require('./db-conf'),
	dbOptions = {
		host : conf.mysql.host,
		port : conf.mysql.port,
		user : conf.mysql.user,
		password : conf.mysql.pass,
		database : conf.mysql.db
	},
	myConn = mysql.createConnection(dbOptions);
// 	var algo = "Licas";
// 	var otra = { Licas:"hola"}
// console.log(otra[algo] )
// console.log( "mierda"+otra[algo] )
myConn.connect((err) => {
	return (err) ? console.log(`Error al Conectarse a MySQL: ${err.stack}`) : console.log(`Conexión establecida con MySQL N°: ${myConn.threadId}`)
})

module.exports = myConn