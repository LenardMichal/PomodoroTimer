import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Timer from './components/Timer/Timer';;



const App: React.FC = () => {
  const [workTime, setWorkTime] = useState(0.1 * 60 * 1000);
  const [shortBrake, setShortBrake] = useState(5 * 60 * 1000);
  const [longBrake, setLongBrake] = useState(25 * 60 * 1000);
  const [cycles, setCycles]  = useState(7);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCountdown, setCurrentCountdown] = useState(() => workTime);
  
  // Interface to prevent TS error
  interface RefInf {
    current: any
  }
  //Add component variable to handle clears
  let countdownInterval : RefInf = useRef();
  // let's useEffect to start countdown
  useEffect(() => {
    startTimer();
    countdownInterval.current = startCountdown(currentCountdown);
  }, [])

  useEffect(() => {
    if(currentCountdown < 1000) {
      clearInterval(countdownInterval.current);
      navigator.vibrate([900, 300, 900, 300, 900]);
      rotateCycles();
      swapTimers();
    }
  }, [currentCountdown]);
  
function swapTimers() {
  if(currentCycle % 2 === 0 || currentCycle === 0)  {
    countdownInterval.current = startCountdown(workTime);
  } else if( currentCycle !== cycles) {
    countdownInterval.current = startCountdown(shortBrake);
  } else {
    countdownInterval.current = startCountdown(longBrake);
  }
}


function rotateCycles() {
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

  return (
    <div className="App">
      <Timer timer={currentTime}/>
      <Timer timer={currentCountdown} />
      Cycle: {currentCycle}
    </div>
  );
}

export default App;
