import atob from 'atob';
import { Request, Response, NextFunction } from 'express';
import { checkTokenValidity, isExpiredTokenError } from '../../common/utils/jwt.utils';
import { handleError } from '../../common/utils/error.util';
import { ApiError } from '../../../config/error-handlers';
import { OAuthErrorMessage } from '../../common/enums/oauth.enum';
import { HttpStatus } from '../../common/enums/http.enum';

export const oauthTokenMiddleware = (req: Request, res: Response, next: NextFunction): any  => {
  const { grant_type, username, password } = req.query;
  const header = req.headers['authorization'];

  if (!grant_type) {
    return handleError(new ApiError(OAuthErrorMessage.MissingGrantType, HttpStatus.BadRequest), res);
  }
  if (grant_type !== 'password') {
    return handleError(new ApiError(OAuthErrorMessage.IncorrectGrantType, HttpStatus.BadRequest), res);
  }
  if (!header) {
    return handleError(new ApiError(OAuthErrorMessage.MissingAuthHeader, HttpStatus.BadRequest), res);
  }
  if (!header.startsWith('Basic ')) {
    return handleError(new ApiError(OAuthErrorMessage.IncorrectAuthHeader, HttpStatus.BadRequest), res);
  }
  
  const utf8Header = atob(header.replace('Basic ', ''));
  if (utf8Header !== `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`) {
    return handleError(new ApiError(OAuthErrorMessage.IncorrectClient, HttpStatus.BadRequest), res);
  }

  if (!username || !password) {
    return handleError(new ApiError(OAuthErrorMessage.MissingCredentials, HttpStatus.BadRequest), res);
  }

  next();
};

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { grant_type, refresh_token } = req.query;

  if (!grant_type) {
    return handleError(new ApiError(OAuthErrorMessage.MissingGrantType, HttpStatus.BadRequest), res);
  }
  if (grant_type !== 'refresh_token') {
    return handleError(new ApiError(OAuthErrorMessage.IncorrectGrantType, HttpStatus.BadRequest), res);
  }
  if (!refresh_token) {
    return handleError(new ApiError(OAuthErrorMessage.MissingRefreshToken, HttpStatus.BadRequest), res);
  }
  
  try {
    checkTokenValidity(refresh_token);

    next();
  } catch (error) {
    if (isExpiredTokenError(error)) {
      return handleError(new ApiError(OAuthErrorMessage.RefreshTokenTokenExpired, HttpStatus.BadRequest), res);
    }
  }
};
