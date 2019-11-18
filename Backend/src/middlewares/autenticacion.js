const jwt = require('jsonwebtoken');
require('../config');

// =======================
// Verificar TOKEN
// =======================
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    if (token == "nuevo" || token == "libre") {
        console.log("Token Nuevo o Libre");
        next();
    } else {
        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                console.log("Error Nombre: ", err);
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token no válido'
                    }
                })
            }
            req.usuario = decoded.usuario;
            next();
        })
    }
}

let verificaTokenRecuperacion = (req, res, next) => {
    let token = req.body['token'];
    console.log("TOKEN ",token)
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            console.log("Error Nombre: ", err);
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }
        console.log("--------------------------- idUsuario = ",decoded.idUsuario)
        req.idUsuario = decoded.idUsuario;
        next();
    })
    
}

module.exports = {
    verificaToken,
    verificaTokenRecuperacion
}