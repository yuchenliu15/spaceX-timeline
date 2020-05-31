import React, { useEffect, useState } from 'react';
import {sortBy} from 'lodash';
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
  const [activeSort, setActiveSort] = useState('latest');
  let list = data.map(item => ({
    name: item['mission_name'],
    date: item['launch_date_local']
  }));

  const onSortChange = (event) => {
    setActiveSort(event.target.text);
  }

  useEffect(() => {
    (async () => {
        setData(await getData());
    })();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <div className="body-container">
        <Menu sortString={activeSort} onSortChange={onSortChange} />
        <div className="card-container">
        {list.length? 
          list.map((item, index) => <Card key={index} number={index} title={item['name']} date={item['date']} onCardClick={onCardClick} />)
          :<span className="spinner-grow" role="status" ></span>
        }
        </div>
      </div>

    </div>
  );
}

export default App;
