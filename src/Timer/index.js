import React, { useState, useEffect } from 'react';

const spacex = `https://api.spacexdata.com/v3/launches/94`;

const current = new Date("2020-05-27T20:33:00.000Z");

// const getLaunchTime = async () => {
//     return fetch(spacex)
//             .then(res => res.json())
//             .then(data => new Date(data['launch_date_utc']));
// }

const getDiff = (goal) => () => {
    if (goal)
        return new Date(goal - new Date());
}

const Timer = () => {

    const [time, setTime] = React.useState(null);
    const [countdown, setCoundown] = React.useState(null);
    const timeLeft = countdown? countdown.getHours() + ":" + countdown.getMinutes() + ":" + countdown.getSeconds(): "";

    useEffect(() => {

        setTimeout(()=>setCoundown(getDiff(current)), 1000);

    });

    return (
        <div>
            <h1>{timeLeft}</h1>
        </div>
    )

}

export {
    Timer
};

