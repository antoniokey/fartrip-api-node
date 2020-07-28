'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders_route_points',
      {
        id: {
          field: 'id',
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        orderId: {
          field: 'order_id',
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'orders'
          }
        },
        routePoints: {
          field: 'route_points',
          type: Sequelize.STRING,
          allowNull: false,
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
      { charset: 'utf8', collate: 'utf8_unicode_ci' }
    )
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders_route_points');
  }
};
