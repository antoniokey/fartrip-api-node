import Account from '../../db/account.model';
import { userNotFoundErrorMessage } from '../../common/utils/oauth.util';

export const authenticateUser = (username: any, password: any): Promise<any> => {
  return Account.findOne<Account>({
    where: { email: username }
  })
    .then((user => {
      if (!user) {
        return Promise.reject(userNotFoundErrorMessage);
      }
    }));
};
