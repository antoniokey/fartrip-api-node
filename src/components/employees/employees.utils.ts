import { Transaction, QueryTypes } from 'sequelize';
import { EmployeeStatus } from '../../common/enums/employee-status';;
import db from '../../db/config/db.config';
import { accountNotFoundErrorMessage } from '../../common/utils/account.utils';

const getOrderUserId = async (orderId: string): Promise<number> => {
  const query = `
    SELECT far_trip.order.user_id
    FROM far_trip.order
    WHERE far_trip.order.id = :orderId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { orderId: +orderId },
    plain: true
  });

  return queryResult.user_id;
};

const getOrderUserName = async (userId: number): Promise<string> => {
  const query = `
    SELECT account.name
    FROM user
    INNER JOIN account ON user.account_id = account.id
    WHERE user.id = :userId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { userId: +userId },
    plain: true
  });

  return queryResult.name;
};

export const getEmployees = async (): Promise<object[]> => {
  const query = `
    SELECT
      account.id,
      account.email,
      account.name,
      account.age,
      employee.status,
      employee.rating,
      car.model,
      car.note
    FROM employee
    INNER JOIN account ON employee.account_id = account.id
    INNER JOIN car ON car.employee_id = employee.id;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  return queryResult;
};

export const getEmployee = async (accountId: any): Promise<any> => {
  const query = `
    SELECT
      account.id,
      account.name,
      account.email,
      account.age,
      employee.status,
      employee.rating,
      employee.work_description,
      car.model,
      car.note
    FROM employee
    INNER JOIN account ON employee.account_id = account.id
    INNER JOIN car ON car.employee_id = employee.id
    WHERE account.id = :accountId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId },
    plain: true
  });

  if (queryResult) {
    return {
      id: queryResult.id,
      name: queryResult.name,
      email: queryResult.email,
      age: queryResult.age,
      status: queryResult.status,
      rating: queryResult.rating,
      workDescription: queryResult.work_description,
      car: { model: queryResult.model, note: queryResult.note }
    };
  }

  return Promise.reject(accountNotFoundErrorMessage);
};

export const getOrdersData = async (id: string): Promise<any> => {
  const query = `
    SELECT
      far_trip.account.name,
      far_trip.order.id,
      far_trip.order.user_id AS userId,
      far_trip.order.departure,
      far_trip.order.destination,
      far_trip.order.distance,
      far_trip.order.cost,
      far_trip.order.status,
      far_trip.order.spend_time AS spendTime
    FROM far_trip.employee
    INNER JOIN far_trip.account ON far_trip.employee.account_id = far_trip.account.id
    INNER JOIN far_trip.order ON far_trip.order.employee_id = far_trip.employee.id
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
    FROM far_trip.employee
    INNER JOIN far_trip.account ON far_trip.employee.account_id = far_trip.account.id
    INNER JOIN far_trip.order ON far_trip.order.employee_id = far_trip.employee.id
    WHERE far_trip.account.id = :accountId AND far_trip.order.id = :orderId;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId: +accountId, orderId: +orderId },
    plain: true
  });
  const userId = await getOrderUserId(orderId);
  const userName = await getOrderUserName(userId);

  return { ...queryResult, name: userName };
};

export const updateCarData = async (accountId: string, data: any): Promise<any> => {
  return db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      UPDATE
        car
      INNER JOIN
        employee
      ON
        employee.id = car.employee_id
      INNER JOIN
        account
      ON
        employee.account_id = account.id
      SET
        car.model = :carModel,
        car.note = :carNote
      WHERE
        account.id = :accountId;
    `;
    await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { accountId: +accountId, carModel: data.model, carNote: data.note },
      transaction
    });
  });
};

export const saveEmployee = async (accountId: number, status: EmployeeStatus = EmployeeStatus.OutOfWork, rating: number = 0.0): Promise<void> => {
  return db.sequelize.transaction<void>(async (transaction: Transaction) => {
    const query = `
      INSERT INTO employee (account_id, status, rating, created_date_time, modified_date_time)
      VALUES (?);
    `;
    const queryResult = await db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [
        [accountId, status, rating, new Date(), new Date()]
      ],
      transaction
    });

    saveCar(queryResult[0]);
  });
};

const saveCar = async (employee_id: number): Promise<void> => {
  return db.sequelize.transaction<void>(async (transaction: Transaction) => {
    const query = `
      INSERT INTO car (employee_id, created_date_time, modified_date_time)
      VALUES (?);
    `;
    db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [
        [employee_id, new Date(), new Date()]
      ],
      transaction
    });
  });
};

export const updateEmployee = async (accountId: string, data: any): Promise<any> => {
  return db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      UPDATE
        account
      INNER JOIN
        employee
      ON
        employee.account_id = account.id
      SET
        account.name = :accountName,
        account.email = :accountEmail,
        account.age = :accountAge,
        employee.status = :employeeStatus
      WHERE
        account.id = :accountId
    `;
    const queryResult = await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: {
        accountName: data.name,
        accountEmail: data.email,
        accountAge: data.age,
        employeeStatus: data.status,
        accountId: +accountId
      },
      transaction
    });

    return queryResult;
  });
};
