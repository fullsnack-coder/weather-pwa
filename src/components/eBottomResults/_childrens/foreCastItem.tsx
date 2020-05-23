import React from 'react';
import { FaThermometerEmpty, FaThermometerFull } from 'react-icons/fa';

import { getCelcius } from '../../../utils';

type Props = {
  darkMode: boolean;
  dt: number;
  temp_min: number;
  temp_max: number;
  weather: any;
};

const ForeCastItem: React.FC<Props> = ({
  darkMode,
  dt,
  temp_min,
  temp_max,
  weather,
}) => (
  <div key={dt} className={darkMode ? 'forecastItem darkmode' : 'forecastItem'}>
    <div className="details__body">
      <div className="details__item">
        <FaThermometerEmpty />
        <p>{`${getCelcius(Number(temp_min))}°C`}</p>
      </div>
      <figure className="foreItem__icon">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt="foreCast-item-icon"
        />
      </figure>
      <div className="details__item">
        <FaThermometerFull />
        <p>{`${getCelcius(temp_max)}°C`}</p>
      </div>
    </div>
  </div>
);

export default ForeCastItem;
