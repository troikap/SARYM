'use strict'

let UsuarioModel = require('../models/usuario-model'),
	UsuarioController = () => {}

UsuarioController.getAll = (req, res, next) => {
    UsuarioModel.getAll((err, rows) => {
		console.log("mierda")
        if(err)
        {
            console.log('errr')
            let locals = {
                title : 'Error al consultar la base de datos',
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.render('error', locals)
        }
        else
        {
            
            let locals = {
                title : 'Lista de Películas',
                data : rows
            }
            console.log('acaaa');
			res.render('index', locals)

        }
	})
	console.log("res" , res)
	return res;
}

UsuarioController.getOne = (req, res, next) => {
	let idUsuario = req.params.idUsuario
	console.log(idUsuario)

	UsuarioModel.getOne(idUsuario, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${idUsuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar Película',
				data : rows
			}

			res.render('edit-movie', locals)
		}
	})
}

UsuarioController.save = (req, res, next) => {
	let movie = {
		idUsuario : req.body.idUsuario,
		title : req.body.title,
		release_year : req.body.release_year,
		rating : req.body.rating,
		image : req.body.image
	}

	console.log(movie)

	UsuarioModel.save(movie, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${movie.idUsuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			res.redirect('/')
		}
	})
}

UsuarioController.delete = (req, res, next) => {
	let idUsuario = req.params.idUsuario
	console.log(idUsuario)

	UsuarioModel.delete(idUsuario, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${idUsuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			res.redirect('/')
		}
	})
}

UsuarioController.addForm = (req, res, next) => res.render('add-movie', { title : 'Agregar Película' })

UsuarioController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}

module.exports = UsuarioController