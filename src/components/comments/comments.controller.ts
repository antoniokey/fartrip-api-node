import { Router } from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { removeOne } from './comments.handlers';

const router = Router();

export default () => {
  router.delete('/:id', authorizationMiddleware, removeOne);

  return router;
};
