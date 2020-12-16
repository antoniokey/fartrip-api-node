'use strict';

const users = [
  {
    account_id: 1,
    created_date_time: new Date(),
    modified_date_time: new Date(),
  },
  {
    account_id: 2,
    created_date_time: new Date(),
    modified_date_time: new Date(),
  },
];

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('users', users);
  },

  down: async queryInterface => {
    return  await queryInterface.bulkDelete('users', null);
  }
};
