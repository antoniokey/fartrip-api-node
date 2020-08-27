import { Request, Response } from 'express';
import { updateLogo, removeLogo } from './accounts.utils';
import { httpSuccess, httpNoContent } from '../../common/utils/http.utils';

export const update = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { file } = req;

  return updateLogo(id, file.buffer)
    .then(data => httpSuccess(res, data))
};

export const remove = (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  return removeLogo(id)
    .then(() => httpNoContent(res));
};
