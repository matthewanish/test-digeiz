import { useState } from 'react';
import { ScatterPlot } from '../../components/scatter-plot';
import { InformationList } from '../../components/information-list';
import data from '../../assets/trajectoires.json';

const Main = () => {
  const [personData, setPersonData] = useState(data[0]);

  const sortedArray = personData.points.sort((a, b) => a.time - b.time);

  const handlePersonChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPersonData = data.find((item) => item.id === target.value) || data[0];
    setPersonData(selectedPersonData);
  };

  return (
    <div>
      <select onChange={handlePersonChange}>
        {data.map((item) => (
          <option key={item.id}>{item.id}</option>
        ))}
      </select>
      <ScatterPlot data={sortedArray} />
      <InformationList data={sortedArray} />
    </div>
  );
};

export default Main;
