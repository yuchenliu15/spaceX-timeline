import React, { useEffect, useState } from 'react';
import './index.css';
import { Timer } from '../Timer';

const spacex = `https://api.spacexdata.com/v3/launches/94`;

const getData = async () => {
  return fetch(spacex)
          .then(res => res.json())
}

function App() {

  const [data, setData] = React.useState(null);

  useEffect(() => {
    (async () => {
      setData(await getData());
    })();
  }, []);

  return (
    <div className="App">
      {data? <Timer goal={data['launch_date_utc']} />:<p>Wait a sec</p>}
    </div>
  );
}

export default App;
