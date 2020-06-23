import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

import './eNavigator.css';
import { appContext } from '../../context/app';
import PlaceOption from './_children/PlaceOption';
import EButton from '../eButton/eButton';
import useUser from '../../hooks/useUser';

const ENavigator: React.FC = () => {
  const { darkMode, toggleNavbar, activeNavbar } = useContext(appContext);
  const { setUser, ...user } = useUser();
  const classes = classNames('Navigator', {
    darkMode: !!darkMode,
  });
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (activeNavbar) {
      window.onpopstate = () => {
        history.push(pathname);
        toggleNavbar();
      };
    } else {
      window.onpopstate = () => {};
    }
  }, [activeNavbar, toggleNavbar, history, pathname]);

  function loginButtonHandler() {
    toggleNavbar();
    history.push('/profile');
  }

  function logoutButtonHandler() {
    window.localStorage.clear();
    setUser({
      userDescription: '',
      username: '',
      userPlaces: [],
      userImage: '',
    });
    toggleNavbar();
  }

  return (
    <div className={classes}>
      <div className="Navigator__head">
        <figure className="User__picture mb10">
          <img src={user?.userImage || '/assets/person.svg'} alt="userimage" />
        </figure>
        <span className="User__info">
          {user?.username ? (
            <>
              <h1>{user?.username}</h1>
              <p>
                {`ID: ${user?.uuid}`}
                <span role="img" aria-label="class" className="class_icon">
                  ⚔️
                </span>
              </p>
              <p>{user.userDescription}</p>
            </>
          ) : (
            <>
              <h2 className="mb10">Inicia sesión para guardar lugares</h2>
              <EButton
                text="Iniciar sesión"
                type="button"
                Icon={<AiFillHeart />}
                handleClick={loginButtonHandler}
              />
            </>
          )}
        </span>
      </div>
      <div className="Navigator__body">
        <nav className={darkMode ? 'Nav__options darkmode' : 'Nav__options'}>
          <NavLink to="/" className="Nav__option" onClick={toggleNavbar} exact>
            Home
          </NavLink>
          <NavLink to="/profile" className="Nav__option" onClick={toggleNavbar}>
            Ir al perfil
          </NavLink>
          <button
            type="button"
            className="Nav__option"
            onClick={logoutButtonHandler}
          >
            Cerrar Sesión
          </button>
        </nav>
        <section className="Nav__places">
          <header className="mb10">Lugares Visitados</header>
          <main>
            {user?.username !== '' ? (
              <>
                {user?.userPlaces.length || [].length > 0 ? (
                  user?.userPlaces.map((place: any) => (
                    <PlaceOption name={place.placeName} key={place.placeName} />
                  ))
                ) : (
                  <h3>No hay ubicaciones para mostrar</h3>
                )}
              </>
            ) : (
              <h3>No ha iniciado sesión</h3>
            )}
          </main>
        </section>
      </div>
    </div>
  );
};

export default ENavigator;
