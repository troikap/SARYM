"use strict";

require('../../config');

const UploadController = () => {},
ProductoModelo = require('../producto/producto-model'),
MenuPromocionModelo = require('../menupromocion/menupromocion-model'),
attributes = require('../attributes');
const fs = require('fs');
const path = require('path');
let variable = 0;
UploadController.subirImagen = (req, res, next) => {
    // console.log("WTF! - files - ", req.files)
    console.log(" BODY ",req.body)
    let carpeta = req.body.carpeta;
    let id = req.body.id;
    encontrar(id, carpeta, req, res);
}

function modificar(req, res){
    let tipo = req.files.archivo.name.split('.');
    let nombreFoto = `${req.body.nombre}`;
    let carpeta = req.body.carpeta;
    let id = req.body.id;
    let locals = {};
    console.log("ENTO EN ENCONTRO", variable )
    if ( !req.files ){
        locals['title'] = 'No se ha seleccionado ningun archivo.';
        locals['tipo'] = 2;
        res.json(locals)
    } else {
        let archivo = req.files.archivo;
        let extensionesValidas = ['png','jpg','gif','jpeg'];
        let milisegundo = new Date().getMilliseconds();
        let rutaImagen = `${nombreFoto}-${id}-${milisegundo}.${tipo[1]}`;
        let ruta = `uploads/${carpeta}/${rutaImagen}`;
        if ( extensionesValidas.indexOf( tipo[1] ) < 0 ) {
            locals['title'] = `Extension no valida. Permitidas: ${extensionesValidas}`;
            locals['tipo'] = 2;
            locals['err'] = tipo[1];
            res.json(locals)
        } else {
            archivo.mv(ruta, (err) => {
                if (err) {
                    locals['title'] = 'Error al Subir.';
                    locals['err'] = err;
                    locals['tipo'] = 2;
                    console.log("ERROR ", err)
                    res.json(locals)
                } else {
                    console.log("SUBIO BIEN")
                    if (carpeta == "producto") {
                        ProductoModelo.update({ pathImagenProducto: rutaImagen }, {
                            where: { idProducto: id }})
                            .then( resp => {
                                if (!resp || resp == 0) {
                                    locals['title'] = "Error al modificar PATH de Imagen de Producto.";
                                    locals['tipo'] = 2;
                                } else {
                                    locals['title'] = "Se modifico PATH de Imagen de Producto.";
                                    locals['path'] = rutaImagen;
                                    locals['carpeta'] = carpeta;
                                    locals['ruta'] = ruta;
                                    locals['tipo'] = 1;
                                }
                                res.json(locals)
                            })
                    } else if (carpeta == "menupromocion") {
                        MenuPromocionModelo.update({ pathImagenMenuPromocion: rutaImagen }, {
                            where: { idMenuPromocion: id }})
                            .then( resp => {
                                if (!resp || resp == 0) {
                                    locals['title'] = "Error al modificar PATH de Imagen de Menu o Promocion.";
                                    locals['tipo'] = 2;
                                } else {
                                    locals['title'] = "Se modifico PATH de Imagen de Menu o Promocion.";
                                    locals['path'] = rutaImagen;
                                    locals['carpeta'] = carpeta;
                                    locals['ruta'] = ruta;
                                    locals['tipo'] = 1;
                                }
                                res.json(locals)
                            })
                    }
                }
            })
        }
    }
}

function encontrar(id, clase, req , res) {
    let locals= {};
    if (clase == 'producto') {
        console.log("imagen "+ clase)
        let idClase = `id${clase}`;
        ProductoModelo.findOne({where: { [idClase]: id },}).then(response => {
            if (!response || response == 0 || response == null) {
                console.log("NO SE ENCONTRO")
                return 0;
            } else {
                console.log("SE ENCONTRO")
                borrarImagen(response.dataValues.pathImagenProducto, clase);
                modificar(req, res);
                return 1;
            }
        })
    } else if (clase == 'menupromocion') {
        console.log("imagen "+ clase)
        let idClase = `idMenuPromocion`;
        MenuPromocionModelo.findOne({where: { [idClase]: id },}).then(response => {
            if (!response || response == 0 || response == null) {
                console.log("NO SE ENCONTRO")
                return 0;
            } else {
                console.log("SE ENCONTRO")
                borrarImagen(response.dataValues.pathImagenMenuPromocion, clase);
                modificar(req, res);
                return 1;
            }
        })
    } else {
        console.log("NADA")
        return 0
    }
}

function borrarImagen(nombreImagen, tipo) {
    let pathTraido = `../../../uploads/${tipo}/${nombreImagen}` ;
    console.log("SE ENCONTRO ----------" ,pathTraido)
    let pathImagen = path.resolve(__dirname, pathTraido);
    if(fs.existsSync(pathImagen)){
        console.log("HACIENDO ESTO ++++++++")
        fs.unlinkSync(pathImagen);
    } 
}

UploadController.traerImagen =  (req, res, next) => {
    let tipo = req.params. tipo;
    let img = req.params.img;
    let pathImagen = path.resolve(__dirname, `../../../uploads/${tipo}/${img}`)
    console.log("PATH IMAGEN ", pathImagen)
   
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImagePath = path.resolve(__dirname,'../../assets/no-imagen.jpg');
        console.log("PATH no imagen ", noImagePath)
        res.sendFile(noImagePath);
    }
    // let pathImg = `./uploads/${tipo}/${img}`;
    // res.sendFile(noImagePath)
}

module.exports = UploadController;
