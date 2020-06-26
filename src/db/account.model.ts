import { DataTypes, Model } from 'sequelize';
import db from './config/db.config';
import User from './user.model';
import Employee from './employee.model';
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
      type: DataTypes.STRING,
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
  { sequelize: db.sequelize }
);

Account.hasOne(User, { foreignKey: 'accountId' });
Account.hasOne(Employee, { foreignKey: 'accountId' });
Account.hasOne(Image, { foreignKey: 'accountId' });
User.belongsTo(Account);
Employee.belongsTo(Account);
Image.belongsTo(Account);


export default Account;
