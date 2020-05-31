import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Navigation';
import { Card } from '../Card';
import { Navigation } from '../Navigation';
import { Menu } from '../Menu';

const PATH_BASE = 'https://api.spacexdata.com/v3';
const LAUNCH_UPCOMING = '/launches/upcoming';
const spacex = `${PATH_BASE}${LAUNCH_UPCOMING}`;

const Sorts = {
  latest: list => sortBy(list, 'date'),
  oldest: list => sortBy(list, 'date').reverse(),
  name: list => sortBy(list, 'title')
}

const getData = async (url) => {
  return fetch(url).then(res => res.json())
}

const onCardClick = event => {
  console.log(event.target.getAttribute('number'));
}

function App() {

  const [data, setData] = useState([]);
  const [dataForCard, setDataForCard] = useState([]);
  const [activeSort, setActiveSort] = useState('latest');
  const [search, setSearch] = useState('');

  const list = Array.isArray(dataForCard)? Sorts[activeSort](dataForCard): dataForCard;

  const onSortChange = (event) => {
    const newSort = event.target.text;
    if (newSort !== activeSort) {
      setActiveSort(newSort);
    }
  }

  const onSearchChange = event => {
    setSearch(event.target.value)
  }
  
  const onSearchSubmit = () => {
    updateData(`${PATH_BASE}/launches/${search}`);
  }

  const updateData = async (url) => {
    const res = await getData(url);
    console.log(res['mission_name'])
    setData(res);
    setDataForCard(
      Array.isArray(res)?
      res
        .filter(item => ((new Date(item['launch_date_local']) - new Date()) > 0))
        .map(item => ({
          name: item['mission_name'],
          date: new Date(item['launch_date_local'])
        }))
      : {
        name: res['mission_name'],
        date: new Date(res['launch_date_local'])
      }
    );

  }

  useEffect(() => {
    updateData(spacex);
  }, []);

  return (
    <div className="App">
      <Navigation />
      <div className="body-container">
        <Menu sortString={activeSort} onSortChange={onSortChange} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} />
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
