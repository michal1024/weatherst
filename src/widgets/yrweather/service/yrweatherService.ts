import fetch from 'node-fetch';
import { ipcMain, IpcMainEvent } from 'electron';
import getConfig from '../config';
import { YrWeatherData } from '../model/yrWeatherData';
import { LocationForecast } from '../model/yrTypes';

const fetchWeather = async (lastFetch: Date) => {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${getConfig().LAT}&lon=${getConfig().LON}`;
    var result = new YrWeatherData();
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': getConfig().userAgent,
                'If-Modified-Since': lastFetch.toISOString()
            }
        });
        if (response.ok) {
            const data = await response.json();
            const expires = response.headers.has('Expires') ?
                new Date(Date.parse(response.headers.get('Expires'))) : new Date();
            result = new YrWeatherData(data as LocationForecast, expires);
        }
    } catch (err) {
        console.log(err);
    }
    return result;
}

const forecastEmitter = () => {
    var lastFetch = new Date(0);
    var lastResult = new YrWeatherData();
    return async (event: IpcMainEvent) => {
        var now = new Date();
        if (lastResult.expires < now) {
            const result = await fetchWeather(lastFetch);
            if (!result.isEmpty()) {
              lastFetch = new Date();
              lastResult = result;
            }
        }
        event.sender.send('yrweather-forecast', lastResult.data);
        event.sender.send('status-update', `Aktualizacja ${lastFetch.toLocaleString()}`);
    }
}

export default () => {
    ipcMain.on('yrweather-fetch', forecastEmitter());
    return () => { };
}