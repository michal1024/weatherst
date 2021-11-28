import React, {useState, useEffect} from 'react';
import {YrWeatherData} from '../model/yrWeatherData';
import {LocationForecast} from '../model/yrTypes';
import getConfig from '../config';

const useWeatherData = () =>  {
    const [weatherData, setWeatherData] = useState<YrWeatherData>(new YrWeatherData());
    const updateWeather = (event: any, data: LocationForecast) => {
        const weatherData = new YrWeatherData(data);
        if (!weatherData.isEmpty()) {
            setWeatherData(weatherData);
        }
    }
    const weatherFetch = () => window.electronAPI.send('yrweather-fetch');

    useEffect(() => {
        window.electronAPI.on('yrweather-forecast', updateWeather);
        weatherFetch();
        const interval = setInterval(weatherFetch, getConfig().fetchInterval);
        return () => clearInterval(interval);
    }, []);
    return weatherData;
}

export default useWeatherData;