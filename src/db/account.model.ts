import { DataTypes, Model } from 'sequelize';
import db from './config/db.config';
import User from './user.model';
import Employer from './employer.model';
import Role from './role.model';
import Image from './image.model';

class Account extends Model {}

Account.init(
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      field: 'role_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'role'
      }
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(20),
      allowNull: false
    },
    age: {
      field: 'age',
      type: DataTypes.STRING(20),
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
    },
  },
  { sequelize: db.sequelize, modelName: 'account' }
);

Account.hasMany(User, { foreignKey: 'accountId' });
Account.hasMany(Employer, { foreignKey: 'accountId' });
Account.hasMany(Image, { foreignKey: 'accountId' });
Account.belongsTo(Role, { foreignKey: 'role_id' });

export default Account;
