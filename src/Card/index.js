import React, { useState, useEffect } from 'react';

const Card = ({ title, date }) => {
    return(
        <div>
            <h2>{title}</h2>
            <Timer goal={date} />
        </div>
    )
}

const getDiff = (goal) => {
    const diff = goal - new Date();
    return {
        // goal / seconds / minutes / hours / days
        days: Math.floor(diff / 1000 / 60 / 60 / 24),
        hours: (Math.floor(diff / 1000 / 60 / 60) % 24),
        minutes: (Math.floor(diff / 1000 / 60) % 60),
        seconds: (Math.floor(diff / 1000) % 60)
    }
}

const Timer = ({ goal }) => {

    const goalDate = new Date(goal);
    const [countdown, setCoundown] = React.useState(null);

    useEffect(() => {
        setTimeout(() => setCoundown(getDiff(goalDate)), 1000);
    });

    return (
        <div>
            {countdown? <h1>{countdown.days + ":" + countdown.hours + ":" + countdown.minutes + ":" + countdown.seconds}</h1>: <h1>Loading</h1>}
        </div>
    )

}

export {
    Card
};

