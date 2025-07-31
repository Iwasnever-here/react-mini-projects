import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Pomodoro from './components/pomodoro-timer/pomodoro'; 
import './App.css';
import { FaReact } from "react-icons/fa6";

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <nav className="">
        <div className="h-10 items-center flex justify-between bg-yellow-200">
          <div className="text-3xl text-zinc-950 font-bold px-2"><FaReact /></div>
          <div className="">
            <Link to="/" className="text-zinc-950 text-lg px-5">Home</Link>
          </div>


        
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>

    </BrowserRouter>
    
  );
}

function Home() {
  return(
  <div >
    <h1>components:</h1>
    <div><Link to="/pomodoro" className="text-zinc-950 text-lg px-5">Pomodoro Timer</Link></div>
  </div>)
}

export default App;
