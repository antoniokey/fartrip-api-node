import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;

  next();
};
