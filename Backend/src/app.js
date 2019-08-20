'use strict'

const express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFul = require('express-method-override')('_method'),
    routes = require('./routes/usuario-router'),
    faviconURL = `${__dirname}/public/img/node-favicon.png`,
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000),
    app = express()

// settings
app
//app.set('view engine', 'ejs');
    .set('views', viewDir)
    .set('view engine', 'jade')
    .set('port', port)

    .use( favicon(faviconURL) )
    .use( bodyParser.json() )
	// parse application/x-www-form-urlencoded
    .use( bodyParser.urlencoded({extended: false}))
    .use(restFul)
	.use( morgan('dev') )
	.use(publicDir)
	.use(routes)

module.exports = app;

/*
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'sarym'
    //database: 'crudnodejsmysql'
}, 'single'))


// routes
app.use('/usuario', usuariorRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
console.log('Server on port 3000');
})*/