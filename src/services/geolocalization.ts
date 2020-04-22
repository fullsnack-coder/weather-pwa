import axios, { AxiosInstance } from "axios";
import keys from "../utils/config";

const geoLocationInstance: AxiosInstance = axios.create({
  baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php`,
  responseType: "json",
  headers: {
    "x-rapidapi-key": keys.apiKeys.rapidApiKey,
  },
});

const getGeoLocation = async (arg = "") => {
  try {
    const req = await geoLocationInstance.get("", {
      params: {
        location: arg,
      },
    });
    if (req.data.Results.length === 0) {
      return { status: false, message: "No existen resultados" };
    }
    const place = await req.data.Results[0];
    return {
      status: true,
      direction: place.name,
      latitude: place.lat,
      longitude: place.lon,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export { getGeoLocation };
