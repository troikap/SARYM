'use strict'

const app = require('./app');
	
app.listen(app.get('port'), () => {
		
		console.log(`Iniciando Express en el puerto ${app.get('port')}`)
	})
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();

	app.options('*', (req, res) => {
		// allowed XHR methods  
		res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
		res.send();
	});
});
	

