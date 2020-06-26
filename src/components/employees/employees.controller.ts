import express from 'express';
import { create, index, getOne } from './employees.handlers';
import { hashPasswordMiddleware } from '../../common/middlewares/hash-password.middlewares';
import { accountExistsMiddleware } from '../../common/middlewares/account.middlewares';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';

const router = express.Router();

export default () => {
  router
    .get('/', authorizationMiddleware, index)
    .get('/:id', authorizationMiddleware, getOne)
    .post('/', accountExistsMiddleware, hashPasswordMiddleware, create);

  return router;
};
