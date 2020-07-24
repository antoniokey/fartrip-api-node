'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('image', 'images');
  },

  down: queryInterface => {
    return queryInterface.renameTable('images', 'image');
  }
};
