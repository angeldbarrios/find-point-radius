'use strict';

const express = require('express');
const TreasureUseCases = require('../../../application/use-cases/treasureUseCases');

module.exports = (appContext) => {
  const router = express.Router();
  const treasureUseCases = new TreasureUseCases(appContext);


  router.get('/find_box', async function (req, res, next) {
    try {
      const { username, password } = req.credentials;
      const { latitude, longitude, distance, priceValue } = req.query;

      const data = await treasureUseCases.findTreasure({
        username: username,
        password: password
      }, {
        latitude, longitude, distance, priceValue
      });

      res.json({ success: true, data: data });
    } catch (error) {
      next(error);
    }
  });


  return router;
}