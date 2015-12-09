"use strict";


let Base  = require('./base');


let Email = Base.Model.extend({

  tableName: 'emails',

  hasTimestamps: true

});


module.exports = Base.model('Email', Email);
