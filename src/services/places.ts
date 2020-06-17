import axios from 'axios';
import Swal from 'sweetalert2';
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
    if (req.status === 200) {
      Swal.fire({
        title: 'Se actualizó correctamente',
        timer: 2000,
        icon: 'success',
        toast: true,
      });
    }
    return { ok: req.status === 200, data: req.data };
  } catch (error) {
    Swal.fire({
      title: 'Ocurrió un error',
      timer: 2000,
      icon: 'error',
      toast: true,
    });
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
    if (req.status === 200) {
      Swal.fire({
        title: 'Se actualizó correctamente',
        timer: 2000,
        icon: 'success',
        toast: true,
      });
    }
    return { ok: req.status === 200, data: req.data };
  } catch (error) {
    Swal.fire({
      title: 'Ocurrió un error',
      timer: 2000,
      icon: 'error',
      toast: true,
    });
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
