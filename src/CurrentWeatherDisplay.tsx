import React, { useContext, useState } from 'react';
import useWeatherApi from './useWeatherApi';
import { getWeatherIcon, getCurrentDate } from './utils';
import { WeatherData } from './types';
import cloudBackground from './assets/Cloud-background.png';
import SearchMenu from './SearchMenu';
import { WeatherContext } from './WeatherContext';

const CurrentWeatherDisplay: React.FC = () => {
  const { location, setLocation } = useContext(WeatherContext);
  const weatherDataArray: WeatherData[] | null = useWeatherApi(location, 1);
  const weatherData = weatherDataArray ? weatherDataArray[0] : null;
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  if (!weatherData || !weatherData.main) {
    return <div>Loading...</div>; 
  }

  const weatherIcon = getWeatherIcon(weatherData.weather[0].icon);
  const roundedTemp = Math.round(weatherData.main.temp);

  return (
    <div className='relative overflow-hidden flex flex-col h-100v items-center justify-between p-14 pt-18'>
      {searchMenuOpen && <SearchMenu setSearchMenuOpen={setSearchMenuOpen} setLocation={setLocation}/>}
      <div className='w-full absolute top-5 left-4'>
        <button className='bg-custom-gray text-text-main py-3 px-4'  onClick={() => setSearchMenuOpen(true)}>Search for places</button>
      </div>
      <img src={cloudBackground} alt="Cloud background" className='absolute max-w-none opacity-10' />
      <img src={weatherIcon} alt="Weather" className='pt-20'/>
      <div className='flex flex-col items-center gap-10'>
        <div>
          <span className='text-text-main text-9xl'>{roundedTemp}</span>
          <span className='text-text-secondary text-5xl'>°C</span>
        </div>
        <div className='text-text-secondary text-4xl'>{weatherData.weather[0].main}</div>
      </div>
      <div className='flex flex-col items-center gap-3 text-text-secondary'>
        <div>Today • {getCurrentDate()}</div>
        <div>
          {weatherData.name}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherDisplay;
