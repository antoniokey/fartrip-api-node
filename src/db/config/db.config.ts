import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USERNAME || '', process.env.DB_PASSWORD || '', {
  port: parseInt(process.env.DB_PORT || '0'),
  dialect: 'mysql',
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || ''),
    min: parseInt(process.env.DB_POOL_MIN  || ''),
    idle: parseInt(process.env.DB_IDLE  || ''),
    acquire: parseInt(process.env.DB_ACQUIRE  || ''),
    evict: parseInt(process.env.DB_POOL_EVICT  || '')
  }
});

const db = { sequelize };

export default db;
