// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance } from 'axios';
import keys from '../utils/config';

const geoLocationInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.opencagedata.com/geocode/v1/json',
  responseType: 'json',
});

export const getGeoLocation = async (arg = '') => {
  try {
    const req = await geoLocationInstance.get('', {
      params: {
        q: arg,
        key: keys.apiKeys.openCage,
      },
    });
    if (req.status === 400) {
      return { status: false, message: 'Busqueda fallida' };
    }
    if (req.data.results.length === 0) {
      return { status: false, message: 'No existen resultados' };
    }
    const place = await req.data.results[0];
    return {
      status: true,
      direction: place.components.city,
      latitude: place.geometry.lat,
      longitude: place.geometry.lng,
    };
  } catch (err) {
    return { status: false, err };
  }
};
