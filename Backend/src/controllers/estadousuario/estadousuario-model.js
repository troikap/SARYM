'use strict'

var conn = require('../../models/connection'),
   EstadoUsuarioModel = () => {},
   tabla = "estadousuario",
   idtabla = "idEstadoUsuario";

EstadoUsuarioModel.getAll = (cb) => conn.query( `SELECT * FROM ${tabla}`, cb)
	
EstadoUsuarioModel.getOne = (id, cb) => conn.query( `SELECT * FROM ${tabla} WHERE ${idtabla} = ?` , id, cb)

EstadoUsuarioModel.save = (data, cb) => {
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

// EstadoUsuarioModel.delete = (id, cb) => conn.query(`DELETE FROM ${tabla} WHERE ${idtabla} = ?`, id, cb)

EstadoUsuarioModel.delete = (id, cb) => {
	conn.query( `SELECT * FROM ${tabla} WHERE ${idtabla} = ?`, id , (err, rows) => {
	if(err)	{
		return err
	}
	if ( rows.length == 0 ) {
		let locals = `jajaja`
		console.log("NO EXISTE REGISTRO")
		return (conn.query(`select "nada" FROM ${tabla}`, id, cb))
		
	} else {
		return ( rows.length == 1 ) 
				? conn.query(`DELETE FROM ${tabla} WHERE ${idtabla} = ?`, id, cb)
				: console.log("wtfs")
	}})}

module.exports = EstadoUsuarioModel



