import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Timer from './components/Timer/Timer';
import parseTime from './utils/parseTime'
import displayCurrentCycle from './utils/displayCurrentCycle';

const App: React.FC = () => {
  const [workTime, setWorkTime] = useState(0.2 * 60 * 1000);
  const [shortBrake, setShortBrake] = useState(0.1 * 60 * 1000);
  const [longBrake, setLongBrake] = useState(25 * 60 * 1000);
  const [maxCycles, setMaxCycles]  = useState(7);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState(() => workTime);
  const [isStarted, setIsStarted] = useState(false);
  const [shouldBeAuto, setShouldBeAuto] = useState(true);

  let totalTimer : {current: any} = useRef();
  let countdownTimer : {current: any} = useRef();
  let checkboxInput : {current: any} = useRef();
  let soundEffect : {current: any} = useRef();
  // Loading on mount
  useEffect(() => {
    soundEffect.current = new Audio(process.env.PUBLIC_URL + '/school_bell.wav');
  }, [])

  // Adding interval to ref variable
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
    setIsStarted(true);
  }
  // function that stops timers
  function stopTimers() {
    clearInterval(totalTimer.current);
    clearInterval(countdownTimer.current);
    setIsStarted(false);
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

  function clearTimers() {
    stopTimers();
    setCurrentCountdown(workTime);
    setCurrentTime(0);
    setCurrentCycle(0);
  }

  useEffect(() => {
    // Displaying text in title
    let time = parseTime(currentCountdown);
    document.title = `${displayCurrentCycle(currentCycle, maxCycles)} - ${time.minutes}:${time.seconds}`;
    // Handler for countdown ends
    if(currentCountdown < 1000) {
      // There should be any bling bling sounds
      soundEffect.current.play();
      navigator.vibrate([1000, 500, 1000]);
      nextCycle();
      // Handler for not auto actions
      if(!shouldBeAuto) {
        stopTimers();
      } 
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
      {displayCurrentCycle(currentCycle, maxCycles)}
      {!isStarted ? <button onClick={startTimers}>Start</button> : <button onClick={stopTimers}>Stop</button>}
      <input 
        type='checkbox'
        defaultChecked 
        onClick={()=> {setShouldBeAuto(prev => !prev)}}
        id="checkbox"/>
        <label htmlFor="checkbox">Auto?</label>
        <button onClick={clearTimers}> Clear</button>
    </div>
  );
}

export default App;
