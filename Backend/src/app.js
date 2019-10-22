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
    app = express(),
    fileUpload = require('express-fileupload');
    
const multipart = require('connect-multiparty'),
    multiPartMiddleware = multipart({
        uploadDir: '../../subidas'
    });


// settings
app
    .set('port', port)
    .all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, token');
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        } else {
          next();
        }
      })
    .use( favicon(faviconURL) )
    .use( bodyParser.json() )
	// parse application/x-www-form-urlencoded
    .use( bodyParser.urlencoded({extended: true}))
    .use(restFul)
	.use( morgan('dev') )
    .use(publicDir)
    .use(fileUpload())
    .use(routes)

module.exports = app;