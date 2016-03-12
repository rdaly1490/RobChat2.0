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
			// array to insert middleware helper function
			'/rooms': [helpers.isAuthenticated, (req, res, next) => {
				res.render('rooms', {
					user: req.user
				});
			}],
			'/chat': [helpers.isAuthenticated, (req, res, next) => {
				res.render('chatroom', {
					user: req.user
				});
			}],
			'/auth/facebook': passport.authenticate('facebook'),
			'/auth/facebook/callback': passport.authenticate('facebook', {
				successRedirect: '/rooms',
				failureRedirect: '/' 
			}),
			'/auth/twitter': passport.authenticate('twitter'),
			'/auth/twitter/callback': passport.authenticate('twitter', {
				successRedirect: '/rooms',
				failureRedirect: '/' 
			}),
			'/logout': (req, res, next) => {
				req.logout();
				res.redirect('/');
			}
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





