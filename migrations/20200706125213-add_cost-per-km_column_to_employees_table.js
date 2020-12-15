'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'cost_per_km', {
      type: Sequelize.FLOAT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('employees', 'cost_per_km');
  }
};
