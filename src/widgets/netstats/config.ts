const getConfig = () => ({
    influxdb: {
        url: (typeof process === 'undefined')? '' : process.env.INFLUXDB_URL,
        org: (typeof process === 'undefined')? '' : process.env.INFLUXDB_ORG,
        token: (typeof process === 'undefined')? '' : process.env.INFLUXDB_TOKEN,
        bucket: 'home'
    },
    host: 'weatherst',
    measurement: 'ping',
    field: 'average_response_ms',
    timeRange: 5,
    fetchInterval: 10000
})

export default getConfig;