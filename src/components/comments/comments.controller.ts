import express from 'express';
import { authorizationMiddleware } from '../../common/middlewares/auth.middlewares';
import { removeOne } from './comments.handlers';

const router = express.Router();

router.delete('/:id', authorizationMiddleware, removeOne);

export default router;
