import express from 'express';
import { oauthTokenMiddleware } from './oauth.middlewares';
import { token } from './oauth.handlers';

const router = express.Router();

const OAuthController = () => {
  router
    .post('/token', oauthTokenMiddleware, token);

  return router;
};

export default OAuthController; 
