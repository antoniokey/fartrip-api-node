'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('order', 'orders');
  },

  down: queryInterface => {
    return queryInterface.renameTable('orders', 'order');
  }
};
