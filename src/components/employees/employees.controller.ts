import express from 'express';
import { create } from './employees.handlers';
import { hashPasswordMiddleware } from '../../common/middlewares/hash-password.middleware';
import { accountExistsMiddleware } from '../../common/middlewares/account.middlewares';

const router = express.Router();

export default () => {
  router
    .post('/', accountExistsMiddleware, hashPasswordMiddleware, create);

  return router;
};
