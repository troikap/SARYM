'use strict'

const app = require('./app');
	
app.listen(app.get('port'), () => {
		
		console.log(`Iniciando Express en el puerto ${app.get('port')}`)
	})
	

