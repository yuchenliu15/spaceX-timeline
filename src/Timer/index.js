import React, { useState, useEffect } from 'react';

const spacex = `https://api.spacexdata.com/v3/launches/94`;

const getLaunchTime = async () => {
    return fetch(spacex)
            .then(res => res.json())
            .then(data => new Date(data['launch_date_utc']));
}

const Timer = () => {
    
    const [time, setTime] = React.useState(null);

    useEffect(() => {
        (async () => {
            setTime(await getLaunchTime())
        })();
    }, []);

    return (
        <div>
        {time? <p>{time.toString()}</p>: <p>NO</p>}
        </div>
    )

}

export {
    Timer
};