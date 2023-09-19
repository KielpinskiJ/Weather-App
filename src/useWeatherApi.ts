import { useEffect, useState } from 'react';
import { WeatherData } from './types';

const useWeatherApi = (city: string, days: number = 5): [WeatherData[] | null, string | null] => {
  const [data, setData] = useState<WeatherData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=${days*8}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }    
        return response.json();
      })
      .then(data => {
        const dailyData = data.list.reduce((acc: any[], reading: any) => {
          const date = reading.dt_txt.split(' ')[0];
          const existingDay = acc.find(day => day.date === date);

          if (existingDay) {
            existingDay.main.temp_min = Math.min(existingDay.main.temp_min, reading.main.temp_min);
            existingDay.main.temp_max = Math.max(existingDay.main.temp_max, reading.main.temp_max);
            existingDay.weather[reading.weather[0].main] = (existingDay.weather[reading.weather[0].main] || 0) + 1;
            existingDay.description[reading.weather[0].description] = (existingDay.description[reading.weather[0].description] || 0) + 1;
            existingDay.icon[reading.weather[0].icon] = (existingDay.icon[reading.weather[0].icon] || 0) + 1;
            existingDay.main.pressure = reading.main.pressure;
            existingDay.main.humidity = reading.main.humidity;
            existingDay.wind.speed = reading.wind.speed;
            existingDay.wind.deg = reading.wind.deg;
            existingDay.visibility = reading.visibility;
            existingDay.main.temp = reading.main.temp;
          } else {
            acc.push({
              date,
              main: {
                temp_min: reading.main.temp_min,
                temp_max: reading.main.temp_max,
                temp: reading.main.temp,
                pressure: reading.main.pressure,
                humidity: reading.main.humidity,
              },
              weather: { 
                [reading.weather[0].main]: 1,
              },
              description: { 
                [reading.weather[0].description]: 1,
              },
              icon: { 
                [reading.weather[0].icon]: 1,
              },
              wind: {
                speed: reading.wind.speed,
                deg: reading.wind.deg,
              },
              visibility: reading.visibility,
              name: data.city.name,
            });
          }

          return acc;
        }, []);

        dailyData.forEach((day: any) => {
          const weatherState = Object.keys(day.weather).reduce((a, b) => day.weather[a] > day.weather[b] ? a : b);
          const descriptionState = Object.keys(day.description).reduce((a, b) => day.description[a] > day.description[b] ? a : b);
          const iconState = Object.keys(day.icon).reduce((a, b) => day.icon[a] > day.icon[b] ? a : b);
          day.weather = [{ main: weatherState, description: descriptionState, icon: iconState }];
        });

        setData(dailyData);
      })
      .catch(error => {
        if (error.message.includes('404')) {
          setError('City not found');
        } else {
          setError('An error occurred while processing the weather data.');
        }
      });
  }, [city, days, apiKey]);

  return [data, error];
};

export default useWeatherApi;
