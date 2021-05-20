'use strict';

const Joi = require('joi');

const schema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(), 
  longitude: Joi.number().min(-180).max(180).required(),
  distance: Joi.number().min(1).max(10).required(),
  priceValue: Joi.number().valid(10, 20, 30)
});

module.exports = class TreasureUseCases {
  constructor(appContext) {
    this.authRepository = appContext.repositories.authRepository;
    this.treasureRepository = appContext.repositories.treasureRepository;
  }

  async findTreasure(credentials, params) {
    await this.authRepository.validateCredentials(credentials);
    
    const results = schema.validate(params);
    if(results.error) {
      const error = new TypeError(results.error.message);
      error.name = 'BAD_DATA';
      throw error;
    }

    return await this.treasureRepository.findBox(results.value);
  }
}