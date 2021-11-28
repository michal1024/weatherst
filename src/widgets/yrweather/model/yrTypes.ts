
//https://developer.yr.no/doc/ForecastJSON/

export interface LocationForecast {
    type: string;
    geometry: Geometry;
    properties: Properties;

}

export interface Geometry {
    coordinates: number[];
    type: string;
}

export interface Properties {
    meta: Meta;
    timeseries: Timeseries[];
}

export interface Meta {
    updated_at: Date;
    units: Units;
}

export interface Units {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    air_temperature_max: string;
    air_temperature_min: string;
    cloud_area_fraction: string;
    cloud_area_fraction_high: string;
    cloud_area_fraction_low: string;
    cloud_area_fraction_medium: string;
    dew_point_temperature: string;
    fog_area_fraction: string;
    precipitation_amount: string;
    precipitation_amount_max: string;
    precipitation_amount_min: string;
    probability_of_precipitation: string;
    probability_of_thunder: string;
    relative_humidity: string;
    ultraviolet_index_clear_sky: string;
    wind_from_direction: string;
    wind_speed: string;
    wind_speed_of_gust: string;
}

export interface Timeseries {
    time: string;
    data: Data;
}

export type Forecast = Timeseries;

export interface Data {
    instant: DataEntry;
    next_12_hours?: DataEntry;
    next_1_hours?: DataEntry;
    next_6_hours?: DataEntry;
}

export interface DataEntry {
    summary?: Summary;
    details: Details;
}

export interface Summary {
    symbol_code: string;
}

export interface Details {
    air_pressure_at_sea_level?: number;
    air_temperature?: number;
    air_temperature_max?: number;
    air_temperature_min?: number;
    cloud_area_fraction?: number;
    cloud_area_fraction_high?: number;
    cloud_area_fraction_low?: number;
    cloud_area_fraction_medium?: number;
    dew_point_temperature?: number;
    fog_area_fraction?: number;
    precipitation_amount?: number;
    precipitation_amount_max?: number;
    precipitation_amount_min?: number;
    probability_of_precipitation?: number;
    probability_of_thunder?: number;
    relative_humidity?: number;
    ultraviolet_index_clear_sky?: number;
    wind_from_direction?: number;
    wind_speed?: number;
    wind_speed_of_gust?: number;
}
