import request from 'request-promise';

const getPoints = (shapePoints: any[]): any[] => {
  const result = [];

  for (let i = 0; i < shapePoints.length; i += 2) {
    result.push([shapePoints[i], shapePoints[i + 1]]);
  }

  return result;
};

export const getPointsBetweenTwoPlaces = async (placeFrom: string, placeTo: string): Promise<any[]> => {
  const requestResult = await request(`${process.env.MAP_ROUTE_URL}&from=${placeFrom}&to=${placeTo}`);
  const shapePoints = JSON.parse(requestResult).route.shape.shapePoints;
  const points = getPoints(shapePoints);
  const jsonPoints = points.reduce((acc, pointsPair) => {
    acc.push(`${pointsPair[0]}, ${pointsPair[1]}`);

    return acc;
  }, []);

  return jsonPoints;
};
