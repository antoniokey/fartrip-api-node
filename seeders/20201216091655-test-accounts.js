'use strict';

const bcrypt = require('bcrypt');

const accounts = [
  {
    role_id: 1,
    email: 'testing-user1@gmail.com',
    password: bcrypt.hashSync('123', 12),
    name: 'User 1',
    age: 21,
    created_date_time: new Date(),
    modified_date_time: new Date(),
  },
  {
    role_id: 1,
    email: 'testing-user2@gmail.com',
    password: bcrypt.hashSync('123', 12),
    name: 'User 2',
    age: 31,
    created_date_time: new Date(),
    modified_date_time: new Date(),
  },
  {
    role_id: 2,
    email: 'testing-employee1@gmail.com',
    password: bcrypt.hashSync('123', 12),
    name: 'Employee 1',
    age: 27,
    created_date_time: new Date(),
    modified_date_time: new Date(),
  },
];
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
    await queryInterface.bulkInsert('accounts', accounts);
    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('employees', employees);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('accounts', null);
    await queryInterface.bulkDelete('users', null);
    await queryInterface.bulkDelete('employees', null);
  }
};
