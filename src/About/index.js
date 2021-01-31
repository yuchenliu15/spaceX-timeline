import React, { useState, useEffect } from 'react';
import './index.css';

const About = ({ data }) => {

    const launchResult = (launch, date) => {
        if(date - Date.now() < 0) {
            return "launched";
        }
        if (launch === null) {
            return 'upcoming...☕';
        }
        if (launch === true) {
            return 'success✔';
        }
        return 'fail❌';
    }

    return (
        <div className="about-container">
            <div className="alert rounded">
                <h1>{data['mission_name']}</h1> <br/>
                <h3>Rocket: <span className="about-data">{data['rocket']['rocket_name']}</span></h3>
                <h3>Status: <span className="about-data">{launchResult(data['launch_success'], new Date(data['launch_date_local']))}</span></h3>
                <h3>Location: <span className="about-data">{data['launch_site']['site_name_long']}</span></h3>
                <Links links={data['links']} />
            </div>
        </div>
    )
}

const Links = ({ links }) => {

    const getExcerpt = (string, length) => {
        const filter = string.match(/^https:\/\/(.*)/);
        return filter? `${filter[1].substring(0,length)}...`: `${string.substring(0,length)}...`;
    }

    const getLinks = () => {
        const list = [];
        for (let key in links) {
            const val = links[key];

            if (Array.isArray(val)) {
                if (val.length > 0)
                    val.forEach(item => list.push(<li key={key} ><a href={item}>{getExcerpt(item, 20)}</a></li>));
                else {
                    continue;
                }
            } else if (val) {
                list.push(<li key={key}><a href={val}>{getExcerpt(val, 20)}</a></li>);
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
