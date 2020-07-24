import React, { useContext, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { appContext } from '../../../context/app';
import useUser from '../../../hooks/useUser';

const AppContainer: React.FC = ({ children }) => {
  const { darkMode, activeNavbar, toggleTheme: _toggleTheme } = useContext(
    appContext,
  );
  const { setUser, ...user } = useUser();
  const [isMounted, setMounted] = useState(false);
  const toggleTheme = useCallback(_toggleTheme, []);
  // Mantener y establecer la sesión del usuario
  useEffect(() => {
    if (user.username !== '') {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else if (user.username === '') {
      const userLocal = window.localStorage.getItem('user');
      if (userLocal) {
        const currentUser = JSON.parse(userLocal);
        setUser((prevUser) => ({ ...prevUser, ...currentUser }));
      }
    }
  }, [user, setUser]);

  // Mantener y establecer el modo oscuro de preferencia
  useEffect(() => {
    const item = window.localStorage.getItem('darkMode');
    if (!item) {
      window.localStorage.setItem('darkMode', JSON.stringify(false));
    } else {
      const modeValue = JSON.parse(item);
      if (modeValue) {
        toggleTheme();
      }
    }
    setMounted(true);
  }, [toggleTheme]);

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, isMounted]);

  return (
    <motion.div
      className={darkMode ? 'App__container darkMode' : 'App__container'}
      animate={{ x: activeNavbar ? '-75%' : '0%' }}
    >
      {children}
    </motion.div>
  );
};

export default AppContainer;
