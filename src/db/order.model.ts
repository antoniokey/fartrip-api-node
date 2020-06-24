import { Model, DataTypes } from 'sequelize';
import db from './config/db.config';
import User from './user.model';
import Employer from './employer.model';

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
    employerId: {
      field: 'employer_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'employer'
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
    spentTime: {
      field: 'spent_time',
      type: DataTypes.INTEGER,
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
  { sequelize: db.sequelize, modelName: 'order' }
);

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Employer, { foreignKey: 'employerId' });

export default Order;
