import React from 'react';
import parseTime from '../../utils/parseTime';

interface TimerProps  {
  timer: number
}

const Timer = ({timer}: TimerProps) => {
  let time = parseTime(timer);

  return <div>
    {time.hours}
    { Number(time.seconds) % 2 === 0 ? ':' : ' '}
    {time.minutes}
    { Number(time.seconds) % 2 === 0 ? ':' : ' '}
    {time.seconds}
  </div>
} 

export default Timer;