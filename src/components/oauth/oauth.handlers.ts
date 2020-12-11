import { Request, Response } from 'express';
import { authenticateUser, refreshToken } from './oauth.utils';
import { httpSuccess } from '../../common/utils/http.utils';
import { ApiError } from '../../../config/error-handlers';
import { handleError } from '../../common/utils/error.util';

export const token = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.query;

  return authenticateUser(username, password)
      .then((data: any) => httpSuccess(res, data))
      .catch((err: ApiError) => handleError(err, res));
};

export const refresh = (req: Request, res: Response): Promise<any> => {
  const { refresh_token } = req.query;

  return refreshToken(<string>refresh_token)
    .then((data: any) => httpSuccess(res, data));
}
