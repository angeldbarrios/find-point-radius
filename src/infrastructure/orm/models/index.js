'use strict';

const TreasureWrapper = require('./Treasure');
const UserWrapper = require('./User');
const MoneyValueWrapper = require('./MoneyValue');

class ModelWrapper {
  constructor() {
    this.configured = false;
  }

  setModels(sequelize) {
    if(this.configured === true) {
      return;
    }

    const Treasure = TreasureWrapper(sequelize);
    const User = UserWrapper(sequelize);
    const MoneyValue = MoneyValueWrapper(sequelize);

    Treasure.hasOne(MoneyValue, {
      foreignKey: 'treasure_id'
    });

    this.Treasure = Treasure;
    this.User = User;
    this.MoneyValue = MoneyValue;
    this.sequelize = sequelize;
    this.configured = true;
  }

  getModels() {
    return {
      Treasure: this.Treasure,
      User: this.Treasure,
      MoneyValue: this.MoneyValue
    }
  }
}


module.exports = new ModelWrapper