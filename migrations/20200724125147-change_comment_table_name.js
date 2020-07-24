'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('comment', 'comments');
  },

  down: queryInterface => {
    return queryInterface.renameTable('comments', 'comment');
  }
};
