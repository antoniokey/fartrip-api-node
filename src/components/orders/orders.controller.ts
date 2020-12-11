import express from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { create, remove, updateStatus } from './orders.handlers';
import { getDistanceBetweenPoints, computeCost, computeSpendTime } from './orders.middlewares';

const router = express.Router();

router.post('/', authorizationMiddleware, getDistanceBetweenPoints, computeCost, computeSpendTime, create);
router.patch('/:id/status', authorizationMiddleware, updateStatus);
router.delete('/:id', authorizationMiddleware, remove);

export default router;
