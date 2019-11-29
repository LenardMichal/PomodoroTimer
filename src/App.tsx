import React, {useState, useEffect, useRef} from 'react';
import './scss/App.scss';
import Timer from './components/Timer/Timer';
import parseTime from './utils/parseTime'
import displayCurrentCycle from './utils/displayCurrentCycle';
import SettingsWindow from './components/SettingsWindow/SettingsWindow';

const App: React.FC = () => {
  const [workTime, setWorkTime] = useState(25 * 60 * 1000);
  const [shortBrake, setShortBrake] = useState(5 * 60 * 1000);
  const [longBrake, setLongBrake] = useState(20 * 60 * 1000);
  const [maxCycles, setMaxCycles]  = useState(7);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState(() => workTime);
  const [isStarted, setIsStarted] = useState(false);
  const [shouldBeAuto, setShouldBeAuto] = useState(true);

  let totalTimer : {current: any} = useRef();
  let countdownTimer : {current: any} = useRef();
  let soundEffect : {current: any} = useRef();
  // Loading on mount
  useEffect(() => {
    soundEffect.current = new Audio(process.env.PUBLIC_URL + '/school_bell.wav');
    soundEffect.current.volume = 0.5;
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

  function setVolume(val : number = 0) {
    soundEffect.current.volume = val;
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
      <h1 className="App__header">Pomodoro timer</h1>

      <section>
        <Timer timer={currentTime} wrapperClass="App__timer--total"/>
        <Timer timer={currentCountdown} wrapperClass="App__timer--countdown" />
        <span className="App__currentCycle">
          {displayCurrentCycle(currentCycle, maxCycles)}
        </span>
        {!isStarted ? 
          <button onClick={startTimers} className="App__button--start">Start</button> 
          :
          <button onClick={stopTimers} className="App__button--stop">Stop</button>
        }
        <input 
          type='checkbox'
          defaultChecked 
          onClick={()=> {setShouldBeAuto(prev => !prev)}}
          id="checkbox"
          className="App__checkbox"/>
        <label 
          htmlFor="checkbox"
          className={['App__checkbox--label', shouldBeAuto ? 'selected' : null].join(' ')}>
          Auto? 
            <span className="App__checkbox--check"> 
            {shouldBeAuto ? String.fromCharCode(10004) :  String.fromCharCode(9932)}
            </span>
          </label>
          <button onClick={clearTimers} className="App__button--clear"> Clear</button> 
      </section>
      <SettingsWindow setVolume={setVolume}/>
    </div>
  );
}

export default App;
