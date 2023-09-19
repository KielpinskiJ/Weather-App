import clear from './assets/Clear.png';
import lightcloud from './assets/LightCloud.png';
import heavycloud from './assets/HeavyCloud.png';
import shower from './assets/Shower.png';
import heavyrain from './assets/HeavyRain.png';
import thunderstorm from './assets/Thunderstorm.png';
import snow from './assets/Snow.png';

export const weatherIcons: { [key: string]: string } = {
  '01': clear,
  '02': lightcloud,
  '03': heavycloud,
  '04': heavycloud,
  '09': shower,
  '10': heavyrain,
  '11': thunderstorm,
  '13': snow,
  '50': heavycloud,
};

export function getWeatherIcon(weather: string): string {
  const iconKey = weather.substring(0, 2);
  if (typeof weatherIcons[iconKey] === 'string') {
    return weatherIcons[iconKey];
  } else {
    return clear;
  }
  
}


export function getCurrentDate(): string {
  const today = new Date();
  return today.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function getDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function degToCompass(num: number) {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

