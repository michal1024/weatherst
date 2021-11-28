import React from 'react';

interface WeatherIconProps {
    condition: string;
    size?: number;
}

const WeatherIcon = function({condition, size = 200}: WeatherIconProps) {
    if (condition) {
        const src = `./icons/${condition}.png`; 
        return <img src={src} width={size} height={size} ></img>;
    }
    return <div style={{height: size, width: size}}></div>
}

export default WeatherIcon;