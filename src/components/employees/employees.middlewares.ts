import { Request, Response, NextFunction } from 'express';
import { httpNoContent } from '../../common/utils/http.utils';
import { updateCarData } from './employees.utils';

export const updateCarDataMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { type } = req.query;
  const { id } = req.params;
  const { model, note } = req.body;

  if (type !== 'car') {
    return next();
  }

  return updateCarData(id, { model, note })
    .then(() => httpNoContent(res));
};
