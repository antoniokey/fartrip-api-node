import { NextFunction, Response, Request } from 'express';
import { isAccountExist, passwordCorrect, updateAccountPassword } from '../utils/account.utils';
import {  httpNoContent } from '../utils/http.utils';
import { HttpStatus } from '../enums/http.enum';
import { AccountErrorMessage } from '../enums/account.enum';
import { ApiError } from '../../../config/error-handlers';
import { handleError } from '../utils/error.util';

export const accountExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email } = req.body;
  const accountExists = await isAccountExist(email);
  
  if (accountExists) {
    return handleError(new ApiError(AccountErrorMessage.AccountExists, HttpStatus.BadRequest), res);
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
    return handleError(new ApiError(AccountErrorMessage.IncorrectPassword, HttpStatus.BadRequest), res);
  }
};
