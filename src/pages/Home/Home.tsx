// eslint-disable-next-line object-curly-newline
import React, { useState, useContext, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import './Home.css';
import * as Weather from '../../services/weather';
import Error from '../../components/Error/Error';
import ECard from '../../components/eCard/eCard';
import { appContext } from '../../context/app';
import EBottomResults from '../../components/eBottomResults/eBottomResults';
import ESearch from '../../components/eSearch/eSearch';
import Loader from '../../components/Loader';

// eslint-disable-next-line no-unused-vars
import { weatherResponse } from '../../utils/types/weather';
import EHeader from '../../components/eHeader/eHeader';
import { getCelcius } from '../../utils';
import EButton from '../../components/eButton/eButton';

const Home: React.FC = () => {
  const { darkMode, setCoords } = useContext(appContext);
  const [loading, setLoading] = useState(false);
  const [grant, setGrant] = useState(false);
  const [error, setError] = useState({ ok: true });
  const [state, setState] = useState({
    weather: 0,
    icon: '10d@2x',
    place: '',
    tempMin: 0,
    tempMax: 0,
  });

  const getLocalWeather = (): Promise<weatherResponse> =>
    new Promise((resolve, reject) => {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(({ coords }) => {
          setLoading(true);
          setGrant(true);
          Weather.getCurrentWeather(coords.latitude, coords.longitude)
            .then((weater) => {
              setCoords({
                lat: coords.latitude,
                lng: coords.longitude,
              });
              resolve(weater);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        reject();
      }
    });

  function setWeather(properties: any) {
    setState((prevState) => ({ ...prevState, ...properties }));
  }

  const clickToSearch = () => {
    getLocalWeather().then(({ name, main }) => {
      setState((prevState) => ({
        ...prevState,
        weather: getCelcius(main.temp),
        place: name,
        tempMin: getCelcius(main.temp_min),
        tempMax: getCelcius(main.temp_max),
      }));
      setLoading(false);
    });
  };

  const autoSearch = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(({ state: status }) => {
        if (status === 'granted') {
          setGrant(true);
          setLoading(true);
          getLocalWeather().then(({ name, main }) => {
            setState((prevState) => ({
              ...prevState,
              weather: getCelcius(main.temp),
              place: name,
              tempMin: getCelcius(main.temp_min),
              tempMax: getCelcius(main.temp_max),
            }));
            setLoading(false);
          });
        }
      });
  };

  const autoSearchHydrated = useCallback(autoSearch, []);

  useEffect(() => {
    autoSearchHydrated();
  }, [autoSearchHydrated]);

  const classes = classNames('Home', {
    darkmode: darkMode,
  });

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <EHeader />
      <div className="wrapper">
        <ESearch
          setWeather={setWeather}
          setLoading={setLoading}
          setError={setError}
          setGrant={setGrant}
        />
        <main className="Home__main">
          {!grant ? (
            <div>
              <figure className="Home__cover mb20">
                <img src="/assets/home_icon.svg" alt="home_icon" />
              </figure>
              <EButton
                type="button"
                text="Ver clima en mi ubicación"
                handleClick={clickToSearch}
              />
            </div>
          ) : loading ? (
            <Loader darkmode={darkMode} />
          ) : !error.ok ? (
            <>
              <Error />
              <figure className="Home__cover">
                <img src="https://i.imgur.com/1fWGQqi.png" alt="home-cover" />
              </figure>
            </>
          ) : (
            <>
              <ECard
                temperature={state.weather}
                place={state.place}
                icon={state.icon}
                darkmode={!!darkMode}
                tempMin={state.tempMin}
                tempMax={state.tempMax}
              />
              <EBottomResults />
            </>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default Home;
