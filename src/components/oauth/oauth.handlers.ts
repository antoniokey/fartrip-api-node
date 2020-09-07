import { Request, Response } from 'express';
import {authenticateUser, refreshToken} from './oauth.utils';
import { httpSuccess, handleHttpError } from '../../common/utils/http.utils';
import { ErrorMesage } from '../../common/models/error.model';

export const token = (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.query;

  return authenticateUser(username, password)
      .then((data: any) => httpSuccess(res, data))
      .catch((err: ErrorMesage) => handleHttpError(res, err));
};

export const refresh = (req: Request, res: Response): Promise<any> => {
  const { refresh_token } = req.query;

  return refreshToken(<string>refresh_token)
    .then((data: any) => httpSuccess(res, data));
}
