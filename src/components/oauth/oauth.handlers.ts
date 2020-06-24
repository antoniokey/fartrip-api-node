import { Request, Response } from 'express';
import { authenticateUser } from './oauth.utils';
import { httpSuccess } from '../../common/utils/http.util';

export const token = (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.query;

  return authenticateUser(username, password)
    .then((data: any) => httpSuccess(res, data));
};
