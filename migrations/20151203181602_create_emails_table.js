
var migrations = require('../app/lib/migrations');
var schema = require('../schemas/schema_1');

exports.up = function(knex, Promise) {
    return migrations
    .createTable(knex, schema)
    .then(function () {
    	console.log(schema.tableName + ' created table!');
    })
    .catch(function (error) {
    	console.error(error.stack);
    });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists(schema.tableName);
};
