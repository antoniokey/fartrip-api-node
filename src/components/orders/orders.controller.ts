import express from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { create, remove } from './orders.handlers';
import { getDistanceBetweenPoints, computeCost, computeSpendTime } from './orders.middlewares';

const router = express.Router();

export default () => {
  router
    .post('/', authorizationMiddleware, getDistanceBetweenPoints, computeCost, computeSpendTime, create)
    .delete('/:id', authorizationMiddleware, remove);

  return router;
};
