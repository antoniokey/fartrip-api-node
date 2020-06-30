import { NextFunction, Response, Request } from 'express';
import { isAccountExist, accountExistsErrorMessage, passwordCorrect, updateAccountPassword, incorrectPasswordErrorMessage } from '../utils/account.utils';
import { httpBadRequest, httpNoContent } from '../utils/http.utils';

export const accountExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email } = req.body;
  const accountExists = await isAccountExist(email);
  
  if (accountExists) {
    return httpBadRequest(res, accountExistsErrorMessage);
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
    return httpBadRequest(res, incorrectPasswordErrorMessage);
  }
};
