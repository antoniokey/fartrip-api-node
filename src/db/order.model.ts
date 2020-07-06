import { Model, DataTypes } from 'sequelize';
import db from './config/db.config';

class Order extends Model {}

Order.init(
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'user'
      }
    },
    employeeId: {
      field: 'employee_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'employee'
      }
    },
    departure: {
      field: 'departure',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    destination: {
      field: 'destination',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    distance: {
      field: 'distance',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      field: 'cost',
      type: DataTypes.FLOAT,
      allowNull: false
    },
    spendTime: {
      field: 'spend_time',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      field: 'status',
      type: DataTypes.ENUM('new', 'in_progress', 'canceled', 'completed'),
      allowNull: false
    },
    time: {
      field: 'time',
      type: DataTypes.STRING(10),
      allowNull: false
    },
    date: {
      field: 'date',
      type: DataTypes.DATE,
      allowNull: false
    },
    userNotes: {
      field: 'user_notes',
      type: DataTypes.STRING,
      allowNull: false
    },
    createdDateTime: {
      field: 'created_date_time',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    modifiedDateTime: {
      field: 'modified_date_time',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  { sequelize: db.sequelize }
);

export default Order;
