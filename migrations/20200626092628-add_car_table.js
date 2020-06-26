'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('car', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employeeId: {
        field: 'employee_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employee',
          key: 'id'
        }
      },
      model: {
        field: 'model',
        type: Sequelize.STRING(30),
        allowNull: true
      },
      note: {
        field: 'note',
        type: Sequelize.STRING,
        allowNull: true
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
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('car');
  }
};
