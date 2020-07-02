'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('order', 'spent_time', 'spend_time');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('order', 'spend_time', 'spent_time');
  }
};
