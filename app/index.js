"use strict"

let server = require('./server');
let routes = require('./routes');


module.exports.start = function () {
	let app = server();

	routes.setup(app);

    app.listen(app.get('port'), app.get('ipAddress'), function() {
      console.log("✔ Express server listening on port %d in %s mode",  app.get('port'), app.get('env'));
    });
};
