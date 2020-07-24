'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('car', 'cars');
  },

  down: queryInterface => {
    return queryInterface.renameTable('cars', 'car');
  }
};
