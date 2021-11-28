const getConfig = () => ({
    LAT: (typeof process === 'undefined') ? '' : process.env.YR_LAT,
    LON: (typeof process === 'undefined') ? '' : process.env.YR_LON,
    fetchInterval: 600000,
    userAgent: (typeof process === 'undefined') ? '' : process.env.YR_USR_AGENT
});

export default getConfig;