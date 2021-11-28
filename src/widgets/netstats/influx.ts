/*
curl --request POST https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/query?org=yyy  \
--header 'Authorization: Token xxx' \
--header 'Accept: application/csv' \
--header 'Content-type: application/vnd.flux' \
--data 'from(bucket: "home") 
    |> range(start: -15m)
    |> filter(fn: (r) => r["_measurement"] == "ping")
    |> filter(fn: (r) => r["_field"] == "average_response_ms") 
    |> filter(fn: (r) => r.host == "weatherst")'
*/

import fetch from 'node-fetch';
import parse from 'csv-parse/lib/sync';
//import { Record } from './record';

type Row = Record<string, string>;

export class InfluxApi {
    private url: string
    private token: string;
    private org: string;

    constructor (url: string, token: string, org: string) {
        this.url = url;
        this.token = token;
        this.org = org;
    }

    public async queryCsv(q: string): Promise<string> {
        const queryUrl = `${this.url}/query?org=${this.org}`;
        const queryParams = {
            body: q,
            method: "POST",
            headers: {
                Authorization: `Token ${this.token}`,
                Accept: 'application/csv',
                'Content-type': 'application/vnd.flux'
            }
        };
        try {
            const result = await fetch(queryUrl, queryParams);
            return result.text();
        } catch (e: any) {
            console.log(e);
        }
        return "";
    }

    public async queryObj(q: string): Promise<Row[]> {
        const csv = await this.queryCsv(q);
        return this.parseData(csv);
    }

    private parseData(data: string): Row[] {
        return parse(data, {
            columns: true,
            skip_empty_lines: true
        }) as Row[];
    }
}
