import React from 'react';
import useWeatherData from './weatherDataHook';
import { YrWeatherData } from '../model/yrWeatherData';
import './yrforecast.css';
import WeatherIcon from './weatherIcon';
import { Forecast } from '../model/yrTypes';
import _ from 'underscore';

declare global {
    interface Date {
        addHours(hours: number): Date;
        addDays(days: number): Date;
        midnight(): Date;
    }
}

Date.prototype.addHours = function(hours: number) {
    return new Date(this.valueOf() + hours*60*60*1000);
}

Date.prototype.addDays = function(days: number) {
    return this.addHours(24*days);
}

Date.prototype.midnight = function() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
}


const YrForecast = () => {
    const data = useWeatherData();
    const today = new Date().midnight();

    return <div className='forecast-container'>
        <DayForecast date={today} weatherData={data}></DayForecast>
        <DayForecast date={today.addDays(1)} weatherData={data}></DayForecast>
        <DayForecast date={today.addDays(2)} weatherData={data}></DayForecast>
    </div>;
}

const getCondition = (sample: Forecast) => (
    sample?.data?.next_1_hours || 
    sample?.data?.next_6_hours ||
    sample?.data?.next_12_hours)?.summary?.symbol_code;

const getAirTemp = (sample: Forecast) => sample?.data?.instant.details.air_temperature;

const getMaxTemp = (samples: Forecast[]) => getAirTemp(_.max(samples, getAirTemp) as Forecast);

const getMinTemp = (samples: Forecast[]) => getAirTemp(_.min(samples, getAirTemp) as Forecast);

const DayForecast = (props: {date: Date, weatherData: YrWeatherData}) => {
    const samples = [6, 12, 18, 24].map(
        (hour) => props.weatherData?.at(props.date.addHours(hour)));
    return <div className='day-container'>
        <div className='day-date'>{`${props.date.getMonth()+1}/${props.date.getDate()}`}</div>
        <WeatherIcon condition={getCondition(samples[0])} size={60}></WeatherIcon>
        <WeatherIcon condition={getCondition(samples[1])} size={60}></WeatherIcon>
        <WeatherIcon condition={getCondition(samples[2])} size={60}></WeatherIcon>
        <WeatherIcon condition={getCondition(samples[3])} size={60}></WeatherIcon>
        <div className='day-temp'>{`${getMaxTemp(samples)}/${getMinTemp(samples)}${'\u00B0'}c`}</div>
        </div>
}


export default YrForecast;