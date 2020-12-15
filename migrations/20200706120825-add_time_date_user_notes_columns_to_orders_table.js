'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orders', 'time', {
        type: Sequelize.STRING(10)
      }),
      queryInterface.addColumn('orders', 'date', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('orders', 'user_notes', {
        type: Sequelize.STRING
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('orders', 'time'),
      queryInterface.removeColumn('orders', 'date'),
      queryInterface.removeColumn('orders', 'user_notes')
    ]);
  }
};
