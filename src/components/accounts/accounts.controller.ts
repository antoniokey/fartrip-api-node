import { Router } from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { update, remove } from './accounts.handlers';

export default () => {
  const router = Router();

  router
    .post('/:id/logo', authorizationMiddleware, update)
    .delete('/:id/logo', authorizationMiddleware, remove);

  return router;
};
