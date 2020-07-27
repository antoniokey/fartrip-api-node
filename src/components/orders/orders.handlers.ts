import { Request, Response } from 'express';
import { httpCreated, httpNoContent } from '../../common/utils/http.utils';
import { createOrder, removeOrder } from './orders.utils';

export const create = (req: Request, res: Response): Promise<any> => {
  const { user, employee, order } = req.body;

  return createOrder(order, user.accountId, employee.accountId)
    .then(() => httpCreated(res));
};

export const remove = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  return removeOrder(id)
    .then(() => httpNoContent(res));
}
