import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Navigation = () => {
    return (
        <nav class="navbar justify-content-between">
              <a class="navbar-brand" href="#">SpaceX Countdown</a>
              <button type="button" class="btn btn-light">Share</button>
        </nav>
    );
    
}

export {
    Navigation
};