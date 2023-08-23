import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '6bee372155ce5f29537e47a052013f28'; // Replace with your actual API key

const WeeklyWeather = ({ city }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        setWeeklyData(response.data.list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weekly weather data:', error);
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, [city]);

  if (loading) {
    return <div>Loading weekly weather data...</div>;
  }

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter data for the next 7 days
  const next7DaysData = weeklyData.filter((hour) => {
    const hourDate = new Date(hour.dt * 1000);
    return Math.floor((hourDate - today) / (24 * 3600 * 1000)) < 7;
  });

  // Group the hourly data by day
  const groupedData = {};
  next7DaysData.forEach((hour) => {
    const date = new Date(hour.dt * 1000).toDateString();
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(hour);
  });

  // Calculate the max and min temperatures for each day
  const dailyTemperatures = Object.entries(groupedData).map(([date, hours]) => {
    const maxTemp = Math.max(...hours.map((hour) => hour.main.temp)) -273.15;
    const minTemp = Math.min(...hours.map((hour) => hour.main.temp)) -273.15;
    return {
      date,
      maxTemp: maxTemp.toFixed(2),
      minTemp: minTemp.toFixed(2),
    };
  });

  return (
    <div>
      <h2>This Week's Weather for {city}</h2>
      <ul>
        {dailyTemperatures.map((day, index) => (
          <li key={index}>
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}: {day.maxTemp}°C Max, {day.minTemp}°C Min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyWeather;
