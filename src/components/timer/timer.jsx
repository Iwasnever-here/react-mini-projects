import {useState, useRef, useEffect} from 'react'
import './timer.css';
import { FaPlay, FaPause } from "react-icons/fa";

const Timer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500)
    const intervalRef = useRef(null);
    const alarmSound = new Audio('/timesup.mp3')


  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current !== null) return;

      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);

            alarmSound.play()
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);
 




  const handleToggle = () => {
    setIsRunning(prev => !prev);
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-onyx'>
    <div className='box'>
        <div className='main-display'>
    
      

        <div className="time-display">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, '0')}</span>
      </div>

      <input className='w-60'
        id="slider"
        type="range"
        min="0"
        max="3600"
        step="15"
        value={timeLeft}
        onChange={(e) => setTimeLeft(Number(e.target.value))}
      />
      </div>


    <div className='quick-sets'>
            <button onClick={() => setTimeLeft(300)}>5</button>
            <button onClick={() => setTimeLeft(900)}>15</button>
            <button onClick={() => setTimeLeft(1800)}>30</button>
            <button onClick={() => setTimeLeft(3600)}>60</button>
      </div>

      
        <div className="toggle-container">
          <div className={`toggle-switch ${isRunning ? 'on' : ''}`} onClick={handleToggle}>
          <div className="toggle-thumb ">
            <div className='text-center justify-center ml-[16px] mt-[16px] text-white'>
                {isRunning ? <FaPause /> : <FaPlay />}
            </div>
            </div>
        

      
    </div>

      </div>
    </div>
    </div>
  )
}

export default Timer
