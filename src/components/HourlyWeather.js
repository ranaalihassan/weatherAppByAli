import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '6bee372155ce5f29537e47a052013f28'; // Replace with your actual API key

const HourlyWeather = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=12`
        ); // Fetch 12 data points, equivalent to 12 hours
        setHourlyData(response.data.list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hourly weather data:', error);
        setLoading(false);
      }
    };

    fetchHourlyData();
  }, [city]);

  if (loading) {
    return <div>Loading hourly weather data...</div>;
  }

  return (
    <div>
      <h2>Today's Hourly Weather for {city}</h2>
      <ul>
        {hourlyData.map((hour, index) => {
          const timestamp = new Date(hour.dt * 1000);
          const formattedTime = timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          const temperature = (hour.main.temp-273.15 ).toFixed(2);
          return (
            <li key={index}>
              {formattedTime}: {temperature}°C, {hour.weather[0].description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HourlyWeather;
