import React, { useContext } from 'react';
// import ENavigator from "../eNavigator/eNavigator";
import { FaBars, FaRegSun, FaMoon } from 'react-icons/fa';
import './EHeader.css';
import { appContext } from '../../context/app';

const EHeader: React.FC = () => {
  const { toggleTheme, darkMode } = useContext(appContext);

  return (
    <header className={darkMode ? 'Header darkmode' : 'Header'}>
      <button
        className="Header__button theme-controller"
        onClick={toggleTheme}
        type="button"
      >
        {darkMode ? <FaMoon /> : <FaRegSun />}
      </button>
      <button type="button" className="Header__button">
        <FaBars />
      </button>
    </header>
  );
};

export default EHeader;
