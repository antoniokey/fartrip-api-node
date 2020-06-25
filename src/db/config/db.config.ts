import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USERNAME || '', process.env.DB_PASSWORD || '', {
  port: parseInt(process.env.DB_PORT || '1'),
  dialect: 'mysql',
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '1'),
    min: parseInt(process.env.DB_POOL_MIN  || '1'),
    idle: parseInt(process.env.DB_IDLE  || '1'),
    acquire: parseInt(process.env.DB_ACQUIRE  || '1'),
    evict: parseInt(process.env.DB_POOL_EVICT  || '1')
  }
});

const db = { sequelize };

export default db;
