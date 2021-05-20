'use strict';

const environment = require('../config/environment');
const { Sequelize } = require('sequelize');

module.exports = async () => {
  const sequelize = new Sequelize({
    database: environment.mysql.database,
    username: environment.mysql.username,
    password: environment.mysql.password,
    host: environment.mysql.host,
    port: environment.mysql.port,
    dialect: 'mysql'
  });

  await sequelize.authenticate();
  return sequelize;
}