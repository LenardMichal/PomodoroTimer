import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Timer from './components/Timer/Timer';;



const App: React.FC = () => {
  const [workTime, setWorkTime] = useState(0.2 * 60 * 1000);
  const [shortBrake, setShortBrake] = useState(0.1 * 60 * 1000);
  const [longBrake, setLongBrake] = useState(25 * 60 * 1000);
  const [cycles, setCycles]  = useState(7);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // Interface to prevent TS error
  interface RefInf {
    current: any
  }
  //Add component variable to handle clears
  let countdownTimer : RefInf = useRef();
  let totalTimer : RefInf = useRef(); 
 
  useEffect(() => {
    if(currentCountdown < 1000) {
      clearInterval(countdownTimer.current);
      navigator.vibrate([900, 300, 900, 300, 900]);
      incrementCycle();
      swapTimers();
    }
  }, [currentCountdown]);
  
function swapTimers() {
  if(currentCycle % 2 === 0)  {
    countdownTimer.current = startCountdown(workTime);
  } else {
    countdownTimer.current = startCountdown(shortBrake);
  }
}


function incrementCycle() {
  setCurrentCycle(prevCycle => {
    if(prevCycle < cycles) {
      return prevCycle + 1;
    } else {
      return 0;
    }
  });
}

//function that start timer
function startTimer() {
  let startTime = new Date().getTime();
    return setInterval(() => {
      setCurrentTime(() => {
        return new Date().getTime() - startTime;
      })
    }, 1000)
}

function startCountdown(time: number) {
  let startTime = new Date().getTime();
    return setInterval(() => {
      setCurrentCountdown(() => {
        return startTime -  new Date().getTime() + time;
      })
    }, 1000)
}

function startClocks() {
  totalTimer.current = startTimer();
  countdownTimer.current = startCountdown(currentCountdown);
  setIsStarted(prev => !prev);
}

function stopClocks() {
  clearInterval(totalTimer.current);
  clearInterval(countdownTimer.current);
  setIsStarted(prev => !prev);
}

  return (
    <div className="App">
      <Timer timer={currentTime}/>
      <Timer timer={currentCountdown} />
      {currentCycle}
      {!isStarted ? <button onClick={startClocks}>Start</button> : <button onClick={stopClocks}>Stop</button>}
    </div>
  );
}

export default App;
