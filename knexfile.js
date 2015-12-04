// Update with your config settings.


var config = require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: config.mysql.database,
      user:     config.mysql.user,
      password: config.mysql.password
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: config.mysql.database,
      user:     config.mysql.user,
      password: config.mysql.password
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: config.mysql.database,
      user:     config.mysql.user,
      password: config.mysql.password
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
