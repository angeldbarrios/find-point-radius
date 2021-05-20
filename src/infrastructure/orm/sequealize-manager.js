'use strict';

const TreasureWrapper = require('./models/Treasure');
const UserWrapper = require('./models/User');
const MoneyValueWrapper = require('./models/MoneyValue');
const getSequalizeInstace = require('./sequealize');

class SequelizeManager {
  constructor() {
    this.configured = false;
    this.sequelize = null;
  }

  async initSequelize() {
    this.sequelize = await getSequalizeInstace();
  }

  async sync() {
    await this.sequelize.sync();
  } 

  attachModels() {
    if(this.configured === true) {
      return;
    }

    const Treasure = TreasureWrapper(this.sequelize);
    const User = UserWrapper(this.sequelize);
    const MoneyValue = MoneyValueWrapper(this.sequelize);

    Treasure.hasOne(MoneyValue, {
      foreignKey: 'treasure_id'
    });

    this.Treasure = Treasure;
    this.User = User;
    this.MoneyValue = MoneyValue;
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


module.exports = new SequelizeManager