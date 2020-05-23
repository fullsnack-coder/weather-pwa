import React, { useState, useContext } from 'react';
import { useQuery } from 'react-query';

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

const Home: React.FC = () => {
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
          Weather.getCurrentWeather(coords.latitude, coords.longitude)
            .then((weater) => {
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

  const { status } = useQuery('fetchedW ', getLocalWeather, {
    refetchOnWindowFocus: false,
    onSuccess: ({ name, main }) => {
      setState((prevState) => ({
        ...prevState,
        weather: main.temp,
        place: name,
        tempMin: main.temp_min,
        tempMax: main.temp_max,
      }));
    },
  });

  const { darkMode } = useContext(appContext);
  return (
    <div className={darkMode ? 'Home darkmode' : 'Home'}>
      <div className="wrapper">
        <ESearch setWeather={setWeather} setLoading={() => {}} />
        <main className="Home__main">
          {status === 'loading' ? (
            <Loader />
          ) : status === 'error' ? (
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
    </div>
  );
};

export default Home;
