import express from 'express';
import { create, index, getOne, updateOne, getOrders, getOrder } from './users.handlers';
import { hashPasswordMiddleware } from '../../common/middlewares/hash-password.middlewares';
import { accountExistsMiddleware, updatePasswordDataMiddleware } from '../../common/middlewares/account.middlewares';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';

const router = express.Router();

router.get('/', authorizationMiddleware, index);
router.get('/:id', authorizationMiddleware, getOne);
router.get('/:id/orders', authorizationMiddleware, getOrders);
router.get('/:id/orders/:orderId', authorizationMiddleware, getOrder);
router.post('/', accountExistsMiddleware, hashPasswordMiddleware, create);
router.patch('/:id', authorizationMiddleware, updatePasswordDataMiddleware, updateOne);

export default router;
