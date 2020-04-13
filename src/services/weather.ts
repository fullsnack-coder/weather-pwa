import axios from "axios";

const weatherInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

weatherInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: "YOUR_API_KEY",
  };
  return config;
});

const getCurrentWeather = async (lat: number, lon: number) => {
  const req = await weatherInstance.get("weather", {
    params: {
      lat,
      lon,
    },
  });
  return await req.data;
};

const getForeCast = async (lat: number, lon: number, cnt?: number) => {
  const req = await weatherInstance.get("forecast", {
    params: {
      lat,
      lon,
      cnt,
    },
  });
  return await req.data;
};

export { getCurrentWeather, getForeCast };
