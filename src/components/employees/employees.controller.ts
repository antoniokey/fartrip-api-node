import express from 'express';
import { hashPasswordMiddleware } from '../../common/middlewares/hash-password.middlewares';
import { accountExistsMiddleware, updatePasswordDataMiddleware } from '../../common/middlewares/account.middlewares';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { updateCarDataMiddleware } from './employees.middlewares';
import {
  create,
  index,
  getOne,
  updateOne,
  getOrders,
  getOrder,
  getComments,
  createComment,
  updateCar,
  removeCar
} from './employees.handlers';

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
    .post('/:id/car', authorizationMiddleware, updateCar)
    .delete('/:id/car', authorizationMiddleware, removeCar)
    .patch('/:id', authorizationMiddleware, updatePasswordDataMiddleware, updateCarDataMiddleware, updateOne);

  return router;
};
