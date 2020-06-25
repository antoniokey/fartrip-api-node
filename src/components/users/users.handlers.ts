import { Request, Response } from 'express';
import { createUser } from './users.utils';
import { User } from '../../common/models/user.model';
import { httpNoContent } from '../../common/utils/http.utils';

export const create = (req: Request, res: Response): Promise<any> => {
  const { email, password, name, age }: User = req.body;

  return createUser({ email, password, name, age })
      .then(() => httpNoContent(res));
};
