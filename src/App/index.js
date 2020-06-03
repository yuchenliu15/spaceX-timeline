import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Navigation';
import { Card } from '../Card';
import { Navigation } from '../Navigation';
import { Menu } from '../Menu';
import { About } from '../About';

const PATH_BASE = 'https://api.spacexdata.com/v3';
const LAUNCH_UPCOMING = '/launches/upcoming';
const DEFAULT_URL = `${PATH_BASE}${LAUNCH_UPCOMING}`;

const Sorts = {
  latest: list => sortBy(list, 'date'),
  oldest: list => sortBy(list, 'date').reverse(),
  name: list => sortBy(list, 'title')
}

const getData = async (url) => {
  return fetch(url).then(res => res.json());
}

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

function App() {

  const [data, setData] = useState([]);
  const [dataForCard, setDataForCard] = useState([]);
  const [activeSort, setActiveSort] = useState('latest');
  const [search, setSearch] = useState('');
  const [aboutData, setAboutData] = useState({});

  const list = Array.isArray(dataForCard) ? Sorts[activeSort](dataForCard) : dataForCard;
  const CardWithLength = ({ list, ...props }) => {

    if (Array.isArray(list) && list.length > 0) {
      return list.map((item, index) => <Card key={index} title={item['name']} date={item['date']} onCardClick={onCardClick(index)}  {...props} />);
    }
    else if (!Array.isArray(list) && typeof list === 'object' && list !== null) {
      return <Card className="single" title={list['name']} date={list['date']} onCardClick={onCardClick(null)} {...props} />
    }
    else {
      return <span className="spinner-grow" role="status" ></span>
    }

  }

  const onBrandClick = () => {
    if(isObjectEmpty(aboutData)){
      updateData(DEFAULT_URL);
    }
    else {
      setAboutData({});
    }
  }

  const onBackButtonClick = () => {
    setAboutData({});
  }

  const onCardClick = index => () => {
    if(index === null) {
      setAboutData(data);
    } else {
      const name = list[index].name;
      for (let index in data) {
        const item = data[index];
        if (item['mission_name'] === name) {
          setAboutData(item);
        }
      }
    }

  }

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
    if (search) {
      updateData(`${PATH_BASE}/launches/${search}`);
    } else {
      updateData(DEFAULT_URL);
    }
  }

  const updateData = async (url) => {
    const res = await getData(url);
    setData(res);
    setDataForCard(
      Array.isArray(res) ?
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
    updateData(DEFAULT_URL);
  }, []);

  return (
    <div className="App">
      <Navigation onBrandClick={onBrandClick} />
      <div className="body-container">
        <Menu sortString={activeSort} onSortChange={onSortChange} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit}
          onBackButtonClick={onBackButtonClick} isAboutActive={isObjectEmpty(aboutData) ? false : true} />
        <div>
          {isObjectEmpty(aboutData)
            ? <div className="card-container">
              <CardWithLength list={list} />
            </div>
            :<About data={aboutData} />
          }
        </div>


      </div>

    </div>
  );
}

export default App;
