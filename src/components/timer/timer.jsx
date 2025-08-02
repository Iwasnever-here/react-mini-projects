import {useState, useRef} from 'react'

const Timer = () => {
    const [value, setValue] = useState(25);
    const [timeLeft, setTimeLeft] = useState(1500)
    const intervalRef = useRef(null);
    const alarmSound = new Audio('/timesup.mp3')


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
    <div>
      <h1>Timer</h1>
      <div className='quickSets'>
            <button onClick={() => setTimeLeft(300)}>5</button>
            <button onClick={() => setTimeLeft(900)}>15</button>
            <button onClick={() => setTimeLeft(1800)}>30</button>
            <button onClick={() => setTimeLeft(3600)}>60</button>
      </div>


      <input
        id="slider"
        type="range"
        min="0"
        max="3600"
        step="15"
        value={timeLeft}
        onChange={(e) => setTimeLeft(Number(e.target.value))}
      />

        <div className="time-display">
        <span>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft % 60).padStart(2, '0')}</span>
      </div>

      <div className='buttons'>
        <button onClick={startTimer}>START</button>
        <button onClick={stopTimer}>STOP</button>
      </div>
    </div>
  )
}

export default Timer
