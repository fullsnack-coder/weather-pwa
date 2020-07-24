import React, { useRef, useEffect, SyntheticEvent, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import classnames from 'classnames';
import './eSearch.css';
import { appContext } from '../../context/app';
import * as GEO from '../../services/geolocalization';
import * as Weather from '../../services/weather';
import { getCelcius } from '../../utils';

type tError = {
  ok: boolean;
};

type Props = {
  setWeather: (a: any) => void;
  setLoading: (a: boolean) => void;
  setError: (a: tError) => void;
  setGrant: (a: any) => void;
};

const ESearch: React.FC<Props> = ({
  setWeather,
  setLoading,
  setGrant,
  setError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { darkMode: darkmode, setCoords } = useContext(appContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (inputRef.current?.value && inputRef.current?.value.length > 3) {
      setGrant(true);
      setLoading(true);
      GEO.getGeoLocation(inputRef.current?.value)
        .then((coords) => {
          Weather.getCurrentWeather(coords.latitude, coords.longitude).then(
            (resWeather) => {
              if (!resWeather.error) {
                setError({ ok: true });
                setWeather({
                  icon: resWeather.weather[0].icon,
                  weather: getCelcius(resWeather.main.temp),
                  place: resWeather.name,
                  tempMin: getCelcius(resWeather.main.temp_min),
                  tempMax: getCelcius(resWeather.main.temp_max),
                });
                setCoords({
                  lat: coords.latitude,
                  lng: coords.longitude,
                });
                setLoading(false);
              } else if (resWeather.error) {
                setError({ ok: false });
                setLoading(false);
              }
            },
          );
        })
        .catch((err) => {
          setError({ ok: false });
          setLoading(false);
        });
    }
  }

  const classes = classnames('ESearch__form', {
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
            darkmode ? 'ESearch__form-button darkmode' : 'ESearch__form-button'
          }
          type="submit"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default React.memo(ESearch);
