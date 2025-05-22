module.exports = {
    port: 3000,
    postgres: {
        host: 'localhost',
        user: 'postgres',
        password: 'weangkom',
        database: 'postgres',
        port: 5432
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'weangkom',
        database: 'test_mysql',
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
}