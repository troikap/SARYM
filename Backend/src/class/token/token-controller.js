"use strict";

require('../../config');
const TokenController = () => { },
  jwt = require('jsonwebtoken');

TokenController.verificarTokenRol = (req, res, next) => {
    let locals = {};
    let body = req.body;
    locals['body'] = body;
    console.log("BODY ", body)
    if (!(body.token)) {
        locals['data'] = 'Falta enviar token';
        locals['tipo'] = 2;
        res.json(locals);
    }
    if (body.token == "nuevo" || body.token == "libre") {
        console.log("Token Nuevo o Libre");
        locals['data'] = 'libre o nuevo';
    } else {
        jwt.verify(body.token, process.env.SEED, (err, decoded) => {
            if (err) {
                locals['data'] = "Token invalido";
                locals['tipo'] = 3;
            } else {
                console.log("DATOS DEL TOKEN ", decoded)
                locals['dataToken'] = decoded;
                locals['data'] = 'Token valido';
                locals['tipo'] = 1;
            }
        })
    }
    res.json(locals)
}

module.exports = TokenController;