
module.exports = function (config) {
  "use strict";

  let express = require('express');
  let expressValidator = require('express-validator');
  let session = require('express-session');
  var flash = require('express-flash');
  let logger = require('morgan');
  let bodyParser = require('body-parser');
  let errorHandler = require('errorhandler');
  let hbs = require('hbs');
  let path = require('path');
  let _ = require('lodash');

  /**
   * Create Express server.
   */
  let server = express();

  const maxAge = (1000 * 60 * 60) * 24 * 7;

  // server port
  server.set('port', process.env.PORT || 3030);

  // define views folder
  server.set('views', path.join(__dirname, '../views'));

  /*
   * Handlebars settings
  **/
  server.set('view engine', 'hbs');
  server.engine('hbs', hbs.__express);
  server.disable('view cache');

  hbs.localsAsTemplateData(server);
  hbs.registerPartials(path.join(__dirname,'../views', 'partials'));

  server.use(session({
    genid: function(req) {
      return 'uuid' + Date.now();
    },
    secret: 'my ninja cat',
    resave: true,
    saveUninitialized: true
  }))

  // for forms
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(expressValidator());
  server.use(flash());

  server.use(express.static(path.join(__dirname, '../public'), {maxAge: maxAge}));

  server.use(logger('dev'));
  server.use(errorHandler());

  return server;
};




