import { getUserIdByAccountId, getEmployeeIdByAccountId } from '../../common/utils/account.utils';
import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';
import { OrderStatus } from '../../common/enums/order.enum';
import { EmailEmployeeSubject, EmailEmployeeText, EmailUserSubject, EmailUserText } from '../../common/enums/email.enum';
import { Role } from '../../common/enums/role.enum';
import { getPointsBetweenTwoPlaces } from '../../common/utils/map.utils';
import { Transaction } from 'sequelize';

const saveOrderRoutePoints = async (orderId: number, pointsBetweenTwoPlaces: any[]): Promise<any> => {
  const routePoints = pointsBetweenTwoPlaces.map(pointsPair => [orderId, pointsPair, new Date(), new Date()]);
  let queryValuesTemplate: string;

  queryValuesTemplate = pointsBetweenTwoPlaces.reduce<string>(acc => acc + '(?), ', '');
  queryValuesTemplate = queryValuesTemplate.slice(0, queryValuesTemplate.length - 2);

  return db.sequelize.transaction<void>(async (transaction: Transaction) => {
    const query = `
      INSERT INTO orders_route_points (order_id, route_points, created_date_time, modified_date_time)
      VALUES ${queryValuesTemplate}
    `;
    await db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: routePoints,
      transaction
    });
  });
};

const prepareRoutePoints = (routePoints: any[]): any[] => {
  return routePoints.map((pointsPair: any) => {
    const pointsAsAnArray = pointsPair.points.split(', ');
    const convertedRoutePoints = [+pointsAsAnArray[0], +pointsAsAnArray[1]];

    return convertedRoutePoints;
  });
};

export const getOrderRoutePoints = async (orderId: number): Promise<any[]> => {
  const query = `
    SELECT route_points AS points
    FROM orders_route_points
    WHERE order_id = :orderId;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { orderId }
  });
  const routePoints = prepareRoutePoints(queryResult);

  return routePoints;
};

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
  const pointsBetweenTwoPlaces = await getPointsBetweenTwoPlaces(order.departure, order.destination);
  const query = `
    INSERT INTO orders
      (user_id, employee_id, departure, destination, distance, cost, spend_time, created_date_time, modified_date_time, status, time, date, user_notes)
    VALUES (?);
  `;
  const createdOrder = await db.sequelize.query(query, {
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
  const orderId = createdOrder[0];

  await saveOrderRoutePoints(orderId, pointsBetweenTwoPlaces);

  return order;
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
