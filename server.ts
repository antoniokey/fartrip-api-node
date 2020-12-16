import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsRequest } from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import OAuthController from './src/components/oauth/oauth.controller';
import UsersController from './src/components/users/users.controller';
import EmployeesController from './src/components/employees/employees.controller';
import OrdersController from './src/components/orders/orders.controller';
import CommentsController from './src/components/comments/comments.controller';
import AccountsController from './src/components/accounts/accounts.controller';
import { rateLimitSecurity } from './config/security';

dotenv.config();

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(helmet());
app.use(morgan<Request, Response>('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '300kb' }));
app.use(cors<CorsRequest>({ origin: process.env.DEV_ORIGIN }));
app.use(multer().single('logo'));

app.use('/oauth', rateLimitSecurity, OAuthController);
app.use('/accounts', AccountsController);
app.use('/users', UsersController);
app.use('/employees', EmployeesController);
app.use('/orders', OrdersController);
app.use('/comments', CommentsController);

export default app;
