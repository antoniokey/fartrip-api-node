import { Request, Response, NextFunction } from 'express';
import { httpBadRequest } from '../../common/utils/http.utils';
import { userExistsErrorMessage } from '../../common/utils/user.utils';
import { isAccountExist } from '../../common/utils/account.utils';

export const userExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email } = req.body;
    const userExists = await isAccountExist(email);
    
    if (userExists) {
      return httpBadRequest(res, userExistsErrorMessage);
    }

    next();
};
