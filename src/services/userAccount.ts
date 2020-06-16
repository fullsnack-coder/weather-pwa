// eslint-disable-next-line no-unused-vars
import axios, { AxiosResponse } from 'axios';
import config from '../utils/config';

type LoginInput = {
  username: string;
  password: string;
};

type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

type EditInput = {
  userId: string;
  userDescription: string;
};

export const loginUser = async ({
  username,
  password,
}: LoginInput): Promise<AxiosResponse> => {
  const req = await axios.post(`${config.server.serverUri}/login`, {
    username,
    password,
  });
  return req;
};

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterInput): Promise<AxiosResponse> => {
  const req = await axios.post(`${config.server.serverUri}/register`, {
    username,
    email,
    password,
  });
  return req;
};

export const editUser = async ({ userDescription, userId }: EditInput) => {
  const req = await axios.put(`${config.server.serverUri}/user/${userId}`, {
    description: userDescription,
  });
  return req;
};

export const kick = async () => {
  // Initial kick for stand up the backend
  const req = await axios.get(`${config.server.serverUri}`);
  return { status: req.status };
};
