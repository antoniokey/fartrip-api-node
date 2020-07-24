'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('employee', 'employees');
  },

  down: queryInterface => {
    return queryInterface.renameTable('employees', 'employee');
  }
};
