import db from '../../db/config/db.config';
import { QueryTypes, Transaction } from 'sequelize';

export const getUsers = async (): Promise<object[]> => {
  const query = `SELECT account.id, email, name, age FROM account;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  return queryResult;
};

export const getUser = async (accoundId: string): Promise<any> => {
  const query = `SELECT name, email, age FROM account WHERE id = :accoundId;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accoundId: +accoundId },
    plain: true
  });

  return queryResult;
;};

export const saveUser = async (accountId: number): Promise<void> => {
  return db.sequelize.transaction<void>(async (transaction: Transaction) => {
    const query = `
      INSERT INTO user (account_id, created_date_time, modified_date_time)
      VALUES (?);
    `;
    await db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [
        [accountId, new Date(), new Date()]
      ],
      transaction
    });
  })
};

export const updateUser = async (accountId: string, data: any): Promise<any> => {
  return db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      UPDATE
        account
      SET
        name = :accountName,
        email = :accountEmail,
        age = :accountAge
      WHERE
        id = :accountId
    `;
    const queryResult = await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { accountName: data, name, accountEmail: data.email, accountAge: data.age, accountId },
      transaction
    });

    return queryResult;
  });
};
