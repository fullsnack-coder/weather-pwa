import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { appContext } from '../../context/app';
import './eBottomResults.css';
import * as Weather from '../../services/weather';
import Loader from '../Loader';
import ForeCastItem from './_childrens/foreCastItem';
import EButton from '../eButton/eButton';

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

const EBottomResults: React.FC<Props> = () => {
  const { darkMode } = useContext(appContext);
  const [foreCast, setForecast] = useState<Array<WeatherItem>>([]);
  const [loading, setLoading] = useState(false);

  const classes = classnames('EBottomResults', {
    darkmode: darkMode,
  });

  function getForeCast() {
    setLoading(true);
    Weather.getForeCast(-10.747899, -77.756641, 5).then((res) => {
      setForecast(res.list);
      setLoading(false);
    });
  }

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0' }}
    >
      <div className="container">
        {!loading && foreCast.length === 0 && (
          <EButton
            handleClick={getForeCast}
            Icon={<FaCalendarCheck />}
            text="Pronóstico Disponible"
          />
        )}
        {loading ? (
          <Loader darkmode={darkMode} />
        ) : (
          foreCast?.map(({ dt, weather, main: { temp_max, temp_min } }) => (
            <ForeCastItem
              darkMode={!!darkMode}
              temp_max={temp_max}
              temp_min={temp_min}
              weather={weather}
              dt={dt}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default EBottomResults;
