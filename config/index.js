
module.exports = {
  mysql: {
    host: 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'juliet',
    database: process.env.MYSQL_DB || 'techbyo',
    charset: process.env.MYSQL_CHARSET || 'utf8'
  }
};