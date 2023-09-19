import React, { createContext, useState } from 'react';
import { WeatherContextProps, WeatherProviderProps } from './types';


export const WeatherContext = createContext<WeatherContextProps>({ location: '', setLocation: () => {} });

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [location, setLocation] = useState('Helsinki');

  return (
    <WeatherContext.Provider value={{ location, setLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

