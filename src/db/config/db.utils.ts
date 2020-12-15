import db from './db.config';
import { spawn } from 'child_process';
import path from 'path';

export const dropAllTables = (): Promise<any> => {
  return db.sequelize.getQueryInterface().dropAllTables();
};

export const migrateDatabase = (): Promise<any> => {
  return new Promise((resolve: any) => {
    spawn('npx sequelize-cli db:migrate', { cwd: path.join(__dirname, '..', '..', '..', 'migrations') });
    resolve();
  });
};
