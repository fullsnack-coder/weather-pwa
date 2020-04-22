import dotenv from "dotenv";
dotenv.config();

export default {
  apiKeys: {
    weatherApi: process.env.REACT_APP_WEATHER_API_KEY,
    rapidApiKey: process.env.REACT_APP_RAPID_API_KEY,
  },
};
