import React, { useEffect, useState } from 'react'
import './WeatherDash.css';
import { IoMdSunny } from "react-icons/io";
import { FaWind, FaSnowflake, FaCloudRain } from "react-icons/fa6";
import {LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const WeatherDash = () => {
  const [weather, setWeather] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY


  const fetchWeatherData = (query) => {
    setError('')
    setWeather(null)
    setLoading(true)

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=1`)
    .then(res => res.json())
    .then(data => {
      if (data.error){
        setError(data.error.message)
      }else {setWeather(data);}
    })
    .catch(error => {
      setError('failed to fetch weather data')
      console.log(error)
    })
    .finally(() => setLoading(false))
  };

  // get location from device first
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
          fetchWeatherData(coords);
        },
        (error) => {
          console.warn('Geolocation denied or failed:', error);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);



  const HandleSearch = (() => {
    setSearchTerm(searchTerm)
    console.log(searchTerm)
    fetchWeatherData(searchTerm)
  })


const currentHour = weather
  ? parseInt(weather.location.localtime.split(' ')[1].split(':')[0], 10)
  : null;

const hourlyData = weather ? weather.forecast.forecastday[0].hour.map(hour => ({
  time: hour.time.split(' ')[1].slice(0,5),
  temp_c: hour.temp_c
})) : [];




const hourlyFromNow = weather
  ? weather.forecast.forecastday[0].hour.filter(h => {
      const hourNum = parseInt(h.time.split(' ')[1].split(':')[0], 10);
      return hourNum >= currentHour;
    })
  : [];


  return (
    <div className='p-10 bg-bananamania h-[100%] pb-40'>
      <div className='text-right'>
        <input 
        className='border border-solid border-violetblue rounded-lg p-1 mb-5'
        type= 'text'
        placeholder='      enter location     ⌕     '
        value = {searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') HandleSearch();
        }}/>
      </div>


        {loading && <p>loading weather ... </p>}
        {error && <p>{error}</p>}



         {weather && !loading && !error && (
        <>
          <div className="top-section2">
            <div>
              <img src={weather?.current?.condition?.icon} alt="weather icon" />
              <p className="text-8xl">{weather.current.temp_c}°</p>
              <p className="text-cornflower ml-2">{weather.location.name}</p>
            </div>
            <div className="text-right mr-3">
              <p>{weather.location.localtime.split(' ')[1]}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-[36%_64%] xl:grid-cols-[20%_80%] grid-cols-1">
            <div className="p-2">
              <div className="grid grid-cols-2 gap-2 gap-y-5">
                <div className="tile flex">
                  <FaCloudRain className="text-4xl mr-2" />
                  <div>
                    <p>rain: </p>
                    <p>{weather.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                  </div>
                </div>
                <div className="tile">
                  <IoMdSunny className="text-4xl mr-2" />
                  <div>
                    <p>UV: </p>
                    <p>{weather.forecast.forecastday[0].day.uv}</p>
                  </div>
                </div>
                <div className="tile">
                  <FaWind className="text-3xl mr-2" />
                  <div>
                    <p>wind: </p>
                    <p>{weather.current.wind_mph}mph</p>
                  </div>
                </div>
                <div className="tile">
                  <FaSnowflake className="text-3xl mr-2" />
                  <div>
                    <p>snow: </p>
                    <p>{weather.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center rounded-lg bg-violetblue text-bananamania h-16 text-center mt-10 shadow shadow-cornflower shadow-md">
                <p className="mr-4">bring a coat? </p>
                <p>{weather.forecast.forecastday[0].day.daily_will_it_rain === 1 ? 'yes' : 'no'}</p>
              </div>
            </div>

            <div className='mt-5'>
              <div className='h-45 border border-solid border-violetblue ml-3 mb-3 xl:h-60'>
                <ResponsiveContainer width = '100%' height = '100%'>
                  <LineChart data={hourlyData} margin = {{top: 0 ,right:5, left:5, bottom:0 }}>
                    <CartesianGrid strokeDasharray= '5 1' />
                    <XAxis dataKey= 'time' interval={3} />
                    <Tooltip />
                    <Line type='monotone' dataKey = 'temp_c' stroke='#4f46e5' strokeWidth = {2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="hourly-container ">
              {hourlyFromNow.map(hour => (
                <div key={hour.time} className="hour-tile "> 
                  <img src={hour.condition.icon} alt={hour.condition.text} />
                  <p>{hour.temp_c}°C</p>
                  <p>{hour.time.split(' ')[1].slice(0, 5)}</p>
                </div>
              ))}
            </div>

            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default WeatherDash
