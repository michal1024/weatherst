import netstats from './netstats/service';
import yrweather from './yrweather/service/yrweatherService';

const widgetServices = () => {
    const cleanup = [
        netstats(),
        yrweather()
    ];
    return () => cleanup.forEach(worker => worker && worker());
}

export default widgetServices;