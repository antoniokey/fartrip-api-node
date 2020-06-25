import { DataTypes, Model } from 'sequelize';
import db from './config/db.config';
import Comment from './comment.model';
import Order from './order.model';

class Employee extends Model {}

Employee.init(
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    accountId: {
      field: 'accountId',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    status: {
      field: 'status',
      type: DataTypes.ENUM('available', 'in_progress', 'out_of_work'),
      allowNull: false
    },
    rating: {
      field: 'rating',
      type: DataTypes.FLOAT,
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

Employee.hasMany(Comment, { foreignKey: 'employeeId' });
Employee.hasMany(Order, { foreignKey: 'employeeId' });
Comment.belongsTo(Employee);
Order.belongsTo(Employee);

export default Employee;
