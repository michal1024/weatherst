import { isNull, isUndefined, isString } from 'underscore';
import { LocationForecast, Forecast } from './yrTypes';

export class YrWeatherData {
    data?: LocationForecast;
    expires: Date;

    constructor(data?: LocationForecast, expires?: Date) {
        this.data = data;
        this.expires = expires ?? new Date();
    }


    isEmpty() : boolean {
        return isUndefined(this.data) || isNull(this.data) || !isString(this.data.type);
    }

    at(dt: Date): Forecast | null {
        if (this.isEmpty()) {
            return null;
        }
        var timeseries = this.data.properties.timeseries;
        if (timeseries.length < 1) {
            return null;
        }
        var closest = timeseries[0];
        if (Date.parse(closest.time) > dt.valueOf()) {
            return null;
        }
        var closestDistance = Math.abs(dt.valueOf() - Date.parse(closest.time));
        for (var ts of timeseries) {
            var distance = Math.abs(Date.parse(ts.time) - dt.valueOf());
            if (distance < closestDistance) {
                closestDistance = distance;
                closest = ts;
            }
        }
        return closest;
    }
}