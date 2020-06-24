import { Request, Response, NextFunction } from 'express';
import { httpBadRequest, httpUnauthorized } from '../../common/utils/http.util';
import {
  missingAuthHeaderErrorMessage,
  incorrectAuthHeaderErrorMessage,
  missingGrantTypeErrorMessage,
  incorrectGrantTypeErrorMessage,
  missingCredentialsErrorMessage
} from '../../common/utils/oauth.util';

export const oauthTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response<any> | void  => {
  const { grant_type, username, password } = req.query;
  const header = req.headers['authorization'];

  if (!header) {
    return httpUnauthorized(res, missingAuthHeaderErrorMessage);
  }
  if (!header.startsWith('Basic')) {
    return httpBadRequest(res, incorrectAuthHeaderErrorMessage);
  }
  if (!grant_type) {
    return httpBadRequest(res, missingGrantTypeErrorMessage);
  }
  if (grant_type !== 'password') {
    return httpBadRequest(res, incorrectGrantTypeErrorMessage);
  }
  if (!username || !password) {
    return httpBadRequest(res, missingCredentialsErrorMessage);
  }

  next();
};
