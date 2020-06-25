import { Request, Response } from 'express';
import { httpNoContent } from '../../common/utils/http.utils';
import { createAccount } from '../../common/utils/account.utils';

export const create = (req: Request, res: Response): Promise<any> => {
  const { email, password, name, age, role } = req.body;

  return createAccount({ email, password, name, age, role })
      .then(() => httpNoContent(res));
};
