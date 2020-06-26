import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  req.body.password = hashedPassword;

  next();
};
