import { Request, Response } from 'express';
import { authenticateUser } from './oauth.utils';
import { httpSuccess, httpNotFound } from '../../common/utils/http.utils';
import { ErrorMesage } from '../../common/models/error.model';

export const token = (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.query;

  return authenticateUser(username, password)
      .then((data: any) => httpSuccess(res, data))
      .catch((err: ErrorMesage) => httpNotFound(res, err));
};
