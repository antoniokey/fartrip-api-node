import atob from 'atob';
import { Request, Response, NextFunction } from 'express';
import { httpUnauthorized } from '../../common/utils/http.utils';
import { checkTokenValidity, isExpiredTokenError } from '../../common/utils/jwt.utils';
import {
  incorrectAuthHeaderError,
  incorrectClientError,
  incorrectGrantTypeError,
  missingAuthHeaderError,
  missingCredentialsError,
  missingGrantTypeError,
  missingRefreshTokenError,
  refreshTokenExpiredError
} from '../../common/constants/error-messages/oauth.error-messages';

export const oauthTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response<any> | void  => {
  const { grant_type, username, password } = req.query;
  const header = req.headers['authorization'];

  if (!grant_type) {
    return httpUnauthorized(res, missingGrantTypeError);
  }
  if (grant_type !== 'password') {
    return httpUnauthorized(res, incorrectGrantTypeError);
  }
  if (!header) {
    return httpUnauthorized(res, missingAuthHeaderError);
  }
  if (!header.startsWith('Basic ')) {
    return httpUnauthorized(res, incorrectAuthHeaderError);
  }
  
  const utf8Header = atob(header.replace('Basic ', ''));
  if (utf8Header !== `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`) {
    return httpUnauthorized(res, incorrectClientError);
  }

  if (!username || !password) {
    return httpUnauthorized(res, missingCredentialsError);
  }

  next();
};

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { grant_type, refresh_token } = req.query;

  if (!grant_type) {
    return httpUnauthorized(res, missingGrantTypeError);
  }
  if (grant_type !== 'refresh_token') {
    return httpUnauthorized(res, incorrectGrantTypeError);
  }
  if (!refresh_token) {
    return httpUnauthorized(res, missingRefreshTokenError);
  }
  
  try {
    checkTokenValidity(refresh_token);

    next();
  } catch (error) {
    if (isExpiredTokenError(error)) {
      return httpUnauthorized(res, refreshTokenExpiredError);
    }
  }
};
