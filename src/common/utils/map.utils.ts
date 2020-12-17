import request from 'request-promise';
import { ExternalApi } from '../enums/external-api.enum';

const getRouteUrl = (key: string, placeFrom: string, placeTo: string): string => {
  return `${ExternalApi.Route}?key=${key}&from=${placeFrom}&to=${placeTo}`
};

const getRouteShapeUrl = (key: string, sessionId: string): string => {
  return `${ExternalApi.RouteShape}?key=${key}&sessionId=${sessionId}&fullShape=true`;
};

const getPoints = (shapePoints: any[]): any[] => {
  const result = [];

  for (let i = 0; i < shapePoints.length; i += 2) {
    result.push([shapePoints[i], shapePoints[i + 1]]);
  }

  return result;
};

export const getPointsBetweenTwoPlaces = async (placeFrom: string, placeTo: string): Promise<any[]> => {
  const routeResponse = JSON.parse(await request(getRouteUrl(<string>process.env.MAPQUEST_KEY, placeFrom, placeTo)));
  const routeShapeResponse = JSON.parse(await request(getRouteShapeUrl(<string>process.env.MAPQUEST_KEY, routeResponse.route.sessionId)));
  const shapePoints = routeShapeResponse.route.shape.shapePoints;
  const points = getPoints(shapePoints);
  const jsonPoints = points.reduce((acc, pointsPair) => {
    acc.push(`${pointsPair[0]}, ${pointsPair[1]}`);

    return acc;
  }, []);

  return jsonPoints;
};
