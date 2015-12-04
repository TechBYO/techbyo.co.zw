"use strict";


var Base  = require('./base');


var Email = Base.Model.extend({

  tableName: 'emails',

  hasTimestamps: true

});


module.exports = Base.model('Email', Email);
