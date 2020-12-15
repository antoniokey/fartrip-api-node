'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'work_description', {
      type: Sequelize.STRING
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('employees', 'work_description');
  }
};
