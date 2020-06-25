import { DataTypes, Model } from 'sequelize';
import db from './config/db.config';
import Comment from './comment.model';
import Order from './order.model';

class Employer extends Model {}

Employer.init(
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

Employer.hasMany(Comment, { foreignKey: 'employerId' });
Employer.hasMany(Order, { foreignKey: 'employerId' });
Comment.belongsTo(Employer);
Order.belongsTo(Employer);

export default Employer;
