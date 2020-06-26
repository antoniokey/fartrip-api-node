import atob from 'atob';
import { Request, Response, NextFunction } from 'express';
import { httpUnauthorized, httpSuccess } from '../../common/utils/http.utils';
import { checkTokenValidity, isExpiredTokenError, generateAccessToken } from '../../common/utils/jwt.utils';
import {
  missingAuthHeaderErrorMessage,
  incorrectAuthHeaderErrorMessage,
  missingGrantTypeErrorMessage,
  incorrectGrantTypeErrorMessage,
  missingCredentialsErrorMessage,
  missingRefreshTokenErrorMessage,
  refreshTokenExpiredErrorMessage,
  incorrectClientErrorMessage
} from '../../common/utils/oauth.utils';

export const oauthTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response<any> | void  => {
  const { grant_type, username, password } = req.query;
  const header = req.headers['authorization'];

  if (!grant_type) {
    return httpUnauthorized(res, missingGrantTypeErrorMessage);
  }
  if (grant_type === 'refresh_token') {
    return next();
  }
  if (grant_type !== 'password') {
    return httpUnauthorized(res, incorrectGrantTypeErrorMessage);
  }
  if (!header) {
    return httpUnauthorized(res, missingAuthHeaderErrorMessage);
  }
  if (!header.startsWith('Basic ')) {
    return httpUnauthorized(res, incorrectAuthHeaderErrorMessage);
  }
  
  const utf8Header = atob(header.replace('Basic ', ''));
  if (utf8Header !== `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`) {
    return httpUnauthorized(res, incorrectClientErrorMessage);
  }

  if (!username || !password) {
    return httpUnauthorized(res, missingCredentialsErrorMessage);
  }

  next();
};

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { grant_type, refresh_token } = req.query;

  if (!grant_type) {
    return httpUnauthorized(res, missingGrantTypeErrorMessage);
  }
  if (grant_type === 'password') {
    return next();
  }
  if (grant_type !== 'refresh_token') {
    return httpUnauthorized(res, incorrectGrantTypeErrorMessage);
  }
  if (!refresh_token) {
    return httpUnauthorized(res, missingRefreshTokenErrorMessage);
  }
  
  try {
    checkTokenValidity(refresh_token);

    return httpSuccess(res, { access_token: generateAccessToken(), refresh_token });
  } catch (error) {
    if (isExpiredTokenError(error)) {
      return httpUnauthorized(res, refreshTokenExpiredErrorMessage);
    }
  }
};
