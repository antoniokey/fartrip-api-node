'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employee', 'cost_per_km', {
      type: Sequelize.FLOAT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('employee', 'cost_per_km');
  }
};
