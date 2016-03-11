'use strict';

// auth code gets up and running
require('./auth')();

// channel modules through here
module.exports = {
	// Here I assign all routes and their specific http methods by exporting
	// and invoking the routes anonymous function
	router: require('./routes')(),
	session: require('./session')
};