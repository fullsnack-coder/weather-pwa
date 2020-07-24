import React, { createContext, useState } from 'react';

type Place = {
  placeName: string;
};

interface userInterface {
  uuid?: string;
  username: string;
  userImage?: string;
  userPlaces: Place[];
  userDescription: string;
}

interface userContextInterface {
  user: userInterface;
  setUser: React.Dispatch<React.SetStateAction<userInterface>>;
}

const defaultValue: userContextInterface = {
  user: { username: '', userDescription: '', userPlaces: [] },
  setUser: () => {},
};

export const userContext = createContext<userContextInterface>(defaultValue);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<userInterface>({
    userPlaces: [],
    userDescription: '',
    username: '',
    userImage: '',
  });
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
