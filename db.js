const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://ankur:asdfghjkl@urlshortener-mhgia.mongodb.net/test?retryWrites=true&w=majority';

const options = {
	reconnectTries: Number.MAX_VALUE,
	poolSize: 10,
	useNewUrlParser: true,
	useUnifiedTopology: true
};

mongoose.Promise = global.Promise;

mongoose.connect(dbURI, options).then(
	() => {
		console.log("Database connection established!");
	},
	err => {
		console.log("Error connecting Database instance due to: ", err);
	}
);