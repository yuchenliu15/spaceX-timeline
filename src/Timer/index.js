import React, { useState, useEffect } from 'react';

const spacex = `https://api.spacexdata.com/v3/launches/94`;

// const getLaunchTime = async () => {
//     return fetch(spacex)
//             .then(res => res.json())
//             .then(data => new Date(data['launch_date_utc']));
// }

const getDiff = (goal) => () => {
    console.log('heheh')
    if (goal)
        return new Date(goal - new Date());
}

const Timer = () => {

    const [time, setTime] = React.useState(null);
    const [countdown, setCoundown] = React.useState(null);

    useEffect(() => {

        setTimeout(()=>setCoundown(new Date("2020-05-27T20:33:00.000Z").getSeconds() - new Date().getSeconds()), 1000);

    });

    return (
        <div>
            {countdown ? <p>{countdown}</p> : <p>NO</p>}
        </div>
    )

}

export {
    Timer
};