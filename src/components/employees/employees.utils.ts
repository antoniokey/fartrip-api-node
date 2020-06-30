import { Transaction, QueryTypes } from 'sequelize';
import { EmployeeStatus } from '../../common/enums/employee-status';;
import db from '../../db/config/db.config';
import { accountNotFoundErrorMessage } from '../../common/utils/account.utils';

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
