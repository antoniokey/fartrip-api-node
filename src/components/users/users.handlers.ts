import { Request, Response } from 'express';
import { createUser } from './users.utils';
import { httpNoContent } from '../../common/utils/http.utils';

export const create = (req: Request, res: Response): Promise<any> => {
  const { email, password, name, age, role } = req.body;

  return createUser({ email, password, name, age, role })
      .then(() => httpNoContent(res));
};
