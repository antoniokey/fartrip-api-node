import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const getUsers = async (): Promise<object[]> => {
  const query = `SELECT email, name, age FROM account;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  return queryResult;
};

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
