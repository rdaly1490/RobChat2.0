'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// Log an error if the mongoose connection to mongodb conection fails
Mongoose.connection.on('error', (error) => {
	console.log(`MongoDB Error: ${error}`);
});

module.exports = {
	Mongoose: Mongoose
}