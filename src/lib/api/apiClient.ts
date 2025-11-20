import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Unexpected error';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
