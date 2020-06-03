import React, { useState, useEffect } from 'react';
import './index.css';

const About = ({ data }) => {

    const launchResult = (launch) => {
        if (launch === null) {
            return 'upcoming...☕';
        }
        else if (launch === true) {
            return 'success✔';
        } else {
            return 'fail❌';
        }
    }

    return (
        <div className="about-container">
            <div className="alert rounded">
                <h1>Mission: {data['mission_name']}</h1> <br/>
                <h3>Rocket: {data['rocket']['rocket_name']}</h3>
                <h3>Status: {launchResult(data['launch_success'])}</h3>
                <Links links={data['links']} />
            </div>
        </div>
    )
}

const Links = ({ links }) => {

    const getLinks = () => {
        const list = [];
        for (let key in links) {
            const val = links[key];

            if (Array.isArray(val)) {
                if (val.length > 0)
                    val.forEach(item => list.push(<li><a href={item}>{item}</a></li>));
                else {
                    continue;
                }
            } else if (val) {
                list.push(<li><a href={val}>{val}</a></li>);
            }
        }
        return list;
    }

    const displayLinks = getLinks();

    return (
        (displayLinks.length > 0)
        ? <div>
            <h3>Links: </h3>
            <ul>{displayLinks}</ul>
        </div>
        : null
    )

}

export {
    About
};
