'use strict';

module.exports = function () {
  "use strict";

  var express = require('express');
  var expressValidator = require('express-validator');
  var session = require('express-session');
  var flash = require('express-flash');
  var logger = require('morgan');
  var bodyParser = require('body-parser');
  var errorHandler = require('errorhandler');
  var hbs = require('hbs');
  var path = require('path');
  var _ = require('lodash');

  /**
   * Create Express server.
   */
  var server = express();

  var maxAge = 1000 * 60 * 60 * 24 * 7;

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
  hbs.registerPartials(path.join(__dirname, '../views', 'partials'));

  server.use(session({
    genid: function genid(req) {
      return 'uuid' + Date.now();
    },
    secret: 'my ninja cat',
    resave: true,
    saveUninitialized: true
  }));

  // for forms
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(expressValidator());
  server.use(flash());

  server.use(express['static'](path.join(__dirname, '../public'), { maxAge: maxAge }));

  server.use(logger('dev'));
  server.use(errorHandler());

  return server;
};