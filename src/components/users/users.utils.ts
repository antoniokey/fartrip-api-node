import { User } from '../../common/models/user.model';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const createUser = async (userData: User): Promise<any> => {
  const roleQuery = `SELECT id FROM role WHERE role = 'USER'`;
  const accountQuery = `
    INSERT INTO account (role_id, email, password, name, age, created_date_time, modified_date_time)
    VALUES (?);
  `;
  const userQuery = `
    INSERT INTO user (account_id, created_date_time, modified_date_time)
    VALUES (?);
  `;

  const roleQueryResult: any = await db.sequelize.query(roleQuery, {
    type: QueryTypes.SELECT,
    plain: true
  });

  const accountQueryResult = await db.sequelize.query(accountQuery, {
    type: QueryTypes.INSERT,
    replacements: [
      [roleQueryResult.id, userData.email, userData.password, userData.name, userData.age, new Date(), new Date()]
    ]
  });

  await db.sequelize.query(userQuery, {
    type: QueryTypes.INSERT,
    replacements: [
      [accountQueryResult[0], new Date(), new Date()]
    ]
  });

  return accountQueryResult;
};

export const isUserExist = async (email: any): Promise<boolean> => {
  const query = `SELECT id FROM account WHERE email = :email`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email },
    plain: true
  });

  return !!queryResult;
};
