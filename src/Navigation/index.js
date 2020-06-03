import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Navigation = ({onBrandClick}) => {
    return (
        <nav className="navbar justify-content-between">
              <p onClick={onBrandClick} className="navbar-brand">SpaceX Countdown 🪐</p>
              <button type="button" className="btn btn-light"><a className="link" href="https://github.com/yuchenliu15/spaceX-timeline" target="_blank">GitHub</a></button>
        </nav>
    );

}

export {
    Navigation
};