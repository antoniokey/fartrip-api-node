import express from 'express';
import { create } from './users.handlers';
import { hashPasswordMiddleware } from '../../common/middlewares/hash-password.middleware';
import { userExistsMiddleware } from './users.middlewares';

const router = express.Router();

export default () => {
  router
    .post('/', userExistsMiddleware, hashPasswordMiddleware, create);

  return router;
};
