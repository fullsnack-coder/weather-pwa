import React from 'react';
import './eCard.css';
import { FaThermometerEmpty, FaThermometerFull } from 'react-icons/fa';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { parseDate } from '../../utils';

type Props = {
  temperature: number;
  place?: string;
  icon?: string;
  darkmode: boolean;
  tempMin?: number;
  tempMax: number;
};

const ECard: React.FC<Props> = ({
  temperature,
  place,
  icon,
  darkmode,
  tempMin,
  tempMax,
}) => {
  const date = Intl.DateTimeFormat().format(Date.now());
  const stringDate = parseDate(date);

  const classes = classnames('ECard', {
    darkmode,
  });

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <h1 className="ECard__heading">{place?.toUpperCase()}</h1>
      <figure
        className={
          darkmode ? 'ECard__weather-icon darkmode' : 'ECard__weather-icon'
        }
      >
        <img
          src={`http://openweathermap.org/img/wn/${icon || '10d@2x'}.png`}
          alt="weather-icon"
        />
      </figure>
      <h2>{stringDate}</h2>
      <h1 className="ECard__weather">{`${temperature} C°`}</h1>
      <figure className="ECard__cover">
        <img src="https://i.imgur.com/jyW1Z63.png" alt="" />
      </figure>
      <div className="ECard__details">
        <div className="details__item">
          <p>Min</p>
          <FaThermometerEmpty />
          {`${tempMin}°C`}
        </div>
        <div className="details__item">
          <p>Max</p>
          <FaThermometerFull />
          {`${tempMax}°C`}
        </div>
      </div>
    </motion.div>
  );
};

export default ECard;
