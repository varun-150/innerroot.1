import React from 'react';

const AmbientGlow = ({ color = 'rgba(244,235,208,0.06)', size = '600px', top = '40%', left = '50%' }) => {
    return (
        <div 
            className="ambient-glow absolute pointer-events-none -z-10"
            style={{
                width: size,
                height: size,
                top,
                left,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: 'blur(80px)'
            }}
        />
    );
};

export default AmbientGlow;
