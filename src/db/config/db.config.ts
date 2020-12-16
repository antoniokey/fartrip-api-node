import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { getDatabaseName } from '../utils/db.utils';

dotenv.config();

const sequelize = new Sequelize(getDatabaseName(), process.env.DB_USERNAME || '', process.env.DB_PASSWORD || '', {
  port: parseInt(process.env.DB_PORT || ''),
    dialect: 'mysql',
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || ''),
      min: parseInt(process.env.DB_POOL_MIN || ''),
      idle: parseInt(process.env.DB_IDLE || ''),
      acquire: parseInt(process.env.DB_ACQUIRE || ''),
      evict: parseInt(process.env.DB_POOL_EVICT || '')
    }
});

const db = { sequelize };

export default db;
