import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { HttpStatus } from '../src/common/enums/http.enum';
import { handleError } from '../src/common/utils/error.util';
import { securityErrorMessage } from '../src/common/utils/security.utils';
import { ApiError } from './error-handlers';

export const rateLimitSecurity = rateLimit({
  windowMs: 15 * 1 * 5000,
  max: 8,
  handler(req: Request, res: Response) {
    try {
      throw new ApiError(securityErrorMessage(`${req.baseUrl}${req.path}`), HttpStatus.TooManyRequests);
    } catch(err) {
      return handleError(err, res);
    }
  }
});
