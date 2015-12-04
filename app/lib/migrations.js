"use strict";


var _ = require('lodash');


module.exports.createTable = function (knex, schema) {
  
    console.log(' > Creating ' + schema.tableName + ' table....');

    return knex.schema.createTable(schema.tableName, function (t) {
      var columnKeys = _.keys(schema.table);
    
      _.each(columnKeys, function (column) {
        return addTableColumn(schema.tableName, t, column);
      });
    });

    function addTableColumn (tablename, table, columnname) {
        var column;
        var columnSpec = schema.table[columnname];
    
        // creation distinguishes between text with fieldtype, string with maxlength and all others
        if (columnSpec.type === 'text' && columnSpec.hasOwnProperty('fieldtype')) {
          column = table[columnSpec.type](columnname, columnSpec.fieldtype);
        }
        else if (columnSpec.type === 'string' && columnSpec.hasOwnProperty('maxlength')) {
          column = table[columnSpec.type](columnname, columnSpec.maxlength);
        }
        else {
          column = table[columnSpec.type](columnname);
        }
    
        if (columnSpec.hasOwnProperty('nullable') && columnSpec.nullable === true) {
          column.nullable();
        }
        else {
          column.notNullable();
        }
    
        if (columnSpec.hasOwnProperty('primary') && columnSpec.primary === true) {
          column.primary();
        }
    
        if (columnSpec.hasOwnProperty('unique') && columnSpec.unique) {
          column.unique();
        }
    
        if (columnSpec.hasOwnProperty('unsigned') && columnSpec.unsigned) {
          column.unsigned();
        }
    
        if (columnSpec.hasOwnProperty('references')) {
          //check if table exists?
          column.references(columnSpec.references);
        }
    
        if (columnSpec.hasOwnProperty('inTable')) {
          //check if table exists?
          column.inTable(columnSpec.inTable);
        }
    
        if (columnSpec.hasOwnProperty('defaultTo')) {
          column.defaultTo(columnSpec.defaultTo);
        }
    }
};

