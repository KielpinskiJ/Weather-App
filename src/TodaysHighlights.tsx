import React, { useContext } from 'react';
import { degToCompass } from './utils';
import { WeatherContext } from './WeatherContext';

const TodaysHighlights: React.FC = () => {
  const { data: weatherDataArray } = useContext(WeatherContext);
  const weatherData = weatherDataArray ? weatherDataArray[0] : null;

  if (!weatherData || !weatherData.main || !weatherData.wind) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='flex flex-col gap-6 bg-secondary p-6 sm:px-7 hd:px-30 fullhd:px-64'>
      <h2 className='text-text-main text-2xl font-bold'>Today's Highlights</h2>
      <div className='flex flex-col gap-6 sm:grid sm:grid-cols-2'>
        <div className='flex flex-col items-center bg-main p-6 gap-4'>
          <h3 className='text-text-main'>Wind Status</h3>
          <div>
            <span className='text-text-main text-6xl font-bold'>{weatherData.wind.speed}</span>
            <span className='text-text-main text-4xl'>m/s</span>
          </div>
          <span className='text-text-main'>{degToCompass(weatherData.wind.deg)}</span>
        </div>
        <div className='flex flex-col items-center bg-main p-6 gap-4'>
          <h3 className='text-text-main'>Humidity</h3>
          <div>
            <span className='text-text-main text-6xl font-bold'>{weatherData.main.humidity}</span>
            <span className='text-text-main text-4xl'>%</span>
          </div>
          <div className='w-full'>
            <div className='text-text-secondary flex justify-between'>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="w-full bg-text-main rounded-full h-2.5">
              <div className="bg-custom-yellow h-2.5 rounded-full" style={{width: `${weatherData.main.humidity}%`}} ></div>
            </div>
            <div className='w-full flex justify-end text-text-secondary'>
              <span>%</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center bg-main p-6 gap-4 fullhd:p-10'>
          <h3 className='text-text-main'>Visibility</h3>
          <div>
            <span className='text-text-main text-6xl font-bold'>{weatherData.visibility}</span>
            <span className='text-text-main text-4xl'>m</span>
          </div>
        </div>
        <div className='flex flex-col items-center bg-main p-6 gap-4'>
          <h3 className='text-text-main'>Air Pressure</h3>
          <div>
            <span className='text-text-main text-6xl font-bold'>{weatherData.main.pressure}</span>
            <span className='text-text-main text-4xl'>hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodaysHighlights;
