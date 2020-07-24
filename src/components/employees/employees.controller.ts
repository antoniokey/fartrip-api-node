import express from 'express';
import { create, index, getOne, updateOne, getOrders, getOrder, getComments, createComment } from './employees.handlers';
import { hashPasswordMiddleware } from '../../common/middlewares/hash-password.middlewares';
import { accountExistsMiddleware, updatePasswordDataMiddleware } from '../../common/middlewares/account.middlewares';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { updateCarDataMiddleware } from './employees.middlewares';

const router = express.Router();

export default () => {
  router
    .get('/', authorizationMiddleware, index)
    .get('/:id', authorizationMiddleware, getOne)
    .get('/:id/orders', authorizationMiddleware, getOrders)
    .get('/:id/orders/:orderId', authorizationMiddleware, getOrder)
    .get('/:id/comments', authorizationMiddleware, getComments)
    .post('/:id/comments', authorizationMiddleware, createComment)
    .post('/', accountExistsMiddleware, hashPasswordMiddleware, create)
    .patch('/:id', authorizationMiddleware, updatePasswordDataMiddleware, updateCarDataMiddleware, updateOne);

  return router;
};
