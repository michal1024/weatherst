export interface NetStatsEntry {
    time: number;
    latency: number;
}

export type NetStatsData = NetStatsEntry[];