import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const rateLimitSecurity = rateLimit({
  windowMs: 15 * 1 * 1000,
  max: 5,
  handler(req: Request, res: Response) {
    return res.status(429).json({
      message: 'Too many loggin requests, try again in an 5 min!',
      code: 429
    });
  }
});
