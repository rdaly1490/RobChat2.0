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
			},
			'/getSession': (req, res, next) => {
				res.send(`<h1>${req.session.color}</h1>`);
			},
			'/setSession': (req, res, next) => {
				req.session.color = 'green';
				res.send('session set');
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





