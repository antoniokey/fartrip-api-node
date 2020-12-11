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

router.get('/', authorizationMiddleware, index);
router.get('/:id', authorizationMiddleware, getOne);
router.get('/:id/orders', authorizationMiddleware, getOrders);
router.get('/:id/orders/:orderId', authorizationMiddleware, getOrder);
router.get('/:id/comments', authorizationMiddleware, getComments);
router.post('/:id/comments', authorizationMiddleware, createComment);
router.post('/', accountExistsMiddleware, hashPasswordMiddleware, create);
router.post('/:id/car', authorizationMiddleware, updateCar);
router.delete('/:id/car', authorizationMiddleware, removeCar);
router.patch('/:id', authorizationMiddleware, updatePasswordDataMiddleware, updateCarDataMiddleware, updateOne);
  
export default router;
