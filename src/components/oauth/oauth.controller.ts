import express from 'express';
import { oauthTokenMiddleware, refreshTokenMiddleware } from './oauth.middlewares';
import { refresh, token } from './oauth.handlers';

const router = express.Router();

router.post('/token', oauthTokenMiddleware, token);
router.post('/refresh', refreshTokenMiddleware, refresh);

export default router;
