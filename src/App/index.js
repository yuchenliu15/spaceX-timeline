import React, { useEffect, useState } from 'react';
import './index.css';
import { Card } from '../Card';
import 'bootstrap/dist/css/bootstrap.css';
const spacex = `https://api.spacexdata.com/v3/launches/94`;

const getData = async () => {
  return fetch(spacex)
          .then(res => res.json())
}

const onCardClick = (event) => {
  console.log('click!');
}

function App() {

  const [data, setData] = React.useState(null);

  useEffect(() => {
    (async () => {
      setTimeout(async ()=> {
        setData(await getData());

      },2000)
    })();
  }, []);

  return (
    <div className="App">
      {data? <Card title={data['mission_name']} date={data['launch_date_utc']} onCardClick={onCardClick} />
      : <span class="spinner-grow" role="status" ></span>}
    </div>
  );
}

export default App;
