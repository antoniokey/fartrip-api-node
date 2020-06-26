import express from 'express';
import { oauthTokenMiddleware, refreshTokenMiddleware } from './oauth.middlewares';
import { token } from './oauth.handlers';

const router = express.Router();

const OAuthController = () => {
  router
    .post('/token', oauthTokenMiddleware, refreshTokenMiddleware, token)

  return router;
};

export default OAuthController; 
