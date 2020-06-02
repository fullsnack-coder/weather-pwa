import axios, { AxiosResponse } from 'axios';

type LoginInput = {
  username: string;
  password: string;
};

export const loginUser = async ({
  username,
  password,
}: LoginInput): Promise<AxiosResponse> => {
  const req = await axios.post('http://localhost:4000/login', {
    username,
    password,
  });
  return req;
};
