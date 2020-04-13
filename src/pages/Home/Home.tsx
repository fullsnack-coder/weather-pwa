import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import * as Weather from "../../services/weather";
import Error from "../../components/Error/Error";
import ECard from "../../components/eCard/eCard";
import { appContext } from "../../context/app";
import EBottomResults from "../../components/eBottomResults/eBottomResults";
import ESearch from "../../components/eSearch/eSearch";
import Loader from "../../components/Loader";

const Home: React.FC = () => {
  const [state, setState] = useState({
    weather: 0,
    icon: "10d@2x",
    place: "",
    foreCast: [],
    tempMin: 0,
    tempMax: 0,
    loading: false,
  });
  const [loading, setLoading] = useState(true);
  const [bottomResults, setBottomResults] = useState(false);

  function getCurrentLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((res) => {
        Weather.getCurrentWeather(
          res.coords.latitude,
          res.coords.longitude
        ).then((res) => {
          setState((state) => ({
            ...state,
            icon: res.weather[0].icon,
            weather: res.main.temp,
            place: res.name,
            tempMin: res.main.temp_min,
            tempMax: res.main.temp_max,
          }));
          setLoading(false);
          setBottomResults(true);
        });
      });
    }
  }

  function setWeather(properties: any) {
    setState((state) => ({ ...state, ...properties }));
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  function renderMedia() {
    if (loading) {
      return <Loader />;
    } else if (!state.place && !loading) {
      return (
        <>
          <Error />
          <figure className="Home__cover">
            <img src="https://i.imgur.com/1fWGQqi.png" alt="home-cover" />
          </figure>
        </>
      );
    } else if (!loading && state.place) {
      return (
        <ECard
          temperature={state.weather}
          place={state.place}
          icon={state.icon}
          darkmode={!!darkMode}
          tempMin={state.tempMin}
          tempMax={state.tempMax}
        />
      );
    }
  }

  const { darkMode } = useContext(appContext);

  return (
    <div className={darkMode ? "Home darkmode" : "Home"}>
      <div className="wrapper">
        <ESearch setWeather={setWeather} setLoading={setLoading} />
        <main className="Home__main">{renderMedia()}</main>

        <EBottomResults active={bottomResults} />
      </div>
    </div>
  );
};

export default Home;
