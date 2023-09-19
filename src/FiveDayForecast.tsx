import React, { useContext } from 'react';
import { getDate, getWeatherIcon } from './utils';
import { WeatherContext } from './WeatherContext';

const FiveDayForecast: React.FC = () => {
  const { data: forecastData } = useContext(WeatherContext);

  if (!forecastData ) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='flex justify-between p-11 flex-wrap bg-secondary gap-6 sm:justify-center sm:px-7 sm:pb-5 sm:pt-10 hd:px-30 fullhd:px-64 fullhd:pb-20 fullhd:pt-40'>
      {forecastData.map((dayData, index) => {
        if (!dayData || !dayData.main) {
          return null;
        }
        if (index === 0) {
          return null;
        }
        const weatherIcon = getWeatherIcon(dayData.weather[0].icon);
        const maxTemp = Math.round(dayData.main.temp_max);
        const minTemp = Math.round(dayData.main.temp_min);
        const date = index === 1 ? 'Tomorrow' : dayData.date;

        return (
          <div key={index} className='flex flex-col items-center bg-main p-4 w-32'>
            <div className='text-text-main'>{date === 'Tomorrow' ? date : getDate(date)}</div>
            <img className='h-16 mb-3' src={weatherIcon} alt="Weather"/>
            <div className='flex gap-4'>
              <span className='text-text-main'>{maxTemp}°C</span>
              <span className='text-text-secondary'>{minTemp}°C</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FiveDayForecast;
