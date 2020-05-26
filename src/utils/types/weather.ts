export interface weatherResponse {
  weather: any;
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
}
