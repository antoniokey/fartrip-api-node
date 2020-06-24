import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import OAuthController from './src/components/oauth/oauth.controller';

dotenv.config();

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.DEV_ORIGIN }));
app.use(multer().any());

app.use('/oauth', OAuthController());

export default app;
