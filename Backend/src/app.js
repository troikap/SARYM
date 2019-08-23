'use strict'

var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFul = require('express-method-override')('_method'),
    routes = require('./routes/routes'),
    faviconURL = `${__dirname}/public/img/node-favicon.png`,
    publicDir = express.static(`${__dirname}/public`),
    port = (process.env.PORT || 3000),
    app = express()

// settings
app
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