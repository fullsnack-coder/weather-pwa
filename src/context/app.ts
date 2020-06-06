import React, { SetStateAction, Dispatch } from 'react';

type User = {
  uuid?: string;
  username: string;
  userImage: string;
};

interface AppContextInterface {
  darkMode?: boolean;
  user?: User;
  coords: {
    lat: number;
    lng: number;
  };
  toggleTheme?: any;
  activeNavbar?: boolean;
  toggleNavbar?: any;
  setCoords: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  setUser?: any;
}

export const appContext = React.createContext<AppContextInterface>({
  setCoords: () => {},
  coords: {
    lat: 0,
    lng: 1,
  },
});

export const AppContextProvider = appContext.Provider;
