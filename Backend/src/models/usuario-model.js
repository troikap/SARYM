'use strict'

var conn = require('./usuario-connection'),
   UsuarioModel = () => {}

UsuarioModel.getAll =  (cb) =>  conn.query('SELECT * FROM usuario', cb)

UsuarioModel.getOne = (id, cb) => conn.query('SELECT * FROM usuario WHERE idUsuario = ?', id, cb)

UsuarioModel.save = (data, cb) => {
	conn.query('SELECT * FROM usuario WHERE idUsuario = ?', data.idUsuario, (err, rows) => {
		console.log(`Número de registros: ${rows.length}`)
		if(err)
		{
			return err
		}
		else
		{
			return ( rows.length == 1 ) 
					? conn.query('UPDATE usuario SET ? WHERE idUsuario = ?', [data, data.idUsuario], cb) 
					: conn.query('INSERT INTO usuario SET ?', data, cb)
		}
	})
}

UsuarioModel.delete = (id, cb) => conn.query('DELETE FROM usuario WHERE idUsuario = ?', id, cb)

module.exports = UsuarioModel

/*
export interface Usuario {
  idUsuario: number, 
  cuitUsuario: number, 
  nombreUsuario: String, 
  apellidoUsuario: String, 
  contrasenaUsuario: String,   
  dniUsuario: number, 
  domicilioUsuario: String, 
  emailUsuario: String, 
  idDepartamento: number, 
  nroCelularUsuario: number, 
  nroTelefonoUsuario: number
}*/