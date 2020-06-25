import { NextFunction, Response, Request } from 'express';
import { isAccountExist, accountExistsErrorMessage } from '../utils/account.utils';
import { httpBadRequest } from '../utils/http.utils';

export const accountExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email } = req.body;
  const accountExists = await isAccountExist(email);
  
  if (accountExists) {
    return httpBadRequest(res, accountExistsErrorMessage);
  }

  next();
};
