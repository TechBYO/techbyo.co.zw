// main app

'use strict';

var server = require('./server');
var routes = require('./routes');

module.exports.start = function (config) {
  var app = server(config);

  routes.setup(app);

  app.listen(app.get('port'), app.get('ipAddress'), function () {
    console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
  });
};