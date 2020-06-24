'use strict';

const roles = [
  { role: 'USER', 'created_date_time': new Date(), 'modified_date_time': new Date() },
  { role: 'EMPLOYER', 'created_date_time': new Date(), 'modified_date_time': new Date() },
  { role: 'ADMIN', 'created_date_time': new Date(), 'modified_date_time': new Date() }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('role', roles);
  },

  down: queryInterface => {
   return queryInterface.bulkDelete('role');
  }
};
