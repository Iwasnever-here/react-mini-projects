import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Pomodoro from './components/pomodoro-timer/pomodoro'; 
import Timer from './components/timer/timer';
import CrayolaColors from './components/crayola-colors/crayolaColors'; 
import './App.css';
import { FaReact } from "react-icons/fa6";
import HangMan from './components/hang-man/HangMan';
import WeatherDash from './components/weather-dashboard/WeatherDash';
import BarcodeScanner from './components/barcode-scanner/BarcodeScanner';
import Quiz from './components/Quiz/Quiz';
import TicTac from './components/tic-tak/TicTac';
import MatchGame from './components/match-game/MatchGame';



function App() {
  return (
    <BrowserRouter>
    <MainLayout />
    </BrowserRouter>
  )

  function MainLayout () {
    const location = useLocation() 

    const routeColorMap ={
      '/': 'bg-bananamania',
      '/pomodoro': 'bg-pomodorored',
      '/timer': 'bg-onyx',
      '/crayola': 'bg-yellow-400',
      '/hangman' : 'bg-outerspace',
      '/weather' : 'bg-bananamania',
      '/barcode' : 'bg-white',
      '/tictac' : 'bg-copper',
      '/match' : 'bg-carnationpink'


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
        <Route path = "/barcode" element = {<BarcodeScanner />} />
        <Route path = "/quiz" element = {<Quiz />} />
        <Route path = "/tictac" element = {<TicTac />} />
        <Route path = "/match" element = {<MatchGame />} />
        
      </Routes>


    </>
    
  );
  }
 
  


}

function Home() {
  return(
  <div className='h-screen bg-bananamania'>
    <h1 className='text-center text-2xl'>components:</h1>
    <div className='maingrid grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-10 m-10 '>
    <div className='bg-pomodorored'><Link to="/pomodoro" className="text-zinc-950 text-lg px-5">Pomodoro Timer</Link></div>
    <div className='bg-shadows'><Link to="/timer" className="text-zinc-950 text-lg px-5">Timer</Link></div>
    <div className='bg-yellow-400'><Link to="/crayola" className="text-zinc-950 text-lg px-5">Crayola Colors</Link></div>
    <div className='bg-apricot'><Link to="/hangman" className="text-zinc-950 text-lg px-5">Hang Man</Link></div>
    <div className='bg-cornflower'><Link to="/weather" className="text-zinc-950 text-lg px-5">Weather Dashboard</Link></div>
    <div className='bg-inchworm'><Link to="/barcode" className="text-zinc-950 text-lg px-5">Barcode Scanner</Link></div>
    <div className='bg-wisteria'><Link to="/quiz" className="text-zinc-950 text-lg px-5">Quiz</Link></div>
    <div className='bg-copper'><Link to="/tictac" className="text-zinc-950 text-lg px-5">Tic Tac Toe</Link></div>
    <div className='bg-white'><Link to="/match" className="text-zinc-950 text-lg px-5">Matching Cards</Link></div>
    </div>
  </div>)
}

export default App;
