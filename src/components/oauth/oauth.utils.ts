import { userNotFoundErrorMessage, getAuthResponse } from '../../common/utils/oauth.utils';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const authenticateUser = async (username: any, password: any): Promise<any> => {
  const query = `
    SELECT account.id AS accountId, account.email, role.role, account.name
    FROM role
    RIGHT JOIN account ON account.role_id = role.id
    WHERE email = :email`;
    
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email: username },
    plain: true
  });

  if (!queryResult) {
    return Promise.reject(userNotFoundErrorMessage);
  }

  return getAuthResponse(queryResult);
};
