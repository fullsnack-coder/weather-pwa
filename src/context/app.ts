import React from "react";

interface AppContextInterface {
  darkMode?: boolean;
  user?: {
    uuid: string;
    username: string;
  };
  toggleTheme?: any;
}

export const appContext = React.createContext<AppContextInterface>({});

export const AppContextProvider = appContext.Provider;
