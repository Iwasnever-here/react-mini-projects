import React, { useEffect, useState } from 'react'
import './WeatherDash.css';

const WeatherDash = () => {
  const [weather, setWeather] = useState(null)

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY


  const city = 'KW3 6BT'

  useEffect (() => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`)
    .then(res => res.json())
    .then(data => {
      setWeather(data);
    })
    .catch(error => {
      console.log(error)

    })
  }, [])

  if (!weather) return <p>loading lol</p>

  return (
    <div className='p-10 bg-bananamania h-screen'>
      <div className='text-right'>
        search bar here
      </div>

      <div>
        <div className='top-section '>
          <div>
            <img src={weather?.current?.condition?.icon} alt="weather icon" />
            <p>{weather.current.temp_c}</p>
            <p>{weather.location.name}</p>
          </div>
          <div className='text-right'>
           <p>{weather.location.localtime.split(' ')[1]}</p>
          </div>
        </div>
      </div>
      <div className='bg-green-300 grid grid-cols-[30%_70%]'>
        <div className='bg-blue-500 p-2'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='tile'>
              <p>rain: {weather.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            </div>
            <div className='tile'>
              <p>UV: {weather.forecast.forecastday[0].day.uv}</p>
            </div>
            <div className='tile'>
              <p>wind: {weather.current.wind_mph}mph</p>
            </div>
          <div className='tile'>
            <p>snow: {weather.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
          </div>
        </div>

        <div className='rounded-lg bg-red-100 h-16 mt-2 text-center content-center'>
          <p>bring a coat? {weather.forecast.forecastday[0].day.daily_will_it_rain}</p>
        </div>
        </div>

        <div>
          this secion be for forcase with maybe a graph
        </div>
      </div>

    </div>
  )
}

export default WeatherDash
