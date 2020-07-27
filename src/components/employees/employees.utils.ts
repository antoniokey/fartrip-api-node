import { Transaction, QueryTypes } from 'sequelize';
import { flatten } from 'lodash';
import { EmployeeStatus } from '../../common/enums/employee-status';;
import db from '../../db/config/db.config';
import { accountNotFoundErrorMessage, getEmployeeIdByAccountId, getUserIdByAccountId } from '../../common/utils/account.utils';

const getOrderUserId = async (orderId: string): Promise<number> => {
  const query = `
    SELECT far_trip.orders.user_id
    FROM far_trip.orders
    WHERE far_trip.orders.id = :orderId;
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
    SELECT accounts.name
    FROM users
    INNER JOIN accounts ON users.account_id = accounts.id
    WHERE users.id = :userId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { userId: +userId },
    plain: true
  });

  return queryResult.name;
};

const getCommentsUserNames = (comments: any[]) => {
  const query = `
    SELECT far_trip.accounts.name
    FROM far_trip.users
    INNER JOIN far_trip.accounts ON far_trip.accounts.id = far_trip.users.account_id
    WHERE far_trip.users.id = :userId
  `;
  const queryPromises: any[] = [];

  comments.forEach((comment: any) => {
    queryPromises.push(
      db.sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { userId: comment.userId }
      })
    );
  });

  return Promise.all(queryPromises);
};

const getCommentById = async (commentId: number): Promise<any> => {
  const query = `
    SELECT
      far_trip.accounts.name AS userName,
      far_trip.comments.comment,
      far_trip.comments.created_date_time AS createdDate
    FROM far_trip.comments
    INNER JOIN far_trip.users ON far_trip.users.id = far_trip.comments.user_id
    INNER JOIN far_trip.accounts ON far_trip.accounts.id = far_trip.users.account_id
    WHERE far_trip.comments.id = :commentId;
  `;
  const queryResult: any = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    plain: true,
    replacements: { commentId }
  });

  return queryResult;
};

export const getEmployees = async (): Promise<object[]> => {
  const query = `
    SELECT
      accounts.id,
      accounts.email,
      accounts.name,
      accounts.age,
      employees.status,
      employees.rating,
      cars.model,
      cars.note
    FROM employees
    INNER JOIN accounts ON employees.account_id = accounts.id
    INNER JOIN cars ON cars.employee_id = employees.id;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT
  });

  return queryResult;
};

export const getEmployee = async (accountId: any): Promise<any> => {
  const query = `
    SELECT
      accounts.id,
      accounts.name,
      accounts.email,
      accounts.age,
      employees.status,
      employees.cost_per_km,
      employees.rating,
      employees.work_description,
      cars.model,
      cars.note
    FROM employees
    INNER JOIN accounts ON employees.account_id = accounts.id
    INNER JOIN cars ON cars.employee_id = employees.id
    WHERE accounts.id = :accountId;
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
      costPerKm: queryResult.cost_per_km,
      workDescription: queryResult.work_description,
      car: { model: queryResult.model, note: queryResult.note }
    };
  }

  return Promise.reject(accountNotFoundErrorMessage);
};

export const getOrdersData = async (id: string): Promise<any> => {
  const query = `
    SELECT
      far_trip.accounts.name,
      far_trip.orders.id,
      far_trip.orders.user_id AS userId,
      far_trip.orders.departure,
      far_trip.orders.destination,
      far_trip.orders.distance,
      far_trip.orders.cost,
      far_trip.orders.status,
      far_trip.orders.spend_time AS spendTime
    FROM far_trip.employees
    INNER JOIN far_trip.accounts ON far_trip.employees.account_id = far_trip.accounts.id
    INNER JOIN far_trip.orders ON far_trip.orders.employee_id = far_trip.employees.id
    WHERE far_trip.accounts.id = :accountId
    ORDER BY far_trip.orders.status;
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
    FROM far_trip.employees
    INNER JOIN far_trip.accounts ON far_trip.employees.account_id = far_trip.accounts.id
    INNER JOIN far_trip.orders ON far_trip.orders.employee_id = far_trip.employees.id
    WHERE far_trip.accounts.id = :accountId AND far_trip.orders.id = :orderId;
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

export const getCommentsData = async (accountId: string): Promise<any> => {
  const query = `
    SELECT
      far_trip.comments.comment,
      far_trip.comments.created_date_time AS createdDate,
      far_trip.comments.user_id AS userId
    FROM far_trip.employees
    INNER JOIN far_trip.comments ON far_trip.employees.id = far_trip.comments.employee_id
    WHERE far_trip.employees.account_id = :accountId;
  `;
  const queryResult = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { accountId }
  });
  const commentsUserNames = await getCommentsUserNames(queryResult);

  const result = queryResult.map((commentItem: any, index: number) => ({
    comment: commentItem.comment,
    createdDate: commentItem.createdDate,
    userName: flatten(commentsUserNames)[index].name
  }));

  return result;
};

export const updateCarData = async (accountId: string, data: any): Promise<any> => {
  return db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      UPDATE
        cars
      INNER JOIN
        employees
      ON
        employees.id = cars.employee_id
      INNER JOIN
        accounts
      ON
        employees.account_id = accounts.id
      SET
        cars.model = :carModel,
        cars.note = :carNote
      WHERE
        accounts.id = :accountId;
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
      INSERT INTO employees (account_id, status, rating, created_date_time, modified_date_time)
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
      INSERT INTO cars (employee_id, created_date_time, modified_date_time)
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

export const createCommentData = async (employeeAccountId: string, userAccountId: string, comment: any): Promise<any> => {
  const employeeId = await getEmployeeIdByAccountId(employeeAccountId);
  const userId = await getUserIdByAccountId(userAccountId);
  const createdCommentId = await db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      INSERT INTO comments (user_id, employee_id, comment, created_date_time, modified_date_time)
      VALUES (?)
    `;
    const queryResult = await db.sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [
        [userId, employeeId, comment.comment, new Date(), new Date()]
      ],
      transaction
    });

    return queryResult[0];
  });
  const createdComment = await getCommentById(createdCommentId);

  return createdComment;
};

export const updateEmployee = async (accountId: string, data: any): Promise<any> => {
  return db.sequelize.transaction<any>(async (transaction: Transaction) => {
    const query = `
      UPDATE
        accounts
      INNER JOIN
        employees
      ON
        employees.account_id = account.id
      SET
        accounts.name = :accountName,
        accounts.email = :accountEmail,
        accounts.age = :accountAge,
        employees.status = :employeeStatus
      WHERE
        accounts.id = :accountId
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
