import { getUserIdByAccountId, getEmployeeIdByAccountId } from '../../common/utils/account.utils';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';
import { OrderStatus } from '../../common/enums/order.status';

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

export const removeOrder = async (orderId: string): Promise<any> => {
  const query = `DELETE FROM orders WHERE id = :orderId;`;
  
  await db.sequelize.query(query, {
    type: QueryTypes.DELETE,
    replacements: { orderId }
  });
};
