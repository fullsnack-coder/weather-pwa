import React, { useContext } from 'react';
// import ENavigator from "../eNavigator/eNavigator";
import { FaBars, FaRegSun, FaMoon } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import './EHeader.css';
import { appContext } from '../../context/app';

const EHeader: React.FC = () => {
  // eslint-disable-next-line object-curly-newline
  const { toggleTheme, darkMode, toggleNavbar, activeNavbar } = useContext(
    appContext,
  );

  return (
    <header className={darkMode ? 'Header darkmode' : 'Header'}>
      <button
        className="Header__button theme-controller"
        onClick={toggleTheme}
        type="button"
      >
        {darkMode ? <FaMoon /> : <FaRegSun />}
      </button>
      <button type="button" className="Header__button" onClick={toggleNavbar}>
        {activeNavbar ? <IoMdClose /> : <FaBars />}
      </button>
    </header>
  );
};

export default EHeader;
