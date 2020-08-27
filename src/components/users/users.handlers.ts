import { Request, Response } from 'express';
import { httpNoContent, httpSuccess, httpNotFound } from '../../common/utils/http.utils';
import { createAccount } from '../../common/utils/account.utils';
import { getUsers, getUser, updateUser, getOrdersData, getOrderData } from './users.utils';

export const index = (req: Request, res: Response): Promise<any> => {
  return getUsers()
    .then(data => httpSuccess(res, data));
};

export const getOne = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  return getUser(id)
    .then(data => httpSuccess(res, data))
    .catch(err => {
      if (err.status === 404) {
        return httpNotFound(res, err);
      }
    });
};

export const getOrders = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  return getOrdersData(id)
    .then(data => httpSuccess(res, data));
};

export const getOrder = (req: Request, res: Response): Promise<any> => {
  const { id, orderId } = req.params;

  return getOrderData(id, orderId)
    .then(data => httpSuccess(res, data));
};

export const create = (req: Request, res: Response): Promise<any> => {
  const { email, password, name, age, role } = req.body;

  return createAccount({ email, password, name, age, role })
      .then(() => httpNoContent(res));
};

export const updateOne = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  return updateUser(id, { name, age, email })
      .then(() => httpNoContent(res));
};
