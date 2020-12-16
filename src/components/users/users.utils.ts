import db from '../../db/config/db.config';
import { QueryTypes, Transaction } from 'sequelize';
import { getOrderRoutePoints } from '../orders/orders.utils';
import { ApiError } from '../../../config/error-handlers';
import { HttpStatus } from '../../common/enums/http.enum';
import { UserErrorMessage } from '../../common/enums/user.enum';
import { AccountErrorMessage } from '../../common/enums/account.enum';
import { OrderErrorMessage } from '../../common/enums/order.enum';

const getOrderEmployeeId = async (orderId: string): Promise<number> => {
  const query = `
    SELECT orders.employee_id
    FROM orders
    WHERE orders.id = :orderId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { orderId: +orderId },
    plain: true
  });

  return queryResult.employee_id;
};

const getOrderEmployee = async (employeeId: number): Promise<any> => {
  const query = `
    SELECT accounts.name, accounts.email, accounts.logo
    FROM employees
    INNER JOIN accounts ON employees.account_id = accounts.id
    WHERE employees.id = :employeeId;

  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { employeeId: +employeeId },
    plain: true
  });

  return queryResult;
};

export const getUsers = async (): Promise<object[]> => {
  const query = `SELECT id, email, name, age FROM accounts;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  if (!queryResult.length) {
    throw new ApiError(UserErrorMessage.UsersNotFound, HttpStatus.NotFound);
  }

  return queryResult;
};

export const getUser = async (accountId: string): Promise<any> => {
  const query = `
    SELECT id, name, email, age, logo
    FROM accounts
    WHERE id = :accountId;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId: +accountId },
    plain: true
  });

  if (!queryResult) {
    throw new ApiError(AccountErrorMessage.AccountNotFound, HttpStatus.NotFound);
  }

  return queryResult;
};

export const getOrdersData = async (id: string): Promise<any> => {
  const query = `
    SELECT
      accounts.name,
      orders.id,
      orders.employee_id AS employeeId,
      orders.departure,
      orders.destination,
      orders.distance,
      orders.cost,
      orders.status,
      orders.spend_time AS spendTime
    FROM users
    INNER JOIN accounts ON users.account_id = accounts.id
    INNER JOIN orders ON orders.user_id = users.id
    WHERE accounts.id = :accountId
    ORDER BY orders.status;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId: +id }
  });

  if (!queryResult.length) {
    throw new ApiError(OrderErrorMessage.OrdersNotFound, HttpStatus.NotFound);
  }

  return queryResult;
};

export const getOrderData = async (accountId: string, orderId: string): Promise<any> => {
  const query = `
    SELECT
      orders.id,
      orders.departure,
      orders.destination,
      orders.distance,
      orders.cost,
      orders.status,
      orders.spend_time AS spendTime
    FROM users
    INNER JOIN accounts ON users.account_id = accounts.id
    INNER JOIN orders ON orders.user_id = users.id
    WHERE accounts.id = :accountId AND orders.id = :orderId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId: +accountId, orderId: +orderId },
    plain: true
  });

  if (!queryResult) {
    throw new ApiError(OrderErrorMessage.OrderNotFound, HttpStatus.NotFound);
  }

  const employeeId = await getOrderEmployeeId(orderId);
  const employee = await getOrderEmployee(employeeId);
  const orderRoutePoints = await getOrderRoutePoints(queryResult.id);

  return { ...queryResult, routePoints: orderRoutePoints, name: employee.name, email: employee.email, logo: employee.logo };
};

export const saveUser = async (accountId: number): Promise<void> => {
  return db.sequelize.transaction<void>(async (transaction: Transaction) => {
    const query = `
      INSERT INTO users (account_id, created_date_time, modified_date_time)
      VALUES (?);
    `;
    await db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [
        [accountId, new Date(), new Date()]
      ],
      transaction
    });
  })
};

export const updateUser = async (accountId: string, data: any): Promise<any> => {
  return db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      UPDATE
        accounts
      SET
        name = :accountName,
        email = :accountEmail,
        age = :accountAge
      WHERE
        id = :accountId
    `;
    const queryResult = await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { accountName: data, name, accountEmail: data.email, accountAge: data.age, accountId },
      transaction
    });

    return queryResult;
  });
};
