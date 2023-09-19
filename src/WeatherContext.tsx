import React, { createContext, useEffect, useState } from 'react';
import useWeatherApi from './useWeatherApi';
import { WeatherContextProps, WeatherProviderProps } from './types';

export const WeatherContext = createContext<WeatherContextProps>({ 
  location: '', 
  setLocation: () => {}, 
  data: null, 
  error: null,
  setDays: () => {}
});

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [location, setLocation] = useState('Helsinki');
  const [days, setDays] = useState(5);
  const [data, error] = useWeatherApi(location, days);

  useEffect(() => {
    if (error === 'City not found') {
      setLocation('Helsinki');
    }
  }, [error]);

  return (
    <WeatherContext.Provider value={{ location, setLocation, data, error, setDays }}>
      {children}
    </WeatherContext.Provider>
  );
};

