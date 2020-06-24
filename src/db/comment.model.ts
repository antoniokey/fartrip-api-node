import { Model, DataTypes } from 'sequelize';
import db from './config/db.config';
import User from './user.model';
import Employer from './employer.model';

class Comment extends Model {}

Comment.init(
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
    text: {
      field: 'departure',
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
  { sequelize: db.sequelize, modelName: 'comment' }
);

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Employer, { foreignKey: 'employerId' });

export default Comment;
