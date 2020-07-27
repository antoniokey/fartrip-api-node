import express from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { create, remove, updateStatus } from './orders.handlers';
import { getDistanceBetweenPoints, computeCost, computeSpendTime } from './orders.middlewares';

const router = express.Router();

export default () => {
  router
    .post('/', authorizationMiddleware, getDistanceBetweenPoints, computeCost, computeSpendTime, create)
    .patch('/:id/status', authorizationMiddleware, updateStatus)
    .delete('/:id', authorizationMiddleware, remove);

  return router;
};
