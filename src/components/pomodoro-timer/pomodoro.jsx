import { useRef, useState } from 'react';
import './pomodoro.css';
import { FaPlay, FaPause } from "react-icons/fa";

const Pomodoro = () => {

  const DURATIONS ={
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
  }

  const [state, setState] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(DURATIONS['pomodoro']); // 25 minutes
  const intervalRef = useRef(null);
  const alarmSound = new Audio('/timesup.mp3')

  const switchMode = (mode) => {
    setState(mode);
    setTimeLeft(DURATIONS[mode]);
    stopTimer();
  }

  const startTimer = () => {
    if (intervalRef.current !== null) return; 

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime == 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        alarmSound.play();
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
    <div className="main min-h-screen flex items-center justify-center bg-red-200">
    <div className="pomodoro">
        <div className='top-section'>
            <button className = 'bg-pomodorored' onClick={() => switchMode('pomodoro')}>Pomodoro</button>
            <button className = 'bg-pomodorored' onClick={() => switchMode('shortBreak')}>Short Break</button>
            <button className = 'bg-pomodorored' onClick={() => switchMode('longBreak')}>Long Break</button>
        </div>

        <div className="time-display">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, '0')}</span>
      </div>


        <div className='bottom-section'>
            <button className='bg-pomodorogreen' onClick={startTimer}><FaPlay /></button>
            <button className = 'bg-pomodorored2' onClick={stopTimer}><FaPause /></button>
        </div>
    </div>
    </div>
  );
};

export default Pomodoro;
