import type { AxiosError } from 'axios';
import apiClient from '../apiClient';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await apiClient.post('/auth/register', payload);
    return response.data.user;
  } catch (error) {
    const message =
      (error as AxiosError<{ message?: string }>).response?.data?.message ??
      (error as Error).message ??
      'Registration failed';
    throw new Error(message);
  }
};
