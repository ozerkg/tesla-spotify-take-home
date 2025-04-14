import axiosInstance from '../axios';
import { User } from '@spotify/web-api-ts-sdk';

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>('/me');

  if (!data || !data.id) {
    throw new Error("Invalid or empty user data");
  }

  return data;
};