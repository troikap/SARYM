'use strict'

var conn = require('../../models/connection'),
   UsuarioModel = () => {},
   tabla = "usuario",
   idtabla = "idUsuario";

UsuarioModel.getAll = (cb) => conn.query( `SELECT * FROM ${tabla}`, cb)
	
UsuarioModel.getOne = (id, cb) => conn.query( `SELECT * FROM ${tabla} WHERE ${idtabla} = ?` , id, cb)

UsuarioModel.save = (data, cb) => {
	conn.query( `SELECT * FROM ${tabla} WHERE ${idtabla} = ?`, data[idtabla] || `(SELECT MAX(${idtabla}) FROM ${[tabla]})+1` , (err, rows) => {
		if(err)	{
			return err
		}
		if ( rows.length == 0 ) {
			conn.query(`INSERT INTO ${tabla} SET ?`, data, cb)
		} else {
			return ( rows.length == 1 ) 
					? conn.query(`UPDATE ${tabla} SET ? WHERE ${idtabla} = ?`, [data, data[idtabla]], cb) 
					: conn.query(`INSERT INTO ${tabla} SET ?`, data, cb)
		}})}

UsuarioModel.delete = (id, cb) => conn.query(`DELETE FROM ${tabla} WHERE ${idtabla} = ?`, id, cb)

module.exports = UsuarioModel

