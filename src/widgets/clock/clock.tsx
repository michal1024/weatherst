import './clock.css';
import React, {useState, useEffect} from 'react'


interface TimeProps {
    date: Date;
}

const padTime = (n: number) => n.toString().padStart(2, "0");

const Time = (props: TimeProps) => {
    const dividerStyles = ["time-divider-on", "time-divider-off"];
    const divider = props.date.getSeconds() % 2;
    return <div className="time">
        {padTime(props.date.getHours())}
        <span className={dividerStyles[divider]}>:</span>
        {padTime(props.date.getMinutes())}
    </div>
}

const DateEl = (props: TimeProps) =>
    <div className="date">
        {props.date.toDateString()}
    </div>

const Clock = () => {
    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
        const clockTick = () => setDate(new Date());
        const timer = setInterval(clockTick, 1000);
        return () => clearInterval(timer);
    }, []);
    
    return <div className="timedate">
        <Time date={date}></Time>
        <DateEl date={date}></DateEl>
    </div>
}

export default Clock;