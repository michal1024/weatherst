import './widgetsView.css';
import React from 'react';
import Clock from './clock/clock';
import YrWeather from './yrweather/widget/yrweather';
import YrForecast from './yrweather/widget/yrforecast';
import NetStats from './netstats/netstats';
import Status from './status/status';

const WidgetsView = () =>
    <div>
        <div className="container">
            <Clock></Clock>
            <YrWeather></YrWeather>
            <NetStats></NetStats>
            <YrForecast></YrForecast>

        </div>
        <Status></Status>
    </div>

export default WidgetsView;