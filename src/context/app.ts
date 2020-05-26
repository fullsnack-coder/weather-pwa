import React from 'react';

interface AppContextInterface {
  darkMode?: boolean;
  user?: {
    uuid: string;
    username: string;
  };
  toggleTheme?: any;
  activeNavbar?: boolean;
  toggleNavbar?: any;
}

export const appContext = React.createContext<AppContextInterface>({});

export const AppContextProvider = appContext.Provider;
