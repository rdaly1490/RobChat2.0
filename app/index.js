'use strict';

// auth code gets up and running
require('./auth')();

// create an io server instance
let ioServer = (app) => {
	app.locals.chatrooms = [];
	const server = require('http').Server(app);
	const io = require('socket.io')(server);
	// bridge socket.io with sessions
	io.use((socket, next) => {
		require('./session')(socket.request, {}, next);
	});
	require('./socket')(io, app);
	return server;
}

// channel modules through here
module.exports = {
	// Here I assign all routes and their specific http methods by exporting
	// and invoking the routes anonymous function
	router: require('./routes')(),
	session: require('./session'),
	ioServer: ioServer
};