import Account from '../../db/account.model';
import { userNotFoundErrorMessage } from '../../common/utils/oauth.util';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const authenticateUser = (username: any, password: any): Promise<any> => {
  const query = `SELECT * FROM account WHERE email = "${username}"`;

  return db.sequelize.query(query, { type: QueryTypes.SELECT, plain: true })
    .then(value => {
      if (!value) {
        return Promise.reject(userNotFoundErrorMessage);
      }

      return value;
    });
};
