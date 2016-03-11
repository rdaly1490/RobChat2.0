'use strict';

const router = require('express').Router();

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

module.exports = {
	route: route
}
