"use strict";

require('../../config');

const UploadController = () => {},
    attributes = require('../attributes');

UploadController.subirImagen = (req, res, next) => {
    let locals = {};

    if ( !req.files || Object.keys(req.files).length === 0 ){
        locals['title'] = 'No se ha seleccionado ningun archivo.';
        locals['tipo'] = 2;
        return res.status(400).json(locals)
    } else {
        let archivo = req.file.archivo;
        archivo.mv('filename.jpg', (err) => {
            if (err) {
                locals['title'] = 'Error al Subir.';
                locals['tipo'] = 2;
                return res.status(500).json(locals)
            } else {
                locals['title'] = 'Archivo subido Correctamente.';
                locals['tipo'] = 1;
                return res.json(locals)
            }
        })
    }
    
}

module.exports = UploadController;
