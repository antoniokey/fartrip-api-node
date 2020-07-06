import { Request, Response } from 'express';
import { httpCreated } from '../../common/utils/http.utils';
import { createOrder } from './orders.utils';

export const create = (req: Request, res: Response): Promise<any> => {
  const { user, employee, order } = req.body;

  return createOrder(order, user.userAccountId, employee.employeeAccountId)
    .then(() => httpCreated(res));
};
