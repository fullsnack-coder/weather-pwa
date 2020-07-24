/* eslint-disable no-unused-vars */
import React, { SetStateAction, Dispatch, useState } from 'react';

type Weather = {
  weather: number;
  icon: string;
  place: string;
  tempMin: number;
  tempMax: number;
};

interface AppContextInterface {
  darkMode?: boolean;
  coords: {
    lat: number;
    lng: number;
  };
  toggleTheme?: any;
  activeNavbar?: boolean;
  toggleNavbar?: any;
  setCoords: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  weather: Weather;
  setWeather: Dispatch<SetStateAction<Weather>>;
  appStatus: {
    loading: boolean;
    error: { ok: boolean };
  };
  setAppStatus: any;
}

export const appContext = React.createContext<AppContextInterface>({
  setCoords: () => {},
  coords: {
    lat: 0,
    lng: 1,
  },
  weather: {
    weather: 0,
    icon: '',
    place: '',
    tempMin: 0,
    tempMax: 0,
  },
  setWeather: () => {},
  appStatus: {
    loading: true,
    error: { ok: true },
  },
  setAppStatus: () => {},
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState<boolean>(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [appStatus, setAppStatus] = useState({
    error: { ok: true },
    loading: true,
  });
  const [weather, setWeather] = useState({
    weather: 0,
    icon: '10d@2x',
    place: '',
    tempMin: 0,
    tempMax: 0,
  });

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  function toggleNavbar() {
    setActiveNavbar(!activeNavbar);
  }

  return (
    <appContext.Provider
      value={{
        darkMode,
        toggleTheme,
        activeNavbar,
        toggleNavbar,
        coords,
        setCoords,
        weather,
        setWeather,
        appStatus,
        setAppStatus,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
