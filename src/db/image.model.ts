import { Model, DataTypes } from 'sequelize';
import db from './config/db.config';
import Account from './account.model';

class Image extends Model {}

Image.init(
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    accountId: {
      field: 'account_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'role'
      }
    },
    image: {
      field: 'image',
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
  { sequelize: db.sequelize, modelName: 'role' }
);

Image.belongsTo(Account, { foreignKey: 'account_id' });

export default Image;
