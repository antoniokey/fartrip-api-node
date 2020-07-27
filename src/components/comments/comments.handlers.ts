import { Request, Response } from 'express';
import { httpNoContent } from '../../common/utils/http.utils';
import { removeComment } from './comments.utils';

export const removeOne = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  
  return removeComment(id)
    .then(() => httpNoContent(res));
};
