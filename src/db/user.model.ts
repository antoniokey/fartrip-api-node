import { DataTypes, Model } from 'sequelize/types';
import db from './config/db.config';
import Account from './account.model';
import Order from './order.model';
import Comment from './comment.model';

class User extends Model {}

User.init(
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
  { sequelize: db.sequelize, modelName: 'user' }
);

User.belongsTo(Account, { foreignKey: 'accountId' });
User.hasMany(Comment, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

export default User;
