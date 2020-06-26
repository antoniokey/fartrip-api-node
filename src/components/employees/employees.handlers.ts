import { Request, Response } from 'express';
import { createAccount } from '../../common/utils/account.utils';
import { httpNoContent, httpSuccess } from '../../common/utils/http.utils';
import { getEmployees, getEmployee } from './employees.utils';

export const index = (req: Request, res: Response): Promise<any> => {
  return getEmployees()
    .then(data => httpSuccess(res, data));
};

export const getOne = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  
  return getEmployee(id)
    .then(data => httpSuccess(res, data));
};

export const create = (req: Request, res: Response): Promise<any> => {
  const { email, password, name, age, role } = req.body;

  return createAccount({ email, password, name, age, role })
    .then(() => httpNoContent(res));
};
