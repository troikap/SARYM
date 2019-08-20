'use strict'

var app = require('./app'),
	server = app.listen(app.get('port'), () => {
		console.log(`Iniciando Express en el puerto ${app.get('port')}`)
	})


/*const myConnection = require('express-myconnection'),
    app = require('./app'),
    mysql = require('mysql');


app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'sarym'
    //database: 'crudnodejsmysql'
}, 'single'))

	server = app.listen(app.get('port'), () => {
		console.log(`Iniciando Express en el puerto ${app.get('port')}`)
	})*/