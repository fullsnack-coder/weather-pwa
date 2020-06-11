import axios from 'axios';
import config from '../utils/config';

export const savePlace = async (placeName: string, userId: string) => {
  try {
    const req = await axios.put(
      `${config.server.serverUri}/user`,
      {
        placeName,
      },
      {
        headers: { userId },
      },
    );
    return { ok: req.status === 200, data: req.data };
  } catch (error) {
    return { ok: false, error };
  }
};

export const removePlace = async (placeName: string, userId: string) => {
  try {
    const req = await axios.put(
      `${config.server.serverUri}/user/place`,
      {
        placeName,
      },
      {
        headers: { userId },
      },
    );
    return { ok: req.status === 200, data: req.data };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getPlaces = async (userId: string) => {
  try {
    const req = await axios.get(`${config.server.serverUri}/user/${userId}`);
    return { ok: req.status === 200, data: req.data };
  } catch (error) {
    return { ok: false, error };
  }
};
