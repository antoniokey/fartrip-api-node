'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders',
      {
        id: {
          field: 'id',
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          field: 'user_id',
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            key: 'id',
            model: 'users'
          }
        },
        employeeId: {
          field: 'employee_id',
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            key: 'id',
            model: 'employees'
          }
        },
        departure: {
          field: 'departure',
          type: Sequelize.STRING(50),
          allowNull: false
        },
        destination: {
          field: 'destination',
          type: Sequelize.STRING(50),
          allowNull: false
        },
        distance: {
          field: 'distance',
          type: Sequelize.INTEGER,
          allowNull: false
        },
        cost: {
          field: 'cost',
          type: Sequelize.FLOAT,
          allowNull: false
        },
        spentTime: {
          field: 'spent_time',
          type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('orders');
  }
};
