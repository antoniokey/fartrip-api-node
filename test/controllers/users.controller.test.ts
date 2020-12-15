import { isArray } from 'lodash';
import supertest from 'supertest';
import app from '../../server';
import { Role } from '../../src/common/enums/role.enum';
import { generateAccessToken } from '../../src/common/utils/jwt.utils';
import db from '../../src/db/config/db.config';

describe('Users Controller', () => {
  let access_token: string;

  beforeAll(async () => {
    await db.sequelize.sync();
  });

  beforeEach(() => {
    access_token = `Bearer ${generateAccessToken()}`;
  });

  it('GET /users should return 404 if no users were found', async done => {
    const { status } = await supertest(app).get('/users').set('Authorization', access_token);

    expect(status).toBe(404);
    done();
  });

  it('GET /users/:id should return 404 if a user a specific id was not found', async done => {
    const { status } = await supertest(app).get('/users/1').set('Authorization', access_token);

    expect(status).toBe(404);
    done();
  });

  it('POST /users should create a user with name TestingUser1 and email testing-user1@gmail.com', async done => {
    const userData = {
      email: 'testing-user1@gmail.com',
      name: 'TestingUser1',
      password: '123',
      role: Role.User,
      age: 20
    };
    const { body, status } = await supertest(app).post('/users').send(userData).set('Authorization', access_token);

    expect(status).toBe(201);
    expect(body.email).toBe(userData.email);
    expect(body.name).toBe(userData.name);
    done();
  });

  it('GET /users should return 200 status with array of users', async done => {
    const { status, body } = await supertest(app).get('/users').set('Authorization', access_token);

    expect(status).toBe(200);
    expect(isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    done();
  });

  it('GET /users/:id should return 200 status and a user object with a spicific user id', async done => {
    const { status, body } = await supertest(app).get('/users/1').set('Authorization', access_token);

    expect(status).toBe(200);
    expect(!!body).toBeTruthy();
    expect(body.id).toBe(1);
    done();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

});
