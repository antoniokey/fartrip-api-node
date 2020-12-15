'use strict';

const roles = [
  { role: 'USER', 'created_date_time': new Date(), 'modified_date_time': new Date() },
  { role: 'EMPLOYEE', 'created_date_time': new Date(), 'modified_date_time': new Date() },
  { role: 'ADMIN', 'created_date_time': new Date(), 'modified_date_time': new Date() }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('roles', roles);
  },

  down: queryInterface => {
   return queryInterface.bulkDelete('roles');
  }
};
