const mysql = require('mysql2');
const config = require('../config/config');

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
  waitForConnections: config.mysql.waitForConnections,
  connectionLimit: config.mysql.connectionLimit,
  queueLimit: config.mysql.queueLimit,
});

const dbmysql = pool.promise();

module.exports = dbmysql;