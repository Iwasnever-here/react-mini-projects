import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Pomodoro from './components/pomodoro-timer/pomodoro'; 
import Timer from './components/timer/timer';
import CrayolaColors from './components/crayola-colors/crayolaColors'; 
import './App.css';
import { FaReact } from "react-icons/fa6";
import HangMan from './components/hang-man/HangMan';
import WeatherDash from './components/weather-dashboard/WeatherDash';

function App() {
  return (
    <BrowserRouter>
    <MainLayout />
    </BrowserRouter>
  )

  function MainLayout () {
    const location = useLocation() 

    const routeColorMap ={
      '/': 'bg-white',
      '/pomodoro': 'bg-pomodorored',
      '/timer': 'bg-onyx',
      '/crayola': 'bg-yellow-400',
      '/hangman' : 'bg-outerspace'
    }

    const navColor = routeColorMap[location.pathname] || 'bg-gray-100';


      return (
    <>
      <nav className={`${navColor} z-20`}>
        <div className="h-10 items-center flex justify-between">
          <div className="text-3xl text-zinc-950 font-bold px-2"><FaReact /></div>
          <div className="">
            <Link to="/" className="text-zinc-950 text-lg px-5">Home</Link>
          </div>


        
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path = "/timer" element={<Timer />} />
        <Route path = "/crayola" element={<CrayolaColors />} />
        <Route path = "/hangman" element = {<HangMan />} />
        <Route path = "/weather" element = {<WeatherDash />} />
      </Routes>

    </>
    
  );
  }
 
  


}

function Home() {
  return(
  <div >
    <h1>components:</h1>
    <div><Link to="/pomodoro" className="text-zinc-950 text-lg px-5">Pomodoro Timer</Link></div>
    <div><Link to="/timer" className="text-zinc-950 text-lg px-5">Timer</Link></div>
    <div><Link to="/crayola" className="text-zinc-950 text-lg px-5">Crayola Colors</Link></div>
    <div><Link to="/hangman" className="text-zinc-950 text-lg px-5">Hang Man</Link></div>
    <div><Link to="/weather" className="text-zinc-950 text-lg px-5">Weather Dashboard</Link></div>
  </div>)
}

export default App;
