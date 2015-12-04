// main app

var config = require('./config');
var env = process.env.NODE_ENV;
var app;

if (env === 'production') {
	app = require('./src');
}
else {
	app = require('./app');
}


app.start(config);

