import { isArray } from 'lodash';
import supertest from 'supertest';
import app from '../../server';
import { AccountErrorMessage } from '../../src/common/enums/account.enum';
import { HttpStatus } from '../../src/common/enums/http.enum';
import { OAuthErrorMessage } from '../../src/common/enums/oauth.enum';
import { Role } from '../../src/common/enums/role.enum';
import { generateAccessToken, generateExpiredAccessToken } from '../../src/common/utils/jwt.utils';
import db from '../../src/db/config/db.config';

describe('Users Controller', () => {
  let access_token: string;
  let authorizationHeader: string;

  beforeAll(async () => {
    await db.sequelize.sync();
  });

  beforeEach(() => {
    access_token = generateAccessToken();
    authorizationHeader = `Bearer ${access_token}`;
  });

  it('GET /users should respond with 401 status code and "The authorization header is required" message if there is no authorization header', async done => {
    const { status, body } = await supertest(app).get('/users');

    expect(status).toBe(HttpStatus.Unauthorized);
    expect(body.status).toBe(HttpStatus.Unauthorized);
    expect(body.message).toBe(OAuthErrorMessage.MissingAuthHeader);

    done();
  });

  it('GET /users should respond with 401 status code and "The access token is expired" message if the access_token is expired', async done => {
    access_token = generateExpiredAccessToken();
    authorizationHeader = `Bearer ${access_token}`;
    const { status, body } = await supertest(app).get('/users').set('Authorization', authorizationHeader);

    expect(status).toBe(HttpStatus.Unauthorized);
    expect(body.status).toBe(HttpStatus.Unauthorized);
    expect(body.message).toBe(OAuthErrorMessage.AccessTokenTokenExpired);

    done();
  });

  it('GET /users should respond with 401 status code and "The authorization header is incorrect" message if the access_token is incorrect', async done => {
    const incorrectAuthHeader = `Incorrect ${access_token}`;
    const { status, body } = await supertest(app).get('/users').set('Authorization', incorrectAuthHeader);

    expect(status).toBe(HttpStatus.Unauthorized);
    expect(body.status).toBe(HttpStatus.Unauthorized);
    expect(body.message).toBe(OAuthErrorMessage.IncorrectAuthHeader);

    done();
  });

  it('POST /users should create a user with name User 3 and email testing-user3@gmail.com', async done => {
    const userData = {
      email: 'testing-user3@gmail.com',
      name: 'User 3',
      password: '123',
      role: Role.User,
      age: 20
    };
    const { body, status } = await supertest(app).post('/users').send(userData);

    expect(status).toBe(HttpStatus.Created);
    expect(body.email).toBe(userData.email);
    expect(body.name).toBe(userData.name);

    done();
  });

  it('POST /users should respond with 400 status code when email is already taken', async done => {
    const userData = {
      email: 'testing-user1@gmail.com',
      name: 'User 1',
      password: '123',
      role: Role.User,
      age: 20
    };
    const { body, status } = await supertest(app).post('/users').send(userData);

    expect(status).toBe(HttpStatus.BadRequest);
    expect(body.status).toBe(HttpStatus.BadRequest);
    expect(body.message).toBe(AccountErrorMessage.AccountExists);

    done();
  });

  it('GET /users should return 200 status with array of users', async done => {
    const { status, body } = await supertest(app).get('/users').set('Authorization', authorizationHeader);

    expect(status).toBe(HttpStatus.Success);
    expect(isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    done();
  });

  it('GET /users/:id should return 200 status and a user object with a spicific user id', async done => {
    const userId = 1;
    const { status, body } = await supertest(app).get(`/users/${userId}`).set('Authorization', authorizationHeader);

    expect(status).toBe(HttpStatus.Success);
    expect(!!body).toBeTruthy();
    expect(body.id).toBe(userId);

    done();
  });

  it('GET /users/:id/orders should return 200 status with array of orders for specific user by user id', async done => {
    const userId = 1;
    const { status, body } = await supertest(app).get(`/users/${userId}/orders`).set('Authorization', authorizationHeader);

    expect(status).toBe(HttpStatus.Success);
    expect(isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    done();
  });

  it('GET /users/:id/orders/:orderId should return 200 status and an order object with a spicific order id, for a specific user by user id', async done => {
    const userId = 1;
    const orderId = 1;
    const { status, body } = await supertest(app).get(`/users/${userId}/orders/${orderId}`).set('Authorization', authorizationHeader);

    expect(status).toBe(HttpStatus.Success);
    expect(!!body).toBeTruthy();
    expect(body.id).toBe(orderId);

    done();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

});
