'use strict';

const employees = [
  {
    account_id: 3,
    status: 'available',
    created_date_time: new Date(),
    modified_date_time: new Date(),
    work_description: null,
    cost_per_km: null
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('employees', employees);
  },

  down: async queryInterface => {
    return  await queryInterface.bulkDelete('employees', null);
  }
};
