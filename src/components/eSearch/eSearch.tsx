import React, { useRef, useEffect, SyntheticEvent, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import classnames from "classnames";
import "./eSearch.css";
import { appContext } from "../../context/app";
import * as GEO from "../../services/geolocalization";
import * as Weather from "../../services/weather";

type Props = {
  setWeather: (a: any) => void;
  setLoading: (a: boolean) => void;
};

const ESearch: React.FC<Props> = ({ setWeather, setLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { darkMode: darkmode } = useContext(appContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: SyntheticEvent) {
    setLoading(true);
    e.preventDefault();
    if (inputRef.current?.value) {
      GEO.getGeoLocation(inputRef.current?.value).then((res) => {
        Weather.getCurrentWeather(res.latitude, res.longitude).then((res) => {
          setWeather({
            icon: res.weather[0].icon,
            weather: res.main.temp,
            place: res.name,
            tempMin: res.main.temp_min,
            tempMax: res.main.temp_max,
          });
          setLoading(false);
        });
      });
    }
  }

  const classes = classnames("ESearch__form", {
    darkmode,
  });

  return (
    <div className="ESearch mb10">
      <form onSubmit={handleSubmit} className={classes}>
        <input
          type="text"
          placeholder="Busca o añade una locación a tu lista"
          className="ESearch__input"
          ref={inputRef}
        />
        <button
          className={
            darkmode ? "ESearch__form-button darkmode" : "ESearch__form-button"
          }
          type="submit"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default ESearch;
