'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  if(!sequelize instanceof Sequelize) {
    throw new TypeError('sequelize');
  }

  class MoneyValue extends Model {};

  MoneyValue.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    amt: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: 'MoneyValue',
    tableName: 'money_values',
    indexes: [
      {
        fields: ['amt'],
      }
    ]
  });

  return MoneyValue;
}
