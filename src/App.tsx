import React, { useState } from 'react';
import Home from './pages/Home/Home';
import { AppContextProvider } from './context/app';
import ENavigator from './components/eNavigator/eNavigator';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);

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
      }}
    >
      <motion.div
        className={darkMode ? 'App__container darkMode' : 'App__container'}
        animate={{ x: activeNavbar ? '-75%' : '0%' }}
      >
        <Home />
        <ENavigator />
      </motion.div>
    </AppContextProvider>
  );
}

export default App;
