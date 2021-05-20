'use strict';

const sequealizeManager = require('../orm/sequealize-manager');

module.exports = class {
  constructor() {
    this.User = sequealizeManager.User;
  }

  async validateCredentials({username, password}) {
    try {
      const user = await this.User.findOne({ 
        where: {
          email: username,
          password: password
        },
        attributes: [ 'id' ],
        raw: true
      });

      if(!user) {
        const error = new Error('Invalid credentials');
        error.name = 'INVALID_CREDENTIALS';
        throw error;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}