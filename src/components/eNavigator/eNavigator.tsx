import React, { useContext } from 'react';
import classNames from 'classnames';
import './eNavigator.css';
import { appContext } from '../../context/app';
import PlaceOption from './_children/PlaceOption';

const ENavigator: React.FC = () => {
  const { darkMode } = useContext(appContext);
  const classes = classNames('Navigator', {
    darkMode: !!darkMode,
  });

  return (
    <div className={classes}>
      <div className="Navigator__head">
        <figure className="User__picture mb10">
          <img
            src="https://i.giphy.com/media/gFc4ioGkPc9DfSeBgr/giphy.webp"
            alt="userimage"
          />
        </figure>
        <span className="User__info">
          <h1>Manchute </h1>
          <p>
            Devwarrior in Wow Legion
            <span role="img" aria-label="class" className="class_icon">
              ⚔️
            </span>
          </p>
        </span>
      </div>
      <div className="Navigator__body">
        <nav className="Nav__options">
          <div className="Nav__option">
            <p>Ir al perfil</p>
          </div>
        </nav>
        <section className="Nav__places">
          <header className="mb10">Lugares Visitados</header>
          <PlaceOption />
        </section>
      </div>
    </div>
  );
};

export default ENavigator;
