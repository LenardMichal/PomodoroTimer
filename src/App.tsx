import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Timer from './components/Timer/Timer';;



const App: React.FC = () => {
  const [workTime, setWorkTime] = useState(0.2 * 60 * 1000);
  const [shortBrake, setShortBrake] = useState(0.1 * 60 * 1000);
  const [longBrake, setLongBrake] = useState(25 * 60 * 1000);
  const [maxCycles, setMaxCycles]  = useState(7);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState(() => workTime);
  const [isStarted, setIsStarted] = useState(false);

  let totalTimer : {current: any} = useRef();
  let countdownTimer : {current: any} = useRef();

  // apply interval to ref variable
  function startTotalTimer() {
    totalTimer.current = setInterval(() => {
      setCurrentTime(prevVal => {
        return prevVal + 1000;
      })
    }, 1000)
  }

  function startCountdownTimer() {
    countdownTimer.current = setInterval(() => {
      setCurrentCountdown(prevVal => {
        return prevVal - 1000;
      })
    }, 1000)
  }


  // Function that starts timers
  function startTimers() {
    startTotalTimer();
    startCountdownTimer();
    setIsStarted(prev => !prev);
  }
  // function that stops timers
  function stopTimers() {
    clearInterval(totalTimer.current);
    clearInterval(countdownTimer.current);
    setIsStarted(prev => !prev);
  }

  function nextCycle() {
    setCurrentCycle(prevVal => {
      if (prevVal < maxCycles) {
        return prevVal + 1;
      }else {
        return 0;
      }
    })
  }

  function nextCountdown() {
    if(currentCycle % 2 === 0) {
      setCurrentCountdown(workTime);
    } else if ( currentCycle !== maxCycles) {
      setCurrentCountdown(shortBrake);
    } else {
      setCurrentCountdown(longBrake);
    }
  }
  // effect for checking that countdown ends
  useEffect(() => {
    if(currentCountdown < 1000) {
      navigator.vibrate([1000, 500, 1000]);
      nextCycle();
    }
  }, [currentCountdown]);

  // effect for correct display of timers
  useEffect(() => {
    nextCountdown();
  }, [currentCycle])

  return (
    <div className="App">
      <h1>Pomodoro timer</h1>
      <Timer timer={currentTime}/>
      <Timer timer={currentCountdown} />
      {currentCycle}
      {!isStarted ? <button onClick={startTimers}>Start</button> : <button onClick={stopTimers}>Stop</button>}
    </div>
  );
}

export default App;
