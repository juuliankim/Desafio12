const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../dataBase/mydb.sqlite'
    },
    useNullAsDefault: true
}

module.exports = sqlite3;
