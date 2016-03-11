'use strict';
const helpers = require('../helpers');
const passport = require('passport');

// Routes object for readability
module.exports = () => {
	let routes = {
		get: {
			'/': (req, res, next) => {
				res.render('login');
			},
			'/rooms': (req, res, next) => {
				res.render('rooms');
			},
			'/chat': (req, res, next) => {
				res.render('chatroom');
			},
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook', {
				successRedirect: '/rooms',
				failureRedirect: '/' 
			})
		},
		post: {

		},
		'pageNotFound': (req, res, next) => {
			res.status(404).render('404');
		}
	}

	// Call the helper function that will mount all these routes onto
	// the express router
	return helpers.route(routes);
}





