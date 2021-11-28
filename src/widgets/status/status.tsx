import React, {useState, useEffect} from 'react';
import './status.css';

const useStatus = () => {
    const [status, setStatus] = useState<string>(`Uruchomiono ${new Date().toLocaleString()}`);
    useEffect(() => {
        window.electronAPI.on('status-update', (event: any, data: string) => setStatus(data));
    }, []);
    return status;
}

const Status = () => {
    const status = useStatus();
    return <div className="status">
        {status};
    </div>
}

export default Status;