'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employee', 'work_description', {
      type: Sequelize.STRING
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('employee', 'work_description');
  }
};
