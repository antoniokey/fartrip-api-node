'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'status', {
      type: Sequelize.ENUM('new', 'in_progress', 'completed', 'canceled'),
      allowNull: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'status');
  }
};
