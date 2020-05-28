import React, { SetStateAction, Dispatch } from 'react';

interface AppContextInterface {
  darkMode?: boolean;
  user?: {
    uuid: string;
    username: string;
  };
  coords: {
    lat: number;
    lng: number;
  };
  toggleTheme?: any;
  activeNavbar?: boolean;
  toggleNavbar?: any;
  setCoords: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

export const appContext = React.createContext<AppContextInterface>({
  setCoords: () => {},
  coords: {
    lat: 0,
    lng: 1,
  },
});

export const AppContextProvider = appContext.Provider;
