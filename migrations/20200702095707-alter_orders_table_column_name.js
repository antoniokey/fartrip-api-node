'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('orders', 'spent_time', 'spend_time');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('orders', 'spend_time', 'spent_time');
  }
};
