import db from '../../db/config/db.config';
import { QueryTypes, Transaction } from 'sequelize';

const getOrderEmployeeId = async (orderId: string): Promise<number> => {
  const query = `
    SELECT far_trip.orders.employee_id
    FROM far_trip.orders
    WHERE far_trip.orders.id = :orderId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { orderId: +orderId },
    plain: true
  });

  return queryResult.employee_id;
};

const getOrderEmployeeName = async (employeeId: number): Promise<string> => {
  const query = `
    SELECT accounts.name
    FROM employees
    INNER JOIN accounts ON employees.account_id = accounts.id
    WHERE employees.id = :employeeId;

  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { employeeId: +employeeId },
    plain: true
  });

  return queryResult.name;
};

export const getUsers = async (): Promise<object[]> => {
  const query = `SELECT id, email, name, age FROM accounts;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  return queryResult;
};

export const getUser = async (accoundId: string): Promise<any> => {
  const query = `SELECT name, email, age FROM accounts WHERE id = :accoundId;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accoundId: +accoundId },
    plain: true
  });

  return queryResult;
};

export const getOrdersData = async (id: string): Promise<any> => {
  const query = `
    SELECT
      far_trip.accounts.name,
      far_trip.orders.id,
      far_trip.orders.employee_id AS employeeId,
      far_trip.orders.departure,
      far_trip.orders.destination,
      far_trip.orders.distance,
      far_trip.orders.cost,
      far_trip.orders.status,
      far_trip.orders.spend_time AS spendTime
    FROM far_trip.users
    INNER JOIN far_trip.accounts ON far_trip.users.account_id = far_trip.accounts.id
    INNER JOIN far_trip.orders ON far_trip.orders.user_id = far_trip.users.id
    WHERE far_trip.accounts.id = :accountId;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId: +id }
  });

  return queryResult;
};

export const getOrderData = async (accountId: string, orderId: string): Promise<any> => {
  const query = `
    SELECT
      far_trip.orders.departure,
      far_trip.orders.destination,
      far_trip.orders.distance,
      far_trip.orders.cost,
      far_trip.orders.status,
      far_trip.orders.spend_time AS spendTime
    FROM far_trip.users
    INNER JOIN far_trip.accounts ON far_trip.users.account_id = far_trip.accounts.id
    INNER JOIN far_trip.orders ON far_trip.orders.user_id = far_trip.users.id
    WHERE far_trip.accounts.id = :accountId AND far_trip.orders.id = :orderId;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId: +accountId, orderId: +orderId },
    plain: true
  });
  const employeeId = await getOrderEmployeeId(orderId);
  const employeeName = await getOrderEmployeeName(employeeId);

  return {
    ...queryResult,
    name: employeeName
  };
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
