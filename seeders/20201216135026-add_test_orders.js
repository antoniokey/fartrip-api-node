'use strict';

const orders = [
  {
    user_id: 1,
    employee_id: 1,
    departure: 'Gomel',
    destination: 'Minsk',
    distance: 300,
    cost: 20.00,
    spend_time: 10800,
    created_date_time: new Date(),
    modified_date_time: new Date(),
    status: 'new',
  },
  {
    user_id: 2,
    employee_id: 1,
    departure: 'Minsk',
    destination: 'Gomel',
    distance: 300,
    cost: 20.00,
    spend_time: 10800,
    created_date_time: new Date(),
    modified_date_time: new Date(),
    status: 'in_progress',
  },
  {
    user_id: 2,
    employee_id: 1,
    departure: 'Moscow',
    destination: 'Minsk',
    distance: 717.9,
    cost: 80.00,
    spend_time: 32640,
    created_date_time: new Date(),
    modified_date_time: new Date(),
    status: 'completed',
  },
  {
    user_id: 1,
    employee_id: 1,
    departure: 'Gomel',
    destination: 'Grodno',
    distance: 592,
    cost: 50.00,
    spend_time: 23520,
    created_date_time: new Date(),
    modified_date_time: new Date(),
    status: 'canceled',
  },
];


module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('orders', orders);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('orders', null);
  }
};
