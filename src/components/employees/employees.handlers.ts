import { Request, Response } from 'express';
import { createAccount } from '../../common/utils/account.utils';
import { httpNoContent, httpSuccess, httpNotFound } from '../../common/utils/http.utils';
import { getEmployees, getEmployee, updateEmployee, getOrdersData, getOrderData, getCommentsData } from './employees.utils';

export const index = (req: Request, res: Response): Promise<any> => {
  return getEmployees()
    .then(data => httpSuccess(res, data));
};

export const getOne = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  
  return getEmployee(id)
    .then(data => httpSuccess(res, data))
    .catch(error => {
      if (error.status === 404) {
        return httpNotFound(res, null);
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

export const getComments = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  return getCommentsData(id)
    .then(data => httpSuccess(res, data))
};

export const create = (req: Request, res: Response): Promise<any> => {
  const { email, password, name, age, role } = req.body;

  return createAccount({ email, password, name, age, role })
    .then(() => httpNoContent(res));
};

export const updateOne = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, age, email, status } = req.body;

  return updateEmployee(id, { name, age, email, status })
      .then(() => httpNoContent(res));
};

