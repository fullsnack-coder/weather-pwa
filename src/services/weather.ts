import axios from 'axios';
import keys from '../utils/config';

const weatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

weatherInstance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.params = {
    ...config.params,
    appid: keys.apiKeys.weatherApi,
  };
  return config;
});

const getCurrentWeather = async (lat: number, lon: number) => {
  try {
    const req = await weatherInstance.get('weather', {
      params: {
        lat,
        lon,
      },
    });
    return { ...req.data, error: false };
  } catch (error) {
    return { error: true };
  }
};

const getForeCast = async (lat: number, lon: number, cnt?: number) => {
  const req = await weatherInstance.get('forecast', {
    params: {
      lat,
      lon,
      cnt,
    },
  });
  return req.data;
};

export { getCurrentWeather, getForeCast };
