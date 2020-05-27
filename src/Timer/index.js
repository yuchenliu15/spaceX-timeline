import React, { useState, useEffect } from 'react';

const getDiff = (goal) => {
    if (goal)
        return new Date(goal - new Date());
}

const Timer = ({ goal }) => {

    const goalDate = new Date(goal);
    const [countdown, setCoundown] = React.useState(null);
    //const timeLeft = countdown.getHours() + ":" + countdown.getMinutes() + ":" + countdown.getSeconds();

    useEffect(() => {
        setTimeout(() => setCoundown(getDiff(goalDate)), 1000);
    });

    return (
        <div>
            {countdown? <h1>{countdown.getDay() + ":" + countdown.getHours() + ":" + countdown.getMinutes() + ":" + countdown.getSeconds()}</h1>: <h1>Loading</h1>}
        </div>
    )

}

export {
    Timer
};

