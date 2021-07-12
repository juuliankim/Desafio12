const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'productos',
        port: '8080/'
    },
    pool: { min: 0, max: 10 }
}

module.exports = mysql;