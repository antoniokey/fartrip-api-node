import { Request, Response, NextFunction } from 'express';
import { isUserExist } from './users.utils';
import { httpBadRequest } from '../../common/utils/http.utils';
import { userExistsErrorMessage } from '../../common/utils/user.utils';

export const userExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email } = req.body;
    const userExists = await isUserExist(email);
    
    if (userExists) {
      return httpBadRequest(res, userExistsErrorMessage);
    }

    next();
};
