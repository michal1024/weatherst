import React, { } from 'react';
import { LineChart, Line } from 'recharts';
import { useNetStats } from './netstatsHook';
import { NetStatsData } from './netstatsModel';
import './netstats.css';

interface GraphProps {
  data: NetStatsData
}

const Graph = (props: GraphProps) => {
  return <LineChart data={props.data} width={150} height={100}>
    <Line type='monotone' dot={false} stroke='#82ca9d'
      isAnimationActive={false}
      dataKey='latency'
      strokeWidth='2'></Line>
  </LineChart>
}

const NetStats = () => {
  const data = useNetStats();
  const latency = data.length > 0 ? Math.round(data[data.length - 1].latency) : '?';
  return <div className='netstats-container'>
    <div className='netstats-latency'>{latency}<span className='netstats-units'>ms</span></div>
    <div className='netstats-graph'><Graph data={data} /></div>
  </div >
}

export default NetStats;