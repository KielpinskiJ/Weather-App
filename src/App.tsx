import React from 'react';
import './App.css';
import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import FiveDayForecast from './FiveDayForecast';
import TodaysHighlights from './TodaysHighlights';
import { WeatherProvider } from './WeatherContext';

function App() {

  return (
    <WeatherProvider>
      <section className='App bg-main h-100v sm:flex sm:flex-row'>
        <div className='sm:w-30v'>
          <CurrentWeatherDisplay />
        </div>
        <div className='sm:w-70v bg-secondary h-100v'>
          <FiveDayForecast />
          <TodaysHighlights />
        </div> 
      </section>
    </WeatherProvider>
  );
}

export default App;
