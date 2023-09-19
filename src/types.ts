export interface Weather {
  main: string;
  description?: string;
  icon: string;
}

export interface WeatherData {
  weather: Weather[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  name: string;
  date: string;
}

export interface WeatherContextProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export interface WeatherProviderProps {
  children: React.ReactNode;
}