'use strict';

require('dotenv').config();

const environment = require('./environment');
const SequelizeManager = require('../orm/sequealize-manager');

const authRepository = require('../repositories/authRepository');
const TreasureRepository = require('../repositories/TreasureRepository');

module.exports = async () => {
  await SequelizeManager.initSequelize();
  SequelizeManager.attachModels();
  await SequelizeManager.sync();

  const appContext = {
    repositories: {
      authRepository: new authRepository(),
      treasureRepository: new TreasureRepository()
    },
    environment: environment
  };

  return appContext;
};