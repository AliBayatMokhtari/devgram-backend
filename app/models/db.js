const dbConfig = require("../config/db.config.js");

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  }
});

module.exports = knex;
