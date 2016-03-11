'use strict';
const helpers = require('../helpers');

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





