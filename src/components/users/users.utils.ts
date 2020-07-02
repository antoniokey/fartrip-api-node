import db from '../../db/config/db.config';
import { QueryTypes, Transaction } from 'sequelize';

const getOrderEmployeeId = async (orderId: string): Promise<number> => {
  const query = `
    SELECT far_trip.order.employee_id
    FROM far_trip.order
    WHERE far_trip.order.id = :orderId;
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
    SELECT account.name
    FROM employee
    INNER JOIN account ON employee.account_id = account.id
    WHERE employee.id = :employeeId;

  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { employeeId: +employeeId },
    plain: true
  });

  return queryResult.name;
};

export const getUsers = async (): Promise<object[]> => {
  const query = `SELECT account.id, email, name, age FROM account;`;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  return queryResult;
};

export const getUser = async (accoundId: string): Promise<any> => {
  const query = `SELECT name, email, age FROM account WHERE id = :accoundId;`;
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
      far_trip.account.name,
      far_trip.order.id,
      far_trip.order.employee_id AS employeeId,
      far_trip.order.departure,
      far_trip.order.destination,
      far_trip.order.distance,
      far_trip.order.cost,
      far_trip.order.status,
      far_trip.order.spend_time AS spendTime
    FROM far_trip.user
    INNER JOIN far_trip.account ON far_trip.user.account_id = far_trip.account.id
    INNER JOIN far_trip.order ON far_trip.order.user_id = far_trip.user.id
    WHERE far_trip.account.id = :accountId;
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
      far_trip.order.departure,
      far_trip.order.destination,
      far_trip.order.distance,
      far_trip.order.cost,
      far_trip.order.status,
      far_trip.order.spend_time AS spendTime
    FROM far_trip.user
    INNER JOIN far_trip.account ON far_trip.user.account_id = far_trip.account.id
    INNER JOIN far_trip.order ON far_trip.order.user_id = far_trip.user.id
    WHERE far_trip.account.id = :accountId AND far_trip.order.id = :orderId;
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
      INSERT INTO user (account_id, created_date_time, modified_date_time)
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
        account
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
