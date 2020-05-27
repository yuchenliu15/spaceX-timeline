import React, { useState, useEffect } from 'react';

const spacex = `https://api.spacexdata.com/v3/launches/94`;

const Timer = () => {
    
    const [time, setTime] = React.useState(null);

    useEffect(() => {
        fetch(spacex)
            .then(res => res.json())
            .then(data => {
                setTime(data.launch_year);
            })
    }, []);

    return (
        <div>
        {time? <p>{time}</p>: <p>NO</p>}
        </div>
    )

}

export {
    Timer
};