import React, { useState, useEffect } from 'react';
import './index.css';

const Card = ({ number, title, date, onCardClick }) => {
    return(
        <div className="card">
        <div className="titleAndCount card-header">
            <p className="card-title" onClick={onCardClick} number={number}>{title + ":"}</p>
            <div class="alert alert-info" role="alert">
            <Timer goal={date} />
            </div>
        </div>
        <div className="card-body">

        </div>
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
    const [countdown, setCoundown] = useState(getDiff(goalDate));

    useEffect(() => {
        setTimeout(() => setCoundown(getDiff(goalDate)), 1000);
    });

    return (
        <div>
            {<p>{countdown.days + " days " + countdown.hours + ":" + countdown.minutes + ":" + countdown.seconds}</p>}
        </div>
    )

}

export {
    Card
};

