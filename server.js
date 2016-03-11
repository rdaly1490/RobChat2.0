'use strict';
const express = require('express');
const app = express();

// break out app to test if later wanted to add other express instatnces for
// things like admin portal, etc.
const robChat = require('./app');

const port = process.env.PORT || 3000;
// optional express middleware to grab static files, not included by default
// in our app instance
app.use(express.static('public'));
// express uses views folder by default to look for ejs files, otherwise
// use app.set('views', './my-other-views');
app.set('view engine', 'ejs');

// Register all chatapp routes
app.use('/', robChat.router);

app.listen(port, () => {
	console.log(`App running on port ${port}`);
})
