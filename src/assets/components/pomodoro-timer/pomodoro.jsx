import { useRef, useState } from 'react';
import './pomodoro.css';

const Pomodoro = () => {

  const DURATIONS ={
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
  }


  const [state, setState] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(DURATIONS['pomodoro']); // 25 minutes
  const intervalRef = useRef(null);

  const switchMode = (mode) => {
    setState(mode);
    setTimeLeft(DURATIONS[mode]);
    stopTimer();
  }
  const startTimer = () => {
    if (intervalRef.current !== null) return; 

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  

  return (
    <div className="pomodoro">
        <div className='top-section'>
            <button onClick={() => switchMode('pomodoro')}>Pomodoro</button>
            <button onClick={() => switchMode('shortBreak')}>Short Break</button>
            <button onClick={() => switchMode('longBreak')}>Long Break</button>
        </div>

        <div className="time-display">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, '0')}</span>
      </div>


        <div className='bottom-section'>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    </div>
  );
};

export default Pomodoro;
