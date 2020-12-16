import supertest from 'supertest';
import app from '../../server';
import { HttpStatus } from '../../src/common/enums/http.enum';
import { OAuthErrorMessage } from '../../src/common/enums/oauth.enum';
import db from '../../src/db/config/db.config';

describe('OAuth Controller', () => {
  let grant_type: string;
  let authorization_basic_header: string;

  beforeAll(async () => {
    await db.sequelize.sync();
  });

  beforeEach(() => {
    grant_type = 'password';
    authorization_basic_header = `Basic ${btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`;
  });

  it('POST /oauth/token should return authorized information', async done => {
    const expectedAuthorizedInfo = ['access_token', 'refresh_token', 'token_type', 'role', 'id', 'expires_in', 'email'];
    const queryString = `grant_type=${grant_type}&username=testing-user1@gmail.com&password=123`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString).set('Authorization', authorization_basic_header);
    const responseAuthorizedInfo = Object.keys(body);
    
    expect(status).toBe(HttpStatus.Success);
    expectedAuthorizedInfo.forEach(infoItem => expect(responseAuthorizedInfo.includes(infoItem)).toBeTruthy());
    done();
  });

  it('POST /oauth/token should return 400 status code and "The grant_type parameter is required" message if the grant type is missing', async done => {
    const queryString = `grant_type&username=testing-user1@gmail.com&password=123`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString).set('Authorization', authorization_basic_header);

    expect(status).toBe(HttpStatus.BadRequest);
    expect(body.status).toBe(HttpStatus.BadRequest);
    expect(body.message).toBe(OAuthErrorMessage.MissingGrantType);
    done();
  });

  it('POST /oauth/token should return 400 status code and "The grant_type parameter contains incorrect value" if the grant type is invalid', async done => {
    const invalidGrantType = 'invalid';
    const queryString = `grant_type=${invalidGrantType}&username=testing-user1@gmail.com&password=123`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString).set('Authorization', authorization_basic_header);

    expect(status).toBe(HttpStatus.BadRequest);
    expect(body.status).toBe(HttpStatus.BadRequest);
    expect(body.message).toBe(OAuthErrorMessage.IncorrectGrantType);
    done();
  });

  it('POST /oauth/token should return 400 status code and "The authorization header is required" message if the auth basic header is missing', async done => {
    const queryString = `grant_type=${grant_type}&username=testing-user1@gmail.com&password=123`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString);

    expect(status).toBe(HttpStatus.BadRequest);
    expect(body.status).toBe(HttpStatus.BadRequest);
    expect(body.message).toBe(OAuthErrorMessage.MissingAuthHeader);
    done();
  });

  it('POST /oauth/token should return 400 status code and "The authorization header is incorrect" if the auth basic header is invalid', async done => {
    const queryString = `grant_type=${grant_type}&username=testing-user1@gmail.com&password=123`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString).set('Authorization', `Bearer `);

    expect(status).toBe(HttpStatus.BadRequest);
    expect(body.status).toBe(HttpStatus.BadRequest);
    expect(body.message).toBe(OAuthErrorMessage.IncorrectAuthHeader);
    done();
  });

  it('POST /oauth/token should return 404 status code and "Email or password is incorrect" if the there is no user in the db', async done => {
    const queryString = `grant_type=${grant_type}&username=testing-user10@gmail.com&password=123`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString).set('Authorization', authorization_basic_header);

    expect(status).toBe(HttpStatus.NotFound);
    expect(body.status).toBe(HttpStatus.NotFound);
    expect(body.message).toBe(OAuthErrorMessage.UserNotFound);
    done();
  });

  it('POST /oauth/token should return 400 status code and "The username and password are required" if the are no username and password in query string', async done => {
    const queryString = `grant_type=${grant_type}&username&password`;
    const { status, body } = await supertest(app).post('/oauth/token').query(queryString).set('Authorization', authorization_basic_header);

    expect(status).toBe(HttpStatus.BadRequest);
    expect(body.status).toBe(HttpStatus.BadRequest);
    expect(body.message).toBe(OAuthErrorMessage.MissingCredentials);
    done();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

});
