import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Navigation';
import { Card } from '../Card';
import { Navigation } from '../Navigation';
import { Menu } from '../Menu';

const spacex = `https://api.spacexdata.com/v3/launches/upcoming`;

const Sorts = {
  latest: list => sortBy(list, 'date'),
  oldest: list => sortBy(list, 'date').reverse(),
  name: list => sortBy(list, 'title')
}

const getData = async () => {
  return fetch(spacex).then(res => res.json())
}

const onCardClick = (event) => {
  console.log(event.target.getAttribute('number'));
}

function App() {

  const [data, setData] = useState([]);
  const [dataForCard, setDataForCard] = useState([]);
  const [activeSort, setActiveSort] = useState('latest');

  const list = Sorts[activeSort](dataForCard);

  const onSortChange = (event) => {
    const newSort = event.target.text;
    if (newSort !== activeSort) {
      setActiveSort(newSort);
    }
  }

  useEffect(() => {
    (async () => {
      const res = await getData();
      setData(res);
      setDataForCard(
        res
          .filter(item => ((new Date(item['launch_date_local']) - new Date()) > 0))
          .map(item => ({
            name: item['mission_name'],
            date: new Date(item['launch_date_local'])
          })));

    })();
  }, []);
  console.log(dataForCard)

  return (
    <div className="App">
      <Navigation />
      <div className="body-container">
        <Menu sortString={activeSort} onSortChange={onSortChange} />
        <div className="card-container">
          {list.length ?
            list.map((item, index) => <Card key={index} number={index} title={item['name']} date={item['date']} onCardClick={onCardClick} />)
            : <span className="spinner-grow" role="status" ></span>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
