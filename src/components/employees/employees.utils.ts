import { EmployeeStatus } from '../../common/enums/employee-status';
import { QueryTypes } from 'sequelize';
import db from '../../db/config/db.config';

export const getEmployees = async (): Promise<object[]> => {
  const query = `
    SELECT
      employee.id,
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

export const getEmployee = async (employeeId: any): Promise<object> => {
  const query = `
    SELECT
      employee.id,
      account.name,
      employee.status,
      employee.rating,
      car.model,
      car.note
    FROM employee
    INNER JOIN account ON employee.account_id = account.id
    INNER JOIN car ON car.employee_id = employee.id
    WHERE employee.id = :employeeId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { employeeId },
    plain: true
  });

  return {
    id: queryResult.id,
    name: queryResult.name,
    status: queryResult.status,
    rating: queryResult.rating,
    car: { model: queryResult.model, note: queryResult.note }
  };
};

export const saveEmployee = async (accountId: number, status: EmployeeStatus = EmployeeStatus.OutOfWork, rating: number = 0.0): Promise<void> => {
  const query = `
    INSERT INTO employee (account_id, status, rating, created_date_time, modified_date_time)
    VALUES (?);
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [
      [accountId, status, rating, new Date(), new Date()]
    ]
  });

  saveCar(queryResult[0]);
};

const saveCar = async (employee_id: number): Promise<void> => {
  const query = `
    INSERT INTO car (employee_id, created_date_time, modified_date_time)
    VALUES (?);
  `;
  db.sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [
      [employee_id, new Date(), new Date()]
    ]
  });
};
