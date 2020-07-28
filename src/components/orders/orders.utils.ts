import { getUserIdByAccountId, getEmployeeIdByAccountId } from '../../common/utils/account.utils';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';
import { OrderStatus } from '../../common/enums/order.status';
import { EmailEmployeeSubject, EmailEmployeeText, EmailUserSubject, EmailUserText } from '../../common/enums/email.enum';
import { Role } from '../../common/enums/role.enum';

export const getOrderStatus = (status: string): OrderStatus => {
  let result;

  if (status === OrderStatus.Canceled) {
    result =  OrderStatus.Canceled;
  } else if (status === OrderStatus.Completed) {
    result = OrderStatus.Completed;
  } else if (status === OrderStatus.New) {
    result = OrderStatus.New;
  } else {
    result = OrderStatus.InProgress;
  }
  
  return result;
};

export const createOrder = async (order: any, userAccountId: string, employeeAccountId: string): Promise<any> => {
  const userId = await getUserIdByAccountId(userAccountId);
  const employeeId = await getEmployeeIdByAccountId(employeeAccountId);
  const query = `
    INSERT INTO far_trip.orders
      (user_id, employee_id, departure, destination, distance, cost, spend_time, created_date_time, modified_date_time, status, time, date, user_notes)
    VALUES (?);
  `;
  await db.sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [
      [
        +userId,
        +employeeId,
        order.departure,
        order.destination,
        order.distance,
        order.cost,
        order.spendTime,
        new Date(),
        new Date(),
        OrderStatus.New,
        order.time,
        order.date,
        order.userNotes
      ]
    ]
  });
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<any> => {
  const query = 'UPDATE orders SET status = :status WHERE id = :orderId';
  await db.sequelize.query(query, {
    type: QueryTypes.UPDATE,
    replacements: { orderId, status: getOrderStatus(status) }
  });
};

export const removeOrder = async (orderId: string): Promise<any> => {
  const query = `DELETE FROM orders WHERE id = :orderId;`;
  
  await db.sequelize.query(query, {
    type: QueryTypes.DELETE,
    replacements: { orderId }
  });
};

export const getEmailSubject = (status: OrderStatus, role: Role): EmailUserSubject | EmailEmployeeSubject => {
  let subject;

  if (status === OrderStatus.InProgress) {
    subject = EmailUserSubject.OrderConfirmation;
  } else if (status === OrderStatus.Canceled) {
    subject = role === Role.Employee ? EmailUserSubject.OrderCancelation : EmailEmployeeSubject.OrderCancelation;
  } else {
    subject = EmailEmployeeSubject.OrderCreation;
  }

  return subject;
};

export const getEmailText = (status: OrderStatus, role: Role): EmailUserText | EmailEmployeeText => {
  let text;

  if (status === OrderStatus.InProgress) {
    text = EmailUserText.OrderConfirmation;
  } else if (status === OrderStatus.Canceled) {
    text = role === Role.Employee ? EmailUserText.OrderCancelation : EmailEmployeeText.OrderCancelation;
  } else {
    text = EmailEmployeeText.OrderCreation;
  }

  return text;
};
