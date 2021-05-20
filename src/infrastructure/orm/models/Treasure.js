'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  if(!sequelize instanceof Sequelize) {
    throw new TypeError('sequelize');
  }

  class Treasure extends Model {};
  Treasure.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },    

  }, {
    sequelize: sequelize,
    modelName: 'Treasure'
  });

  return Treasure;
}
