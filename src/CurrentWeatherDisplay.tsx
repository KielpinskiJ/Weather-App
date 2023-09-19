import React, { useContext, useEffect, useState } from 'react';
import { getWeatherIcon, getCurrentDate } from './utils';
import cloudBackground from './assets/Cloud-background.png';
import SearchMenu from './SearchMenu';
import { WeatherContext } from './WeatherContext';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const CurrentWeatherDisplay: React.FC = () => {
  const { data: weatherDataArray, error, setLocation } = useContext(WeatherContext);
  const weatherData = weatherDataArray ? weatherDataArray[0] : null;
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={open}
        onClose={handleClose}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
}

export default CurrentWeatherDisplay;
