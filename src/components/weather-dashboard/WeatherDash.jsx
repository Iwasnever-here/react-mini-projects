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
    <div>
      weather
      <p>current location: {weather.location.name}</p>
      <img src={weather?.current?.condition?.icon} alt="weather icon" />
      <p>current condition: {weather.current.condition?.text}</p>
      <p> current temp: {weather.current.temp_c}</p>
      <p>current feelslike: {weather.current.feelslike_c}</p>
      <p>current wind: {weather.current.wind_kph}</p>
      <p>chance of rain: {weather.forecast.forecastday[0].day.daily_chance_of_rain}</p>



    </div>
  )
}

export default WeatherDash
