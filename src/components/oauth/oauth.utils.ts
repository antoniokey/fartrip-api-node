import { userNotFoundErrorMessage, getAuthResponse } from '../../common/utils/oauth.utils';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';
import { OAuthTokenResponse } from '../../common/models/oauth.model'
import { isPasswordCorrect } from '../../common/utils/oauth.utils';
import { Account } from '../../common/models/account.model';

export const authenticateUser = async (username: any, password: any): Promise<OAuthTokenResponse> => {
  const authenticatedUser: Account | null = await getAuthenticatedUser(username, password);
  if (!authenticatedUser) {
    return Promise.reject(userNotFoundErrorMessage);
  }

  const passwordCorrect = await isPasswordCorrect(password, authenticatedUser.password);
  if (!passwordCorrect) {
    return Promise.reject(userNotFoundErrorMessage);
  }

  return getAuthResponse(authenticatedUser);
};

const getAuthenticatedUser = async (username: any, password: any): Promise<Account> => {
  const query = `
    SELECT accounts.id, accounts.email, roles.role, accounts.name, accounts.password
    FROM roles
    RIGHT JOIN accounts ON accounts.role_id = roles.id
    WHERE email = :email;
  `;
  
  const queryResult: Account = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email: username },
    plain: true
  });

  return queryResult;
};
