import React, { useEffect, useState } from 'react';
//import { ipcRenderer } from 'electron';
import { NetStatsData } from './netstatsModel';
import getConfig from './config';

export const useNetStats = (): NetStatsData => {
    const [stats, updateStats] = useState([] as NetStatsData);

    const nestatsFetch = () => {
        window.electronAPI.send('netstats-fetch');
    }

    const netstatsUpdate = (event: any, data: NetStatsData) => updateStats(data);

    useEffect(() => {
        window.electronAPI.on('netstats-data', netstatsUpdate);
        nestatsFetch();
        setInterval(nestatsFetch, getConfig().fetchInterval);
    }, []);

    return stats;
}
