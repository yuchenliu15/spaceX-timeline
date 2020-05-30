import React, { useEffect, useState } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Navigation';
import dd from './testApiData.js'; 
import { Card } from '../Card';
import { Navigation } from '../Navigation';
import { Menu } from '../Menu';

const spacex = `https://api.spacexdata.com/v3/launches/upcoming`;

const getData = async () => {
  return fetch(spacex).then(res => res.json())
}

const onCardClick = (event) => {
  console.log(event.target.getAttribute('numbery'));
}

function App() {

  const [data, setData] = useState(dd);
  const [activeCard, setActiveCard] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     setTimeout(async ()=> {
  //       setData(await getData());

  //     },2000)
  //   })();
  // }, []);

  return (
    <div className="App">
      <Navigation />
      <div className="body-container">
        <Menu />
        <div className="card-container">
        {data? 
          data.map((item, index) => <Card key={index} number={index} title={item['mission_name']} date={item['launch_date_utc']} onCardClick={onCardClick} />)
          :<span className="spinner-grow" role="status" ></span>
        }
        </div>
      </div>

    </div>
  );
}

export default App;
