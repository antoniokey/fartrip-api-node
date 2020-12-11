import express from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { update, remove } from './accounts.handlers';

const router = express.Router();

router.post('/:id/logo', authorizationMiddleware, update);
router.delete('/:id/logo', authorizationMiddleware, remove);

export default router;
