import express from 'express';
import { oauthTokenMiddleware, refreshTokenMiddleware } from './oauth.middlewares';
import { refresh, token } from './oauth.handlers';

const router = express.Router();

const OAuthController = () => {
  router
    .post('/token', oauthTokenMiddleware, token)
    .post('/refresh', refreshTokenMiddleware, refresh);

  return router;
};

export default OAuthController; 
