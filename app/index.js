'use strict';
// channel modules through here
module.exports = {
	// Here I assign all routes and their specific http methods by exporting
	// and invoking the routes anonymous function
	router: require('./routes')(),
	session: require('./session')
};