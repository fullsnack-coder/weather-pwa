import React, { useContext } from 'react';
import './ErrorPage.css';
import EHeader from '../../components/eHeader/eHeader';
import { appContext } from '../../context/app';

const ErrorPage: React.FC = (props) => {
  const { darkMode } = useContext(appContext);
  return (
    <div className={darkMode ? 'ErrorPage darkmode' : 'ErrorPage'}>
      <EHeader />
      <h1>Oh oh</h1>
      <h3>Página no encontrada</h3>
    </div>
  );
};

export default ErrorPage;
