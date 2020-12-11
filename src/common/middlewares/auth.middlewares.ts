import { Request, Response, NextFunction } from 'express';
import { checkTokenValidity, isExpiredTokenError } from '../utils/jwt.utils';
import { handleError } from '../utils/error.util';
import { ApiError } from '../../../config/error-handlers';
import { OAuthErrorMessage } from '../enums/oauth.enum';
import { HttpStatus } from '../enums/http.enum';

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const header = req.headers.authorization;
  if (!header) {
    return handleError(new ApiError(OAuthErrorMessage.MissingAuthHeader, HttpStatus.Unauthorized), res);
  }

  const token = header.replace('Bearer ', '');
  try {
    checkTokenValidity(token);
  } catch (error) {
    if (isExpiredTokenError(error)) {
      return handleError(new ApiError(OAuthErrorMessage.AccessTokenTokenExpired, HttpStatus.Unauthorized), res);
    }

    return handleError(new ApiError(OAuthErrorMessage.IncorrectAuthHeader, HttpStatus.Unauthorized), res);
  }

  next();
};
