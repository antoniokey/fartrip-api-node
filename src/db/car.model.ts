import { Model, DataTypes } from 'sequelize';
import db from './config/db.config';

class Car extends Model {}

Car.init(
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    employeeId: {
      field: 'employee_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    model: {
      field: 'model',
      type: DataTypes.STRING(30),
      allowNull: false
    },
    note: {
      field: 'note',
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

export default Car;
