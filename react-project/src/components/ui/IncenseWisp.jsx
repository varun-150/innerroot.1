import React from 'react';

const IncenseWisp = ({ top = '50%', left = '10%', delay = '0s' }) => {
    return (
        <div 
            className="incense-wisp absolute pointer-events-none"
            style={{
                top,
                left,
                animationDelay: delay
            }}
        />
    );
};

export default IncenseWisp;
