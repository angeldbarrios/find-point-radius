'use strict';

const express = require('express');
const treasureController = require('./controllers/treasureController');

module.exports = (appContext) => {
  const app = express.Router();

  app.use((req, _res, next) => {
    if(!req.headers.authorization) {
      const error = new TypeError('Credentials are missing');
      error.name = 'MISSING_CREDENTIALS';
      return next(error);
    }

    const authorization = req.headers.authorization.split(' ');
    if(!authorization[1]) {
      const error = new TypeError('Credentials are missing');
      error.name = 'MISSING_CREDENTIALS';
      return next(error);
    }

    
    const credentials = authorization[1].split(':');
    if(!credentials[0] || !credentials[1]) {
      const error = new TypeError('Credentials are missing');
      error.name = 'MISSING_CREDENTIALS';
      return next(error);
    }

    req.credentials = {
      username: credentials[0],
      password: credentials[1]
    }
    
    next();
  });

  app.use('/treasure', treasureController(appContext));

  return app;
}