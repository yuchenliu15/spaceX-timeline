import React, { useState, useEffect } from 'react';

const About = ({data}) => {
    return (
        <div>
            {data['mission_name']}
        </div>
    )
}

export {
    About
};
