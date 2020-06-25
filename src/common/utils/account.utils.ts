import { QueryTypes } from 'sequelize';
import db from '../../db/config/db.config';
import { Role } from '../enums/role.enum';
import { saveUser } from '../../components/users/users.utils';
import { saveEmployee } from '../../components/employees/employees.utils';
import { Account } from '../models/account.model';
import { HttpStatus } from '../enums/http-status.enum';
import { AccountErrorMessage } from '../enums/account.enum';

export const accountExistsErrorMessage = { status: HttpStatus.BadRequest, errorMessage: AccountErrorMessage.AccountExists };

export const createAccount = async (accountData: Account): Promise<void> => {
  const roleId: number = await getRoleId(accountData.role);
  const savedAccount: any = await saveAccountData(roleId, accountData.email, accountData.age, accountData.password, accountData.name);

  if (accountData.role === Role.User) {
    await saveUser(savedAccount[0]);
  } else {
    await saveEmployee(savedAccount[0]);
  }
};

export const getRoleId = async (role: string): Promise<number> => {
  const query = `SELECT id FROM role WHERE role = :role`;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { role },
    plain: true
  });

  return queryResult.id;
};

export const saveAccountData = async (roleId: number, email: string, age: number, password: string, name: string): Promise<number[]> => {
  const query = `
    INSERT INTO account (role_id, email, password, name, age, created_date_time, modified_date_time)
    VALUES (?);
  `;
  return await db.sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [
      [roleId, email, password, name, age, new Date(), new Date()]
    ]
  });
};

export const isAccountExist = async (email: any): Promise<boolean> => {
  const query = `SELECT id FROM account WHERE email = :email`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email },
    plain: true
  });

  return !!queryResult;
};