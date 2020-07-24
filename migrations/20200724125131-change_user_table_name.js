'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('user', 'users');
  },

  down: queryInterface => {
    return queryInterface.renameTable('users', 'user');
  }
};
