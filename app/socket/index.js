'use strict'
const helpers = require('../helpers');

module.exports = (io, app) => {
	let allRooms = app.locals.chatrooms;

	// listening on the roomslist pipeline and handshaking the client
	// then using 'on' add connection event listener
	io.of('/roomslist').on('connection', (socket) => {
		console.log('Connected to Client');
		socket.on('getChatrooms', () => {
			socket.emit('chatroomsList', JSON.stringify(allRooms));
		});
		socket.on('createNewRoom', (newRoomInput) => {
			// Check to see if room title already exists, if not create one and broadcast it to everyone
			if (!helpers.findRoomByName(allRooms, newRoomInput)) {
				allRooms.push({
					room: newRoomInput,
					roomID: helpers.generateRandomNumber(),
					users: []
				});

				// Emit an updated chatroom list to the creator
				socket.emit('chatRoomsList', JSON.stringify(allRooms));
				// Emit an updated list to everyone connected to the rooms page
				socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms));
			}
		});
	});


}