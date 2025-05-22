const Pool = require('pg').Pool;
const config = require('../config/config');

const dbpg = new Pool({
    host: config.postgres.host,
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.database,
    port: config.postgres.port
});

module.exports = dbpg;