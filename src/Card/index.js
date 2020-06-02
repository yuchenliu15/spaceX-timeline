import React, { useState, useEffect } from 'react';
import './index.css';

const progressbarMaxDay = 1000 * 60 * 60 * 24 * 150; //150 days

const Card = ({ number, title, date, onCardClick }) => {

    const progress = (1 - (date - new Date()) / progressbarMaxDay) * 100;

    return (
        <div className="card rounded">
            <div className="titleAndCount card-header">
                <div className="card-title" onClick={onCardClick} number={number}>
                    <p>{title}</p>
                </div>
                <div className="alert rounded timer" role="alert">
                    <Timer goal={date} />
                </div>
            </div>
            <div className="card-body">
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                     aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: `${progress}%`}}></div>
                </div>
            </div>
        </div>

    )
}

const getDiff = (goal) => {
    const diff = goal - new Date();
    return {
        // goal / seconds / minutes / hours / days
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(diff / (1000 * 60 * 60) % 24),
        minutes: Math.floor(diff / (1000 * 60) % 60),
        seconds: Math.floor(diff / 1000) % 60
    }
}

const Timer = ({ goal }) => {

    const [countdown, setCoundown] = useState(getDiff(goal));

    useEffect(() => {
        setTimeout(() => setCoundown(getDiff(goal)), 1000);
    });

    return (
        <div>
            {<p className="h3">{countdown.days + " days " + countdown.hours + ":" + countdown.minutes + ":" + countdown.seconds}</p>}
        </div>
    )

}

export {
    Card
};

