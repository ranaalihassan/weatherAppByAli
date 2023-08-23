import React from 'react';

const TodayHighlights = ({ weatherData }) => {
  const { humidity, wind_speed, sunrise, sunset, clouds, uvi, pressure } = weatherData.current;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <h2>Today's Highlights</h2>
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

export default TodayHighlights;
