

var site = require('./controllers/site');
var email = require('./controllers/email');

// routes
module.exports.setup = function (app) {
	app.get('/', site.home);
	app.post('/subscribe', email.save);
};