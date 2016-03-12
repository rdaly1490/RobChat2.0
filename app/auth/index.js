'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const helpers = require('../helpers');

module.exports = () => {
	// serializeUser runs when authorization process ends (ie after done method is called in authProcessor)
	// creates a session and stores only users id inside the session (unique id key from mongodb, not fb or twitter id)
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		// Find the user based on the id
		helpers.findById(id)
			.then((user) => {
				// makes this data available in the request stream as req.user
				done(null, user);
			})
			.catch((error) => {
				console.log('Error When Deserializing The User');
			});
	});

	let authProcessor = (accessTokem, refreshToken, profile, done) => {
		// Find a user in the db using profile.id
		// If user is found return the user data using done()
		// If user is not found create one in the db and return
		helpers.findOne(profile.id)
			.then((result) => {
				if (result) {
					done(null, result);
				} else {
					// Create a new user and return
					helpers.createNewUser(profile)
						.then((newChatUser) => {
							done(null, newChatUser);
						})
						.catch((error) => {
							console.log('Error Creating New User');
						});
				}
			});
	}
	passport.use(new FacebookStrategy(config.fb, authProcessor));
	passport.use(new TwitterStrategy(config.twitter, authProcessor));
}
