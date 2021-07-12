const options = require('../config/sqlite3')
const knex = require('knex')(options)

module.exports = knex