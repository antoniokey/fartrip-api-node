'use strict';

const { query } = require("express");

module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('comments', 'departure', 'comment');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('comments', 'comment', 'departure');
  }
};
