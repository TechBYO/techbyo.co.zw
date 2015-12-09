"use strict"

let site = require('./controllers/site');
let email = require('./controllers/email');

// routes
module.exports.setup = function (app) {
	app.get('/', site.home);
	app.post('/subscribe', email.save);
};
