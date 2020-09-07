'use strict';

module.exports = {
  up:queryInterface => {
    return queryInterface.removeColumn('employees', 'rating');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: false
    });
  }
};
