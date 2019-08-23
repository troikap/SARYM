'use strict'

var EstadoUsuarioModel = require('./estadousuario-model'),
	EstadoUsuarioController = () => {},
	leyenda = 'Estado Usuario',
	idtabla = 'idEstadoUsuario',
	tabla = 'estadousuario';

EstadoUsuarioController.getAll = (req, res, next) => {
    EstadoUsuarioModel.getAll((err, rows) => {
        if(err) {
            let locals = {
                title : 'Error al consultar la base de datos',
                description : 'Error de Sintaxis SQL',
                error : err
            }
			res.json(locals)
		}
		if ( rows.length == 0 ){
			let locals = {
				title: `No se encuentran registros de ${leyenda}`
			}
			res.json(locals)
		}else {
            let locals = {
                title : `Lista de ${leyenda}`,
                data : rows
			}
			res.json(locals)
}})}

EstadoUsuarioController.getOne = (req, res, next) => {
	let id = req.params[idtabla]
	EstadoUsuarioModel.getOne(id, (err, rows) => {
		if(err) {
			let locals = {
				title : `Error al buscar el registro con el id: ${id}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			res.json(locals)
		}
		if ( rows.length == 0 ){
			let locals = {
				title: `No se encuentran registros de ${leyenda}`
			}
			res.json(locals)
		} else {
			let locals = {
				title : `${leyenda}: ${id}`,
				data : rows[0]
			}
			res.json(locals)
}})}

EstadoUsuarioController.save = (req, res, next) => {
	let data = {
		[idtabla] : req.body[idtabla],
		nombreEstadoUsuario: req.body.nombreEstadoUsuario
	}
	EstadoUsuarioModel.save(data, (err) => {
		if(err) {
			let locals = {
				title : `Error al salvar el registro ${leyenda} con el id: ${data[idtabla]}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			res.json(locals)
		} else {
			let locals = {
				title : `${leyenda} agregado con id: `+ (data[idtabla] || "autogenerado"),
			}
			res.json(locals)
}})}
		
EstadoUsuarioController.bajalogica = (req, res, next) => {
	let [idtabla] = req.params[idtabla]
	EstadoUsuarioModel.getOne([idtabla], (err, rows) => {
		if(err) {
			let locals = {
				title : `Error al buscar el registro con el id: ${[idtabla]}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			res.json(locals)
		} else {
			let locals = {
				title : `${leyenda}: ${[idtabla]}`,
				data : rows
			}
			res.json(locals)
}})}

EstadoUsuarioController.delete = (req, res, next) => {
	let id = req.params[idtabla]
	EstadoUsuarioModel.delete(id, (err, rows) => {
		if(err)	{
			console.log("con error")
			let locals = {
				title : `Error al eliminar el registro ${leyenda} con el id: ${id}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			res.json(locals)
		} else { 			
			if(rows[0] === undefined) {
			let locals = {
				title : `${leyenda} eliminado id: ${id}`,
				description : "Eliminación Fisica"
			}
			res.json(locals)
			}else {
				let locals = {
					title : `No existe ese registro ${leyenda}`
				} 
				res.json(locals)
}}})}

EstadoUsuarioController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : `Recurso ${leyenda} No Encontrado`,
			error : error
		}
	error.status = 404
	res.json(locals)
	next()
}

module.exports = EstadoUsuarioController