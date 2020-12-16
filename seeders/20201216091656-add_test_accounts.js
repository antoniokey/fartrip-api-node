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

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('accounts', accounts);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('accounts', null);
  }
};
