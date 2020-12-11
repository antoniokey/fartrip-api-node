import { Response } from 'express';
import { ApiError } from '../../../config/error-handlers';

const logError = (err: ApiError) => {
  console.log(JSON.stringify({ time: new Date().toLocaleString(), status: err.status, message: err.message }));
};

export const handleError = async (err: ApiError, res: Response): Promise<any> => {
  logError(err);

  return res.status(err.status).json({ status: err.status, message: err.message });
};
