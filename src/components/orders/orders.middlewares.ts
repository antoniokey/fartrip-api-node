import { Request, Response, NextFunction } from 'express';
import request from 'request'
import { ExternalApi } from '../../common/enums/external-api.enum';

export const getDistanceBetweenPoints = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { departure, destination } = req.body.order;

  request(`${ExternalApi.Distance}?stops=${departure}|${destination}`, (err, response, body) => {
    const distance = JSON.parse(body).distance;
    req.body.order.distance = distance;

    next();
  });
};

export const computeCost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { employee, order } = req.body;
  const cost = order.distance * employee.costPerKm;

  req.body.order.cost = cost;

  next();
};

export const computeSpendTime = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { order } = req.body;
  const spendTime = (order.distance / 100) * 3600;

  req.body.order.spendTime = spendTime;

  next();
};

