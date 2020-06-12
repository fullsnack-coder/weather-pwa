import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from './pages/Home/Home';
import { AppContextProvider } from './context/app';
import ENavigator from './components/eNavigator/eNavigator';
import Profile from './pages/Profile/Profile';
import { kick } from './services/userAccount';

type User = {
  uuid?: string;
  username: string;
  userImage: string;
  userPlaces: { placeName: string; uuid: string }[];
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);
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

  const [user, setUser] = useState<User>({
    username: '',
    userImage: '',
    uuid: '',
    userPlaces: [],
  });

  useEffect(() => {
    kick();
  }, []);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  function toggleNavbar() {
    setActiveNavbar(!activeNavbar);
  }

  return (
    <AppContextProvider
      value={{
        darkMode,
        toggleTheme,
        activeNavbar,
        toggleNavbar,
        coords,
        setCoords,
        user,
        setUser,
        weather,
        setWeather,
        appStatus,
        setAppStatus,
      }}
    >
      <Router>
        <motion.div
          className={darkMode ? 'App__container darkMode' : 'App__container'}
          animate={{ x: activeNavbar ? '-75%' : '0%' }}
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
          <ENavigator />
        </motion.div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
