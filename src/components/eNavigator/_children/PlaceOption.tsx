import React, { useContext } from 'react';
import * as GEO from '../../../services/geolocalization';
import * as Weather from '../../../services/weather';
import { appContext } from '../../../context/app';
import { getCelcius } from '../../../utils';

type Props = {
  name: string;
};

export default function PlaceOption({ name }: Props) {
  const { setCoords, setWeather, toggleNavbar, setAppStatus } = useContext(
    appContext,
  );
  function handleSet() {
    setAppStatus((prevStatus: any) => ({ ...prevStatus, loading: true }));
    toggleNavbar();
    GEO.getGeoLocation(name).then((res) => {
      setCoords({ lat: res.latitude, lng: res.longitude });
      Weather.getCurrentWeather(res.latitude, res.longitude).then(
        ({ name: Name, main, weather }) => {
          const { temp_min, temp_max, temp } = main;
          setWeather({
            tempMax: getCelcius(temp_max),
            weather: getCelcius(temp),
            tempMin: getCelcius(temp_min),
            place: Name,
            icon: weather[0].icon,
          });
          setAppStatus((prevStatus: any) => ({
            ...prevStatus,
            loading: false,
          }));
        },
      );
    });
  }

  return (
    <button className="PlaceOption" type="button" onClick={handleSet}>
      {name}
    </button>
  );
}
