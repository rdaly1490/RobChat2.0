'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

// Iterate throught the routes here and mount them into express using
// the express router middleware
let _registerRoutes = (routes, httpMethod) => {
	for (let key in routes) {
		if (typeof routes[key] === 'object' && router[key] !== null && !(routes[key] instanceof Array)) {
			// buckle your seatbelt, here come the recursion
			_registerRoutes(routes[key], key)
		} else {
			// Register the routes here
			if (httpMethod === 'get') {
				router.get(key, routes[key]);
			} else if (httpMethod === 'post') {
				router.post(key, routes[key]);
			} else {
				router.use(routes[key]);
			}
		}
	}
}

// leave _registerRoutes as a private method and expose it as 'route' elsewhere
let route = (routes) => {
	_registerRoutes(routes);
	// return the express router not that the httpMethods have been added to it
	return router;
}

// Find a single user based on an id
let findOne = (profileID) => {
	return db.userModel.findOne({
		profileId: profileID
	});
}

// Create a new user
let createNewUser = (profileObject) => {
	return new Promise((resolve, reject) => {
		let newChatUser = new db.userModel({
			profileId: profileObject.id,
			fullName: profileObject.displayName,
			profilePic: profileObject.photos[0].value || ''
		});

		newChatUser.save((error) => {
			if (error) {
				reject(error);
			} else {
				resolve(newChatUser);
			}
		})
	})
}

// ES6 promise version of mongoose's findById
let findById = (id) => {
	return new Promise((resolve, reject) => {
		db.userModel.findById(id, (error, user) => {
			if (error) {
				reject(error);
			} else {
				resolve(user);
			}
		});
	});
} 

// check if user is logged in
let isAuthenticated = (req, res, next) => {
	// passport method
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
}

// Find Chatroom given name
// TODO: Check for uppercase of same name, etc.
let findRoomByName = (allRooms, room) => {
	let findRoom = allRooms.findIndex((element, index, array) => {
		if (element.room === room) {
			return true;
		} else {
			return false;
		}
	});
	return findRoom > -1 ? true : false;
}

// Generates a unique roomID
let generateRandomNumber = () => {
	crypto.randomBytes(24).toString('hex');
}

module.exports = {
	route: route,
	findOne: findOne,
	createNewUser: createNewUser,
	findById: findById,
	isAuthenticated: isAuthenticated,
	findRoomByName: findRoomByName,
	generateRandomNumber: generateRandomNumber
}
