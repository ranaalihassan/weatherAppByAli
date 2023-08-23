import React, { useState } from 'react';
import CityInput from './components/CityInput';
import WeatherDisplay from './components/WeatherDisplay';
import WeeklyWeather from './components/WeeklyWeather'; // Import the new component
import "./App.css"
const App = () => {
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  return (
    <div >
      <div className='wdisplay'>
      <h1 className='aname'>WeatherApp by Ali</h1>
      <CityInput  onSearch={handleSearch} />
      </div>
      {searchCity && (
        <div >
          <WeatherDisplay city={searchCity} />
          <WeeklyWeather city={searchCity} /> {/* Include the new component */}
        </div>
      )}
    </div>
  );
};

export default App;
