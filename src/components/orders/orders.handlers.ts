import { Request, Response } from 'express';
import { httpCreated, httpNoContent } from '../../common/utils/http.utils';
import {
  createOrder,
  removeOrder,
  updateOrderStatus,
  getEmailSubject,
  getEmailText,
  getOrderStatus
} from './orders.utils';
import { sendEmail } from '../../common/utils/nodemailer.utils';
import { OrderStatus } from '../../common/enums/order.enum';
import { Role } from '../../common/enums/role.enum';

export const create = (req: Request, res: Response): Promise<any> => {
  const { user, employee, order } = req.body;

  return createOrder(order, user.accountId, employee.accountId)
    .then(() => sendEmail(
        process.env.NODEMAILER_EMAIL,
        employee.email,
        getEmailSubject(OrderStatus.New, Role.User),
        getEmailText(OrderStatus.New, Role.User)
      )
    )
    .then(() => httpCreated(res));
};

export const updateStatus = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { status, email, role } = req.body;

  return updateOrderStatus(id, status)
    .then(() => sendEmail(
        process.env.NODEMAILER_EMAIL,
        email,
        getEmailSubject(getOrderStatus(status), role),
        getEmailText(getOrderStatus(status), role)
      )
    )
    .then(() => httpNoContent(res));
};

export const remove = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  return removeOrder(id)
    .then(() => httpNoContent(res));
}
