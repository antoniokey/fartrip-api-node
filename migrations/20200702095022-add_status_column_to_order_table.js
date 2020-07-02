'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('order', 'status', {
      type: Sequelize.ENUM('new', 'in_progress', 'completed', 'canceled'),
      allowNull: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('order', 'status');
  }
};
