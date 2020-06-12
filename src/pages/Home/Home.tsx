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
  const {
    darkMode,
    setCoords,
    weather,
    setWeather: setCurrentWeather,
    appStatus,
    setAppStatus,
  } = useContext(appContext);
  const [grant, setGrant] = useState(false);

  const getLocalWeather = (): Promise<weatherResponse> =>
    new Promise((resolve, reject) => {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(({ coords }) => {
          setAppStatus((prevStatus: any) => ({ ...prevStatus, loading: true }));
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
    setCurrentWeather((prevState: any) => ({ ...prevState, ...properties }));
  }

  const clickToSearch = () => {
    getLocalWeather().then(({ name, main }) => {
      setCurrentWeather((prevState: any) => ({
        ...prevState,
        weather: getCelcius(main.temp),
        place: name,
        tempMin: getCelcius(main.temp_min),
        tempMax: getCelcius(main.temp_max),
      }));
      setAppStatus((prevStatus: any) => ({ ...prevStatus, loading: false }));
    });
  };

  const autoSearch = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(({ state: status }) => {
        if (status === 'granted') {
          setGrant(true);
          setAppStatus((prevStatus: any) => ({ ...prevStatus, loading: true }));
          getLocalWeather().then(({ name, main }) => {
            setCurrentWeather((prevState: any) => ({
              ...prevState,
              weather: getCelcius(main.temp),
              place: name,
              tempMin: getCelcius(main.temp_min),
              tempMax: getCelcius(main.temp_max),
            }));
            setAppStatus((prevStatus: any) => ({
              ...prevStatus,
              loading: false,
            }));
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
          setLoading={(status: boolean) => {
            setAppStatus((prevStatus: any) => ({
              ...prevStatus,
              loading: status,
            }));
          }}
          setError={(err: { ok: boolean }) => {
            setAppStatus((prevStatus: any) => ({ ...prevStatus, err }));
          }}
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
          ) : appStatus.loading ? (
            <Loader darkmode={darkMode} />
          ) : !appStatus?.error.ok ? (
            <>
              <Error />
              <figure className="Home__cover">
                <img src="https://i.imgur.com/1fWGQqi.png" alt="home-cover" />
              </figure>
            </>
          ) : (
            <>
              <ECard
                temperature={weather.weather}
                place={weather.place}
                icon={weather.icon}
                darkmode={!!darkMode}
                tempMin={weather.tempMin}
                tempMax={weather.tempMax}
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
