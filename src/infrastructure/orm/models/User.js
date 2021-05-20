'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  if(!sequelize instanceof Sequelize) {
    throw new TypeError('sequelize');
  }

  class User extends Model {};
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    
    age: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize: sequelize,
    modelName: 'User'
  });

  return User;
}
