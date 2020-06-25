import { EmployeeStatus } from '../../common/enums/employee-status';
import { QueryTypes } from 'sequelize';
import db from '../../db/config/db.config';

export const saveEmployee = async (accountId: number, status?: EmployeeStatus, rating?: number): Promise<void> => {
  const query = `
    INSERT INTO employee (account_id, status, rating created_date_time, modified_date_time)
    VALUES (?);
  `;
  await db.sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [
      [accountId, status, rating, new Date(), new Date()]
    ]
  });
};