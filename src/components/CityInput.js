import React, { useState } from 'react';
import "../App.css"
const CityInput = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input className='inpt'
        type="text"
        name= "search"
        placeholder=" Search for places ..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {/* <button type="submit">Search</button> */}
    </form>
  );
};

export default CityInput;
