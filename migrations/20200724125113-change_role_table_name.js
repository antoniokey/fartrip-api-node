'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('role', 'roles');
  },

  down: queryInterface => {
    return queryInterface.renameTable('roles', 'role');
  }
};
