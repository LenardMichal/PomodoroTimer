import React from 'react';
import parseTime from '../../utils/parseTime';
import styles from './Timer.module.css';

interface TimerProps  {
  timer: number;
  wrapperClass?: string;
}

const Timer = ({timer, wrapperClass = ''}: TimerProps) => {
  let time = parseTime(timer);

  return <div className={[styles.Timer, wrapperClass].join(' ')}>
    {time.hours !== '00' ? time.hours : null}
    <span>
      { Number(time.seconds) % 2 === 0  && time.hours !== '00' ? ':' : ' '}  
    </span>
    {time.minutes}
    <span>
      { Number(time.seconds) % 2 === 0 ? ':' : ' '}
    </span>
    {time.seconds}
  </div>
} 

export default Timer;