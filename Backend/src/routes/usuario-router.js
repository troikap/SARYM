'use strict'

let UsuarioController = require('../controllers/usuario-controller'),
    express = require('express'),    
    router = express.Router();
console.log('holaaaaaaaaaaaaaaa '+ router.get('/', UsuarioController.getAll));

console.log('router     -------     ', router)
router
    .get('/', UsuarioController.getAll)
    .post('/', UsuarioController.save)
    .get('/:idUsuario', UsuarioController.getOne)
    .post('/:idUsuario', UsuarioController.save)

    .delete('/:idUsuario', UsuarioController.delete)
    .use(UsuarioController.error404)

module.exports = router