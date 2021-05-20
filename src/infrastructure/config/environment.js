'use strict';

const environment = {
  NODE_ENV: process.env.NODE_ENV,

  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  },

  server: {
    port: process.env.PORT || 3000,
    https: process.env.HTTPS === 'true',
    key: process.env.KEY,
    cert: process.env.CERT
  }
};


module.exports = environment;