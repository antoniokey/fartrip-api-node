import { NextFunction, Response, Request } from 'express';
import { isAccountExist, passwordCorrect, updateAccountPassword } from '../utils/account.utils';
import { httpBadRequest, httpNoContent } from '../utils/http.utils';
import { accountExistsError, incorrectPasswordError } from '../constants/error-messages/accounts.error-messages';

export const accountExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email } = req.body;
  const accountExists = await isAccountExist(email);
  
  if (accountExists) {
    return httpBadRequest(res, accountExistsError);
  }

  next();
};

export const updatePasswordDataMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { type } = req.query;
  const { id } = req.params;
  const { password, newPassword } = req.body;

  if (type !== 'password') {
    return next();
  }

  const isPasswordCorrect = await passwordCorrect(id, password);
  if (isPasswordCorrect) {
    return updateAccountPassword(id, newPassword)
      .then(() => httpNoContent(res));
  } else {
    return httpBadRequest(res, incorrectPasswordError);
  }
};
