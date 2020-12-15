import bcrypt from 'bcrypt';
import { QueryTypes, Transaction } from 'sequelize';
import db from '../../db/config/db.config';
import { Role } from '../enums/role.enum';
import { saveUser } from '../../components/users/users.utils';
import { saveEmployee } from '../../components/employees/employees.utils';
import { Account } from '../models/account.model';
import { isPasswordCorrect } from './oauth.utils';

export const createAccount = async (accountData: Account): Promise<Account> => {
  const roleId: number = await getRoleId(accountData.role);
  const savedAccount: any = await saveAccountData(roleId, accountData.email, accountData.age, accountData.password, accountData.name);

  if (accountData.role === Role.User) {
    await saveUser(savedAccount[0]);
  } else {
    await saveEmployee(savedAccount[0], accountData);
  }

  return accountData;
};

export const getEmployeeIdByAccountId = async (accountId: string): Promise<any> => {
  const query = `
    SELECT employees.id
    FROM employees
    LEFT JOIN accounts ON employees.account_id = accounts.id
    WHERE accounts.id = :accountId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    plain: true,
    replacements: { accountId: +accountId }
  });

  return queryResult.id;
};

export const getUserIdByAccountId = async (accountId: string): Promise<any> => {
  const query = `
    SELECT users.id
    FROM users
    LEFT JOIN accounts ON users.account_id = accounts.id
    WHERE accounts.id = :accountId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    plain: true,
    replacements: { accountId: +accountId }
  });

  return queryResult.id;
};

export const getRoleId = async (role: string): Promise<number> => {
  const query = `SELECT id FROM roles WHERE role = :role`;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { role },
    plain: true
  });

  return queryResult.id;
};

export const saveAccountData = async (roleId: number, email: string, age: number, password: string, name: string): Promise<number[]> => {
  return db.sequelize.transaction(async (transaction: Transaction) => {
    const query = `
      INSERT INTO accounts (role_id, email, password, name, age, created_date_time, modified_date_time)
      VALUES (?);
    `;
    return await db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [
        [roleId, email, password, name, age, new Date(), new Date()]
      ],
      transaction
    });
  });
};

export const updateAccountPassword = async (accountId: string, password: string): Promise<any> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  
  return db.sequelize.transaction(async (transaction: Transaction) => {
    const query = `UPDATE accounts SET password = :password WHERE id = :accountId;`;

    return await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { password: hashedPassword, accountId },
      transaction
    });
  });
};

export const isAccountExist = async (email: any): Promise<boolean> => {
  const query = `SELECT id FROM accounts WHERE email = :email;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email },
    plain: true
  });

  return !!queryResult;
};

export const passwordCorrect = async (accountId: any, password: string): Promise<boolean> => {
  const accountPassword = await getAccountPassword(accountId);
  const passwordsEqual = await isPasswordCorrect(password, accountPassword);
  if (passwordsEqual) {
    return true;
  }

  return false;
};

const getAccountPassword = async (accountId: string): Promise<any> => {
  const query = `SELECT password FROM accounts WHERE id = :accountId`
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId },
    plain: true
  });

  return queryResult.password;
}
