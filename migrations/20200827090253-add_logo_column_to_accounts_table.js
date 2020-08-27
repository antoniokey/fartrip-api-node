'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('accounts', 'logo', {
    type: Sequelize.BLOB('long')
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('accounts', 'logo');
  }
};
