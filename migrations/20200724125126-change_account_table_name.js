'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('account', 'accounts');
  },

  down: queryInterface => {
    return queryInterface.renameTable('accounts', 'account');
  }
};
