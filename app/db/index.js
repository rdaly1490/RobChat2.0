'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// Log an error if the mongoose connection to mongodb conection fails
Mongoose.connection.on('error', (error) => {
	console.log(`MongoDB Error: ${error}`);
});

const chatUser = new Mongoose.Schema({
	profileID: String,
	fullName: String,
	profilePic: String
});

const userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
	Mongoose: Mongoose,
	userModel: userModel
}