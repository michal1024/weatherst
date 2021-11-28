import React from 'react';
import useWeatherData from './weatherDataHook';
import WeatherIcon from './weatherIcon'
import './yrweather.css';

const YrWeather = () => {
    const weatherData = useWeatherData();
    const current = weatherData.at(new Date())?.data;
    const temp = current?.instant.details.air_temperature ?? '?';
    const humid = current?.instant.details.relative_humidity ?? '';
    const press = current?.instant.details.air_pressure_at_sea_level ?? '';
    const wind = current?.instant.details.wind_speed ?? '';
    const condition = current?.next_1_hours.summary?.symbol_code;
    return <div className="weather-container">
                <div className="weather-main">
                    <div>{temp}{'\u00B0'}c</div>
                    <WeatherIcon condition={condition} size={150}></WeatherIcon>
                </div>
                <div className="weather-detail">
                    <div>{humid}%</div><div>{'\u2219'}</div>
                    <div>{press} <span className='weather-unit'>hPa</span></div><div>{'\u2219'}</div>
                    <div>{wind} <span className='weather-unit'>m/s</span></div>
                </div>
            </div>
}

export default YrWeather;