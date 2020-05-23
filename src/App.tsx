import React, { useState } from 'react';
import Home from './pages/Home/Home';
import { AppContextProvider } from './context/app';
import EHeader from './components/eHeader/eHeader';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <AppContextProvider value={{ darkMode, toggleTheme }}>
      <Home />
      <EHeader />
    </AppContextProvider>
  );
}

export default App;
