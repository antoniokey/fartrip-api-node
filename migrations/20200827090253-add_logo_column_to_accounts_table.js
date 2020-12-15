'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('accounts', 'logo', {
      type: Sequelize.BLOB('long')
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('accounts', 'logo');
  }
};
