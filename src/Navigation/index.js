import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Navigation = () => {
    return (
        <nav className="navbar justify-content-between">
              <a className="navbar-brand" href="/">SpaceX Countdown</a>
              <button type="button" className="btn btn-light"><a className="link" href="https://github.com/yuchenliu15/spaceX-timeline" target="_blank">GitHub</a></button>
        </nav>
    );

}

export {
    Navigation
};