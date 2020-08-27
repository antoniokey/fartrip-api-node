'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cars', 'image', {
      type: Sequelize.BLOB('long')
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('cars', 'image');
  }
};
