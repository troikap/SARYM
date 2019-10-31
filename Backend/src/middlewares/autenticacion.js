const jwt = require('jsonwebtoken');
require('../config');

// =======================
// Verificar TOKEN
// =======================
let verificaToken = (req, res, next) => {
    console.log('VERIFICANDO TOKEN')
    
    let token = req.get('token');
    let tok = req['token']
    console.log("TOKE",req['token'])
    console.log("TOKEN QUE LLEGA ", token)
    // token = "nada";
    if (token == "nuevo" || token == "libre") {
        next();
        console.log("Token Nuevo o Libre");
    } else {
        // console.log("WTF!!!!");
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

module.exports = {
    verificaToken
}