'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employer',
      {
        id: {
          field: 'id',
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        accountId: {
          field: 'accountId',
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'account',
            key: 'id'
          }
        },
        status: {
          field: 'status',
          type: Sequelize.ENUM('available', 'in_progress', 'out_of_work'),
          allowNull: false
        },
        rating: {
          field: 'rating',
          type: Sequelize.FLOAT,
          allowNull: false
        },
        createdDateTime: {
          field: 'created_date_time',
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        modifiedDateTime: {
          field: 'modified_date_time',
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
      { cherset: 'utf8', collate: 'utf8_unicode_ci' }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('employer');
  }
};
