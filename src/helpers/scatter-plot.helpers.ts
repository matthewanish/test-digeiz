import { PathPart } from '../interfaces/path.interfaces';
import { Point } from '../interfaces/point.interface';

const getDistanceBetweenPoints = (startPoint: Point, endPoint: Point): number =>
  Math.sqrt(Math.pow(Math.abs(startPoint.x - endPoint.x), 2) + Math.pow(Math.abs(startPoint.y - endPoint.y), 2));

const getArrayOfDistances = (data: PathPart[]): Array<number> =>
  Array.from({ length: data.length - 1 }).map((_, index) =>
    getDistanceBetweenPoints({ x: data[index].x, y: data[index].y }, { x: data[index + 1].x, y: data[index + 1].y }),
  );

export const getAverageSpeed = (data: PathPart[]): number => {
  const filteredArrayOfDistances = getArrayOfDistances(data).filter((item) => item !== 0);
  const arrayOfSpeed = filteredArrayOfDistances.map((item, index) => item / data[index].time);
  const averageSpeed = arrayOfSpeed.reduce((acc, element) => acc + element, 0) / arrayOfSpeed.length;

  return Number(averageSpeed.toFixed(4));
};

export const getNumberOfStops = (data: PathPart[]): number => {
  const numberOfStops = getArrayOfDistances(data).reduce((acc, elem) => (elem === 0 ? acc + 1 : acc), 0);

  return numberOfStops;
};
