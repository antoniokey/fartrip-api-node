import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const saveUser = async (accountId: number): Promise<void> => {
  const query = `
    INSERT INTO user (account_id, created_date_time, modified_date_time)
    VALUES (?);
  `;
  await db.sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [
      [accountId, new Date(), new Date()]
    ]
  });
};
