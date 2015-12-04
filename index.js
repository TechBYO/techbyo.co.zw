
// main app
var config = require('./config');
var app;

if (process.env.NODE_ENV === 'production') {
	app = require('./src');
}
else {
	app = require('./app');
}


app.start();

