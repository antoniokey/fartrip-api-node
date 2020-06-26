import { Request, Response, NextFunction } from 'express';
import { httpUnauthorized } from '../utils/http.utils';
import { checkAccessTokenValidity, isExpiredTokenError } from '../utils/jwt.utils';
import {
  missingAuthHeaderErrorMessage,
  incorrectAuthHeaderErrorMessage,
  accessTokenExpiredErrorMessage
} from '../utils/oauth.utils';

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const header = req.headers.authorization;
  if (!header) {
    return httpUnauthorized(res, missingAuthHeaderErrorMessage);
  }

  const token = header.replace('Bearer ', '');
  try {
    checkAccessTokenValidity(token);
  } catch (error) {
    if (isExpiredTokenError(error)) {
      return httpUnauthorized(res, accessTokenExpiredErrorMessage);
    }

    return httpUnauthorized(res, incorrectAuthHeaderErrorMessage);
  }

  next();
};
