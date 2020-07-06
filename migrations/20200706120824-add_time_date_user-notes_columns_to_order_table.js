'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('order', 'time', {
        type: Sequelize.STRING(10)
      }),
      queryInterface.addColumn('order', 'date', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('order', 'user_notes', {
        type: Sequelize.STRING
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('order', 'time'),
      queryInterface.removeColumn('order', 'date'),
      queryInterface.removeColumn('order', 'user_notes')
    ]);
  }
};
