import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HourlyWeather from './HourlyWeather';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog } from 'weather-icons-react';
import "./WeatherDisplay.css"

const API_KEY = '6bee372155ce5f29537e47a052013f28'; // Replace with your actual API key

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityFound, setCityFound] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        setCityFound(true);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setCityFound(false);
      }
    };

    fetchData();
  }, [city]);

  if (!cityFound) {
    return <div>City not found</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  if (!weatherData.main || !weatherData.weather || !weatherData.sys) {
    return <div>No weather data available</div>;
  }

  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = weatherData.main.temp - 273.15;
  const feelsLikeCelsius = weatherData.main.feels_like - 273.15;

  // Determine the appropriate weather icon based on the weather condition
  let weatherIcon;
  switch (weatherData.weather[0].main) {
    case 'Clear':
      weatherIcon = <WiDaySunny size={350} className="wicon" style={{color:"white"}}/>;
      break;
    case 'Clouds':
      weatherIcon = <WiCloudy size={350} className="wicon" style={{color:"white"}}/>;
      break;
    case 'Rain':
      weatherIcon = <WiRain size={350} className="wicon" style={{color:"white"}} />;
      break;
    case 'Snow':
      weatherIcon = <WiSnow size={350} className="wicon" style={{color:"white"}}/>;
      break;
    case 'Fog':
      weatherIcon = <WiFog size={350} className="wicon" style={{color:"white"}}/>;
      break;
    default:
      weatherIcon = <WiDaySunny size={350} className="wicon" style={{color:"white"}} />;
  }

  // Get current time and day
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDay = new Date().toLocaleDateString([], { weekday: 'long' });

  return (
    <div>
      <div className='wdisplay mtop'>
        {weatherIcon}
        <p className='txtclr tmsize'> {temperatureCelsius.toFixed(0)} <span className='dsize'>°C</span></p>
        <p className='txtclr fl'>Feels Like: {feelsLikeCelsius.toFixed(0)}°C</p>
        <p className='txtclr wd'> {weatherData.weather[0].description}</p>
        <hr className='line'></hr>
        <p className='txtclr cday'> {currentDay}, <span className='ctime'>{currentTime}</span> </p>
        <p className='txtclr'> </p> 
        <h2 className='txtclr cc'> 
          {weatherData.name}, {weatherData.sys.country}
        </h2>
      </div>
      <HourlyWeather city={city} />
      {weatherData.main && weatherData.weather && weatherData.sys && (
        <TodayHighlights
          humidity={weatherData.main.humidity}
          wind_speed={weatherData.wind.speed}
          sunrise={weatherData.sys.sunrise}
          sunset={weatherData.sys.sunset}
          clouds={weatherData.clouds.all}
          uvi={weatherData.uvi}
          pressure={weatherData.main.pressure}
        />
      )}
    </div>
  );
};

const TodayHighlights = ({ humidity, wind_speed, sunrise, sunset, clouds, uvi, pressure }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <h3>Today's Highlights</h3>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind_speed} m/s</p>
      <p>Sunrise: {formatTime(sunrise)}</p>
      <p>Sunset: {formatTime(sunset)}</p>
      <p>Clouds: {clouds}%</p>
      <p>UV Index: {uvi}</p>
      <p>Pressure: {pressure} hPa</p>
    </div>
  );
};

export default WeatherDisplay;
