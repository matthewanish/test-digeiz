import React from 'react';
import { getAverageSpeed, getNumberOfStops } from '../../helpers/scatter-plot.helpers';
import { InformationListProps } from './information-list.types';

const InformationList: React.FC<InformationListProps> = ({ data }) => {
  const durationOfJourney = data[data.length - 1].time;
  const averageSpeed = getAverageSpeed(data);
  const numberOfPoints = getNumberOfStops(data);

  return (
    <div>
      <h1>Duration of a Journey: {durationOfJourney}</h1>
      <h1>Average Speed: {averageSpeed}</h1>
      <h1>Number of Stops: {numberOfPoints}</h1>
    </div>
  );
};

export default React.memo(InformationList);
