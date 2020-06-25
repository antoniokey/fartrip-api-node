import { Model, DataTypes } from 'sequelize';
import db from './config/db.config';
import Account from './account.model';

class Role extends Model {}

Role.init(
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      field: 'role',
      type: DataTypes.ENUM('USER', 'EMPLOYEE', 'ADMIN'),
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

Role.hasMany(Account, { foreignKey: 'roleId' });
Account.belongsTo(Role);

export default Role;
