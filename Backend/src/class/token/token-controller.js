"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  TokenController = () => { },
  attributes = require('../attributes'),
  UsuarioModelo = require("../usuario/usuario-model"),
  jwt = require('jsonwebtoken'),

  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

TokenController.verificarTokenRol = (req, res, next) => {
    let locals = {};
    let body = req.body;
    locals['body'] = body;
    console.log("BODY ", body)
    if (!(body.token && body.rol)) {
        locals['data'] = 'Falta enviar token o rol';
        locals['tipo'] = 1;
        res.json(locals);
    }
    if (body.token == "nuevo" || body.token == "libre") {
        console.log("Token Nuevo o Libre");
        locals['data'] = 'libre o nuevo';
    } else {
        jwt.verify(body.token, process.env.SEED, (err, decoded) => {
            if (err) {
                locals['data'] = "No Autorizado";
                locals['tipo'] = 2;
            } else {
                console.log("DATOS DEL TOKEN ", decoded)
                locals['dataToken'] = decoded;
                if (decoded.RolUsuario == body.rol) {
                    locals['data'] = 'Rol coincide con Token';
                    locals['tipo'] = 1;
                } else {
                    locals['data'] = 'Rol NO coincide con Token';;
                    locals['tipo'] = 2;
                }
            }
        })
    }
    res.json(locals)
}

module.exports = TokenController;