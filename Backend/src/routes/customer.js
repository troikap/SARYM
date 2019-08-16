const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const servUsuario = require('../servicios/user/usuarios');

router.get('/', customerController.list);
router.post('/add', customerController.save);

// Usuario
router.get('/users', servUsuario.list);
router.get('/users:id', servUsuario.one);




module.exports = router;