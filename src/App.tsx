import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from './pages/Home/Home';
import { AppContextProvider } from './context/app';
import ENavigator from './components/eNavigator/eNavigator';
import Profile from './pages/Profile/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

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
