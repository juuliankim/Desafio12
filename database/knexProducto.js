const options = require('../config/mariaDB')
const knex = require('knex')(options)

module.exports = knex