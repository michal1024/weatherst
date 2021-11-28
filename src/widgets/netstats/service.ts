import getConfig from './config';
import { InfluxApi } from './influx';
import { ipcMain, IpcMainEvent } from 'electron';
import { NetStatsData, NetStatsEntry } from './netstatsModel';

const QUERY = `from(bucket: "${getConfig().influxdb.bucket}") 
    |> range(start: -${getConfig().timeRange}m) 
    |> filter(fn: (r) => r["_measurement"] == "${getConfig().measurement}") 
    |> filter(fn: (r) => r["_field"] == "${getConfig().field}") 
    |> filter(fn: (r) => r.host == "${getConfig().host}")`;

const fetchNetStats = async (event: IpcMainEvent) => {
    const api = new InfluxApi(getConfig().influxdb.url, getConfig().influxdb.token, getConfig().influxdb.org);
    try {
        const data = await api.queryObj(QUERY);
        const netstatsData: NetStatsData = data.map((record) => ({
            time: Date.parse(record._time),
            latency: Number.parseFloat(record._value)
        } as NetStatsEntry));
        event.sender.send('netstats-data', netstatsData);
    } catch (err) {
        console.log(err);
    }
}

const init = () => {
    ipcMain.on('netstats-fetch', fetchNetStats);
}

export default init;