import React, { useContext, useState } from "react";
import classnames from "classnames";
import "./eBottomResults.css";
import { appContext } from "../../context/app";
import {
  FaThermometerEmpty,
  FaThermometerFull,
  FaCalendarCheck,
} from "react-icons/fa";
import { getCelcius, parseDate } from "../../utils";
import * as Weather from "../../services/weather";
import Loader from "../Loader";

type Props = {
  active?: boolean;
};

type WeatherItem = {
  dt: number;
  weather: {
    icon: string;
  }[];
  main: {
    temp_max: number;
    temp_min: number;
  };
  dt_txt: string;
};

const EBottomResults: React.FC<Props> = ({ active }) => {
  const { darkMode } = useContext(appContext);
  const [foreCast, setForecast] = useState<Array<WeatherItem>>([]);
  const [loading, setLoading] = useState(false);

  let classes = classnames("EBottomResults", {
    darkmode: darkMode,
    active: active,
  });

  function getForeCast() {
    setLoading(true);
    Weather.getForeCast(-10.747899, -77.756641, 5).then((res) => {
      setForecast(res.list);
      setLoading(false);
    });
  }

  return (
    <div className={classes}>
      <div className="container">
        {!loading && foreCast.length === 0 && (
          <button
            onClick={getForeCast}
            className={
              darkMode
                ? "EBottom__btn-forecast darkmode"
                : "EBottom__btn-forecast"
            }
          >
            <FaCalendarCheck />
            <p>Próximos 5 días</p>
          </button>
        )}
        {loading ? (
          <Loader darkmode={darkMode} />
        ) : (
          foreCast?.map(
            ({ dt, weather, main: { temp_max, temp_min }, dt_txt }) => (
              <div
                key={dt}
                className={darkMode ? "forecastItem darkmode" : "forecastItem"}
              >
                {console.log(new Date(dt_txt).getDate())}
                <h2>{}</h2>
                <div className="details__body">
                  <div className="details__item">
                    <FaThermometerEmpty />
                    <p>{getCelcius(Number(temp_min))}°C</p>
                  </div>
                  <figure className="foreItem__icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
                      alt="foreCast-item-icon"
                    />
                  </figure>
                  <div className="details__item">
                    <FaThermometerFull />
                    <p>{getCelcius(temp_max)}°C</p>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default EBottomResults;
