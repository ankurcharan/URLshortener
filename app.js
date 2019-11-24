const express = require('express');
const bodyParser = require('body-parser');
const opn = require('opn');

// routes
const routes = require('./routes/index');

// get db instance
require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use('/', routes);

const PORT = 9000;
app.listen(PORT, (err) => {

	if(err) {
		console.log('Server could not be started');
		retrun;
	}
	console.log(`Server started at http://localhost:${PORT}`);
})